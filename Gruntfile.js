module.exports = function(grunt){
    
    grunt.loadNpmTasks('grunt-karma');
    
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        karma:{
            options:{
                port:9876,
                browsers:['Chrome'],
                frameworks:['jasmine']
            },
            src : {
                files: [
                    {src : 'src/lib/angular.min.js'},
                    {src : 'src/lib/angular-*.js'},
                    {src : 'test/**/*.js'},
                    {src : 'src/popup/**.js'},
                    {src : 'src/popup/**/*.js'}
                ]
            }
        }
    })
}