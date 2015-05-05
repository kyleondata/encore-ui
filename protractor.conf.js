/*jshint node:true */

var config = {
    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.
    baseUrl: 'http://localhost:9001',

    specs: [
        './src/**/*.midway.js',
        './utils/visual-regression/**/*.midway.js'
    ],

    framework: 'mocha',
    capabilities: {
        browserName: 'firefox'
    },

    allScriptsTimeout: 30000,

    params: {
        environments: {
            'http://localhost:9001': 'localhost',
            'http://rackerlabs.github.io/encore-ui': 'staging'
        }
    },

    onPrepare: function () {
        expect = require('chai').use(require('chai-as-promised')).expect;
        demoPage = require('./utils/demo.page.js');
        browser.driver.manage().window().setSize(1366, 768); // laptop
        screenshot = require('snappit-mocha-protractor');
        screenshot.configure({
            defaultResolutions: [[768, 1024], [1024, 768], // tablet
                                 [320, 568], [568, 320]]  // phone
        });
    },

    // Options to be passed to mocha
    mochaOpts: {
        enableTimeouts: false,
        reporter: 'spec',
        slow: 5000,
        ui: 'bdd'
    },

    seleniumAddress: 'http://localhost:4444/wd/hub'
};

exports.config = config;
