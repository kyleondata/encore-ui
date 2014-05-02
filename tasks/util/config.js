var appName = 'template', appLocalRewrite = {};
appLocalRewrite['/' + appName] = '';

module.exports = {
    app: 'app',
    dist : 'dist',
    ngdocs: 'ngdocs',
    appName: appName,
    appDest: 'dist/' + appName,
    open: {
        hostname: 'localhost',
        port: 9000
    },
    liveReloadPage: require('connect-livereload')({ port: 35729 }),
    proxyRequest: require('grunt-connect-proxy/lib/utils').proxyRequest,
    modRewrite: require('connect-modrewrite'),
    mountFolder : function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    },
    defaultProxies: [
        {
            context: '/' + appName,
            host: 'localhost',
            port: 9000,
            rewrite: appLocalRewrite
        },
        {
            context: '/api/identity',
            // Point to the identity host relevant to the project
            host: 'identity.api.rackspacecloud.com',
            port: 443,
            https: true,
            xforward: true,
            changeOrigin: true,
            rewrite: {
                '/api/identity': '/v2.0'
            }
        },
        {
            context: '/api',
            host: 'localhost',
            port: 3000,
            https: false,
            changeOrigin: false
        }
    ]
};
