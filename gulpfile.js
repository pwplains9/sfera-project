/**
 * Файл конфигурации для gulp
 */
"use strict";

const gulp = require("gulp"),
  requireDir = require('require-dir'),
  runSequence = require('run-sequence');
//Подклучаем таски
requireDir('./gulp/tasks', { recurse: true });

gulp.task('production', function (callback) {
  runSequence('sprites', 'imagemin', 'svg', callback);
});
