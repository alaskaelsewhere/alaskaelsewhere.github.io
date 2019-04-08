const gulp = require('gulp');
const browserSync= require('browser-sync');
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");
const ejs = require("gulp-ejs");
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const watch = require( 'gulp-watch' );
const pngquant = require('imagemin-pngquant');
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");


const SRC_PATH = 'src/';
const DST_PATH = 'dist/';
const SRC_SASS = SRC_PATH + 'sass/**/*.scss';
const SRC_CSS = SRC_PATH + 'css/**/*.css';
const DST_CSS_DIR = DST_PATH + 'css/';
const DST_CSS = DST_CSS_DIR + '**/*.css';
const IGNORE_CSS = '!' + SRC_PATH + 'css/**/*.min.css';
const SRC_JS = SRC_PATH + 'js/**/*.js';
const DST_JS_DIR = DST_PATH + 'js/';
const DST_JS = DST_JS_DIR + '**/*.js';
const IGNOR_JS = '!' + SRC_PATH + 'js/**/*.min.js';
const SRC_EJS = SRC_PATH + 'ejs/**/*.ejs';
const IGNORE_EJS= '!' + SRC_PATH + 'ejs/**/_*.ejs';

// browser-sync
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "dist"
    }
  });
});
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// sass
gulp.task('sass', function(){
  gulp.src(SRC_SASS)
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
  	.pipe(autoprefixer())
  	.pipe(cleancss())
  	.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(DST_CSS_DIR));
});

// webpack
gulp.task('webpack', function(){
  webpackStream(webpackConfig, webpack)
    .pipe(plumber({
      errorHandler: function (error) {
      console.log(error.message);
      this.emit('end');
    }}))
    .pipe(gulp.dest(DST_JS_DIR));
});

// imagemin
gulp.task('imagemin', function(){
  gulp.src([SRC_PATH + '**/*.{png,jpg,gif,svg}'], {base: SRC_PATH})
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(imagemin([
      pngquant({
        quality: '65-80',
        speed: 1
      }),
      imagemin.jpegtran({
        quality: 80,
        progressive: true
      }),
      imagemin.svgo(),
      imagemin.optipng(),
      imagemin.gifsicle()
    ]))
    .pipe(gulp.dest(DST_PATH));
});

gulp.task("ejs", function() {
  gulp.src([SRC_EJS, IGNORE_EJS])
    .pipe(plumber())
    .pipe(ejs({}, {}, { ext: '.html' }))
    .pipe(rename({
      extname: ".html"
    }))
    .pipe(gulp.dest(DST_PATH));
});

//watch
gulp.task( 'default', ['browser-sync'] , function () {
  watch([SRC_SASS], function(event){
    gulp.start(['sass']);
  });
  watch([SRC_JS], function(event){
    gulp.start(['webpack']);
  });
  watch([SRC_PATH + '**/*.{png,jpg,gif,svg}'], function(event){
    gulp.start(['imagemin']);
  });
  watch([SRC_EJS], function(event){
    gulp.start(['ejs']);
  });
  watch([DST_PATH + '**/*.css', DST_PATH + '**/*.js', DST_PATH + '**/*.html'], function(event){
    gulp.start(['bs-reload']);
  });
});
