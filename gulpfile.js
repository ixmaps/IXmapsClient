/* jshint node: true, esnext: true */

"use strict";

let gulp = require('gulp'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  gutil = require('gulp-util'),
  c = gutil.colors,
  less = require('gulp-less'),
  mocha = require('gulp-mocha'),
  shell = require('gulp-shell'),
  join = require('path').join,
  del = require('del');

const OUTDIR = './dist',
  SERVER_PORT = 8888,
  INDEX_HTML = join(__dirname, 'assets/main.html'),
  DEST_JS_FILE = 'main.js',
  CLIENT_SRC = join(__dirname, 'assets'),
  CLIENT_MAIN = join(CLIENT_SRC, 'main.js'),
  CSS_GLOB = './assets/css/**/*.less',
  LESS_INCLUDES = [
    'node_modules/skeleton-less/less'
  ],
  browserifyOpts = {
    entries: [CLIENT_MAIN],
    transform: ['babelify'],
    builtins: false,
    commondir: false,
    debug: true
  },
  reloadOpts = {
    stream: true
  };


gulp.task('js', function() {
  return browserify(browserifyOpts)
    .bundle()
    .on('error', function(err) {
      gutil.log(c.red('[JS]'), err.toString(), '\n' + err.codeFrame);
//      bs.notify('JS error', err);
      this.emit('end');
    })
    .on('log', gutil.log)
    .pipe(source(DEST_JS_FILE))
    .pipe(gulp.dest(OUTDIR));
//    .pipe(bs.reload(reloadOpts));
});

gulp.task('less', function() {
  return gulp.src(CSS_GLOB)
    .pipe(less({
      paths: LESS_INCLUDES
    }))
    .on('error', function(err) {
      gutil.log(c.red('[CSS]'), err.message);
//      bs.notify('CSS error', err);
      this.emit('end');
    });
//    .pipe(gulp.dest(OUTDIR))
//    .pipe(bs.reload(reloadOpts));
});

gulp.task('html', function() {
  return gulp.src(INDEX_HTML)
    .pipe(gulp.dest(OUTDIR));
//    .pipe(bs.reload(reloadOpts));
});

gulp.task('clean', function(done) {
  return del([OUTDIR], done);
});

gulp.task('watch', function() {
  gulp.watch(`${CLIENT_SRC}/**/*.js`, ['js']);
  gulp.watch(CSS_GLOB, ['less']);
  gulp.watch(INDEX_HTML, ['html']);
});

gulp.task('mocha', ['build', 'browser-sync'], function() {
  process.env.NODE_ENV = process.env.NODE_ENV || "test";
  require('babel/register');
  return gulp.src('test/**/*.js', {
      read: false
    })
    .pipe(mocha({
      require: "babel/register",
      ui: "bdd",
      timeout: "6000",
      reporter: "spec"
    }))
    .once('error', function(err) {
      gutil.log(c.red('[mocha]'), err.message);
      process.exit(1);
    })
    .once('end', function() {
      process.exit();
    });
});

// electron-prebuilt is installed as `node_modules/.bin/electron`
gulp.task('launch', ['build'], function() {
  return gulp
    .src('.')
    .pipe(shell(['electron .' /* --proxy-server=http://localhost:${SERVER_PORT}`*/ ]))
    .once('end', process.exit);
});

gulp.task('build', ['js', 'less', 'html']);
gulp.task('test', ['mocha']);
gulp.task('run', ['build', 'watch', 'launch']);
gulp.task('default', ['run']);
