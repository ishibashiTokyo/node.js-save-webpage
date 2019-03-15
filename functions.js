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

async function scrollToBottom(page, viewportHeight) {
    const getScrollHeight = () => {
        return Promise.resolve(document.documentElement.scrollHeight)
    };

    let scrollHeight = await page.evaluate(getScrollHeight);
    let currentPosition = 0;
    let scrollNumber = 0;

    while (currentPosition < scrollHeight) {
        scrollNumber += 1;
        const nextPosition = scrollNumber * viewportHeight;

        await page.evaluate(
            function (scrollTo) {
                return Promise.resolve(window.scrollTo(0, scrollTo))
            }, nextPosition);

        await page.waitForNavigation({waitUntil: 'networkidle2', timeout: global.scrollDelay})
            .catch(e => console.log('timeout exceed. proceed to next operation'));

        currentPosition = nextPosition;
        console.log(`scrollNumber / currentPosition: ${scrollNumber} / ${currentPosition}`);

        scrollHeight = await page.evaluate(getScrollHeight);
        console.log(`ScrollHeight ${scrollHeight}`);
    }
}

async function pageScrap(url, basicAuth, mode) {

    const launch_options = {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-gpu'
        ]
    };

    const goto_options = {
        timeout: 10000,
        waitUntil: [
            "load",
            "domcontentloaded"
        ]
    };

    const png_options = {
        path: './png/' + urlToFileName(url) + '_' + mode + '.png',
        fullPage: true
    };

    const pdf_options = {
        landscape: false,
        path: './pdf/' + urlToFileName(url) + '_' + mode + '.pdf',
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: false,
        margin: {top: 0, right: 0, bottom: 0, left: 0}
    };

    const browser = await puppeteer.launch(launch_options);
    console.log("chrome version:", await browser.version());

    const page = await browser.newPage();
    if ( mode === 'sp' ) {
        page.setViewport({width: global.spViewportWidth, height: global.spViewportHeight});
    } else {
        page.setViewport({width: global.pcViewportWidth, height: global.pcViewportHeight});
    }

    // BASIC Authentication
    if (basicAuth !== '' && basicAuth !== null && basicAuth !== undefined) {
        await page.setExtraHTTPHeaders({
            Authorization: `Basic ${new Buffer(`${basicAuth}`).toString('base64')}`
        });
    }
    if ( mode === 'sp' ) {
        page.setUserAgent(global.spAgent);
    }

    await page.goto(url, goto_options);

    await sleep(global.sleepTime);

    if ( mode === 'sp' ) {
        await scrollToBottom(page, global.spViewportHeight);
    } else {
        await scrollToBottom(page, global.pcViewportHeight);
    }

    await page.pdf(pdf_options);
    console.log("PDF options\n", pdf_options);

    await page.screenshot(png_options);
    console.log("PNG options\n", png_options);

    await browser.close();
}

module.exports.pageScrap = pageScrap;
