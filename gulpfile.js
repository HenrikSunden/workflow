var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync'); /* import browser sync into gulp file */
var reload = browserSync.reload; /*  */
var autoprefixer = require('gulp-autoprefixer'); /* import gulp autoprefixer */

var SOURCEPATHS = {
	sassSource : 'src/scss/*.scss', /* add everything with .scss */
	htmlSource : 'src/*.html'
}
var APPPATH = {
	root: 'app/',
	css : 'app/css',
	js : 'app/js'
}

/* make taks called "sass" functioning and compiling sass to css, pipe order has to be right */
gulp.task('sass', function(){
	return gulp.src(SOURCEPATHS.sassSource)
		.pipe(autoprefixer())
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) /* expanded can also be nested, compressed or compact */
		.pipe(gulp.dest(APPPATH.css)); /* destination */
});

/* copy all html changes or files from src to app */
gulp.task('copy', function() {
	gulp.src(SOURCEPATHS.htmlSource)
		.pipe(gulp.dest(APPPATH.root))
});

/* run task called "serve" and listen to all css, html, js files. add to browserSync */
gulp.task('serve', ['sass'], function() {
	browserSync.init([APPPATH.css + '/*.css', APPPATH.root + '/*.html', APPPATH.js + '/*.js'], {
		server : {
			baseDir : APPPATH.root
		}
	})
});

/* run task that automatically updates scss files also by browserSync*/
gulp.task('watch', ['serve', 'sass', 'copy'], function() {
	gulp.watch([SOURCEPATHS.sassSource], ['sass']);
	gulp.watch([SOURCEPATHS.htmlSource], ['copy']);
} );

/* run task called default and run also every other task what is in here */
gulp.task('default' , ['watch']);
