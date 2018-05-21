const LessAutoprefix = require('less-plugin-autoprefix');

module.exports = {
  host: '127.0.0.1',
  port: 5386,

  // Build path name
  buildPath: 'dist',

  /**
   * Sass compile output style
   *
   * See http://sass-lang.com/documentation/file.SASS_REFERENCE.html#output_style
   */
  sassOptions: {
    outputStyle: 'expanded'
  },

  /**
   * Autoprefixer
   *
   * See https://github.com/browserslist/browserslist#full-list
   *
   * Browsers list config can reference here:
   * https://github.com/browserslist/browserslist#full-list
   */
  autoprefixerOptions: {
    browsers: ['last 10 versions']
  },

  /**
   * Less compile options
   *
   * See https://github.com/stevelacy/gulp-less#options
   */
  lessOptions: {
    paths: [
      './src/less',
      './src/less/modules'
    ],
    plugins: [
      new LessAutoprefix({ browsers: ['last 10 versions'] })
    ],
    relativeUrls: true
  },

  /**
   * Sprite generate options
   *
   * See https://github.com/twolfson/gulp.spritesmith#spritesmithparams
   */
  spriteOptions: {
    imgName: 'sprite.png',
    cssName: '_sprite.scss',
    algorithm: 'binary-tree',
    imgPath: '../assets/images/sprite.png',
    imgOpts: {
      quality: 60
    }
  },

  // Should enable the proxy
  isProxy: false,

  // Common path under API requests
  proxyPath: '/api',

  /**
   * Proxy options
   *
   * See https://github.com/chimurai/http-proxy-middleware#http-proxy-options
   */
  proxyOptions: {

    // API host
    target: 'http://qa.wechat.d1m.cn',
    changeOrigin: true,
    logLevel: 'debug'
  }
}
