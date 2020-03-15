// Gulp
const { src, dest, task, series } = require('gulp');

// Config variables
const { sourceDir, releaseDir, extTypes, joomlaVersion, extName, header } = require('../../gulp-config.json');

// Zip compress files
const zip = require('gulp-zip');

// File systems
fs = require('file-system');
path = require('path');

// Extension path
extPath = path.join(sourceDir, extTypes, extName);

task("release", ()=> {
	return src([
		path.join(extPath,'**'),
		'!' + path.join(extPath,'docs/**')
	])
	.pipe(zip('com_' + extName + '_' + joomlaVersion + '_v' + header.version + '.zip'))
	.pipe(dest(path.join(releaseDir, extTypes, extName)));
})