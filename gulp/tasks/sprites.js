/**
 * Created by abaddon on 27.01.2015.
 */
var gulp = require('gulp'),
    spritesmith = require('gulp.spritesmith'),
    paths = require('../../config/environments.config').sprites;

gulp.task('sprites', function () {
    var sprite = gulp.src(paths.src)
        .pipe(spritesmith({
            imgName: paths.name,
            cssName: paths.cssName,
            imgPath: paths.imagePath + paths.name,
            cssFormat: paths.type,
            padding: paths.padding,
            engineOpts: {
                "imagemagick": true
            }
        }));
    sprite.img.pipe(gulp.dest(paths.dist));
    sprite.css.pipe(gulp.dest(paths.cssPath));
});