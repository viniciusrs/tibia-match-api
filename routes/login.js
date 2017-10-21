'use strict';

const validation = require('../scripts/validation');
const db = require('../db');
const jwt = require('jsonwebtoken');
const sha512 = require('js-sha512');

exports.post = async function(req, res) {

  let user = await db.readOne('users', {"login" : req.body.login});

  if (!user.error){
    let salt = user.salt;
    let password = user.password;
    let pw = sha512(`${req.body.password}${salt}`);
    if (pw === password){
      let token = jwt.sign({
        data: user.login},
        'chicney',
        { expiresIn: '1h' });
        res.json({error:false, token: token});
        return;
    }
    else{
      res.status(400).send({error : "User/pass incorrect"});
      return;
    }
  }
  if (user.error === 'Bad Request'){
    res.status(400).send({error : "User doesnt exists"});
    return;
  }
  else {
    res.status(400).send({error : "Something unexpected"});
    return;
  }
}
