'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const verifyToken = require('./scripts/verifytoken');
const jwt = require('express-jwt');


//route user
const users = require('./routes/users');
const character = require('./routes/characters');
const login = require('./routes/login');
const user = require('./routes/user');


app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods",  "PUT, POST, DELETE, GET");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  next();
});

//GET
app.get('/users', users.get);
app.get('/users/:id', user.get);
app.get('/users/characters/:id', character.get);

//POST
app.post('/users', users.post);
app.post('/users/characters', verifyToken, character.post);
app.put('/users/characters', verifyToken, character.put);
app.post('/login', login.post);

//PUT
app.put('/users', users.put);



const search = require('./routes/search');

//route search
//POST
app.post('/search', search.post);

app.listen(3000, () => console.log('Server start, listening on 3000!'));
