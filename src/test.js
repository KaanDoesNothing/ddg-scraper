const puppeteer = require("puppeteer");

const scraper = require("./");

(async () => {
    scraper.setBrowser(await puppeteer.launch({headless: true}));

    console.log(await scraper.scrape("this is a test"));
})();