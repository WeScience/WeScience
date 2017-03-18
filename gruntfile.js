module.exports = function (grunt) {

// 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            css: {
                src: [
                    'assets/css/main.css'
                ],
                dest: 'static/css/production.css'
            }
        },

        sass: {
            dist: {
                files: {
                    'assets/css/main.css': 'assets/sass/app.scss'
                }
            }
        },

        autoprefixer: {
            production_css: {
                src: 'static/css/production.css'
            }
        },

        cssmin: {
            css: {
                src: 'static/css/production.css',
                dest: 'static/css/production.css'
            }
        },

        browserify: {
            dist: {
                options: {
                    transform: [['babelify', {presets: ['es2015', 'react']}]]
                },
                files: {
                    'static/js/production.js': ['assets/js/app.js']
                }
            }
        },

        uglify: {
            main: {
                files: {
                    'static/js/production.js': ['static/js/production.js'] // we overwrite the min.js file that we created in concat
                }
            },
            options: {
                mangle: false
            }
        },

        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: ['node_modules/font-awesome/fonts/*'],
                        dest: 'static/fonts/',
                        filter: 'isFile',
                        flatten: true
                    }
                ]
            }
        },

        // the watch task doesn't uglify or minify (for development), run grunt again to get full production code
        watch: {
            scripts: {
                files: ['assets/js/**/*.js'],
                tasks: ['browserify'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['assets/sass/**/*.scss', 'assets/css/*.css'],
                tasks: ['sass:dist', 'concat:css', 'autoprefixer:production_css'],
                options: {
                    spawn: false
                }
            },
            img: {
                files: ['assets/img/**'],
                tasks: ['copy'],
                options: {
                    spawn: false
                }
            },
            grunt: {
                files: ['gruntfile.js'],
                tasks: ['reload'],
                options: {
                    spawn: false
                }
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'assets/img',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'static/img'
                }]
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('production', ['copy', 'sass:dist', 'concat', 'browserify', 'uglify', 'cssmin', 'autoprefixer:production_css', 'imagemin']);
    grunt.registerTask('default', ['copy', 'sass:dist', 'concat', 'browserify', 'watch']);
    grunt.registerTask('reload', ['copy', 'sass:dist', 'concat', 'browserify']);

};