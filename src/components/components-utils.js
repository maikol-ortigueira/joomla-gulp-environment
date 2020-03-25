const cap = require('capitalize');
const rs = require('replacestream');
const through = require('through2');
const del = require('del');
// extension variables
const { extName, header, singular, plural, modalTitleField } = require('../../gulp-config.json');
const compMatchs = ['component', 'singular', 'plural', 'title'];
const compMatchsVal = [extName, singular.en, plural.en, modalTitleField];
// es-ES language variables
var esMatchs = ['esPlural', 'esSingular'];
var esRaplace = [cap(plural.es), cap(singular.es)];

/**
 * Method to merge all the match values into an array
 */
function getComponentMatch() {
	var match = toLCUCases(compMatchs);
	match = match.concat(esMatchs);
	match = match.concat(Object.keys(header));
	match = miRegex(match,'\\\[','\\\]');
	return match;
}

/**
 * Method to merge all the replace values into an array
 */
function getComponentReplace() {
	var replace = toLCUCases(compMatchsVal);
	replace = replace.concat(esRaplace);
	replace = replace.concat(Object.values(header));
	return replace;
}
/**
 * Method to merge into an array lowercase, uppercase, and capital case values
* @param {array} v Values to merge.
 */
function toLCUCases(v) {
	var array = [];
	v.forEach(e => {
		array.push(e.toLowerCase());
		array.push(cap(e));
		array.push(e.toUpperCase());
	});
	return array;
}

/**
 * Creates an array of regular expression objects with prefix and suffix for each value (if needed. Default empty)
 *
 * @param {array} array values to add to the object
 * @param {string} prefix a prefix to the value
 * @param {string} suffix a suffix to the value
 */
function miRegex(array, prefix = '', suffix = '') {
	v = [];
	array.forEach(element => {
		v.push(RegExp(prefix + element + suffix, 'g'));
	});
	return v;
}


function replaceArray(matchArray, replaceArray) {
	return through.obj(function(file, encoding, callback) {
		if (file.isStream()){
			file.contents = matchArray.reduce(function (contents, match, index) {
				return contents.pipe(rs(match, replaceArray[index]));
			}, file.contents);
			return callback(null, file);
		}
		if (file.isBuffer()) {
			var result = matchArray.reduce(function (contents, match, index) {
				return contents
					.split(match)
					.join(replaceArray[index]);
			}, String(file.contents));
			file.contents = new Buffer.from(result);
			return callback(null, file);
		}
		callback(null, file);
	});
};

exports.strsReplace = getComponentReplace();
exports.strsMatch = getComponentMatch();
exports.fileMatch = miRegex(compMatchs);
exports.fileReplace = compMatchsVal;
exports.replaceArray = replaceArray;