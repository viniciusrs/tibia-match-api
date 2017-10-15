'use strict';

const db = require('../db');
const MongoDB = require('mongodb');

exports.get = function(req, res){
  db.read('users', {"_id": new MongoDB.ObjectID("59e2d9a935fd4e0628d57092")}, res);
}

exports.post = function(req, res) {
  db.create('users', req.body, res);
}

exports.delete = function(req, res){
  db.delete('users', req.body, res);
}

exports.put = function(req, res){
  db.update('users', {"tomi" : "nokuzin"}, {$set : {"tomi" : "turbininha"}}, res);
}
