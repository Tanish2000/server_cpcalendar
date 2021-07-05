const convertToISTDate = (date) => {

    var dateUTC = new Date(date);
    var dateIST = new Date(dateUTC.getTime());

    //shifting time for IST timezone (+5hours and 30minutes)
    dateIST.setHours(dateIST.getHours() + 5);
    dateIST.setMinutes(dateIST.getMinutes() + 30);

    return dateIST;
}

const CompareDates = (givenDate) => {
    var today = new Date();
    today = convertToISTDate(today); // converting to IST zone
    
    var tocheck = new Date(givenDate);
    tocheck = convertToISTDate(tocheck);

    const m_sec = tocheck.getTime() - today.getTime();

    return m_sec>=-86400000? 1 : 0; //864000000 is the no of mili seconds in a day
}
// console.log(CompareDates("04 Jul 2021"));

module.exports = CompareDates;

