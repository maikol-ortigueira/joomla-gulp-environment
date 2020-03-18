const { task, series } = require('gulp');
const clean = require('./components/clean.js');
const cleanwww = require('./components/cleanwww.js');
const copy = require('./components/copy.js');
const watch = require('./components/watch.js');
const newComponent = require('./components/new-component.js');
const newView = require('./components/new-view.js');
const release = require('./components/release.js');
const { defaultTasks } = require('../gulp-config.json');


task("default", series(defaultTasks));
