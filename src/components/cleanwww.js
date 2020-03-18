//const joomlaBuild = require("joomla-build");
const { task, series, parallel } = require('gulp');
const path = require('path');
const del = require('del');
const { sourceDir, extName } = require('../../gulp-config.json');
const prefix = "com_";
const compName = prefix + extName;
const cleanDir = path.join(sourceDir, 'components', extName);
const cleanAdminDir = path.join(cleanDir, 'administrator');
const cleanSiteDir = path.join(cleanDir, 'site');
const cleanMediaDir = path.join(cleanDir, 'media');

// Clean
// Clean admin language
task("cleanwww:admin:language", (cb) => {
	del(path.join(cleanAdminDir,'language'), { force: true });
	cb();
})
// Clean site language
task("cleanwww:site:language", (cb) => {
	del(path.join(cleanSiteDir,'language'), { force: true });
	cb();
})
// Clean administrator
task("cleanwww:admin", series("cleanwww:admin:language", (cb) => {
	del(wwwAdminDir, { force: true});
	cb();
}));
// Clean site
task("cleanwww:site", series("cleanwww:site:language", (cb) => {
	del(wwwSiteDir, { force: true});
	cb();
}));
// Clean media
task("cleanwww:media", (cb) => {
	del(wwwMediaDir, { force: true});
	cb();
});
// Clean manifest
task("cleanwww:manifest", (cb) => {
	del(sourceDir + '/administrator/components/' + compName + '/' + extName + '.xml', { force: true });
	cb();
})

task("clean", parallel("cleanwww:admin", "cleanwww:site", "cleanwww:media"));