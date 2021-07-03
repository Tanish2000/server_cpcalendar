function hrs24Tohrs12(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
}

function hrs12Tohrs24(time_given) {

    let [time, modifier] = time_given.split(" ");
    let [hours, minutes] = time.split(":");
    if (hours === "12") {
        hours = "00";
    }
    if (modifier === "PM") {
        hours = parseInt(hours) + 12;
    }
    return `${hours}:${minutes}`;
}




const UpdateEndTime = (start_time, duration) => {

    if (start_time.length == 7) {
        start_time = "0" + start_time;
    }

    const end_time = hrs12Tohrs24(start_time).split(":");
    const duration_ele = duration.split(":");

    const minutes = Number(end_time[1]);
    const duration_minutes = Number(duration_ele[1]);

    const extra_hrs = (minutes + duration_minutes) / 60;

    end_time[1] = ((minutes + duration_minutes) % 60).toString();
    end_time[0] = (Number(end_time[0]) + parseInt(extra_hrs) + parseInt(duration_ele[0])).toString();

    if (end_time[1].length == 1) {
        end_time[1] = "0" + end_time[1];
    }
    if (end_time[0].length == 1) {
        end_time[0] = "0" + end_time[0];
    }   

    if(Number(end_time[0])>24)
    {
        end_time[0] = (Number(end_time[0])%24).toString(); 
        end_time[0].length==1 ? end_time[0] = "0" + end_time[0] : end_time[0];
    }

    const end_time_str = `${end_time[0]}:${end_time[1]}`;

    return (end_time_str === "24:00" ? "12:00 AM" : hrs24Tohrs12(end_time_str))
}

module.exports = UpdateEndTime;


