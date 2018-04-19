const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const LessAutoprefix = require('less-plugin-autoprefix');
const browserify = require('browserify');
const stringify = require('stringify');
const source = require('vinyl-source-stream');
const pump = require('pump');
const bs = require('browser-sync').create();

let sassOptions = {
  outputStyle: 'expanded'
}

let autoprefixerOptions = {
  browsers: ['last 10 versions']
}

gulp.task('sass', () => {
  pump([
    gulp.src('./src/sass/main.scss'),
    $.plumber(),
    $.sourcemaps.init(),
    $.sass(sassOptions),
    $.autoprefixer(autoprefixerOptions),
    $.sourcemaps.write('./'),
    gulp.dest('./.tmp/css'),
    bs.stream()
  ])
});

// Less support compile
const lessOptions = {
  paths: [
    './src/less',
    './src/less/modules'
  ],
  plugins: [
    new LessAutoprefix({ browsers: ['last 10 versions'] })
  ],
  relativeUrls: true
}

gulp.task('less', () => {
  pump([
    gulp.src('./src/less/main.less'),
    $.plumber(),
    $.sourcemaps.init(),
    $.less(lessOptions)
    .on('error', (err) => {
      console.log(err);
    }),
    $.sourcemaps.write('./'),
    gulp.dest('./.tmp/css'),
    bs.stream()
  ])
});

// Browserify compile
gulp.task('browserify', () => {
  pump([
    browserify({
      entries: './src/js/app.js',
      debug: true
    })
    .transform(stringify, {
      appliesTo: { includeExtensions: ['.html'] },
      minify: true
    })
    .bundle()
    .on('error', (err) => {
      console.log(err);
    }),
    source('bundle.js'),
    gulp.dest('./.tmp/js'),
    bs.stream()
  ]);
});

gulp.task('refresh', () => {
  bs.init({
    files: [ './src/*.html' ],
    server: {
      baseDir: ['./src', './.tmp']
    },
    notify: false,
    open: false,
    port: 5386
  });

  gulp.watch('./src/sass/**/*.scss', ['sass']);
  gulp.watch(['./src/js/**/*.js', './src/views/*.html'], ['browserify']);
});

gulp.task('dev', ['sass', 'browserify', 'refresh']);
