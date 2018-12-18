/**
 * Created by abaddon on 28.07.2017.
 */
const favicons = require('gulp-favicons'),
    gulp = require('gulp'),
    gutil = require('gulp-util');

gulp.task('favicon', function () {
    return gulp.src('./src/images/logo.png').pipe(favicons({
        appName: "Start App",
        appDescription: "This is start application",
        developerName: "Abaddon65",
        developerURL: "https://github.com/abaddonGIT",
        background: "#fff",
        path: "favicon/",
        url: "https://github.com/abaddonGIT",
        display: "fullscreen",
        orientation: "portrait",
        start_url: "/?homescreen=1",
        version: 1.0,
        logging: false,
        online: false,
        html: "favicon.html",
        pipeHTML: true,
        replace: true
    }))
        .on("error", gutil.log)
        .pipe(gulp.dest("./src/favicon"));
});