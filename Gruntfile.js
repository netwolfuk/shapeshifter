module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js','src/**/*.mjs'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.test.js'],
      options: {
        // options here to override JSHint defaults
        esversion: 6,
        globals: {
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    },
copy: {
  main: {
    files: [
      // includes files within path and its sub-directories
      {expand: true, cwd: 'src', src: ['**'], dest: 'docs/js/'},
      {expand: true, cwd: 'public', src: ['**'], dest: 'docs/'},
      {expand: true, cwd: 'test', src: ['**'], dest: 'docs/test/'},
    ],
  },
},
    run: {
      options: {
        // ...
      },
      npm_test_jest: {
        exec: 'npm run test' // <-- use the exec key.
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-run');

  grunt.registerTask('test', ['jshint', 'run:npm_test_jest', 'qunit']);

  grunt.registerTask('default', ['jshint', 'copy' ]);

};
