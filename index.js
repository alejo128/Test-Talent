const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://www.arrivia.com/explore-opportunities/");

    const grabInformation = await page.evaluate(() => { 
        const information = document.querySelectorAll(".job-wrap");
        let informationArr = [];
        information.forEach((quoteTag) => {
            const title = quoteTag.querySelectorAll("div .job-title");
            const actualTitle = title[0];
            const location = quoteTag.querySelectorAll("div .job-location");
            const actualLocation = location[0];
            const URL = quoteTag.querySelectorAll("div .job-element")

            informationArr.push({ 
                title: actualTitle.innerText,
                location: actualLocation.innerText,
                url: URL
            });
        });
        return informationArr;
    });

    console.log(grabInformation);
    await browser.close();
})();