/*jshint node:true */
module.exports = function (grunt) {
    grunt.registerTask('screenshots:clone', ['shell:screenshotsClone']);
    grunt.registerTask('screenshots:push', ['shell:screenshotsPush']);
    grunt.registerTask('screenshots:pr', ['shell:screenshotsPR']);
};
