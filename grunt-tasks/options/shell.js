/*jshint node:true*/

// keep a fork for screenshots since Travis has to clone the submodule every time
// if every PR builds a new branch and makes a new PR, the screenshot count can grow very large
// this way, the only screenshots that are pulled in are the ones merged into master
//  and all of the stale stuff that never got merged sits in a fork somewhere
var screenshotPullTemplate = 'https://' + process.env.ghToken + '@github.com/rackerlabs/encore-ui-screenshots.git';
var screenshotPushTemplate = 'https://' + process.env.ghToken + '@github.com/comeatmebro/encore-ui-screenshots.git';

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
            command: ['[ ${TRAVIS_SECURE_ENV_VARS} = "true" ] &&',
                      'git submodule add -f', screenshotPullTemplate, 'screenshots;'].join(' '),
            options: {
                stdout: false
            }
        },

        screenshotsPush: {
            command: ['[ ${TRAVIS_SECURE_ENV_VARS} = "false" ] && exit 0;',
                      '[ ${TRAVIS_BRANCH} = "false" ] && exit 0;',
                      'ENCORE_SHA=`git rev-parse HEAD | cut -c-7`;',
                      'BRANCH=${TRAVIS_BRANCH}-$ENCORE_SHA;',
                      'cd screenshots; git checkout -b $BRANCH;',
                      'git config user.email "freddy.knuth@rackspace.com";',
                      'git config user.name "comeatmebro";',
                      'git add -A; git commit -m "chore(screenshots): ${TRAVIS_REPO_SLUG}#${TRAVIS_PULL_REQUEST}";',
                      'git push "' + screenshotPushTemplate + '" $BRANCH'].join(' '),
            options: {
                stdout: false
            }
        },

        screenshotsPR: {
            command: ['[ ${TRAVIS_SECURE_ENV_VARS} = "false" ] && exit 0;',
                      '[ ${TRAVIS_BRANCH} = "false" ] && exit 0;',
                      'ENCORE_SHA=`git rev-parse HEAD | cut -c-7`;',
                      'BRANCH=${TRAVIS_BRANCH}-$ENCORE_SHA;',
                      'node utils/screenshots-pr.js',
                      '${TRAVIS_REPO_SLUG}#${TRAVIS_PULL_REQUEST} comeatmebro:$BRANCH;'].join(' ')
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
