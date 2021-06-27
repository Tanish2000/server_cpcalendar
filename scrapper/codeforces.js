    const cheerio = require('cheerio');
    const axios = require('axios');
    const FormateDate = require('../utility/FormatDates');
    const FormatTime = require('../utility/FormatTime');


    async function getCodeforcesData() {
        try {

            const url = "https://codeforces.com/contests";

            const { data } = await axios({
                method: 'GET',
                url: url
            })



            const $ = cheerio.load(data);

            var all_trs = $('#pageContent > div.contestList > div.datatable > div:nth-child(6) > table > tbody > tr').toArray();

            var contests = []

            for (let i = 1; i < all_trs.length; i++) {

                var all_tds = $(all_trs[i]).children().toArray();
                var temp = {};
                for (let j = 0; j <= 3 ; j++) {

                    if(j==1) continue;

                    temp["platform"] = "Codeforces";
                    temp["hex_color"] = "#212529";
                    temp["link"] = "https://codeforces.com/contests";

                    if(j==0)
                    {
                        var title = $(all_tds[j]).text().replace( /\n/g ,'').trim();
                        title = title.replace(/Enter/g , "")
                        title = title.replace(/»/ , "")
                        temp["title"] = title.trim();
                    }
                        
                    if(j==2)
                    {
                        temp["start"] = $(all_tds[j]).text().trim();
                        temp["end"] = $(all_tds[j]).text().trim();
                        temp["start_time"] = FormatTime($(all_tds[j]).text().trim());
                    }
                        
                    if(j==3)
                        temp["contest_duration"] = $(all_tds[j]).text().trim();               
                    
                }

                contests.push(temp);
            }


            const final = {"status" : 200,
            "codeforces_contests"  : contests}

            return  final;

        } catch (error) {
            return {"status" : 500,
            "message" : error.message };
        }
    }

    module.exports =  getCodeforcesData;