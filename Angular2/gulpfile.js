/// <binding />

var gulp = require("gulp"),
    extreplace = require('gulp-ext-replace'),
    typescript = require('gulp-typescript'),
    less = require("gulp-less"),
    rename = require("gulp-rename"),
    minifyCss = require("gulp-minify-css"),    //壓縮css
    minifyHtml = require("gulp-minify-html"),  //壓縮html
    concat = require("gulp-concat"),    //合併js文件
    uglify = require("gulp-uglify"),    //壓縮js代碼
    cache = require("gulp-cache");    //圖片緩存，只有圖片替換了才壓縮

var tsProject = typescript.createProject('tsconfig.json');

//less
gulp.task("less", function () {
    return gulp.src("src/less/**/*.less")  //原文件
    .pipe(less())
    .pipe(rename({ suffix: '.min' }))  
    .pipe(minifyCss())
    .pipe(gulp.dest("assets/css"));        //目標目錄
});
//壓縮css
gulp.task("minify-css", function () {
    return gulp.src("src/css/**/*.css")  //原文件
    .pipe(rename({ suffix: '.min' }))  //在原文件名後面加.min
    .pipe(minifyCss())
    .pipe(gulp.dest("assets/css"));        //目標目錄
});
//壓縮js
gulp.task("uglify", function () {
    return gulp.src("src/js/**/*.js")
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest("assets/js"))
});
gulp.task('buildts', function () {
    return gulp.src("src/ts/**/*.ts")
        .pipe(rename({ suffix: '.min' }))
        .pipe(typescript(tsProject))
        .pipe(uglify())
        .pipe(extreplace('.js'))
        .pipe(gulp.dest("assets/js"));
});
gulp.task('buildtsapp', function () {
    return gulp.src("src/app/**/*.ts")
        //.pipe(typescript(appTsProject))
        .pipe(uglify())
        .pipe(extreplace('.js'))
        .pipe(gulp.dest("assets/app"));
});

//合併css
//gulp.task("bootstrapcss", function () {
//    return gulp.src("src/cless/bootstrap/**/*.less")
//    .pipe(less())
//    .pipe(concat('bootstrap.css'))
//    .pipe(minifyCss())
//    .pipe(gulp.dest("assets/css"))
//});

//合併js
//gulp.task("concatjs", function () {
//    return gulp.src("src/js/**/*.js")
//    .pipe(concat('all.js'))
//    .pipe(uglify())
//    .pipe(gulp.dest("assets/js"))
//});

//默認任務，後面為默認執行的所有任務
gulp.task("default", ["less", "minify-css", "uglify", "buildts", "buildtsapp", "watchl"]);   //執行defaul

//監聽文件
gulp.task("watchl", function () {
    gulp.watch("src/less/**/*.less", ["less"]);
    gulp.watch("src/css/**/*.css", ["inify-css"]);
    gulp.watch("src/js/**/*.js", ["uglify"]);
    gulp.watch("src/ts/**/*.ts", ["buildts"]);
    gulp.watch("src/app/**/*.ts", ["buildtsapp"]);
});