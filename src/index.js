let browser;

module.exports.setBrowser = (browserInstance) => {
    browser = browserInstance
}

module.exports.scrape = async (text) => {
    const page = await browser.newPage();

    await page.goto(`https://duckduckgo.com/?q=${text}&kp=1&ia=web`);
    let hasLoadedAllResults = false;

    while(hasLoadedAllResults !== true) {
        try {
            let buttonExists = await page.waitForSelector(`.result--more__btn`, {timeout: 1000});

            await page.click(`.result--more__btn`);
        }catch(err) {
            hasLoadedAllResults = true;
        }
    }

    let results = await page.evaluate(() => {
        let results = [];

        let elements = document.querySelectorAll(".result__body");

        for (let element in elements) {
            element = elements[element];

            if(element.querySelector) {
                let title = element.querySelector(".result__title").innerText;
                let snippet = element.querySelector(".result__snippet").innerText;
                let icon = element.querySelector(".result__icon__img").getAttribute("data-src");
                let url = element.querySelector(".result__url").href;

                results.push({
                    title,
                    snippet,
                    icon,
                    url
                });
            }
        }

        return results;
    });

    await page.close();

    return results;
}