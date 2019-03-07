global.sleepTime = 4000;
var func = require('./functions.js');



if(process.argv[2] === "" || process.argv[2] === null || process.argv[2] === undefined){
    console.log('URLを引数に指定してください。');
    process.exit();
}

const url = process.argv[2];
console.log('URL => ' + url);

func.makePdf(url);
