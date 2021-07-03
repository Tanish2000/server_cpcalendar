const puppeter = require('puppeteer');
const FormatDate = require('../utility/FormatDates');
const setEndTime = require('../utility/SetEndtime');



const getLeetcodeData = async () => {
    try {

        var browser = await puppeter.launch({ headless: true });

        var page = await browser.newPage();

        await page.goto('https://leetcode.com/contest/');
        await page.waitForSelector("#contest-app > div > div > div.container > div.row.contest-home-body > div.col-sm-7 > div > div > div.contest-table-base > table")


        var contests = await page.evaluate(() => {

            var result = [];

            var table = document.querySelectorAll('#contest-app > div > div > div.container > div.row.contest-home-body > div.col-sm-7 > div > div > div.contest-table-base > table > tbody.reactable-data > tr');

            table.forEach((ele) => {

                var contest = ele.innerText;

                var details = contest.split('\n');
                var time = details[1].split('at');

                var temp = {};

                temp['platform'] = "Leetcode"
                temp['title'] = details[0];
                temp['start'] = temp['end'] = time[0].trim();
                temp['start_time'] = time[1].trim();
                temp['link'] = 'https://leetcode.com/contest/';
                temp['hex_color'] = "#edaf05"

                result.push(temp)
            })

            const final = { "status": 200, "leetcode_contests": result }

            return final;
        })

        contests["leetcode_contests"].forEach(ele => {
            ele["end"] = ele["start"] = FormatDate(ele["start"]);
            ele["end_time"] = setEndTime(ele["start_time"],"01:30");
        })

        await browser.close();
        return contests;

    } catch (error) {
        return {
            "status": 500,
            "error": error.message
        };
    }
};

module.exports = getLeetcodeData;
// getLeetcodeData().then(res => console.log(res)).catch(err => console.log(err));