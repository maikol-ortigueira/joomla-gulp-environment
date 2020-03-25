const { task, series } = require('gulp');
const clean = require('./components/clean.js');
const cleanwww = require('./components/cleanwww.js');
const copy = require('./components/copy.js');
const copywww = require('./components/copywww.js');
const watch = require('./components/watch.js');
const newComponent = require('./components/new-component.js');
const newView = require('./components/new-view.js');
const newModal = require('./components/new-modal.js');
const release = require('./components/release.js');
const { defaultTasks } = require('../gulp-config.json');


task("default", series(defaultTasks));
