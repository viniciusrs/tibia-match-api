'use strict';

const randtoken = require('rand-token');
const db = require('../db');
const sha512 = require('sha512')

function validateEmail(email) {
    let mailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return mailRegEx.test(email);
}

exports.createUser = async function(object){
    let exists = await db.read('users', {"login" : object.login});
    if (exists.error){
      if (!validateEmail(object.email)){
        return ( {error: 'Invalid email '} );
      }

      let salt = randtoken.generate(16);
      console.log(salt);
      console.log(object.password);
      console.log(`${object.password}${salt}`);
      let password = sha512("toni");
      console.log(password);

      let user = { login: object.login,
                   password: password,
                   email: object.email,
                   token: randtoken.generate(64),
                   salt: salt
                 };

      return (user);

    }
    else{
      return ( {error : 'User already exists'} );
    }
}
