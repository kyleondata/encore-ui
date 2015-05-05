module.exports = {
    app: 'src',
    build: 'build',
    dist: '<%= config.build %>/dist', // used for js/css files pushed to CDN/bower
    font: '<%= config.dist %>/font',
    docs: 'build', // used for demo, coverage, jsdocs files to go to gh-pages (same a 'build' folder, but a
                   // different variable in case they're later changed)
    exportableStyles: '<%= config.app %>/styles',
    bower: 'bower',
    liveReloadPage: require('connect-livereload')({ port: 1337 }),
    proxyRequest: require('grunt-connect-proxy/lib/utils').proxyRequest,
    modRewrite: require('connect-modrewrite'),
    mountFolder: function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    },
    fileName: 'encore-ui-<%= pkg.version %>',
    fileNameResp: 'encore-ui-resp-<%= pkg.version %>',
    fileNameTpl: 'encore-ui-tpls-<%= pkg.version %>',
    cssMapName: '<%= config.fileName %>.css.map',
    cssMapNameResp: '<%= config.fileNameResp %>.css.map',

    // Will be filled in by shipit task
    latestTag: '',
    moduleName: 'encore.ui',
    modules: [],
    dependencies: ['cfp.hotkeys', 'ui.bootstrap'],
    meta: {
        modules: 'angular.module(\'<%= config.moduleName %>\', [<%= config.srcModules %>, ' +
            '\'<%= config.dependencies.join("\',\'") %>\']);',
        tplmodules: 'angular.module(\'<%= config.moduleName %>.tpls\', [<%= config.tplModules %>]);',
        all: 'angular.module(\'<%= config.moduleName %>\', ' +
            '[\'<%= config.moduleName %>.tpls\', <%= config.srcModules %>, ' +
            '\'<%= config.dependencies.join("\',\'") %>\']);',
        banner: [
            '/*',
            ' * <%= pkg.name %>',
            ' * <%= pkg.homepage %>\n',
            ' * Version: <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
            ' * License: <%= pkg.license %>',
            ' */\n'
        ].join('\n')
    },
    serverHostname: 'localhost',
    serverPort: 9001,
    styleguideCssFilename: 'generated_demo.css',
    styleguideCss: 'demo/assets/<%= config.styleguideCssFilename %>',
    styleguideLess: 'demo/assets/demo.less',
    tmp: '<%= config.build %>/tmp',
    tmpLess: '<%= config.tmp %>/encore-ui.less',
    tmpLessResp: '<%= config.tmp %>/encore-ui-resp.less',
    // http://www.regexr.com/395kl
    versionRegEx: /-(?:\d+\.){2}\d+(?:-\d+)*/g
};
