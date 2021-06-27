const FormatDates = ( date )=> {

    var dateUTC = new Date(date);
    var dateUTC = dateUTC.getTime() 
    var dateIST = new Date(dateUTC);

    //date shifting for IST timezone (+5 hours and 30 minutes)
    dateIST.setHours(dateIST.getHours() + 5); 
    dateIST.setMinutes(dateIST.getMinutes() + 30);

    dateIST = dateIST.toJSON().slice(0,10);
    return dateIST;
}

module.exports = FormatDates;
