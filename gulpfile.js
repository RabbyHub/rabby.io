const fs = require('fs');
const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const tinypng = require('gulp-tinypng');
const watch = require('gulp-watch');
const runSequence = require('run-sequence');
const rev = require('gulp-rev');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');

gulp.task('watch', function () {
  watch(['src/*.css','src/*.html'], function () {
    runSequence(['minify-css', 'compile-index-html'])
  });
});

gulp.task('minify-css',function(){
	return gulp.src('src/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist'))
		.pipe(rev())
		.pipe(gulp.dest('dist'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('dist'));
});

gulp.task('copy-assets',function(){
	return gulp.src([
		'src/assets/**'])
  .pipe(tinypng(process.env.TINY_PNG_KEY))
	.pipe(gulp.dest('dist/assets/'));
});

const handlebarOpts = {
	helpers: {
		assetPath: (path, context) => context.data.root[path]
	}
};

gulp.task('compile-index-html', function() {
	const manifest = JSON.parse(fs.readFileSync('dist/rev-manifest.json', 'utf8'));
	gulp.src('src/index.hbs')
		.pipe(handlebars(manifest, handlebarOpts))
		.pipe(rename('index.html'))
		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['minify-css', 'copy-assets', 'compile-index-html']);

gulp.task('dev', ['watch'])