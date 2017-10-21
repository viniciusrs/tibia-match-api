'use strict';

const validation = require('../scripts/validation');
const db = require('../db');
const cc = require('../scripts/createchar');

exports.get = async function(req, res){
  let char = await db.read('characters', {"userId": req.params.id});
  if (char.erro){
    res.status(400).send(char);
  }
  else {
    res.status(200).send(char);
  }
}

exports.post = async function(req, res) {
  let char = await cc.createChar(req.body);
  if(char.error){
    res.status(400).send(char);
  }
  else {
    res.status(200).send({success : "Created character"});
  }
}
