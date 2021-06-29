const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const watch = require('gulp-watch');
const runSequence = require('run-sequence');

gulp.task('watch', function () {
  watch(['src/*.css','src/*.html'], function () {
    runSequence(['minify-css', 'copy-html'])
  });
});

gulp.task('minify-css',function(){
	return gulp.src('src/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-html',function(){
	return gulp.src([
		'src/*.html'])
	.pipe(gulp.dest('dist/'));
});

gulp.task('copy-assets',function(){
	return gulp.src([
		'src/assets/**'])
  .pipe(imagemin())
	.pipe(gulp.dest('dist/assets/'));
});

gulp.task('default', ['minify-css', 'copy-html', 'copy-assets']);

gulp.task('dev', ['watch'])