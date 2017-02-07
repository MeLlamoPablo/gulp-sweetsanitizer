"use strict";

/* eslint-disable */
const path             = require("path")
	, gulp             = require("gulp")
	, eslint           = require("gulp-eslint")
	, excludeGitignore = require("gulp-exclude-gitignore")
	, mocha            = require("gulp-mocha")
	, istanbul         = require("gulp-istanbul")
	, nsp              = require("gulp-nsp")
	, plumber          = require("gulp-plumber")
	, coveralls        = require("gulp-coveralls")
	, babel            = require("gulp-babel")
	, del              = require("del")
	, isparta          = require("isparta")
;

// Initialize the babel transpiler so ES2015 files gets compiled
// when they're loaded
require('babel-register');

gulp.task('static', function () {
	return gulp.src('**/*.js')
		.pipe(excludeGitignore())
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('nsp', function (cb) {
	nsp({package: path.resolve('package.json')}, cb);
});

gulp.task('pre-test', function () {
	return gulp.src('lib/**/*.js')
		.pipe(excludeGitignore())
		.pipe(istanbul({
			includeUntested: true,
			instrumenter: isparta.Instrumenter
		}))
		.pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function (cb) {
	let mochaErr;

	gulp.src('./test/index.js')
		.pipe(mocha({reporter: 'spec'}))
		.on('error', function (err) {
			mochaErr = err;
		})
		.pipe(istanbul.writeReports())
		.on('end', function () {
			cb(mochaErr);
		});
});

gulp.task('watch', function () {
	gulp.watch(['lib/**/*.js', 'test/**'], ['test']);
});

gulp.task('coveralls', ['test'], function () {
	if (!process.env.CI) {
		return;
	}

	return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
		.pipe(coveralls());
});

gulp.task('babel', ['clean'], function () {
	return gulp.src('lib/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
	return del('dist');
});

gulp.task('prepublish', ['nsp', 'babel']);
gulp.task('default', ['static', 'test', 'coveralls']);
