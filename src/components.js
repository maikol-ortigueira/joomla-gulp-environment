const { task, series } = require('gulp');
const clean = require('./components/clean.js');
const copy = require('./components/copy.js');
const watch = require('./components/watch.js');
const nuevo = require('./components/new-component.js');
const { defaultTasks } = require('../gulp-config.json');


task("default", series(defaultTasks));
