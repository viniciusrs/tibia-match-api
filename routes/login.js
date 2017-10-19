'use strict';

const validation = require('../scripts/validation');
const db = require('../db');
const jwt = require('jsonwebtoken');

exports.post = async function(req, res) {
  let dat = {
    login: "chico",
    password: "tonico"
  }

  let token = jwt.sign({
      data: dat},
      'chicney',
      { expiresIn: '1h' });

      res.json({error:false, token: token});

  //let user = await db.read('users', data);

  // if (!user.error){
  //   let token = jwt.sign({
  //     data: user.login},
  //     'chicney',
  //     { expiresIn: '1h' });
  //     //res.json({error:false, token: token});
  //     console.log(token);
  // }
  // if (user.error === 'Bad Request'){
  //   res.status(400).send({error : "User/pass incorrect"});
  // }
  // else {
  //   res.status(400).send({error : "Something unexpected"});
  // }
}
