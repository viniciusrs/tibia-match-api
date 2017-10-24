'use strict';

const randtoken = require('rand-token');
const db = require('../db');
const sha512 = require('js-sha512');

function validateEmail(email) {
    let mailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return mailRegEx.test(email);
}

exports.createUser = async function(object){
    let exists = await db.read('user', {"login" : object.login});
    if (exists.error){
      if (!validateEmail(object.email)){
        return ( {error: 'Invalid email'} );
      }
      let checkEmail = await db.read('user', {"email" : object.email});
      if (checkEmail.error){
        let salt = randtoken.generate(16);
        let password = sha512(`${object.password}${salt}`);

        let user = { login: object.login,
                     password: password,
                     email: object.email,
                     salt: salt,
                     token: randtoken.generate(64),
                     premium: false,
                     level: 0,
                     reputation: 0,
                     rank: 0,
                     experience: 0,
                     gold: 0
                   };

        return (user);
        
      }
      else {
        return ( {error: 'Email already in use'} );
      }
    }
    else{
      return ( {error : 'User already exists'} );
    }
}
