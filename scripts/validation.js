'use strict';
const request = require('request');
const cheerio = require('cheerio');
const url = 'https://secure.tibia.com/community/?subtopic=characters&name=';

exports.validateCharacter = async function(_character, _token) {
  return new Promise((resolve, reject) => {
    var character = _character;
    var token = _token;

    var options = {
      url: url + character,
      method: 'GET',
      headers: {
          'User-Agent': 'request',
          'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    request(options, (err, response, body) => {
      if(err) {
        res.status(500).send({error: 'Internal Server Error'});
        resolve(false);
      }

      var $ = cheerio.load(body);

      var characterDetails = getCharacterDetails($);

      if(!characterDetails.comment) {
        resolve(false);
      }
      else if(characterDetails.comment.indexOf(token) != -1) {
        resolve(true);
      }
      else {
        resolve(false);
      }
    });
  });
}

function getCharacterDetails($) {
  var characterDetails = {};
  $('.Border_3 > .BoxContent > table:nth-child(1) > tbody > tr').each((i) => {
    var prop =  $(`.Border_3 > .BoxContent > table:nth-child(1) > tbody > tr:nth-child(${i}) > td:nth-child(1)`).text()
                                                                                                                .replace(/[^A-Z0-9]/ig, "")
                                                                                                                .toLowerCase()
                                                                                                                .trim();
    var value =  $(`.Border_3 > .BoxContent > table:nth-child(1) > tbody > tr:nth-child(${i}) > td:nth-child(2)`).text()
                                                                                                                 .trim();
    if (prop) {
      characterDetails[prop] = value;
    }
  })

  return characterDetails;
}
