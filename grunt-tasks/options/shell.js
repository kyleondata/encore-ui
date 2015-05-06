/*jshint node:true*/
var screenshotRepoTemplate = 'https://${SCREENSHOT_TOKEN}@rackerlabs/encore-ui-screenshots.git';

module.exports = function (grunt) {
    return {
        rxPageObjects: {
            command: 'npm pack',
            options: {
                stdout: true,
                execOptions: {
                    cwd: 'utils/rx-page-objects'
                }
            }
        },

        rxPageObjectsDemoDocs: {
            // run this after running `grunt jsdoc2md:rxPageObjects`
            command: ['mkdir <%= config.docs %>/rx-page-objects;',
                      './node_modules/.bin/marked -i utils/rx-page-objects/API.md',
                      '-o <%= config.docs %>/rx-page-objects/index.html --gfm'].join(' ')
        },

        screenshotsClone: {
            command: ['git submodule add -f', screenshotRepoTemplate, 'screenshots;'].join(' '),
            options: {
                stdout: true
            }
        },

        screenshotsPush: {
            command: ['ENCORE_BRANCH=`git rev-parse --abbrev-ref HEAD`;',
                      'ENCORE_SHA=`git rev-parse HEAD | cut -c-7`;',
                      'cd screenshots; git checkout -b $ENCORE_BRANCH-$ENCORE_SHA;',
                      'git add -A; git commit -m "chore(screenshots): ${TRAVIS_REPO_SLUG}#${TRAVIS_PULL_REQUEST}";',
                      'git push "' + screenshotRepoTemplate + '" $ENCORE_BRANCH'].join(' '),
            options: {
                stdout: true
            }
        },

        npmPublish: {
            command: 'npm publish ./rx-page-objects',
            options: {
                stdout: true,
                execOptions: {
                    cwd: 'utils/'
                }
            }
        },

        // When publishing a fix to an older version, we have to explicitly pass `--tag`
        // and a tagname, otherwise npm will automatically set this version as the `latest`,
        // even though "newer" versions exist
        npmPublishHotFix: {
            command: 'npm publish ./rx-page-objects --tag bugfix-<%= pkg.version %>',
            options: {
                stdout: true,
                execOptions: {
                    cwd: 'utils/'
                }
            }
        },

        latestTag: {
            command: 'git describe --abbrev=0',
            options: {
                callback: function (err, stdout, stderr, cb) {
                    // Replace '\n' to ensure clean output from `git describe`
                    grunt.config('config.latestTag', stdout.replace('\n', ''));
                    cb();
                }
            }
        }
    };
};
