const getCodechefdata = require('./codechef');
const getCodeforcesdata = require('./codeforces');

const Contest = require('../model/contestSchema');


const updateContestData = async () => {

    try {

        const codechef_data = await getCodechefdata();
        const codeforces_data = await getCodeforcesdata();

        if(codechef_data['status']!=200 || codeforces_data['status']!=200)
        {
            if(codeforces_data.message)
                console.log(codeforces_data.message);
            if(codechef_data.message)
                console.log(codechef_data.message)
            throw ({"message" : "Internal server error" , "code":500});
        }

        var response = codechef_data['codechef_contests'];
        var idx = response.length;
        var codeforces_contest = codeforces_data['codeforces_contests'];

        codeforces_contest.forEach(contest => {
            contest["_id"] = ++idx;
            response.push(contest);
        });

        await Contest.deleteMany({}).then(()=> {
            console.log("Deleted Documents")
        })

        await Contest.insertMany(response).then(()=> {
            console.log("Updated Documents")
        })

    } catch (err) {
        console.log(err);
    }  

}

module.exports = updateContestData;