module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        systemjs: {
            options: {
                baseURL: "public",
                sfx: true,
                configFile: 'config.js',
                minify: true,
                build: {
                    mangle: true
                },
                sourceMaps: false
            },
            dist: {
                files: [{
                    src: './app/boot.js ',
                    dest: './public/app/boot.js'
                }, {
                    src: './app/app.component.js ',
                    dest: './public/app/app.component.js'
                }]
            }
        }
    });
    grunt.loadNpmTasks("grunt-systemjs-builder");

    // Default task(s).
    grunt.registerTask('default', ['systemjs']);
};