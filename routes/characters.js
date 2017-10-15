const validation = require('../scripts/validation');
const db = require('../db');

exports.post = async function(req, res) {
  var valid = await validation.validateCharacter(req.body.character, req.body.token);

  if(!valid) {
    res.status(401).send({error: 'Unauthorized'});
  }
  else {
    db.create('characters', req.body, res);
  }
}
