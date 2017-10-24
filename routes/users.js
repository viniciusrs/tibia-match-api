'use strict';

const db = require('../db');
const signup = require('../scripts/signup');

exports.get = async function(req, res){
    let users = await db.read('user',{});

    if (users.error){
      res.status(400).send(users);
    }
    else {
      res.send(users);
    }
}

exports.post = async function(req, res) {
  let user = await signup.createUser(req.body);

  if (user.error){
    res.status(400).send(user);
  }
  else {
    let created = await db.create('user', user);
      if (created.error){
        res.status(400).send(created);
      }
      else {
        res.status(200).send(created);
      }
  }
}

exports.put = async function(req, res){
  let updated = await db.update('user', req.body.id , {$set : req.body.newValue});
  if (updated.error){
    res.status(400).send(updated);
  }
  else {
    res.status(200).send(updated);
  }
}
