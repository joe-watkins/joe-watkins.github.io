// todo cleanup tasks at bottom

'use strict';

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    appDefaults = require("./config.json"),
    htmlmin = require('gulp-htmlmin');

    // Gulpfile
    function gulpfile(){
      return gulp.src('gulpfile.js')
        .pipe(notify({ message: 'Gulpfile Changed!!' }));
    }

    // Styles
    function styles(){
      return gulp.src(appDefaults.stylesDir+'**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions','ie >= 8'],
            cascade: false
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(appDefaults.stylesDir))
        .pipe(browserSync.stream())
        .pipe(notify({ message: 'Styles task complete' }));
    }

    function minifyHtml(){
      return gulp.src('app.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(rename("index.html"))
        .pipe(gulp.dest('.'))
        .pipe(browserSync.stream())
        .pipe(notify({ message: 'Minified HTML' }));
    };

    // Watch Files For Changes & Reload
    gulp.task('serve', function () {

      browserSync({
        notify: false,
        // proxy: appDefaults.localProxy
        server: {
          baseDir: appDefaults.baseDir
        }
      });

      gulp.watch('app.html', minifyHtml);
      gulp.watch(appDefaults.sassDir+'**/*.scss', styles);
      gulp.watch('gulpfile.js', gulpfile);

    }); // watch


    gulp.task('default', function() {});
