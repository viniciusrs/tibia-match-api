'use strict';

const db = require('../db');

exports.get = function(req, res){
  db.read(req, res);
}

exports.post = function(req, res) {
  db.create('users', req.body, res);
}
