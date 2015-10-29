var gulp = require('gulp'),
    connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');
 
gulp.task('prefix', function () {
    return gulp.src('spoonfed/app/styles/flexbox.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('spoonfed/app/styles'));
});

gulp.task('serve', function() {
    connect.server({
        root: [__dirname],
        port: 7000,
        livereload: true
    });
});