'use strict';

const details = require('./getchardetails');
const validation = require('./validation');
const db = require('../db');
const MongoDB = require('mongodb');

exports.createChar = async function(obj){

  let exists = await db.readOne('characters', {"name" : obj.characterName});
  if (exists.error){
    let user = await db.readOne('users', {"_id": new MongoDB.ObjectID(obj.id)});
    let char = await validation.validateCharacter(obj.characterName, user.token);

    if(char){
      let character = {
          name: char.name,
          sex: char.sex,
          vocation: char.vocation,
          level: char.level,
          world: char.world,
          guildMembership: char.guildmembership,
          userId: obj.id
      }
      let createChar = await db.create('characters', character);
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
