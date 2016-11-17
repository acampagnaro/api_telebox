var gulp = require('gulp');
var imageResize = require('gulp-image-resize');

gulp.task('image', function(){
    gulp.src('./public/upload/*.jpg')
        .pipe(imageResize({
            width : 360,
            height : 247,
            crop : true,
            upscale : false
        }))
        .pipe(gulp.dest('public/dest'));
});

gulp.task('default', ['image'],function(){

});