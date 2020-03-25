const { src, dest, task, series, parallel } = require('gulp');
const replace = require('replace-in-file');
const rename = require('gulp-rename');
const path = require('path');
const { extName, extTypes, sourceBoiler, singular, plural, sourceDir } = require('../../gulp-config.json');
const extDir = path.join(sourceDir, extTypes, extName);
const sourceNew = sourceBoiler + '/joomla-modal-boilerplate/';
const { strsMatch, strsReplace, replaceArray } = require('./components-utils.js');
const footer = require('gulp-footer');
const fs = require('file-system');
const del = require('del');

// Copy to tmp
task("copy:modal-to-tmp", () => {
	return src([
        sourceNew + '**',
        '!' + sourceNew + 'new-modal-languages/**'
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

task("copy:modal-lang-to-tmp", () => {
	return src(sourceNew + 'new-modal-languages/**')
		.pipe(replaceArray(strsMatch, strsReplace))
		.pipe(dest('./tmp'));
})

// Add language strings to target files
const languages = ['en-GB', 'es-ES'];
const clients = ['admin'];

languages.forEach(language => {
	clients.forEach(client => {
		task("add:" + client + ":modal.language:" + language, (cb) => {
			var langText = fs.readFileSync('./tmp/'+ client + '-' + language + '.ini');
			var target = client === 'admin' ? 'administrator' : client;
			src (path.join(extDir, target, 'languages', language, language+'.com_' + extName + '.ini'))
			.pipe(footer(langText))
			.pipe(dest(path.join(extDir,target,'languages',language)));
			cb();
		})
	});
});

clients.forEach(client => {
	task("add:" + client + ":modal.languages",
	parallel("add:" + client + ":modal.language:" + languages[0], "add:" + client + ":modal.language:" + languages[1], (cb) => {
		cb();
	}))
});

task("add:modal.languages", parallel("add:admin:modal.languages", (cb) => {
	cb();
}));

task("add:admin:modal.language:en-EN", (cb) => {
	var langText = fs.readFileSync('./tmp/admin-en-EN.ini');
	src(extDir + '/administrator/languages/en-GB/en-GB.com_' + extName + '.ini')
	.pipe(footer(langText))
	.pipe(dest(extDir+ '/administrator/languages/en-GB/'));
	cb();
})

task("remove:tmp", (cb) => {
	del('./tmp');
	cb();
});

task("new-modal", series("copy:modal-to-tmp", "copy:modal-lang-to-tmp", "add:modal.languages", "remove:tmp", (cb) =>{
	cb();
}));
