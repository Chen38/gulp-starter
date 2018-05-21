const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const pump = require('pump');

const config = require('../config');

gulp.task('generateSprite', () => {
  pump([
    gulp.src('./src/sprite/*'),
    $.spritesmith(config.spriteOptions),
    gulp.dest('./src/sprite/build')
  ]);
});

gulp.task('moveSprite', () => {
  pump([
    gulp.src('./src/sprite/build/_sprite.scss'),
    gulp.dest('./src/sass')
  ]);
  pump([
    gulp.src('./src/sprite/build/sprite.png'),
    gulp.dest('./src/assets/images')
  ]);
});
