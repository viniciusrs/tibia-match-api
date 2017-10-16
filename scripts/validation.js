'use strict';
const request = require('request');
const cheerio = require('cheerio');
const details = require('./getchardetails');
const url = 'https://secure.tibia.com/community/?subtopic=characters&name=';

exports.validateCharacter = async function(_character, _token) {
  return new Promise((resolve, reject) => {
    let character = _character;
    let token = _token;

    let options = {
      url: url + character,
      method: 'GET',
      headers: {
          'User-Agent': 'request',
          'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    request(options, (err, response, body) => {
      if(err) {
        resolve(false);
        return;
      }

      let $ = cheerio.load(body);

      let characterDetails = details.getCharacterDetails($);

      if(!characterDetails.comment) {
        resolve(false);
        return;
      }
      else if(characterDetails.comment.indexOf(token) != -1) {
        resolve(characterDetails);
        return;
      }
      else {
        resolve(false);
        return;
      }
    });
  });
}
