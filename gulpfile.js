var gulp = require("gulp");
var browsersify = require("browserify");
var source = require("vinyl-source-stream");
var tsify = require("tsify");
var paths = {
	pages: ['src/*.html']
};

gulp.task("copy-html", function () {
	return gulp.src(paths.pages)
		.pipe(gulp.dest('dist'));
});

gulp.task("default", ["copy-html"], function () {
	return browsersify({
		basedir: '.',
		debug: true,
		entries: ['src/main.ts'],
		cache: {},
		packageCache: {}
	})
		.plugin(tsify)
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('dist'));
});