var tabs = require('../../../src/tabs/tabs.page').tabs;

describe('layouts', function () {

    describe('details', function () {

        before(function () {
            demoPage.go('#/styleguide/layouts/1');
        });

        it('page actions', function () {
            screenshot.snap(this, $('.page-actions'));
        });

        it('metadata', function () {
            screenshot.snap(this, $('.metadata-section'));
        });

        it('data tables', function () {
            screenshot.snap(this, $('.data-section'));
        });

    });

    describe('data table', function () {
        before(function () {
            demoPage.go('#/styleguide/layouts/2');
        });

        it('full table', function () {
            screenshot.snap(this, $('.page-body'));
        });

    });

    describe('create form', function () {
        before(function () {
            demoPage.go('#/styleguide/layouts/3');
        });

        it('form area', function () {
            screenshot.snap(this, $('.form-area'));
        });

        it('first tab', function () {
            screenshot.snap(this, $('.tab-area'));
        });

        it('second tab', function () {
            tabs.main.byName('Tab 2').visit();
            screenshot.snap(this, $('.tab-area'));
        });

    });

});
