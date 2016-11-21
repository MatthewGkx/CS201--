var Sequelize = require('sequelize');


var sequelize = new Sequelize('postgres', 'postgres', 'gkx1995~~~', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  pool: {
    maxConnections: 5,
    maxIdleTime: 30
  }
});


var results = {};
['community_pg'].forEach(function(modelName) {
  var pth = './models/' + modelName;
  var model = require(pth);
  //
  var Model = sequelize.define(model.name, model.columns, {});
  Model.sync()
    .then(function() {});
  results[modelName] = Model;
});


module.exports = results;

