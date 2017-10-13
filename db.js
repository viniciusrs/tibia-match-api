const MongoClient = require('mongodb').MongoClient;

exports.connect = function() {
  MongoClient.connect('mongodb://tibiamatch:4T8VJLyN74NqPjRJ@ds033018.mlab.com:33018/tibia-match-db', (err, database) => {
    if(err) {
      return console.log(err);
    }

    console.log('Database connected!');

    db = database;
  })
}
