var mongoose = require('mongoose');
const Double = require('@mongoosejs/double');

var pointSubjects = new mongoose.Schema({
    username: String,
    point:{type:Array},
});

var pointSubject = mongoose.model('pointSubjects', pointSubjects);

module.exports = pointSubject;
