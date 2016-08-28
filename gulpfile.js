/**
 * Created by wangsheng on 27/8/16.
 */

var gulp = require('gulp');
var ts = require('gulp-typescript');
var webpack = require('webpack-stream');

gulp.task('compileSourceCode', function(){
    var tsProject = ts.createProject('tsconfig.json');
    var result = tsProject.src().pipe(ts(tsProject));
    return result.js.pipe(gulp.dest('js'));
});

gulp.task('packSourceCode', ['compileSourceCode'], function() {
    return gulp.src('js/main.js')
        .pipe(webpack({
            output: {
                filename: 'bundle.js'
            }
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('compile_on_file_change', function() {
    gulp.watch('js/*/*.ts', ['packSourceCode']);
});


gulp.task('compileTestCases', function(){
    var tsProject = ts.createProject('tsconfigForUnitTest.json');
    var result = tsProject.src().pipe(ts(tsProject));
    return result.js.pipe(gulp.dest('test'));
});

gulp.task('packTestCases', ['compileSourceCode', 'compileTestCases'], function() {
    return gulp.src('test/RunAllTests.js')
        .pipe(webpack({
            output: {
                filename: 'bundledTest.js'
            }
        }))
        .pipe(gulp.dest('test/'));
});


gulp.task('default', ['packSourceCode', 'compile_on_file_change']);