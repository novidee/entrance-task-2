const gulp = require(`gulp`);
const less = require(`gulp-less`);
const plumber = require(`gulp-plumber`);
const csso = require(`gulp-csso`);
const postcss = require(`gulp-postcss`);
const rename = require(`gulp-rename`);
const twig = require(`gulp-twig`);
const concat = require(`gulp-concat`);
const uglify = require(`gulp-uglify`);
const imagemin = require(`gulp-imagemin`);
const autoprefixer = require(`autoprefixer`);
const del = require(`del`);

const NpmImportPlugin = require(`less-plugin-npm-import`);

const server = require(`browser-sync`).create();
const run = require(`run-sequence`);

const SOURCE_PATH = `source`;
const BUILD_PATH = `build`;

gulp.task(`build`, () => {
  return run(
    `clean`,
    `images`,
    `templates`,
    `styles`,
    `scripts`
  );
});

gulp.task(`development`, () => {
  return run(
    `build`,
    `server`,
    `watch`
  );
});

gulp.task(`server`, () => {
  server.init({
    server: BUILD_PATH,
    notify: false,
    cors: true,
    open: false,
    ui: false
  });
});

gulp.task(`watch`, () => {
  gulp.watch(`${SOURCE_PATH}/styles/**/*.less`, [`styles`]);
  gulp.watch(`${SOURCE_PATH}/scripts/**/*.js`, [`scripts`]);
  gulp.watch(`${SOURCE_PATH}/templates/**/*.twig`, [`templates`]).on(`change`, server.reload);
  gulp.watch(`${SOURCE_PATH}/images/**/*.{png,jpg,svg}`, [`images`]);
});

gulp.task(`styles`, () => {
  return gulp
    .src(`${SOURCE_PATH}/styles/style.less`)
    .pipe(plumber())
    .pipe(less({
        plugins: [new NpmImportPlugin({prefix: '~'})]
    }))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename(`style.min.css`))
    .pipe(gulp.dest(`${BUILD_PATH}/styles`));
});

gulp.task(`scripts`, () => {
  return gulp
    .src(`${SOURCE_PATH}/scripts/*.js`)
    .pipe(plumber())
    .pipe(concat(`script.js`))
    .pipe(uglify())
    .pipe(rename(`script.min.js`))
    .pipe(gulp.dest(`${BUILD_PATH}/scripts`));
});

gulp.task(`templates`, () => {
  return gulp
    .src(`${SOURCE_PATH}/templates/*.twig`)
    .pipe(plumber())
    .pipe(twig())
    .pipe(gulp.dest(BUILD_PATH));
});

gulp.task(`images`, () => {
  return gulp
    .src(`${SOURCE_PATH}/images/**/*.{png,jpg,svg}`)
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest(`${BUILD_PATH}/images`));
});

gulp.task(`clean`, () => {
  return del(BUILD_PATH);
});
