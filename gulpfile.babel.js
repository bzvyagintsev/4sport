'use strict'

import gulp from 'gulp';
import babel from 'gulp-babel'
import del from 'del';
import stylus from 'gulp-stylus'
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps'
import concat from 'gulp-concat'
import eslint from 'gulp-eslint'
import browserSync from 'browser-sync'
import watch from 'gulp-watch'
import imagemin from 'gulp-imagemin'

gulp.task('styles', function() {
  return gulp.src('src/css/main.styl')
  	.pipe(stylus())
  	.pipe(gulp.dest('public/css'))
});

gulp.task('images', function() {
	return gulp.src('src/img/**/*.*', {since: gulp.lastRun('images')})
		.pipe(imagemin())
		.pipe(gulp.dest('public/img'))
});

gulp.task('html', function() {
	return gulp.src('src/*.html', {since: gulp.lastRun('html')})
		.pipe(gulp.dest('public'))
});

gulp.task('clean', function() {
	return del('public');
});

gulp.task('build', gulp.series('clean', gulp.parallel('styles', 'images', 'html')));

gulp.task('watch', function() {
	gulp.watch('src/css/**/*.*', gulp.series('styles'));
	gulp.watch('src/img/**/*.*', gulp.series('images'));
	gulp.watch('src/*.html', gulp.series('html'));
});


gulp.task('serve', function() {
	browserSync.init({
		server: 'public'
	});
	browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));