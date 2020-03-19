//const joomlaBuild = require("joomla-build");
const { task, src, series, parallel } = require('gulp');
const path = require('path');
const del = require('del');
const vinylPaths = require('vinyl-paths');
const { sourceDir, extName } = require('../../gulp-config.json');
const prefix = "com_";
const compName = prefix + extName;
const cleanDir = path.join(sourceDir, 'components', extName);
const cleanAdminDir = path.join(cleanDir, 'administrator');
const cleanSiteDir = path.join(cleanDir, 'site');
const cleanMediaDir = path.join(cleanDir, 'media');

// Clean
// Clean admin language
function cleanAdminLang() {
	return src(path.join(cleanAdminDir, 'languages'), { allowEmpty: true })
	.pipe(vinylPaths(function (paths) {
		del.sync(paths, {force: true });
		return Promise.resolve();
	}));
};
// Clean site language
function cleanSiteLang() {
	return src(path.join(cleanSiteDir,'languages'), { allowEmpty: true })
	.pipe(vinylPaths(function (paths) {
		del.sync(paths, {force: true });
		return Promise.resolve();
	}));
};
// Clean manifest
function cleanManf() {
	return src(path.join(cleanDir, extName + '.xml'), { allowEmpty: true })
	.pipe(vinylPaths(function (paths) {
		del.sync(paths, {force: true });
		return Promise.resolve();
	}));
};
// Clean admin
function cleanAdmin() {
	return src(path.join(cleanAdminDir), { allowEmpty: true })
	.pipe(vinylPaths(function (paths) {
		del.sync(paths, {force: true });
		return Promise.resolve();
	}));
};
// Clean site
function cleanSite() {
	return src(path.join(cleanSiteDir), { allowEmpty: true })
	.pipe(vinylPaths(function (paths) {
		del.sync(paths, {force: true });
		return Promise.resolve();
	}));
};

// Clean media
function cleanMedia() {
	return src(path.join(cleanMediaDir), { allowEmpty: true })
	.pipe(vinylPaths(function (paths) {
		del.sync(paths, {force: true });
		return Promise.resolve();
	}));
};

exports.cleanAdmin = cleanAdmin;
exports.cleanSite = cleanSite;
exports.cleanMedia = cleanMedia;
exports.cleanAdminLang = cleanAdminLang;
exports.cleanSiteLang = cleanSiteLang;
exports.cleanManf = cleanManf;
exports.cleanwww = parallel(cleanAdmin, cleanSite, cleanMedia, cleanManf);