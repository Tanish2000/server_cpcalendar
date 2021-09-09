const getCodechefdata = require('./codechef');
const getCodeforcesdata = require('./codeforces');
const getLeetCodeData = require('./leetcode');
const CompareDates = require('../utility/CompareDates');
const Contest = require('../model/contestSchema');

const updateContestData = async () => {  //function that scraps websites and updates the database
    try {
        console.log("Started Updating documents....")
        const codechef_data = await getCodechefdata(); //scraping Codechef contest page
        console.log("Fetched Codechef contests");
        const codeforces_data = await getCodeforcesdata(); //scraping Codeforces contest page
        console.log("Fetched Codeforces contests");
        const leetcode_data = await getLeetCodeData(); //scraping Leetcode contest page
        console.log("Fetched Leetcode contests");

        if (codechef_data['status'] != 200 || codeforces_data['status'] != 200 || leetcode_data['status'] != 200) { //error handling
            if (codeforces_data.error)
                console.log(codeforces_data.error);
            if (codechef_data.error)
                console.log(codechef_data.error)
            if (leetcode_data.error)
                console.log(leetcode_data.error)
            throw ({ "message": "Internal server error", "code": 500 });
        }

        var response = codechef_data['codechef_contests'];
        var idx = response.length;
        var codeforces_contest = codeforces_data['codeforces_contests'];
        var leetcode_contest = leetcode_data['leetcode_contests'];
        codeforces_contest.forEach(contest => {
            contest["_id"] = ++idx; //giving index as a key to each contest
            response.push(contest); //pushing each codeforces contest in the array
        });
        leetcode_contest.forEach(contest => {
            if (CompareDates(contest["start"])) {
                contest["_id"] = ++idx;  //giving index as a key to each contest
                response.push(contest); //pushing each leetcode contest in the array
            }
        });

        const compare = (a,b)=> {  //function to compare two dates 
            return new Date(`${a.start} ${a.start_time}`).getTime() - new Date(`${b.start} ${b.start_time}`).getTime();
        }
        response = response.sort(compare); //sorting contest according their dates
        await Contest.deleteMany({}).then(() => { //deleting previously stored contests
            console.log("Deleted Documents")  
        })
        await Contest.insertMany(response).then(() => {
            console.log("Updated Documents") //adding new contests to the database
        })
    } catch (err) {
        //handling errors
        console.log(err);
    }
}
module.exports = updateContestData;