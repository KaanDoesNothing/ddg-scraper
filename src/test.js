const puppeteer = require("puppeteer");

const scraper = require("./");

(async () => {
    scraper.setBrowser(await puppeteer.launch({headless: true}));

    let date = Date.now();
    console.log(await scraper.scrape("this is a test"));
    console.log(Date.now() - date);
})();