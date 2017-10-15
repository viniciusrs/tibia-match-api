'use strict';

const MongoClient = require('mongodb').MongoClient;

var db;

function connect(execute) {
  MongoClient.connect('mongodb://tibiamatch:4T8VJLyN74NqPjRJ@ds033018.mlab.com:33018/tibia-match-db', execute)
}


exports.create = function(table, body, res) {
  connect((err, database) => {
    if(err) {
      res.status(500).send({error: 'Internal Server Error'});
      return;
    }

    db = database;

    db.collection(table).insert(body, (err, result) => {
        if(err) {
          res.status(400).send({error: 'Bad Request'});
        };
        res.status(201).send({ created: 'Created' });
    });

    db.close();
  });
};

exports.update = function(req, res) {

}

exports.delete = function(req, res ) {

}

exports.read = function(req, res) {
   console.log(db.collection('users').find({}));
}
