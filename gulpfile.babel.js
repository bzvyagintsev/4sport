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
import gulpIf from 'gulp-if'
import gulpFilter from 'gulp-filter'
import merge from 'merge-stream'

gulp.task('styles', function() {
	const stylFilter = gulpFilter('**/*.styl', {restore: true});

 	return gulp.src('src/css/**/*.*')
 	.pipe(stylFilter)
 	.pipe(stylus())
 	.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
  	.pipe(stylFilter.restore)
  	.pipe(gulp.dest('public/css'))
});

gulp.task('scripts', function() {

	var bundle= gulp.src('src/js/libraries/*.js')
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest('public/js'));

	var main = gulp.src('src/js/main.js')
		.pipe(gulp.dest('public/js'));

	var plugins = gulp.src('src/js/plugins/**/*.js')
		.pipe(gulp.dest('public/js'));

	return merge(main, bundle, plugins)
});

gulp.task('images', function() {
	return gulp.src('src/img/**/*.*', {since: gulp.lastRun('images')})
		.pipe(imagemin())
		.pipe(gulp.dest('public/img'))
});

gulp.task('video', function() {
	return gulp.src('src/video/**/*.*', {since: gulp.lastRun('video')})
		.pipe(gulp.dest('public/video'))
});

gulp.task('html', function() {
	return gulp.src('src/**/*.html', {since: gulp.lastRun('html')})
		.pipe(gulp.dest('public'))
});

gulp.task('fonts', function() {
	return gulp.src('src/fonts/*.*', {since: gulp.lastRun('fonts')})
		.pipe(gulp.dest('public/fonts'))
});

gulp.task('clean', function() {
	return del('public');
});

gulp.task('build', gulp.series('clean', gulp.parallel('styles', 'scripts', 'images', 'video', 'html', 'fonts')));

gulp.task('watch', function() {
	gulp.watch('src/css/**/*.*', gulp.series('styles'));
	gulp.watch('src/js/**/*.*', gulp.series('scripts'));
	gulp.watch('src/img/**/*.*', gulp.series('images'));
	gulp.watch('src/*.html', gulp.series('html'));
	gulp.watch('src/fonts/*.*', gulp.series('fonts'));
	gulp.watch('src/video/*.*', gulp.series('video'));

});


gulp.task('serve', function() {
	browserSync.init({
		server: 'public'
	});
	browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));