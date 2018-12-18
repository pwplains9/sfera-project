/**
 * Минификация изображений
 */
var gulp = require('gulp'),
  changed = require('gulp-changed'),
  imagemin = require('gulp-imagemin'),
  imageminJpegRecompress = require('imagemin-jpeg-recompress'),
  imageminPngquant = require('imagemin-pngquant'),
  paths = require('../../config/environments.config').images;

gulp.task('imagemin', function () {
  gulp.src(paths.src)
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imageminJpegRecompress({
        progressive: true,
        max: 80,
        min: 70
      }),
      imageminPngquant({
        quality: '75-85'
      }),
      imagemin.svgo({
        plugins: [{
          removeViewBox: false
        }]
      })
    ]))
    .pipe(gulp.dest(paths.dist));
});