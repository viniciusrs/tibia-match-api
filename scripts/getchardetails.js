'use strict';

exports.getCharacterDetails = function($) {
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
