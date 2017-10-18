'use strict';

const validation = require('../scripts/validation');
const db = require('../db');
const jwt = require('jsonwebtoken');

exports.post = async function(req, res) {
  let data = {
    login: req.body.login,
    password: req.body.password
  }

  let user = await db.read('users', data);

  if (!login.error){
    let token = jwt.sign(user, global.config.jwt_secret, {
      expiresIn: 1440 // expires in 1 hour
      });
      res.json({error:false, token: token});
  }
  if (login.error === 'Bad Request'){
    res.status(400).send({error : "User/pass incorrect"});
  }
  else {
    res.status(400).send({error : "Something unexpected"});
  }
}
