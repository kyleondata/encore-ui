var tabs = require('../../../src/tabs/tabs.page').tabs;

describe('layouts', function () {

    describe('detail page', function () {
        before(function () {
            demoPage.go('#/styleguide/layouts/1');
        });

        it('should take several screenshots of the page actions', function () {
            screenshot.snap(this, $('.page-actions'));
        });

        it('should take several screenshots of the metadata', function () {
            screenshot.snap(this, $('.metadata-section'));
        });

        it('should take several screenshots of the data tables', function () {
            screenshot.snap(this, $('.data-section'));
        });

    });

    describe('data table', function () {
        before(function () {
            demoPage.go('#/styleguide/layouts/2');
        });

        it('should take several screenshots of the data table', function () {
            screenshot.snap(this, $('.page-body'));
        });

    });

    describe('create form', function () {
        before(function () {
            demoPage.go('#/styleguide/layouts/3');
        });

        it('should take several screenshots of the form area', function () {
            screenshot.snap(this, $('.form-area'));
        });

        it('should take several screenshots of the first tab area', function () {
            screenshot.snap(this, $('.tab-area'));
        });

        it('should take several screenshots of the second tab area', function () {
            tabs.main.byName('Tab 2').visit();
            screenshot.snap(this, $('.tab-area'));
        });

    });

});
