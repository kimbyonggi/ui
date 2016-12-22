/**
 * require 영역
 */

var gulp = require('gulp');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var include = require('gulp-include');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

/**
 * task 정의 영역
 */


// 새로고침 기능
gulp.task('check', function() {
  return gulp.src(['*', 'js/*', 'css/*', 'html/*'])
      .pipe(livereload());
});
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('*', ['check']);
  gulp.watch('js_src/**', ['copy','concat', 'check']);
  gulp.watch('css_scss/**', ['sass', 'check']);
  gulp.watch('html_src/**', ['include', 'check']);
});

// header , footer 분리 - include 기능

gulp.task('include', function(){

  var main = gulp.src(['html_src/*.html'])
      .pipe(include())
      .on('error', console.log)
      .pipe(gulp.dest('html/'));

  var sub = gulp.src(['html_src/sub/*.html'])
      .pipe(include())
      .on('error', console.log)
      .pipe(gulp.dest('html/sub/'));

});

// sass 기능

gulp.task('sass', function(){
  var main = gulp.src('css_scss/*.scss')
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
      .pipe(gulp.dest('css/'));

  var sub = gulp.src('css_scss/_sub/**.scss')
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
      .pipe(gulp.dest('css/sub/'));
});
// concat 기능

gulp.task('concat', function() {
  var main = gulp.src('js_src/*.js')
      .pipe(concat('function.js'))
      .pipe(gulp.dest('js/'));

  var sub = gulp.src('js_src/sub/*.js')
      .pipe(concat('subfunction.js'))
      .pipe(gulp.dest('js/sub/'));
});

// copy 기능

gulp.task('copy', function () {
  return gulp.src('js_src/lib/**')
      .pipe(gulp.dest('js/lib/'));
});
1



/**
 * task 실행 영역
 */


gulp.task('default', ['check', 'watch', 'include', 'sass', 'concat', 'copy']);