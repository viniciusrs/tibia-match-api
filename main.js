'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();


//route user
const user = require('./routes/users');
const character = require('./routes/characters');

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//GET
app.get('/user', user.get);

//POST
app.post('/user', user.post);
app.post('/user/characters', character.post);
//PUT
app.put('/user', user.put);

//DELETE
app.delete('/user', user.delete);

app.listen(3000, () => console.log('Server start, listening on 3000!'));
