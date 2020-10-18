//connect to test Db
const mongoose = require('mongoose');
mongoose.connect(process.env.testDatabaseURI)
    //include the User Model 
const User = require('./../models/usersModel')