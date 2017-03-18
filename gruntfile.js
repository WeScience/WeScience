module.exports = function (grunt) {

// 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            css: {
                src: [
                    'resources/css/main.css'
                ],
                dest: 'public/css/production.css'
            }
        },

        sass: {
            dist: {
                files: {
                    'resources/css/main.css': 'resources/sass/app.scss'
                }
            }
        },

        autoprefixer: {
            production_css: {
                src: 'public/css/production.css'
            }
        },

        cssmin: {
            css: {
                src: 'public/css/production.css',
                dest: 'public/css/production.css'
            }
        },

        browserify: {
            dist: {
                options: {
                    transform: [['babelify', {presets: ['es2015', 'react']}]]
                },
                files: {
                    'public/js/production.js': ['resources/js/app.js']
                }
            }
        },

        uglify: {
            main: {
                files: {
                    'public/js/production.js': ['public/js/production.js'] // we overwrite the min.js file that we created in concat
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
                        dest: 'public/fonts/',
                        filter: 'isFile',
                        flatten: true
                    }
                ]
            }
        },

        // the watch task doesn't uglify or minify (for development), run grunt again to get full production code
        watch: {
            scripts: {
                files: ['resources/js/**/*.js'],
                tasks: ['browserify'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['resources/sass/**/*.scss', 'resources/css/*.css'],
                tasks: ['sass:dist', 'concat:css', 'autoprefixer:production_css'],
                options: {
                    spawn: false
                }
            },
            img: {
                files: ['resources/img/**'],
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
                    cwd: 'resources/img',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'public/img'
                }]
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('production', ['copy', 'sass:dist', 'concat', 'browserify', 'uglify', 'cssmin', 'autoprefixer:production_css', 'imagemin']);
    grunt.registerTask('default', ['copy', 'sass:dist', 'concat', 'browserify', 'watch']);
    grunt.registerTask('reload', ['copy', 'sass:dist', 'concat', 'browserify']);

};