const db = require('../db');
const MongoDB = require('mongodb');

exports.get = async function(req, res) {

  let user = await db.readOne('user', {"_id": new MongoDB.ObjectID(req.params.id)});

  if (user.error){
    res.status(400).send(user);
  }
  else {
    res.send(user);
  }
}
