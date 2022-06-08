const FormatTime = require('../utility/FormatTime');
const axios = require('axios');

const getDate = (date) => {
    let date_str = new Date(date);
    let date_arr = date_str.toDateString().split(' ');
    return date_arr[2] +" " + date_arr[1] + " "  + date_arr[3];
}

const getLeetcodeData = async () => {

    try {
        const fetched_data = await axios.get('https://kontests.net/api/v1/leet_code');
        const response = fetched_data.data;
        
        const result = response.map((ele) => {
            const temp_obj = {};
            temp_obj.platform = "Leetcode";
            temp_obj.title = ele.name;
            temp_obj.hex_color = "#edaf05";
            temp_obj.link = "https://leetcode.com/contest/" + ele.name.trim().replaceAll(" ", "-").toLowerCase(); 
            temp_obj.start = getDate(ele.start_time);
            temp_obj.end = getDate(ele.end_time);  
            temp_obj.start_time = FormatTime(ele.start_time);
            temp_obj.end_time = FormatTime(ele.end_time);
            return temp_obj;
        })       
        return {
            "status" : 200,
            "leetcode_contests" : result
        }
    }
    catch(err) 
    {
        return {
            "status" : 500,
            "error" : err.message
        }
    }
    
}

module.exports = getLeetcodeData;