global.sleepTime = 3000;
global.scrollDelay = 1000;

// WSXGA+
global.pcViewportWidth = 1680;
global.pcViewportHeight = 1050;

// iPhone 6/7/8
global.spViewportWidth = 375;
global.spViewportHeight = 667;
global.spAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1';

const func = require('./functions.js');
const argv = require('argv');

argv.option([
    {
        name: 'list',
        short: 'l',
        type: 'path',
        description: 'URLリストのファイルを指定',
        example: "\"this.js -l url-list.txt\" or \"this.js --list=url-list.txt\""
    },
    {
        name: 'url',
        short: 'u',
        type: 'string',
        description: 'URLを単体で指定',
        example: "\"this.js -u https://siteurl\" or \"this.js --url=https://siteurl\""
    },
    {
        name: 'auth',
        short: 'a',
        type: 'string',
        description: 'BASIC認証のユーザ名とパスワードを指定',
        example: "\"this.js -b 'user:passwd'\" or \"this.js --basic='user:passwd'\""
    },
]);

const args = argv.run();

if ((args.options.url === "" || args.options.url === null || args.options.url === undefined) &&
    (args.options.list === "" || args.options.list === null || args.options.list === undefined)) {
    console.log('Please enter the URL.');
    process.exit();
}


const url = args.options.url;
const basicAuth = args.options.auth;

console.log('URL => ' + url);

func.pageScrap(url, basicAuth, 'sp');
func.pageScrap(url, basicAuth, 'pc');
