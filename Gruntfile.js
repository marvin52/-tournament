// Gruntfile.js
// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      dist: {
        files: {
          'assets/js/bundle.js': ['source/js/app.js']
        }
      }
    },
    sass: {
        options: {
            sourceMap: false
        },
        dist: {
            files: {
                'assets/css/styles.css': 'source/sass/styles.sass'
            }
        }
    },
    watch: {
      scripts: {
        files: ['source/**/*.js', 'source/**/*.sass'],
        tasks: ['build'],
        options: {
          debounceDelay: 250,
        },
      },
    }
  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.registerTask('build', ['browserify', 'sass']);
};