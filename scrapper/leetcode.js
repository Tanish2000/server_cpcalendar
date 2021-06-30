const puppeter = require('puppeteer');

const getLeetcodeData = async()=> {
    try {

        var browser = await puppeter.launch({headless: true});

        var page = await browser.newPage();

        await page.goto('https://leetcode.com/contest/');
       

        var contests = await page.evaluate(()=>{

            var result = [];

            var table = document.querySelectorAll('#contest-app > div > div > div.container > div.row.contest-home-body > div.col-sm-7 > div > div > div.contest-table-base > table > tbody.reactable-data > tr');
            
            table.forEach((ele)=> {

                var contest = ele.innerText;

                var details = contest.split('\n');
                var time = details[1].split('at');

                var temp = {};

                temp['platform'] = "Leetcode"
                temp['title'] =  details[0]; 
                temp['start'] = temp['end'] = time[0].trim();
                temp['start_time'] = time[1].trim();
                temp['contest_duration'] = details[4];
                temp['link'] = 'https://leetcode.com/contest/';
                temp['hex_color'] = "#edaf05"

                result.push(temp)
            })

            const final = {"status" : 200 , "leetcode_contests" : result}

            return final;
        })
        await browser.close();
        return contests;
        
    } catch (error) {
        return {"status" : 500,
        "message" : error.message };
    }
};

module.exports = getLeetcodeData;