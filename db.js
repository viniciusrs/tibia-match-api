'use strict';

const MongoClient = require('mongodb').MongoClient;
const MongoDB = require('mongodb');

function connect(execute) {
  MongoClient.connect('mongodb://tibiamatch:4T8VJLyN74NqPjRJ@ds033018.mlab.com:33018/tibia-match-db', execute)
}

exports.create = function(obj, body, res) {
  connect((err, database) => {
    if (err) {
      res.status(500).send({error: 'Internal Server Error'});
      return;
    }

    var db = database;

    db.collection(obj).insert(body, (err, result) => {
        if(err) {
          res.status(400).send({error: 'Bad Request'});
        };
        res.status(200).send({ success: 'Created' });
    });

    db.close();
  });
};

exports.update = function(coll, query, newValues, res) {
  connect((err, database) => {
    if (err) {
      res.status(500).send({error: 'Internal Server Error'});
      return;
    }

    var db = database;

      var updated = db.collection(coll).updateOne(query, newValues, (err, updated) => {
        if (updated.matchedCount){
          res.status(200).send({success: 'Updated'});
        }
        else{
          res.status(400).send({error: 'Bad Request'});
        }
      });

    db.close();
  });

}

exports.delete = function(coll, query, res ) {
  connect((err, database) => {
    if (err) {
      res.status(500).send({error: 'Internal Server Error'});
      return;
    }

    var db = database;
      db.collection(coll).deleteOne(query, (err, deleted) => {
        if (deleted.deletedCount){
          res.status(200).send({success: 'Deleted'});
        }
        else{
          res.status(400).send({error: 'Bad Request'});
        }
      });
    db.close();
  });
}

exports.read = function(coll, query, res) {
  connect((err, database) => {
    if(err) {
      res.status(500).send({error: 'Internal Server Error'});
      return;
    }

    var db = database;
      db.collection(coll).find(query).toArray( (err, docs) => {
        if (err) throw err;
        //console.log(docs);
        if (docs.length){
          res.send(docs);
        }
        else{
          res.status(400).send({error: 'Bad Request'});
        }
      });

    db.close();
  });
}
