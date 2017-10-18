const db = require('../db');
const MongoDB = require('mongodb');

exports.post = async function(req, res) {
  let search;

  if(req.body.query.id) {
    search = await db.read(req.body.collection, {"_id": new MongoDB.ObjectID(req.body.query.id)});
  }
  else {
    search = await db.read(req.body.collection, req.body.query);
  }

  if (search.error){
    res.status(400).send(search);
  }
  else {
    res.send(search);
  }
}
