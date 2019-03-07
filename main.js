global.sleepTime = 4000;
var func = require('./functions.js');

if(process.argv[2] === "" || process.argv[2] === null || process.argv[2] === undefined){
    console.log('Please enter the URL.');
    process.exit();
}

const url = process.argv[2];
const basicAuth = process.argv[3];
console.log('URL => ' + url);

func.makePdf(url, basicAuth);
