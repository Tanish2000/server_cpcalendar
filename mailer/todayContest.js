const Contest = require('../model/contestSchema');

const google_calendar_link = ({ title, start, end, start_time, end_time, link, platform }) => {

    var base_url = "https://calendar.google.com/calendar/u/0/r/eventedit?text=";
    var contest_name = title.trim();
    var details = `%5B${platform}%5D - ${title}`;
    var start_date = new Date(`${start} ${start_time}`);
    var end_date = new Date(`${end} ${end_time}`);

    start_date.setHours(start_date.getHours() + 5);
    start_date.setMinutes(start_date.getMinutes() + 30);
    end_date.setHours(end_date.getHours() + 5);
    end_date.setMinutes(end_date.getMinutes() + 30);
    start_date = start_date.toISOString();
    end_date = end_date.toISOString();

    start_date = start_date.slice(0, 10).replace(/-/g, '') + start_date.slice(10, 19).replace(/:/g, '')
    end_date = end_date.slice(0, 10).replace(/-/g, '') + end_date.slice(10, 19).replace(/:/g, '');

    contest_name = contest_name.replace(/#/g, '%23')
    details = details.replace(/#/g, '%23')

    var calendar_url = `${base_url}${contest_name}&location=${link}&details=${details}&dates=${start_date}/${end_date}&trp=false&sf=true`;

    return calendar_url;
}

const change_IST_time = (date) => {
    date.setHours(date.getHours() + 5);
    date.setMinutes(date.getMinutes() + 30);
    return date;
}

const compareDates = async () => {
    try {
        var contests = await Contest.find().lean();
        var todayContest = [];
        var today = change_IST_time(new Date());
        contests.forEach(contest => {
            var date = change_IST_time(new Date(`${contest.start} ${contest.start_time}`));
            var diff = today.getTime() - date.getTime();
            if (diff < 0 && diff > -86400000) {
                todayContest.push(contest);
            }
        });
        var final = [];
        for(var i =0 ; i < todayContest.length ; i++)
        {
            var calendar_link = google_calendar_link(todayContest[i]);
            var temp_contest = todayContest[i];
            temp_contest['google_calendar_link'] = calendar_link;
            final.push(temp_contest);
        }
        // console.log(final.length)
        return final;
    } catch (error) {
        console.log(error);
    }

}

module.exports = compareDates;
// compareDates().then(res => console.log(res)).catch(err => console.log(err))


