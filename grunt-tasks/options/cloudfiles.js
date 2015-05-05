/*jshint node:true*/

module.exports = {
    alpha: {
        'user': '<%= localConfig.cloudUsername %>',
        'key': '<%= localConfig.apiKey %>',
        'region': 'DFW',
        'upload': [{
            'container': 'encore-ui-alpha',
            'src': [
                '<%= config.dist %>/**/*'
            ],
            'dest': '/',
            // Remove '/dist/build/' from path
            'stripcomponents': 2
        }]
    },
    staging: {
        'user': '<%= localConfig.cloudUsername %>',
        'key': '<%= localConfig.apiKey %>',
        'region': 'DFW',
        'upload': [{
            'container': 'encore-ui-staging',
            'src': [
                '<%= config.dist %>/**/*'
            ],
            'dest': '/',
            // Remove '/dist/build/' from path
            'stripcomponents': 2
        }]
    },
    production: {
        'user': '<%= localConfig.cloudUsername %>',
        'key': '<%= localConfig.apiKey %>',
        'region': 'DFW',
        'upload': [{
            'container': 'encore-ui-production',
            'src': [
                '<%= config.dist %>/**/*'
            ],
            'dest': '/',
            // Remove '/dist/build/' from path
            'stripcomponents': 2
        }]
    }
};
