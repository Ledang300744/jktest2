var mongoose = require('mongoose');

var subject = new mongoose.Schema({
    subjectsName:String,
    chapter:[{ChapterName:String,qId:[String]}],
});

var Subjects = mongoose.model('Subjects', subject);

module.exports = Subjects;
