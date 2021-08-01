const Contest = require('../model/contestSchema');

const change_IST_time = (date) => {
    date.setHours(date.getHours() + 5);
    date.setMinutes(date.getMinutes() + 30);
    return date;
}

const compareDates = async() => {

    const contests = await Contest.find();
    const todayContest = [];

    const today = change_IST_time(new Date());
    // console.log(today);

    contests.forEach(contest => {

        var date = change_IST_time(new Date(`${contest.start} ${contest.start_time}`));

        var diff = today.getTime() - date.getTime()
        // console.log(diff)

        if (diff < 0 && diff > -86400000)
            todayContest.push(contest);

    });

    return todayContest;
}

module.exports = compareDates;


