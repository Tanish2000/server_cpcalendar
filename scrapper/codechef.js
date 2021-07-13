    const axios = require('axios');

    function tConvert(time) {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    
        if (time.length > 1) { // If time format correct
            time = time.slice(1); // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    }

    async function getCodechefdata()
    {
        try {
            
            const url = "https://www.codechef.com/api/list/contests/all?sort_by=END&sorting_order=desc&offset=0&mode=all";

            const response = await axios({
                method : 'GET',
                url : url
            })

            const data = response.data.future_contests;

            const contests = [];

            var id = 0;

            data.forEach(element => {
                
                var temp = {};
                
                temp["_id"] = ++id;
                temp["platform"] = "Codechef"; 
                temp["title"] = element.contest_name;
                temp["start"] = element.contest_start_date.slice(0,11);
                temp["end"] = element.contest_end_date.slice(0,11);
                temp["start_time"] = tConvert(element.contest_start_date.slice(13,18));
                temp["end_time"] = tConvert(element.contest_end_date.slice(13,18));
                temp["hex_color"] = "#A0522D";
                temp["link"] = `https://www.codechef.com/${element.contest_code}?itm_campaign=contest_listing`

                contests.push(temp);

            });

            const final = {"status" : 200,
            "codechef_contests"  : contests}

            return  final;

        } catch (error) {
            return {"status" : 500,
            "message" : error.message };
        }
    }

    module.exports = getCodechefdata;
    // getCodechefdata().then(res =>  console.log(res)).catch(err=> console.log(err));
    