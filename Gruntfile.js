// Gruntfile.js
// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
exec = require('exec');
//var exec = require('child_process').exec

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
        files: ['source/**/*.js', 'source/**/*.sass', '**/*.html'],
        tasks: ['build'],
        options: {
          debounceDelay: 250,
        },
      },
    },
    callback:{}
  });

grunt.registerTask('callback', 'A sample task that logs stuff.', function() {
    exec('git add . && git commit -m "Update num: ' + Date.now() + ' "', 
      function(err, out, code) {
      if (err instanceof Error)
        throw err;
      process.stdout.write(out);
      process.exit(code);
    });
});




  grunt.event.on('callback', function(action, filepath, target) {
    console.log('foi callback')
  });


  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.registerTask('build', ['browserify', 'sass', 'callback']);
};