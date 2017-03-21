var databaseUrl = "mongodb://148.60.11.238:27018/db";
var mongojs = require('mongojs');
var db = mongojs(databaseUrl);

module.exports = db;
