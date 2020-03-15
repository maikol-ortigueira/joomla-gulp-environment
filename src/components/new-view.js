const { src, dest, task, series, parallel } = require('gulp');
const replace = require('replace-in-file');
const rename = require('gulp-rename');
const path = require('path');
const { extName, extTypes, sourceBoiler, singular, plural, sourceDir } = require('../../gulp-config.json');
const extDir = path.join(sourceDir, extTypes, extName);
const sourceNew = sourceBoiler + '/joomla-' + extTypes + '-boilerplate/';
const { strsMatch, strsReplace, replaceArray, removeTmp } = require('./components-utils.js');
const footer = require('gulp-footer');
const fs = require('file-system');
const del = require('del');

// Copy to tmp
task("copy:view-to-tmp", () => {
	return src([
		sourceNew + '**',
		'!' + sourceNew + 'administrator/assets/**',
		'!' + sourceNew + 'administrator/helpers/**',
		'!' + sourceNew + 'administrator/languages/**',
		'!' + sourceNew + 'administrator/models/fields/**',
		'!' + sourceNew + 'administrator/sql/**',
		'!' + sourceNew + 'administrator/*.*',
		'!' + sourceNew + 'installer/**',
		'!' + sourceNew + 'new-view-languages/**',
		'!' + sourceNew + 'media/**',
		'!' + sourceNew + 'site/helpers/**',
		'!' + sourceNew + 'site/languages/**',
		'!' + sourceNew + 'site/models/fields/**',
		'!' + sourceNew + 'site/*.*',
		'!' + sourceNew + '*.*',
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

task("copy:view-lang-to-tmp", () => {
	return src(sourceNew + 'new-view-languages/**')
		.pipe(replaceArray(strsMatch, strsReplace))
		.pipe(dest('./tmp'));
})

// Add language strings to target files
const languages = ['en-GB', 'es-ES'];
const clients = ['admin', 'site'];

languages.forEach(language => {
	clients.forEach(client => {
		task("add:" + client + ":language:" + language, (cb) => {
			var langText = fs.readFileSync('./tmp/new-view-languages/'+ client + '-' + language + '.ini');
			var target = client === 'admin' ? 'administrator' : client;
			src (path.join(extDir, target, 'languages', language, language+'.com_' + extName + '.ini'))
			.pipe(footer(langText))
			.pipe(dest(path.join(extDir,target,'languages',language)));
			cb();
		})
	});
});

clients.forEach(client => {
	task("add:" + client + ":languages",
	parallel("add:" + client + ":language:" + languages[0], "add:" + client + ":language:" + languages[1], (cb) => {
		cb();
	}))
});

task("add:languages", parallel("add:admin:languages", "add:site:languages", (cb) => {
	cb();
}));

task("add:admin:language:en-EN", (cb) => {
	var langText = fs.readFileSync('./tmp/new-view-languages/admin-en-EN.ini');
	src(extDir + '/administrator/languages/en-GB/en-GB.com_' + extName + '.ini')
	.pipe(footer(langText))
	.pipe(dest(extDir+ '/administrator/languages/en-GB/'));
	cb();
})

task("remove:tmp", (cb) => {
	del('./tmp');
	cb();
});

task("new-view", series("copy:view-to-tmp", "add:languages", "remove:tmp", (cb) =>{
	cb();
}));
