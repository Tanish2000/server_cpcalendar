const convertToISTDate = (date) => {

    var dateUTC = new Date(date);
    var dateIST = new Date(dateUTC.getTime());

    //shifting time for IST timezone (+5hours and 30minutes)
    dateIST.setHours(dateIST.getHours() + 5);
    dateIST.setMinutes(dateIST.getMinutes() + 30);

    return dateIST.toDateString();
}


const FormatDate = (date) => {
    var test_date = new Date(date);
    var ISTdate = convertToISTDate(test_date);

    var sliced_date = ISTdate.split(" ");

    const result = sliced_date[2] + " " + sliced_date[1] + " " + sliced_date[3];
    
    return result;

}

module.exports = FormatDate;

