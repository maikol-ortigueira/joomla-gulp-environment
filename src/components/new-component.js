const { src, dest, task, series, parallel } = require('gulp');
const del = require('del');
const path = require('path');
const wait = require('gulp-wait');
//const debug = require('gulp-debug');
const replace = require('replace-in-file');
const rename = require('gulp-rename');
const { extName, sourceDir, extTypes, sourceBoiler, singular, plural } = require('../../gulp-config.json');
const prefix = "com_";
const extDir = path.join(sourceDir, extTypes, extName);
const sourcNew = sourceBoiler + '/joomla-' + extTypes + '-boilerplate/';
const { strsMatch, strsReplace, fileMatch, fileReplace } = require('./components-utils.js');
const through = require('through2');
const fs = require('file-system');

// Remove tmp path
task("remove:tmp", (cb) => {
	del('./tmp', { force: true });
	cb();
});

// Copy to tmp
task("copy:comp-to-tmp", () => {
	return src([
		sourcNew + '**',
		'!' + sourcNew + 'new-view-languages/**'
	])
	.pipe(rename( function(file) {
		file.dirname = file.dirname.replace(/\[plural\]/g, plural.en.toLowerCase());
		file.basename = file.basename.replace(/\[plural\]/g, plural.en.toLowerCase());
		file.dirname = file.dirname.replace(/\[singular\]/g, singular.en.toLowerCase());
		file.basename = file.basename.replace(/\[singular\]/g, singular.en.toLowerCase());
		file.basename = file.basename.replace(/\[component\]/g, extName.toLowerCase());
	}))
	.pipe(dest('./tmp'))
});

// Copy to targetDir
task("replace-strings", (cb) => {
	// If I don't do it this way strings in component.xml will not be replaced.
	replace({
		files: './tmp/' + extName + '.xml',
		from: strsMatch,
		to: strsReplace
	});
	replace({
		files: './tmp/**',
		from: strsMatch,
		to: strsReplace
	});
	cb();
});
// Copy to target path
task("copy:comp-to-target", () => {
	return src('./tmp/**')
	.pipe(dest(extDir));
});


task("new-component", series("copy:comp-to-tmp", "replace-strings", "copy:comp-to-target", "remove:tmp", (cb) =>{
	cb();
}));
