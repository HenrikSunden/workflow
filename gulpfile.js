var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync'); /* import browser sync into gulp file */
var reload = browserSync.reload; /*  */

var SOURCEPATHS = {
	sassSource : 'src/scss/*.scss' /* add everything with .scss */
}
var APPPATH = {
	root: 'app/',
	css : 'app/css',
	js : 'app/js'
}

/* make taks called "sass" functioning and compiling sass to css */
gulp.task('sass', function(){
	return gulp.src('SOURCEPATHS.sassSource')
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(gulp.dest('APPPATH.css'))
});

gulp.task('serve', ['sass'], function(){
	browserSync.init ([APPPATH.css + '/*.css', APPPATH.root + '/*.html', APPPATH.js + '/*.js'], {
		server : {
			baseDir : APPPATH.root
		}
	})
});

/* run task that automatically updates scss files also*/
gulp.task('watch', ['serve', 'sass'], function() {
	gulp.watch([SOURCEPATHS.sassSource], ['sass']);
} );

/* run task called default and run also every other task what is in here */
gulp.task('default' , ['watch']);
