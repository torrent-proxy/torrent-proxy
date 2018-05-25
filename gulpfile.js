var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    useref = require('gulp-useref'),
    gulpIf = require('gulp-if'),
    concat = require('gulp-concat'),
    uglifyJs = require('gulp-uglifyjs'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    runSequence = require('run-sequence'),
    minifyCSS = require('gulp-minify-css');


//Development Tasks
//--------------------
gulp.task('sass', function () {
    return gulp.src('src/sass/**/*.sass')
        .pipe(sass())
        .pipe(autoprefixer([
            'last 10 versions'
        ], {
            cascade: true
        }))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({
            stream : true
        }));
});

//Watchers
//-----------------
gulp.task('watch', ['browserSync'], function() {
    gulp.watch('src/sass/**/*.sass', ['sass']);
    gulp.watch('src/js/**/*.js', browserSync.reload);
    gulp.watch('src/**/*.html', browserSync.reload);
});

// Start browserSync server
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'src'
        },
    })
});


//Optimisation Tasks
//----------------

//Optimising Css and JavaScript
gulp.task('useref', function(){

    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.css', minifyCSS()))
        .pipe(gulpIf('*.js', uglifyJs()))
        .pipe(gulp.dest('build'))
});

gulp.task('min-js', function () {
    return gulp.src('node_modules/angular/angular.js')
        .pipe(concat('angular.min.js'))
        .pipe(uglifyJs())
        .pipe(gulp.dest('src/js'));
});

//Optimising Images
gulp.task('images', function(){
    return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('build/images'))
});

// Copying fonts
gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('build/fonts'))
});

//Copying Minified JS
gulp.task('copy', function () {
    return gulp.src('src/js/*.min.js')
        .pipe(gulp.dest('build/scripts'))
});

// Cleaning
gulp.task('clean', function(callback) {
    del('build');
    return cache.clearAll(callback);
});

gulp.task('clean-dist', function(){
    del(['build/**/*', '!build/images', '!build/images/**/*'])
});


// Build Sequences
// ---------------

//prod version
gulp.task('build', function(callback) {
    runSequence('clean-dist',
        'sass',
        'min-js',
        ['useref', 'copy', 'images', 'fonts'],
        callback);
});

//realtime developing server
gulp.task('dev', function (callback) {
    runSequence(['sass', 'browserSync', 'watch'],
        callback
    )
});

