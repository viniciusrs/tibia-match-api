'use strict';

const MongoClient = require('mongodb').MongoClient;
const MongoDB = require('mongodb');

function connect(execute) {
  MongoClient.connect('mongodb://tibiamatch:4T8VJLyN74NqPjRJ@ds033018.mlab.com:33018/tibia-match-db', execute)
}

exports.create = async function(obj, body) {
  return new Promise((resolve, reject) => {
    connect((err, database) => {
      if (err) {
        resolve( { error : "Internal Server Error" } );
        return;
      }

      var db = database;

      db.collection(obj).insert(body, (err, result) => {
          if(err) {
            resolve( { error : "Bad Request" } );
            return;
          };
          resolve( { success : "Created" } );
          return;
      });

      db.close();
    });
  });
}

exports.update = async function(coll, query, newValues) {
  return new Promise((resolve, reject) => {
    connect((err, database) => {
      if (err) {
        resolve( { error : "Internal Server Error" } );
        return;
      }

      var db = database;

        var updated = db.collection(coll).updateOne(query, newValues, (err, updated) => {
          if (updated.matchedCount){
            resolve( {success: 'Updated'} );
            return;
          }
          else{
            resolve( {error: 'Bad Request'} );
            return;
          }
        });

      db.close();
    });
  });

}

exports.delete = async function(coll, query) {
  return new Promise((resolve, reject) => {
    connect((err, database) => {
      if (err) {
        resolve( {error: 'Internal Server Error'} );
        return;
      }

      var db = database;
        db.collection(coll).deleteOne(query, (err, deleted) => {
          if (deleted.deletedCount){
            resolve( {success: 'Deleted'} );
            return;
          }
          else{
            resolve( {error: 'Bad Request'} );
            return;
          }
        });
      db.close();
    });
  });
}

exports.read = async function(coll, query) {
  return new Promise((resolve, reject) => {
    connect((err, database) => {
      if(err) {
        resolve( {error: 'Internal Server Error'} );
        return;
      }

      var db = database;
        db.collection(coll).find(query).toArray( (err, result) => {
          if (result.length){
            resolve(result);
            return;
          }
          else{
            resolve( {error: 'Bad Request'} );
            return;
          }
        });

      db.close();
    });
  });
}

exports.readOne = async function(coll, query) {
  return new Promise((resolve, reject) => {
    connect((err, database) => {
      if(err) {
        resolve( {error: 'Internal Server Error'} );
        return;
      }

      var db = database;
        db.collection(coll).findOne(query, (err, result) => {
          if (result){
            resolve(result);
            return;
          }
          else{
            resolve( {error: 'Bad Request'} );
            return;
          }
        });

      db.close();
    });
  });
}
