const puppeter = require('puppeteer');
const FormatDate = require('../utility/FormatDates');

const getLeetcodeData = async () => {
    try {

        var browser = await puppeter.launch({ headless: true, args: ['--no-sandbox'] });

        var page = await browser.newPage();

        await page.goto('https://leetcode.com/contest/' , {waitUntil: 'load', timeout: 0});
        await page.waitForSelector("#contest-app > div > div > div.container > div.contest-cards-base > div > div")


        var contests = await page.evaluate(() => {

            var result = [];

            var htmlDOM = $(document.querySelectorAll('#contest-app > div > div > div.container > div.contest-cards-base > div > div')).children();

            htmlDOM = htmlDOM.toArray(); 
 

            htmlDOM.forEach((ele)=> {
                
                var temp = {};

                var contest_data = ele.children[0];

                temp["platform"] = "Leetcode";
                temp["title"] =  contest_data.querySelector('.card-title').innerText;

                var contest_details = contest_data.querySelector('.time').innerText;

                temp["start"] = contest_details.split('@')[0].trim();;

                temp["end"] = temp["start"];

                var time = contest_details.split('@')[1].trim().slice(0,17).split('-');
 
                temp["start_time"] = time[0];

                temp["end_time"] = time[1];

                temp['link'] = "https://leetcode.com/contest/" + temp["title"].trim().replaceAll(" ","-").toLowerCase();

                temp["hex_color"] = "#edaf05";  

                result.push(temp);

            })

            return result;
        })

        contests.forEach(ele => {
            ele["end"] = ele["start"] = FormatDate(ele["start"]);
        })


        const final_result = {"status" : 200,
        "leetcode_contests"  : contests}

        await browser.close();
        return final_result;

    } catch (error) {
        return {
            "status": 500,
            "error": error.message
        };
    }
};

module.exports = getLeetcodeData;
// getLeetcodeData().then(res => console.log(res)).catch(err => console.log(err));