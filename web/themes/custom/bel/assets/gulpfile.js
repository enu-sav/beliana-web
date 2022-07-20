const fabAssemble = require('fabricator-assemble');
const browserSync = require('browser-sync');
const csso = require('gulp-csso');
const del = require('del');
const gulp = require('gulp');
const argv = require('minimist')(process.argv.slice(2));
const log = require('fancy-log');
const gulpif = require('gulp-if');
const pixrem = require('gulp-pixrem');
const imagemin = require('gulp-imagemin');
const prefix = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack');
const sassGlob = require('gulp-sass-glob');
const svgSymbols = require('gulp-svg-symbols');
sass.compiler = require('node-sass');

/**
 * Load configuration
 */
const config = require('./config')(argv);
const webpackConfig = require('./webpack.config')(config);

/**
 * BrowserSync reference
 */
let server = false;

/**
 * BrowserSync Reload
 * @param done
 */
function reload(done) {
  if (server) server.reload();
  done();
}

/**
 * Delete all files in the destination directory
 * @returns {Promise<string[]> | *}
 */
const clean = () => del([`${config.dest}/*`]);

/**
 * Compile fabricator sass
 * @returns {Promise<string[]> | *}
 */

function fabricatorSass() {
	return gulp
		.src(config.styles.fabricator.src)
		.pipe(sourcemaps.init())
        .pipe(
            sass({
              outputStyle: 'compressed',
              includePaths: './node_modules'
            }).on('error', sass.logError)
        )
        .pipe(prefix(config.styles.browsers))
		.pipe(gulpif(!config.dev, csso()))
		.pipe(rename('f.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.styles.fabricator.dest));
}

/**
 * Compile custom sass
 * @returns {Promise<string[]> | *}
 */

function customSass() {
	return gulp
        .src(config.styles.sass.src)
		.pipe(sourcemaps.init({loadMaps: false}))
		.pipe(sassGlob())
		.pipe(
			sass({
				outputStyle: 'compressed',
				includePaths: './node_modules'
			}).on('error', sass.logError)
		)
		.pipe(prefix(config.styles.browsers))
		.pipe(pixrem())
		.pipe(gulpif(!config.dev, csso()))
		.pipe(gulpif(config.dev, sourcemaps.write()))
		.pipe(gulp.dest(config.styles.sass.dest))
}

/**
 * Compile javascript and ES6
 * @returns {Promise<string[]> | *}
 */
function scripts(done) {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      log.error(err());
    }
    const result = stats.toJson();
    if (result.errors.length) {
      result.errors.forEach((error) => {
        log.error(error);
      });
    }
    done();
  });
}

/**
 * Copy files from the libs directory to destination
 * @returns {*}
 */
function copyLibs() {
  return gulp.src(config.libs.src).pipe(gulp.dest(config.libs.dest));
}

/**
 * Copy favicon to destination directory
 * @returns {*}
 */
function imgFavicon() {
  return gulp.src(config.favicon.src).pipe(gulp.dest(config.favicon.dest));
}

/**
 * Minify images
 * @returns {*}
 */
function minifyImages() {
  return gulp
    .src(config.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(config.images.dest));
}

/**
 * Minify SVGs
 * @returns {*}
 */
function minifySVGs() {
  return gulp
    .src(config.svgs.src)
    .pipe(
      imagemin([
        imagemin.svgo({
          plugins: [
            { removeViewBox: false },
            { removeDesc: false },
            { removeTitle: false },
          ],
        }),
      ])
    )
    .pipe(gulp.dest(config.svgs.dest));
}

/**
 * Generates an svg sprite from all .svg files in the svg folder
 * @returns {*}
 */
function SVGSprite() {
  return gulp
    .src(config.svgs.src)
    .pipe(
      svgSymbols({
        id: 'icon--%f',
        svgAttrs: {
          class: 'icon__sprite',
        },
        templates: [config.svgs.tpl]
      })
    )
    .pipe(gulpif(/[.]svg$/, rename('sprite.svg')))
    .pipe(gulpif(/[.]svg$/, gulp.dest(config.svgs.dest)));
}

/**
 * Fabricator assembly
 * @param done
 */
function assembler(done) {
  const { assembler } = config;

  assembler.helpers = {
    // {{ default description "string of content used if description var is undefined" }}
    default: function defaultFn(...args) {
      return args.find((value) => !!value);
    },
    // {{ concat str1 "string 2" }}
    concat: function concat(...args) {
      return args.slice(0, args.length - 1).join('');
    },
    // {{> (dynamicPartial name) }} ---- name = 'nameOfComponent'
    dynamicPartial: function dynamicPartial(name) {
      return name;
    },
    eq: function eq(v1, v2) {
      return v1 === v2;
    },
    ne: function ne(v1, v2) {
      return v1 !== v2;
    },
    and: function and(v1, v2) {
      return v1 && v2;
    },
    or: function or(v1, v2) {
      return v1 || v2;
    },
    not: function not(v1) {
      return !v1;
    },
    gte: function gte(a, b) {
      return +a >= +b;
    },
    lte: function lte(a, b) {
      return +a <= +b;
    },
    plus: function plus(a, b) {
      return +a + +b;
    },
    minus: function minus(a, b) {
      return +a - +b;
    },
    divide: function divide(a, b) {
      return +a / +b;
    },
    multiply: function multiply(a, b) {
      return +a * +b;
    },
    abs: function abs(a) {
      return Math.abs(a);
    },
    mod: function mod(a, b) {
      return +a % +b;
    },
  };

  fabAssemble(assembler);
  done();
}

/**
 * BrowserSync server
 * @param done
 */
function serve(done) {
  server = browserSync.create();
  server.init({
    server: {
      baseDir: config.dest,
    },
    notify: false,
    logPrefix: 'PREVION',
  });
  done();
}

/**
 * Watch files for changes
 */
function watch() {
  gulp.watch(
      config.styles.sass.watch,
      {interval: 500},
      gulp.series(customSass, reload)
  );
  gulp.watch(
      config.styles.fabricator.watch,
      {interval: 500},
      gulp.series(fabricatorSass, reload)
  );
  gulp.watch(
      [
        config.scripts.js.watch,
        config.scripts.es6.watch,
        config.scripts.fabricator.watch,
      ],
      {interval: 500},
      gulp.series(scripts, reload)
  );
  gulp.watch(
    config.images.watch,
    { interval: 500 },
    gulp.series(images, reload)
  );
  gulp.watch(
    config.svgs.watch,
    { interval: 500 },
    gulp.series(minifySVGs, reload)
  );
  gulp.watch(
    config.libs.watch,
    { interval: 500 },
    gulp.series(copyLibs, reload)
  );
  gulp.watch(
    config.templates.watch,
    { interval: 500 },
    gulp.series(assembler, reload)
  );
}

const styles = gulp.parallel(customSass, fabricatorSass);
const imgs = gulp.series(imgFavicon, minifyImages);
const svgs = gulp.series(minifySVGs, SVGSprite);
const images = gulp.parallel(imgs, svgs);
const libs = gulp.series(copyLibs);

gulp.task('build', gulp.series(clean, styles, scripts, images, libs));
gulp.task('clean-dist', clean);
gulp.task('copy-libs', copyLibs);
gulp.task('default', gulp.series(clean, styles, scripts, images, libs, assembler, serve, watch));
gulp.task('minify-images', minifyImages);
gulp.task('minify-svgs', minifySVGs);
gulp.task('svg-sprite', SVGSprite);
gulp.task('watch', watch);
