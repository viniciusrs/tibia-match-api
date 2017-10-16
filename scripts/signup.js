'use strict';

const randtoken = require('rand-token');
const db = require('../db');

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

      let user = { login: object.login,
                   password: object.password,
                   email: object.email,
                   token: randtoken.generate(64)
                 };

      return (user);

    }
    else{
      return ( {error : 'User already exists'} );
    }
}
