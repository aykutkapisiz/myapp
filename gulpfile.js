var gulp = require('gulp'),
uglify = require('gulp-uglify'),
minifyCSS = require('gulp-minify-css'),
concat = require('gulp-concat'),
sass = require('gulp-sass'),
cssmin = require('gulp-cssmin'),
rename = require('gulp-rename');

gulp.task('scripts',function(){
    gulp.src('assets/js/*.js')
        .pipe(uglify())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('assets/js'))
});

gulp.task('sass', function () {
    return gulp.src('assets/css/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('assets/css'));
});

gulp.task('mincss', function () {
    gulp.src('assets/css/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('styles',function(){
    gulp.src('assets/css/*.css')
        .pipe(minifyCSS({keepBreaks : true}))
        .pipe(gulp.dest('assets/css'))
});

gulp.task('watch',function(){
	gulp.watch('assets/js/*.js',['scripts']);
        gulp.watch('assets/css/*.css',['styles']);
});
 
