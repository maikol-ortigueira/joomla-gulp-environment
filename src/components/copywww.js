const { src, dest, task, series, parallel } = require('gulp');
const { wwwDir, extName, sourceDir, extTypes } = require('../../gulp-config.json');
const clean = require('./cleanwww');
const path = require('path');
const debug = require('gulp-debug');
const prefix = "com_";
const compName = prefix + extName;
const destDir = path.join(sourceDir,extTypes,extName);
const destAdminDir = path.join(destDir, 'administrator');
const destSiteDir = path.join(destDir, 'site');
const destMediaDir = path.join(destDir, 'media');
const manifestFile = path.join(wwwDir,'administrator/components', compName, extName + '.xml');

// Copy admin language
function copyAdminLang(cb) {
	src(path.join(wwwDir,'administrator/language/**/*.' + compName + '.*'))
		.pipe(dest(path.join(destAdminDir, 'languages')));
		cb();
};
// Copy site language
function copySiteLang(cb) {
	src(path.join(wwwDir,'language/**/*.' + compName + '.*'))
		.pipe(dest(path.join(destSiteDir, 'languages')));
		cb();
};
// Copy manifest
function copyManif(cb) {
	src(manifestFile)
		.pipe(dest(destDir + '/'));
		cb();
};
// Copy admin
function copyAdmin(cb) {
	src([
		path.join(wwwDir,'administrator/components', compName, '**'),
		'!' + manifestFile
	])
		.pipe(dest(path.join(destDir, 'administrator', '/')));
	cb();
};
// Copy site
function copySite (cb) {
	src(path.join(wwwDir,'components', compName, '**'))
		.pipe(dest(path.join(destDir, 'site', '/')));
		cb();
};
// Copy media
function copyMedia (cb) {
	src(path.join(wwwDir,'media', compName, '**'))
		.pipe(dest(path.join(destDir, 'media', '/')));
		cb();
};

task("copywww:admin", series(clean.cleanAdmin, parallel(copyAdmin, copyAdminLang)));
task("copywww:site", series(clean.cleanSite, parallel(copySite, copySiteLang)));
task("copywww:media", series(clean.cleanMedia, copyMedia));
task("copywww:admin:language", series(clean.cleanAdminLang, copyAdminLang));
task("copywww:site:language", series(clean.cleanSiteLang, copySiteLang));
task("copywww:manifest", series(clean.cleanManf, copyManif));
// Copy
task("copywww", series(clean.cleanwww, parallel("copywww:admin", "copywww:site", "copywww:media", "copywww:manifest")));