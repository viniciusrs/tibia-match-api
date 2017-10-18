'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const verifyToken = require('./scripts/verifytoken');


//route user
const users = require('./routes/users');
const character = require('./routes/characters');
const login = require('./routes/login');
const user = require('./routes/user');


app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//GET
app.get('/users', users.get);

//POST
app.post('/users', users.post);
app.get('/users/:id', user.get)
app.post('/users/characters', character.post);
//router.post('login', verifyToken, login.post);
router.get('/protected', verifyToken, );

//PUT
app.put('/users', users.put);



const search = require('./routes/search');

//route search
//POST
app.post('/search', search.post);

app.listen(3000, () => console.log('Server start, listening on 3000!'));

module.exports = router;
