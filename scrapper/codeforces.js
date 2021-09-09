const cheerio = require('cheerio');
const axios = require('axios');
const FormatDate = require('../utility/FormatDates');
const setEndTime = require('../utility/SetEndtime');

function hrs24Tohrs12(time) {  //function to convert time into 12_hour format
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) { // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
}


async function getCodeforcesData() {
    try {
        const url = "https://codeforces.com/contests";  //url for the Codeforces contest page
        const { data } = await axios({ //getting HTML DOM of the page
            method: 'GET',
            url: url
        })
        const $ = cheerio.load(data);//loading DOM
        var all_trs = $('#pageContent > div.contestList > div.datatable > div:nth-child(6) > table > tbody > tr').toArray(); //div that contains contest data
        var contests = []
        for (let i = 1; i < all_trs.length; i++) {  //
            var all_tds = $(all_trs[i]).children().toArray();
            var temp = {};
            for (let j = 0; j <= 3; j++) {
                const contest_id = $(all_trs[i]).attr("data-contestid");
                if (j == 1) continue;
                temp["platform"] = "Codeforces";
                temp["hex_color"] = "#212529";
                temp["link"] = `https://codeforces.com/contest/${contest_id}`;
                if (j == 0)  //pushing contest title in the object
                {
                    var title = $(all_tds[j]).text().replace(/\n/g, '').trim();
                    title = title.replace(/Enter/g, "")
                    title = title.replace(/»/, "")
                    temp["title"] = title.trim();
                }
                if (j == 2)  //pushing date details in the object
                {
                    temp["start"] = FormatDate($(all_tds[j]).text().trim());
                    temp["end"] = FormatDate($(all_tds[j]).text().trim());
                    var s_time = $(all_tds[j]).text().trim();
                    s_time = hrs24Tohrs12(s_time.slice(12, s_time.length));
                    temp["start_time"] = setEndTime(s_time, "02:30")
                }
                if (j == 3) {
                    const contest_duration = $(all_tds[j]).text().trim();
                    temp["end_time"] = setEndTime(temp["start_time"], contest_duration);
                }
            }
            contests.push(temp); //pushing objct to the array
        }
        //object that holds the scraped data
        const final = {
            "status": 200,
            "codeforces_contests": contests
        }
        return final;
    } catch (error) {
        //handling errors
        return {
            "status": 500,
            "error": error.message
        };
    }
}
module.exports = getCodeforcesData;