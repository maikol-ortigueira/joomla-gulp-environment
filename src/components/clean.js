//const joomlaBuild = require("joomla-build");
const { src, dest, task, series, parallel } = require('gulp');
const del = require('del');
const { wwwDir, releaseDir, defaultTasks, extName } = require('../../gulp-config.json');
const prefix = "com_";
const compName = prefix + extName;
const wwwAdminDir = wwwDir + '/administrator/components/' + compName;
const wwwSiteDir = wwwDir + '/components/' + compName;
const wwwMediaDir = wwwDir + '/media/' + compName;

// Clean
// Clean admin language
task("clean:admin:language", (cb) => {
	del(wwwDir + '/administrator/language/**/*.' + compName + '.*', { force: true });
	cb();
})
// Clean site language
task("clean:site:language", (cb) => {
	del(wwwDir + '/language/**/*.' + compName + '.*', { force: true });
	cb();
})
// Clean administrator
task("clean:admin", series("clean:admin:language", (cb) => {
	del(wwwAdminDir, { force: true});
	cb();
}));
// Clean site
task("clean:site", series("clean:site:language", (cb) => {
	del(wwwSiteDir, { force: true});
	cb();
}));
// Clean media
task("clean:media", (cb) => {
	del(wwwMediaDir, { force: true});
	cb();
});
// Clean manifest
task("clean:manifest", (cb) => {
	del(wwwDir + '/administrator/components/' + compName + '/' + extName + '.xml', { force: true });
	cb();
})

task("clean", parallel("clean:admin", "clean:site", "clean:media"));