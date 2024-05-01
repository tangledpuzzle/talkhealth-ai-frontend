const puppeteer = require("puppeteer");
const { parse } = require('json2csv');
const fs = require("fs");
const _ = require('lodash');

const website_list = [];
(async()=>{
    const browser = await puppeteer.launch({
        headless: false,
        args: ["--start-maximized"],
        timeout: 6000000,
        protocolTimeout: 6000000,
        defaultViewport: null,
      });
    const page = await browser.newPage();

    /// Top All All

    for(let i=1; i<= 10;i++){
        await page.goto(
            `https://www.amazon.com/product-reviews/B099LLV3WN/ref=cm_cr_arp_d_viewopt_srt?ie=UTF8&filterByStar=critical&reviewerType=all_reviews&pageNumber=${i}&sortBy=helpful#reviews-filter-bar`
            );
        await page.waitForSelector('i[data-hook="review-star-rating"]');
        const data  = await page.$$eval('div[data-hook="review"]', elements => elements.map(item => item.innerText));
        data.forEach((item) => {
        text_list = item.split('\n');
        reviewer_id = text_list[0].replace(/\t/g, ``);
        rating_score = text_list[1].match(/(\d+\.\d+)/)[0];
        review_title = text_list[2];
        review_date = text_list[3].match(/(\bJanuary\b|\bFebruary\b|\bMarch\b|\bApril\b|\bMay\b|\bJune\b|\bJuly\b|\bAugust\b|\bSeptember\b|\bOctober\b|\bNovember\b|\bDecember\b)\s\d{1,2},\s\d{4}/)[0];
        review_content = text_list[5];
        website_list.push({"reviewer_id": reviewer_id, "rating_score": rating_score, "review_title": review_title, "review_content":review_content});
        });
    }

    const uniqueList = _.uniqWith(website_list, _.isEqual);
    console.log(uniqueList.length);
    fs.writeFile('data.csv', parse(uniqueList), (err) => {
        if (err) {
          console.error('Error writing file:', err);
        } else {
          console.log('Data has been converted and written to Data.csv');
        }
      });
    browser.close()
})()
