const puppeter = require('puppeteer');
const FormatDate = require('../utility/FormatDates');
const SetEndtime = require("../utility/SetEndtime");

const getLeetcodeData = async () => {
    try {

        var browser = await puppeter.launch({ headless: true, args: ['--no-sandbox'] }); //initializing puppeter
        var page = await browser.newPage(); //new browser page on chromium

        await page.goto('https://leetcode.com/contest/', { waitUntil: 'load', timeout: 0 }); //opening the contest page in the browser
        await page.waitForSelector("#contest-app > div > div > div.container > div.contest-cards-base > div > div") //waiting for the div to load

        var contests = await page.evaluate(() => {  //extracting contest details from the page
            var result = [];
            var htmlDOM = $(document.querySelectorAll('#contest-app > div > div > div.container > div.contest-cards-base > div > div')).children();  //div that holds contest data
            htmlDOM = htmlDOM.toArray(); //converting DOM to Array 
            htmlDOM.forEach((ele) => {
                var temp = {};
                //extrating all the details for a particular contest
                var contest_data = ele.children[0];
                temp["platform"] = "Leetcode";
                temp["title"] = contest_data.querySelector('.card-title').innerText;
                var contest_details = contest_data.querySelector('.time').innerText;
                temp["start"] = contest_details.split('@')[0].trim();
                temp["end"] = temp["start"];
                var time = contest_details.split('@')[1].trim().slice(0, 17).split('-');
                temp["start_time"] = time[0].trim();
                temp["end_time"] = time[1].trim();
                temp['link'] = "https://leetcode.com/contest/" + temp["title"].trim().replaceAll(" ", "-").toLowerCase();
                temp["hex_color"] = "#edaf05";
                result.push(temp); //pushing object into the result array 
            })
            return result;
        })
        contests.forEach(ele => { //formating date and time  
            ele["end"] = ele["start"] = FormatDate(ele["start"]);
            ele["start_time"] = SetEndtime(ele["start_time"], "05:30");
            ele["end_time"] = SetEndtime(ele["end_time"], "05:30");
        })

        //object that holds the scraped data
        const final_result = {
            "status": 200,
            "leetcode_contests": contests
        }
        await browser.close(); //closing the browser
        return final_result;
    } catch (error) {
        //handling errors
        return {
            "status": 500,
            "error": error.message
        };
    }
};
module.exports = getLeetcodeData;