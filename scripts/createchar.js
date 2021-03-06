'use strict';

const details = require('./getchardetails');
const validation = require('./validation');
const db = require('../db');
const MongoDB = require('mongodb');

exports.createChar = async function(obj){

  let exists = await db.read('character', {"name" : obj.characterName});
  if (exists.error){
    let user = await db.readOne('user', {"_id": new MongoDB.ObjectID(obj.id)});
    let char = await validation.validateCharacter(obj.characterName, user.token);

    if(char){
      let firstOutfit;

      if (char.sex === 'male') {
        firstOutfit = 'citzen-m';
      }
      else {
        firstOutfit = 'citzen-f';
      }
      let character = {
          name: char.name,
          sex: char.sex,
          vocation: char.vocation,
          level: char.level,
          world: char.world,
          guildMembership: char.guildmembership,
          userId: obj.id,
          outfits: [firstOutfit],
          currentOutfit: firstOutfit
      }
      let createChar = await db.create('character', character);
      if (createChar.error){
        return ({error: 'Cant add character'});
      }
      else {
        return (char);
      }
    }
    else{
      return ({error: 'Cant find character activate token'});
    }
  }
  else{
    return ({error: 'Character already exists'});
  }
}
