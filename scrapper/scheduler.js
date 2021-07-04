const getCodechefdata = require('./codechef');
const getCodeforcesdata = require('./codeforces');
const getLeetCodeData = require('./leetcode');
const CompareDates = require('../utility/CompareDates');

const Contest = require('../model/contestSchema');


const updateContestData = async () => {

    try {

        console.log("Started Updating documents....")
        const codechef_data = await getCodechefdata();
        console.log("Fetched Codechef contests");
        const codeforces_data = await getCodeforcesdata();
        console.log("Fetched Codeforces contests");
        const leetcode_data = await getLeetCodeData();
        console.log("Fetched Leetcode contests");

        if (codechef_data['status'] != 200 || codeforces_data['status'] != 200 || leetcode_data['status'] != 200) {
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
            contest["_id"] = ++idx;
            response.push(contest);
        });

        leetcode_contest.forEach(contest => {
            if (CompareDates(contest["start"])) {
                contest["_id"] = ++idx;
                response.push(contest);
            }
        });

        await Contest.deleteMany({}).then(() => {
            console.log("Deleted Documents")
        })

        await Contest.insertMany(response).then(() => {
            console.log("Updated Documents")
        })

    } catch (err) {
        console.log(err);
    }

}

module.exports = updateContestData;