'use strict';

const details = require('./getchardetails');
const validation = require('./validation');
const db = require('../db');

exports.createChar = async function(obj){

  let exists = await db.read('characters', {"name" : obj.characterName});
  if (exists.error){
    let char = await validation.validateCharacter(obj.characterName, obj.token);

    if(char){
      let createChar = await db.create('characters', char);
      if (createChar.error){
        return ({error: 'Cant add character'});
      }
      else {
        return (char);
      }
    }
    else{
      return ({error: 'Cant find token'});
    }
  }
  else{
    return ({error: 'Character already exists'});
  }
}
