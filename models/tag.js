var mongoose = require('mongoose');

var tags = new mongoose.Schema({
    tagNames:String,
    tagNameId:String,
    decriptionTag:String,
});

var Tags = mongoose.model('Tags', tags);

module.exports = Tags;
