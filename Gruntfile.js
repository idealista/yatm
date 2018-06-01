module.exports = function(grunt) {
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        jshint : {
            all : ['index.js', 'test/**/*.js'],
            options : grunt.file.readJSON('.jshintrc')
        },
        nodeunit : {
            local : {
                src : ['test/unit/**/*.js']
            },
            ci : {
                src : ['test/unit/**/*.js'],
                options: {
                    reporter: 'junit',
                    reporterOptions : {
                        output : 'reports'
                    }
                }
            }
        },
        esdoc: {
            compile: {
                options: {
                    config: ".esdoc.json"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks("grunt-plugin-esdoc");

    // default task(s)
    grunt.registerTask('default', ['jshint', 'nodeunit:local']);

    // tasks for continuous integration (jenkins)
    grunt.registerTask('jenkins', ['jshint', 'nodeunit:ci']);
};
