//引入资源
const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const cleanCSS = require('gulp-clean-css')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')(require('sass'))
const del = require('del')
const connect = require('gulp-connect')
const path = require('path')
const { createProxyMiddleware } = require('http-proxy-middleware')
// const { resolve } = require('path')
// const { rejects } = require('assert')
//设置资源路径
const paths = {
    html: {
        src: 'src/**/*.html',
        dest: 'dist'
    },
    css: {
        src: 'src/css/**/*.css',
        dest: 'dist/css'
    },
    js: {
        src: 'src/js/**/*.js',
        dest: 'dist/js'
    },
    scss: {
        src: 'src/scss/**/*.scss',
        dest: 'dist/css'
    },
    libs: {
        src: 'src/libs/**/*.*',
        dest: 'dist/libs'
    },
    server: {
        src: 'src/server/**/*.*',
        dest: 'dist/server'
    },
    imgs: {
        src: 'src/images/**/*.*',
        dest: 'dist/images'
    }
}
//定义处理html文件的函数
function html() {
    return gulp.src(paths.html.src)
    //collapseWhitespace是否处理空白html字符，minifyCSS,minifyJS:是否处理HTML中的CSS、JS代码
    .pipe(htmlmin({ collapseWhitespace: true, minifyCSS: true, minifyJS: true }))
    
    .pipe(gulp.dest(paths.html.dest))
    .pipe(connect.reload())
}
function cleanHtml() {
    return del([paths.html.dest+'/**/*.html'])//'**'指文件夹，'*.*'指文件
}

// 处理css文件
function styles(){
    return gulp.src(paths.css.src)
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.css.dest))
    .pipe(connect.reload())
}
//预编译scss文件
function buildScss() {
    return gulp.src(paths.scss.src)
    .pipe(sass({outputStyle: 'compressed'}))//选择编译风格：nested、expanded、compact、compressed
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(connect.reload())
}
function cleanCss() {
    return del([paths.css.dest+'/*'])
}
//转译压缩js
function scripts(){
    return gulp.src(paths.js.src)
    // .pipe(babel({
    //     presets: ['env']
    // }))
    // .pipe(uglify())
    .pipe(gulp.dest(paths.js.dest))
    .pipe(connect.reload())
}
function cleanScripts() {
    return del([paths.js.dest+'/*.js'])
}
//复制无需特殊处理的资源
function copyLibs() {
    return gulp.src(paths.libs.src)
    .pipe(gulp.dest(paths.libs.dest))
    .pipe(connect.reload())
}
function cleanLibs() {
    return del([paths.libs.dest+'/**/*.*'])
}
function copyServer() {
    return gulp.src(paths.server.src)
    .pipe(gulp.dest(paths.server.dest))
    .pipe(connect.reload())
}
function cleanServer() {
    return del([paths.server.dest+'/**/*.*'])
}
function copyImgs() {
    return gulp.src(paths.imgs.src)
    .pipe(gulp.dest(paths.imgs.dest))
    .pipe(connect.reload())
}
function cleanImgs() {
    return del([paths.imgs.dest+'/**/*.*'])
}
//清理dist目录
function clean (){
    return del(['dist'])

}
//定义监视任务,当检测到第一个参数的文件发生变化就执行第二个参数的方法
async function watch() {
    gulp.watch(paths.html.src, gulp.series(cleanHtml, html)).on('error', function (error) {
        console.log(error);
        this.emit('end');//错误处理，emit表示任务结束避免任务卡死
    })
    gulp.watch([paths.css.src, paths.scss.src], gulp.series(cleanCss, styles, buildScss)).on('error', function (error) {
        console.log(error);
        this.emit('end');
    })
    gulp.watch(paths.js.src, gulp.series(cleanScripts, scripts)).on('error', function (error) {
        console.log(error);
        this.emit('end');
    })
    gulp.watch(paths.libs.src, gulp.series(cleanLibs, copyLibs)).on('error', function (error) {
        console.log(error);
        this.emit('end');
    })
    gulp.watch(paths.server.src, gulp.series(cleanServer, copyServer)).on('error', function (error) {
        console.log(error);
        this.emit('end');
    })
    gulp.watch(paths.imgs.src, gulp.series(cleanImgs, copyImgs)).on('error', function (error) {
        console.log(error);
        this.emit('end');
    })
}

// 启动webserver服务器,如果不加async会提示任务未完成
// async function server() {
//      connect.server({
//         root: 'dist',//设置服务器根目录
//         port: 8888, //设置端口
//         livereload: true //server启动时运行livereload
//     })
// }
async function server() {
    connect.server({
      root: 'dist',
      port: 8888,
      livereload: true,
      middleware: () => {
        return [
          // /163/store/api/searchsuggest/get
          // 完整地址：https://music.163.com/163/store/api/searchsuggest/get
          // 真实接口：https://music.163.com/store/api/searchsuggest/get
          createProxyMiddleware('/bilibili', {
            target: 'https://show.bilibili.com', // 代理的目标服务器
            changeOrigin: true, // 跨域
            pathRewrite: {
              '^/bilibili': '',
            },
          })
        ]
      }
    })
  }
//在任务后面添加.pipe(connect.reload()),当任务执行时就会触发浏览器刷新

//形成处理流程
//gulp.series函数中的任务将按顺序依次执行
//gulp.parallel函数中的任务将同时执行
const build = gulp.series(clean, gulp.parallel(html, styles, scripts, buildScss, copyLibs, copyServer, copyImgs, watch, server))


//导出任务
// exports.html = html
// exports.cleanCss = styles
// exports.scripts = scripts
// exports.buildScss = buildScss
// exports.clean = clean
// exports.copyLibs = copyLibs
// exports.copyImgs = copyImgs
// exports.build = build
// exports.watch = watch
// exports.copyimg = copyimg

//默认任务
exports.default = build