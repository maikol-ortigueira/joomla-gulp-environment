const { src, dest, task } = require('gulp');
const path = require('path');
const rename = require('gulp-rename');
const { extName, sourceDir, extTypes, sourceBoiler, singular, plural } = require('../../gulp-config.json');
const extDir = path.join(sourceDir, extTypes, extName);
const sourceNew = sourceBoiler + '/joomla-' + extTypes + '-boilerplate/';
const { strsMatch, strsReplace, replaceArray } = require('./components-utils.js');

// Copy to tmp
task("copy:comp-to-tmp", () => {
	return src([
		sourceNew + '**',
		'!' + sourceNew + 'new-view-languages/**'
	])
	.pipe(replaceArray(strsMatch, strsReplace))
	.pipe(rename( function(file) {
		file.dirname = file.dirname.replace(/\[plural\]/g, plural.en.toLowerCase());
		file.basename = file.basename.replace(/\[plural\]/g, plural.en.toLowerCase());
		file.dirname = file.dirname.replace(/\[singular\]/g, singular.en.toLowerCase());
		file.basename = file.basename.replace(/\[singular\]/g, singular.en.toLowerCase());
		file.basename = file.basename.replace(/\[component\]/g, extName.toLowerCase());
	}))
	.pipe(dest(extDir))
});