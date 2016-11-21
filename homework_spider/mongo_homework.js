var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hospital');


var Community = require('./models/community_homework')

module.exports = {

  community: Community
};