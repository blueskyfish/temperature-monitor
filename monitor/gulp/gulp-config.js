/*
 * temperature-monitoring - http://github.com/blueskyfish/temperature-monitor.git
 *
 * The MIT License (MIT)
 * Copyright (c) 2015 BlueSkyFish
 *
 * Distributed on "<%= datetime %> @ <%= target %>" in version <%= version %>
 */

'use strict';

module.exports = {

  // task 'connect'
  connect: {
    rootPaths: [
    ],
    port: 9700,
  },

  // task 'app-scripts'
  appScripts: {
    name: 'application.js',
    minify: 'application.min.js',
    sources: [
      'app/_modules/app.js',
      'app/_modules/**/*-value.js',
      'app/_modules/**/*-const.js',
      'app/_modules/**/*-object.js',
      'app/_modules/**/*-provider.js',
      'app/_modules/**/*-service.js',
      'app/_modules/**/*-util.js',
      'app/_modules/**/*-filter.js',
      'app/_modules/**/*-widget.js',
      'app/_modules/**/*-backend.js',
      'app/_modules/**/*-controller.js',
      'app/_modules/**/*-config.js',
      'app/_modules/**/*-run.js'
    ],
    dest: '/assets/js',
    options: {
      uglify: {
        preserveComments: 'all'
      },
      jshint: {
        laxbreak: true,
        smarttabs: true,
        bitwise: true,
        curly: true,
        eqeqeq: true,
        evil: true,
        es3: true,
        strict: true,
        undef:true,
        latedef: false,
        predef: [
          // insert here the pre defined objects
        ],
        globals: {
          angular: true,
          JSON: true
        }
      }
    }
  },

  // task 'app-images'
  appImages: {
    'sources': [
      'app/assets/images/**/*.{png,svg,jpg,jpeg,gif}'
    ],
    dest: '/assets/images',
    options: {
      imageMin: {
        progressive: true
      }
    }
  },

  // task 'app-styles'
  appStyles: {
    name: 'application.css',
    minify: 'application.min.css',
    sources: [
      'app/_styles/variables.less',
      'app/_styles/mixins.less',
      'app/_styles/basics.less',
      'app/_modules/widgets/**/*.less',
      'app/_modules/views/**/*.less',
      'app/_modules/**/*.less'
    ],
    dest: '/assets/css',
    options: {
      less: {
        paths: ['app']
      },
      miniCSS: {
        keepSpecialComments: 1,
        keepBreaks: true
      }
    }
  },

  // task 'app-style-images'
  appStyleImages: {
    sources: [
      'app/assets/css/images/**/*.{png,svg,jpg,jpeg,gif}'
    ],
    dest: '/assets/css/images',
    options: {
      imageMin: {
        progressive: true
      }
    }
  },

  // task 'app-index'
  appIndex: {
    sources: [
      'app/index.html'
    ],
    dest: '',
    options: {
      htmlMin: {
        collapseWhitespace: true,
        maxLineLength: 200
      }
    }
  },

  // task 'app-templates'
  appTemplates: {
    name: 'templates.js',
    minify: 'templates.min.js',
    sources: [
      'app/_modules/**/*.html'
    ],
    dest: '/assets/js',
    options: {
      htmlMin: {
        collapseWhitespace: true,
        maxLineLength: 200
      },
      templates: {
        //filename: 'templates.js',
        module: 'app.temo',
        standalone: false,
        path: function (path, base) {
          return path.replace(base, '_modules/');
        }
      }

    }
  },

  // task "app-translate"
  appTranslate: {
    sources: [
      'app/_modules/services/translate/lang/*.json'
    ],
    dest: '/assets/i18n'
  },


  // task 'vendor-scripts'
  vendorScripts: {
    name: 'vendors.js',
    minify: 'vendors.min.js',
    sources: [
      //'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-material/angular-material.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js'
    ],
    dest: '/assets/js'
  },

  // task 'vendor-styles'
  vendorStyles: {
    name: 'vendors.css',
    minify: 'vendors.min.css',
    sources: [
      // TODO
      //'bower_components/normalize.css/normalize.css',
      //'bower_components/font-awesome/css/font-awesome.css',
      //'bower_components/angular/angular-csp.css',
      'bower_components/angular-material/angular-material.css'
    ],
    dest: '/assets/css',
    options: {
      minCSS: {
        keepBreaks: true
      }
    }
  },

  // task 'vendor-style-images'
  vendorStyleImages: {
    sources: [
    ],
    dest: '/assets/css/images',
    options: {
      imageMin: {
        progressive: true
      }
    }
  },

  // task 'vendor-fonts'
  vendorFonts: {
    sources: [
      // TODO
      'bower_components/font-awesome/fonts/*.{ttf,woff,woff2,eot,svg}'
    ],
    dest: '/assets/fonts'
  },


  // task 'modernizr'
  modernizr: {
    minify: 'modernizr.min.js',
    sources: [
      'bower_components/modernizr/modernizr.js'
    ],
    dest: '/assets/js'
  },

  // Version Bumping
  version: {
    sources: [
      './package.json',
      './bower.json'
    ],
    dest: './',
    options: {
      bump: {
        type: 'patch'
      }
    }
  },

  // task 'app-archive'
  appArchive: {
    source: '**/*',
    dest: 'dest'
  }

};
