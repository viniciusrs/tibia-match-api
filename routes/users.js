'use strict';

const db = require('../db');
const MongoDB = require('mongodb');
const signup = require('../scripts/signup');

exports.get = async function(req, res){
  let read = await db.read('users', {"tonicola":"turbinina"});
  if (read.error){
    res.status(400).send(read);
  }
  else {
    res.send(read);
    }
}

exports.post = async function(req, res) {
  let user = await signup.createUser(req.body);
  var created = await db.create('users', req.body);
  if (created.error){
    res.status(400).send(created);
  }
  else {
    res.status(200).send(created);
  }
}

exports.delete = async function(req, res){
  let deleted = await db.delete('users', req.body);
  if (deleted.error){
    res.status(400).send(deleted)
  }
  else {
    res.status(200).send(deleted);
  }
}

exports.put = async function(req, res){
  let updated = await db.update('users', {"tonicola" : "turbi22ninha"}, {$set : {"tonicola" : "aaaaa"}});
  if (updated.error){
    res.status(400).send(updated);
  }
  else {
    res.status(200).send(updated);
  }
}
