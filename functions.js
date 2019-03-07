const puppeteer = require('puppeteer');

async function sleep(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

function urlToFileName(url) {
    url = url.replace('http://', '');
    url = url.replace('https://', '');
    url = url.replace(/\?/g, '-');
    return url.replace(/\//g, '-');
}

async function makePdf(url, basicAuth) {
    const launch_options = {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-gpu'
        ]
    }

    const goto_options = {
        timeout: 10000,
        waitUntil: [
            "load",
            "domcontentloaded"
        ]
    }

    const pdf_options = {
        landscape: false,
        path: './pdf/' + urlToFileName(url) + '.pdf',
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: false,
        margin: {top:0, right:0, bottom:0, left:0}
    };

    const browser = await puppeteer.launch(launch_options);
    console.log("chrome version:", await browser.version());

    const page = await browser.newPage();

    if (basicAuth !== '' || basicAuth !== null || basicAuth !== undefined) {
        await page.setExtraHTTPHeaders({
            Authorization: `Basic ${new Buffer(`${basicAuth}`).toString('base64')}`
        });
    }


    await page.goto(url, goto_options);

    await sleep(global.sleepTime);

    await page.pdf(pdf_options);
    console.log("RenderPDF options\n", pdf_options);

    await browser.close();
}



module.exports.makePdf = makePdf;