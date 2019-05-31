const gulp = require('gulp');
const fs = require('fs');
const less = require('gulp-less');
const cached = require('gulp-cached');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const concat = require('gulp-concat');
const gulpFont2Base64 = require('gulp-font2base64');
const svgcss = require('gulp-svg-css');
const svgmin = require('gulp-svgmin');

const lessSrc = ['./pages/**/*.less', './components/**/*.less', './pages/activity/**/*.less'];
const fontSrc = './fonts/*.ttf';
const svgSrc = './svg/*.svg'; // 需要在项目的根目录预先新建一个svg目录，用来放置创建处理的svg文件
const appcssSrc = './app.css';

/** 
 * 根据根目录下fonts目录下的iconfontjs里面的svg数据生成svg文件
 */
function resolveSvgFromIconfontJs() {
  let iconfontjs = fs.readFileSync('./fonts/iconfont.js', { encoding: 'utf-8' });
  iconfontjs.replace(/<svg>(.*)<\/svg>/, function (match, p1) {
    let svgstr = p1.replace(/symbol/ig, 'svg');
    let svgstrarr = svgstr.match(/<svg .*?(<\/svg>)/ig);

    let xmlns = 'xmlns="http://www.w3.org/2000/svg"'; // iconfontjs里面的svg没有这个命名空间，需要补上才可以显示svg

    svgstrarr.forEach(svg => {
      let newSvg = svg.replace(/id=".*?"/, '$& ' + xmlns);
      newSvg.replace(/id="(.*?)"/, (match, $1) => { // 获取id名作为文件名
        fs.writeFileSync(`./svg/${$1}.svg`, newSvg);
      })
    })
  })
}

gulp.task('less', function () {
  gulp.src(lessSrc)
    .pipe(cached('less'))
    .pipe(less({
      // relativeUrls: true,
      globalVars: {
        lessroot: '"' + __dirname + '"'
      },
      // rootpath: path.resolve(__dirname, './')
    }))
    .pipe(replace(/(\d+)px/g, function (match, p1) {
      // 把px转成rpx
      return Number(p1) * 1 + 'rpx';
    }))
    .pipe(rename(function (path) {
      path.extname = '.acss'
    }))
    .pipe(gulp.dest(function (r) {
      return r.base;
    }));
});

gulp.task('font2', function () {
  gulp.src(fontSrc)
    .pipe(gulpFont2Base64())
    .pipe(gulp.dest('./fonts/'));
});

gulp.task('svg', function () {
  resolveSvgFromIconfontJs();
  gulp.src(svgSrc)
    .pipe(svgmin())
    .pipe(svgcss({
      fileName: 'iconfontsvg',
      cssPrefix: '.svg.svg-',
      addSize: false,
      cssSelector: ' '
    }))
    .pipe(gulp.dest('./fonts/'))
});

gulp.task('concat', ['font2', 'svg'], function () {
  gulp.src(['./app.css', './fonts/iconfont.css', './fonts/iconfont.ttf.css', './fonts/iconfontsvg.css'])
    .pipe(concat('app.acss')) // 支付宝小程序，就为app.acss; 微信小程序, 则为app.wxss
    .pipe(gulp.dest('./'));
})

gulp.task('default', ['concat'], function () {
  gulp.watch(lessSrc, ['less']);
  gulp.watch([fontSrc, appcssSrc], ['concat']);
});