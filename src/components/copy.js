const { src, dest, task, series, parallel } = require('gulp');
const { wwwDir, extName, sourceDir, extTypes } = require('../../gulp-config.json');
const path = require('path');
const prefix = "com_";
const compName = prefix + extName;
const wwwAdminDir = wwwDir + '/administrator/components/' + compName;
const wwwSiteDir = wwwDir + '/components/' + compName;
const wwwMediaDir = wwwDir + '/media/' + compName;
const extDir = sourceDir + '/' + extTypes + '/' + extName;

// Copy admin language
task("copy:admin:language", series("clean:admin:language", () => {
	return src(extDir + '/administrator/languages/**')
		.pipe(dest(wwwDir + '/administrator/language'));
}));
// Copy manifest
task("copy:manifest", series("clean:manifest", () => {
	return src(extDir + '/' + extName + '.xml')
		.pipe(dest(wwwAdminDir));
}));
// Copy admin
task("copy:admin", series("clean:admin", "copy:admin:language", "copy:manifest", () => {
	return src([
		extDir + '/administrator/**',
		'!' + extDir + '/administrator/languages/**'
	])
	.pipe(dest(wwwAdminDir + '/'));
}));
// Copy site language
task("copy:site:language", series("clean:site:language", () => {
	return src(extDir + '/site/languages/**')
		.pipe(dest(wwwDir + '/language'));
}))
// Copy site
task("copy:site", series("clean:site", "copy:site:language", () => {
	return src([
		extDir + '/site/**',
		'!' + extDir + '/site/languages/**'
	])
	.pipe(dest(wwwSiteDir + '/'));
}))

// Copy media
task("copy:media", series("clean:media", () => {
	return src(path.join(extDir, 'media', '**'))
		.pipe(dest(wwwMediaDir + '/'));
}));

// Copy

task("copy", parallel("copy:admin", "copy:site", "copy:media"));