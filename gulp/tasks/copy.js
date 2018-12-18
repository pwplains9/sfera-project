/**
 * Created by Abaddon on 27.02.2017.
 * Копирует нужные файлы
 */

var gulp = require('gulp'),
    paths = require('../../config/environments.config');

gulp.task("copy", function () {
    gulp.src(paths.sourcePath + "/*.html").pipe(gulp.dest(paths.distPath));
});
