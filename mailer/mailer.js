const nodemailer = require('nodemailer');
const today_contest = require("./todayContest");



async function mail_notifications() {

    // Making the contest data to deliver
    const contest = await today_contest();

    const styles = {
        heading: "font-family : Bookman, URW Bookman L, serif; font-size : 24px;",
        link: "font-family : Bookman, URW Bookman L, serif; text-decoration : none",
        button: "padding : 7px; border-radius : 10px;",
        wrapper: "padding : 5px;"
    }

    const html_template = `<div style="${styles.wrapper}">
                                <div>  
                                    <h3 style="${styles.heading}">CpCalendar</h3>
                                    <p style="margin: 5px 10px;font-size : 16px;">
                                        Here is the list of contests that are going to be there today. 
                                    </p>
                                </div>`

    contest.forEach(ele => {

        var contest = `<div style="padding: 5px 10px;">
                            <h3>${ele.title}</h3>
                            <p>From : ${ele.start} ${ele.start_time}</p>
                            <p>To : ${ele.end} ${ele.end_time}</p>
                            <button style="${styles.button}">
                                <a href="${ele.link} style="${styles.link}">Contest Link</a>
                            </button>
                        </div>`
        
        html_template.concat(contest);
    })

    html_template.concat(`</div>`);
    

    // const mailTransporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'hopeplasmaofficial@gmail.com',
    //         pass: 'Mernstack#1'
    //     }
    // });


   

    // const mailDetails = {
    //     from: 'hopeplasmaofficial@gmail.com',
    //     to: 'hopeplasmaofficial@gmail.com',
    //     subject: `CpCalendar - Today's Contest`,
    //     html: html_template
    // };

    // mailTransporter.sendMail(mailDetails, function (err, data) {
    //     if (err) {
    //         console.log('Error Occurs');
    //     } else {
    //         console.log('Email sent successfully');
    //     }
    // });


    console.log(html_template)
}

mail_notifications();



