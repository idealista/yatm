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
        jsdoc : {
            dist : {
              src: ['*.js', 'README.md'],
              options: {
                  destination : 'docs',
                     template : "node_modules/ink-docstrap/template",
                    configure : "jsdoc.conf.json"
              }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks("grunt-jsdoc");

    // default task(s)
    grunt.registerTask('default', ['jshint', 'nodeunit:local', 'jsdoc']);

    // tasks for continuous integration (jenkins)
    grunt.registerTask('jenkins', ['jshint', 'nodeunit:ci']);
};
