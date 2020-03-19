//const joomlaBuild = require("joomla-build");
const { src, dest, task, series, parallel } = require('gulp');
const path = require('path');
const vinylPaths = require('vinyl-paths');
const del = require('del');
const { wwwDir, releaseDir, defaultTasks, extName } = require('../../gulp-config.json');
const prefix = "com_";
const compName = prefix + extName;
const wwwAdminDir = wwwDir + '/administrator/components/' + compName;
const wwwSiteDir = wwwDir + '/components/' + compName;
const wwwMediaDir = wwwDir + '/media/' + compName;

// Clean

// Clean admin language
task("clean:admin:language", () => {
	return src(path.join(wwwDir, 'administrator/language/**', '*.' + compName + '.*'), { allowEmpty: true })
	.pipe(vinylPaths(function (paths) {
		del.sync(paths, {force: true });
		return Promise.resolve();
	}));
});
// Clean site language
task("clean:site:language", () => {
	return src(path.join(wwwDir, 'language/**', '*.' + compName + '.*'), { allowEmpty: true })
	.pipe(vinylPaths(function (paths) {
		del.sync(paths, {force: true });
		return Promise.resolve();
	}));
});
// Clean administrator
task("clean:admin", () => {
	return src(path.join(wwwAdminDir), { allowEmpty: true })
	.pipe(vinylPaths(function (paths) {
		del.sync(paths, {force: true });
		return Promise.resolve();
	}));
});
// Clean site
task("clean:site", () => {
	return src(path.join(wwwSiteDir), { allowEmpty: true })
	.pipe(vinylPaths(function (paths) {
		del.sync(paths, {force: true });
		return Promise.resolve();
	}));
});
// Clean media
task("clean:media", () => {
	return src(path.join(wwwMediaDir), { allowEmpty: true })
	.pipe(vinylPaths(function (paths) {
		del.sync(paths, {force: true });
		return Promise.resolve();
	}));
});
// Clean manifest
task("clean:manifest", () => {
	return src(path.join(wwwAdminDir, extName + '.xml'), { allowEmpty: true })
	.pipe(vinylPaths(function (paths) {
		del.sync(paths, {force: true });
		return Promise.resolve();
	}));
});

task("clean", parallel("clean:admin", "clean:site", "clean:media"));