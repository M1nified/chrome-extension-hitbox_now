"use strict";
module.exports = function(grunt){
    
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    var babel = require('babel-core');
    
    var babeloptions = {
        plugins: [
                    ["transform-strict-mode", {
                    "strict": true
                    }],
                    "transform-minify-booleans",
                    "transform-merge-sibling-variables"
                ]
    }
    
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        karma:{
            options:{
                port:9876,
                browsers:['Chrome'],
                frameworks:['jasmine']
            },
            dev : {
                files: [
                    {src : 'src/lib/angular.min.js'},
                    {src : 'src/lib/angular-*.js'},
                    // {src : 'test/**/*.js'},
                    {src : 'test/angular-*.js'},
                    {src : 'src/popup/**.js'},
                    {src : 'src/popup/**/*.js'},
                    {src : 'test/mock.js'}
                ]
            }
        },
        sass:{
            dev:{
                options:{
                    sourceMap:true,
                    outputStyle:'compressed'
                },
                files:[
                    {
                        expand:true,
                        cwd:'src/',
                        src:['popup/popup.scss'],
                        dest:'builds/ext_chrome_dev/',
                        ext:'.css'
                    }
                ]
            },
            chrome:{
                options:{
                    sourceMap:false,
                    outputStyle:'compressed'
                },
                files:[
                    {
                        expand:true,
                        cwd:'src/',
                        src:['popup/popup.scss'],
                        dest:'builds/ext_chrome/',
                        ext:'.css'
                    }
                ]
            }
        },
        copy:{
            chrome:{
                files:[
                    {
                        expand:true,
                        cwd:'src/',
                        src:[
                            'manifest.json',
                            '**/*.html',
                            'lib/*',
                            'img/*'
                        ],
                        dest:'builds/ext_chrome/'
                    }
                ]
            }
        },
        babel:{
            options:{
                plugins : babeloptions.plugins
            },
            chrome:{
                files:[
                    {
                        expand:true,
                        cwd:'src/',
                        src:[
                            'background/background.js',
                            'class/*'
                        ],
                        dest:'builds/ext_chrome/'
                    }
                ]
            }
        },
        concat:{
            options:{
                separator:'\n'
            },
            chrome:{
                options:{
                    process:function(code){
                        return babel.transform(code,{
                            plugins : babeloptions.plugins.slice(1)
                        }).code;
                    }
                },
                files:[
                    {
                        expand:false,
                        src:[
                            'src/popup/app.js',
                            'src/popup/app.routes.js',
                            'src/popup/app.services.js',
                            'src/popup/**/controller.js',
                        ],
                        dest:'builds/ext_chrome/popup/angular.js'
                    },
                    {
                        expand:false,
                        src:[
                            'src/background/background.js',
                            'src/_chrome/background.js'
                        ],
                        dest:'builds/ext_chrome/background/background.js'
                    }
                ]
            }
        },
        watch:{
            options:{
                spawn:false,
                debounceDelay:250,
                atBegin:true
            },
            chrome:{
                files:'src/**/*',
                tasks:[
                    'chrome'
                ]
            }
        }
    })
    
    grunt.registerTask('chrome',[
        'sass:chrome',
        'copy:chrome',
        'babel:chrome',
        'concat:chrome'
    ])
    
}