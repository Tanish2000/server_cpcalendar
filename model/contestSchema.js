const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
    _id :{
        type : Number
    },
    platform : {
        type : String
    },
    title : {
        type : String
    },
    start : {
        type : String
    },
    end : {
        type : String
    },
    start_time :{
        type : String
    },
    end_time : {
        type : String
    },
    contest_duration : {
        type : String
    },
    hex_color : {
        type : String
    },
    link : {
        type : String 
    }
});

const contest = mongoose.model( 'contest' , contestSchema);

module.exports = contest;