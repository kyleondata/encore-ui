/*jshint node:true*/
var https = require('https');

var repoLink = process.argv[2];
var branchName = process.argv[3];

var data = {
    title: 'Screenshots for ' + repoLink,
    body: 'See ' + repoLink,
    base: 'master',
    head: branchName
};

var options = {
    hostname: 'api.github.com',
    path: '/repos/rackerlabs/encore-ui-screenshots/pulls',
    method: 'POST',
    headers: {
        'User-Agent': 'EncoreUI-Screenshots',
        'Content-Type': 'application/json',
        'Authorization': 'token ' + process.env.ghToken
    }
};

var req = https.request(options, function (res) {
    if (res.statusCode !== 201) {
        process.exit(1);
    }
});

req.write(JSON.stringify(data));

req.end();
