const validation = require('../scripts/validation');
const db = require('../db');

exports.get = function(req, res){
  db.read('characters', {"name" : "Nec Divinus"}, res);
}

exports.post = async function(req, res) {
  var valid = await validation.validateCharacter(req.body.character, req.body.token);

  if(!valid) {
    res.status(401).send({error: 'Unauthorized'});
  }
  else {
    db.create('characters', req.body, res);
  }
}
