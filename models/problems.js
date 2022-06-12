var mongoose = require('mongoose');
const Double = require('@mongoosejs/double');

var prob = new mongoose.Schema({
    qID: Number,
    name: String,
    isVisible:Boolean,
    description: String,
    inputFormat: String,
    outputFormat: String,
    explanation: String,
    difficulty: Number,
    difficultyAutoUpdate:{type:Number,default:0,},
    problemSetter: String,
    timeLimit: Double,
    memoryLimit: Number,
    tags: [String],
    editorial: String,
});
var Problems = mongoose.model('Problems', prob);
module.exports = Problems;
