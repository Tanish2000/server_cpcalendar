    const axios = require('axios');
    const FormateDate = require('../utility/FormatDates');
    const FormatTime = require('../utility/FormatTime');

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
                temp["start"] = element.contest_start_date;
                temp["end"] = element.contest_end_date;
                temp["start_time"] = FormatTime(element.contest_start_date_iso);
                temp["end_time"] = FormatTime(element.contest_end_date_iso);
                temp["hex_color"] = "#0d6efd";
                temp["link"] = "https://www.codechef.com/contests/?itm_medium=navmenu&itm_campaign=allcontests_head"

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