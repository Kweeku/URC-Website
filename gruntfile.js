'use strict';

module.exports = function(grunt) {
     // Automatically load required Grunt tasks
    require('time-grunt')(grunt);
    
     // Automatically load required Grunt tasks
    require('jit-grunt')(grunt,{
        useminPrepare: 'grunt-usemin'
    });
    
    // Define the configuration for all the tasks
    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'public/css/styles.css': 'public/css/styles.scss',
                    'public/css/owl.theme.default.min.css': 'public/css/owl.theme.default.min.scss',
                    'public/css/aos.css': 'public/css/aos.scss',
                    'public/css/animate.css': 'public/css/animate.scss',
                    'public/css/chat-style.css' : 'public/css/chat-style.scss',
                    'public/css/bootstrap.min.css' : 'public/css/bootstrap.min.scss',
                    'public/css/flaticon.css': 'public/css/flaticon.scss',
                    'public/css/icomoon.css': 'public/css/icomoon.scss',
                    'public/css/ionicons.min.css': 'public/css/ionicons.min.scss',
                    'public/css/magnific-popup.css': 'public/css/magnific-popup.scss',
                    'public/css/open-iconic-bootstrap.min.css':'public/css/open-iconic-bootstrap.min.scss',
                    'public/css/owl.carousel.min.css': 'public/css/owl.carousel.min.scss',
                    'public/css/css/bootstrap-reboot.css': 'public/css/css/bootstrap-reboot.scss',
                    'public/css/css/mixins/text-hide.css': 'public/css/css/mixins/text-hide.scss',
                }
            }
        },
        watch: {
            files: 'css/*.scss',
            tasks: ['sass']
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "./"
                    }
                }
            }
        },
        copy: {
            html: {
                files: [
                {
                    //for html
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]                
            },
            fonts: {
                files: [
                {
                    //for font-awesome
                    expand: true,
                    dot: true,
                    cwd: 'public/fonts',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                }]
            }
        },

        clean: {
            build: {
                src: [ 'dist/']
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: './',                   // Src matches are relative to this path
                    src: ['img/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'dist/'                  // Destination path prefix
                }]
            }
        },
        
        useminPrepare: {
            foo: {
                dest: 'dist',
                src: ['about.html','index.html']
            },
            options: {
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js:['uglify']
                    },
                    post: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function (context, block) {
                            var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0, rebase: false
                                };
                            }       
                        }]
                    }
                }
            }
        },
         // Concat
         concat: {
            options: {
                separator: ';'
            },
  
            // dist configuration is provided by useminPrepare
            dist: {}
        },

        // Uglify
        uglify: {
            // dist configuration is provided by useminPrepare
            dist: {}
        },

        cssmin: {
            dist: {}
        },

        // Filerev
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
  
            release: {
            // filerev:release hashes(md5) all assets (images, js and css )
            // in dist directory
                files: [{
                    src: [
                        'dist/js/*.js',
                        'dist/css/*.css',
                    ]
                }]
            }
        },

        // Usemin
        // Replaces all assets with their revved version in html and css files.
        // options.assetDirs contains the directories for finding the assets
        // according to their relative paths
        usemin: {
            html: ['dist/aboutus.html','dist/index.html'],
            options: {
                assetsDirs: ['dist', 'dist/css','dist/js']
            }
        },

        htmlmin: {                                         // Task
            dist: {                                        // Target
                options: {                                 // Target options
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                    'dist/index.html': 'dist/index.html',  // 'destination': 'source'
                    'dist/about.html': 'dist/about.html',
                }
            }
        }
    });
    grunt.registerTask('css',['sass']);
    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('build', [
      'clean',
      'copy',
      'imagemin',
      'useminPrepare',
      'concat',
      'cssmin',
      'uglify',
      'filerev',
      'usemin',
      'htmlmin'  
    ]);
};