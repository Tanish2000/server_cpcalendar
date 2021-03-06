const mongoose = require('mongoose');

const DB_URI = process.env.DATABASE_URI; // Database URI

async function connect() {  //function for connecting to database
    await mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }).then(() => {
        console.log("Database connection successfull");
    }).catch((err) => {
        console.log("Error: ", err)
    })
}

connect(); //connecting to database