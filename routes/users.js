'use strict';

const db = require('../db');
const MongoDB = require('mongodb');
const signup = require('../scripts/signup');

exports.get = async function(req, res){

  let read;

  if(req.body.id){
    read = await db.read('users', {"_id": new MongoDB.ObjectID(req.body.id)});
  }
  else {
    read = await db.read('user', req.body.login)
  }

  if (read.error){
    res.status(400).send(read);
  }
  else {
    res.send(read);
    }
}

exports.post = async function(req, res) {
  let user = await signup.createUser(req.body);

  if (user.error){
    res.status(400).send(user);
  }
  else {
    let created = await db.create('users', user);
      if (created.error){
        res.status(400).send(created);
      }
      else {
        res.status(200).send(created);
      }
  }
}

exports.delete = async function(req, res){
  let deleted = await db.delete('users', req.body.id);
  if (deleted.error){
    res.status(400).send(deleted)
  }
  else {
    res.status(200).send(deleted);
  }
}

exports.put = async function(req, res){
  let updated = await db.update('users', req.body.id , {$set : req.body.newValue});
  if (updated.error){
    res.status(400).send(updated);
  }
  else {
    res.status(200).send(updated);
  }
}
