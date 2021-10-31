const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({  //Document schema for user details
   email : {
       type : String
   }
});

const user = mongoose.model( 'user' , UserSchema); //making schema for document

module.exports = user;