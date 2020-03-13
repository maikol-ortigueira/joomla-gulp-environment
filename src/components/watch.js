const { watch, task, series, parallel } = require('gulp');
const { wwwDir, extName, sourceDir, extTypes, browserConfig } = require('../../gulp-config.json');
const prefix = "com_";
const extDir = sourceDir + '/' + extTypes + '/' + extName;
const browserSync = require('browser-sync').create();

task('browser-sync', () => {
	browserSync.init({
		port: 8080
	});
});

// Watch
// Watch manifest
task("watch:manifest", () => {
	watch(extDir + '/' + extName + '.xml',
	series("copy:manifest"));
});
// Watch Admin language
task("watch:admin:language", () => {
	watch(extDir + '/administrator/languages/**',
	series("copy:admin:language"));
});
// Watch Admin
task("watch:admin", parallel("watch:manifest", "watch:admin:language", () => {
	watch([
		extDir + '/administrator/**',
		'!' + extDir + '/admnistrator/languages/**'
	],
	series("copy:admin"));
}));
// Watch Site language
task("watch:site:language", () => {
	watch(extDir + '/site/languages/**',
	series("copy:site:language"));
});
// Watch Site
task("watch:site", parallel("watch:site:language", () => {
	watch([
		extDir + '/site/**',
		'!' + extDir + '/site/languages/**'
	],
	series("copy:site"));
}));
// Watch Media
task("watch:media", () => {
	watch(extDir + '/media/**',
	series("copy:media"));
});
// Watch task
task("watch", series(parallel("watch:admin", "watch:site", "watch:media"), browserSync.reload));
