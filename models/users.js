var mongoose = require('mongoose');
const Double = require('@mongoosejs/double');

var passportLocalMongoose = require('passport-local-mongoose');

var user = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    isAdmin: Boolean,
    gpaSuccess:{type:Number,default:0},
    isTeacher:{type:Boolean,default:0},
    questionAccess: {type: Array, default:0},
    skill:{type:Array},
    createProblem:{type:Boolean,default:1},
    createContest:{type:Boolean,default:1},
    
});

user.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', user);
