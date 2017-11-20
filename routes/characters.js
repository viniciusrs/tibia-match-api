'use strict';

const validation = require('../scripts/validation');
const db = require('../db');
const cc = require('../scripts/createchar');
const MongoDB = require('mongodb');

exports.get = async function(req, res){
  let char = await db.read('character', {"userId": req.params.id});
  if (char.erro){
    res.status(400).send(char);
  }
  else {
    res.status(200).send(char);
  }
}

exports.post = async function(req, res) {
  let char = await cc.createChar(req.body);
  if(char.error) {
    res.json(char);
  }
  else {
    let a = await db.read('character', { name: char.name });
    res.json(a[0]);
  }
}

exports.put = async function(req, res) {
  let updated = await db.update('character', {"_id": new MongoDB.ObjectID(req.body.id)}, { $set : req.body.newValues});

  if (updated.error){
    res.status(400).send(updated);
  }
  else {
    res.json(updated);
  }
}