const fs = require('fs');
const gulp = require('gulp');
const config = require('../../config/environments.config').block;

gulp.task('block', function (fn) {
  const folderName = process.argv[4];
  if (!fs.existsSync(config.src + '/' + folderName)) {
    fs.mkdirSync(config.src + '/' + folderName);
    fs.writeFile(config.src + '/' + folderName + '/' + folderName + '.pug', '+b.' + folderName, function () {
    });
    fs.writeFile(config.src + '/' + folderName + '/style.less', '.' + folderName + '{}', function () {
    });
  }
  fn();
});