'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();


//route user
const user = require('./routes/users');
const validation = require('./routes/characters');

app.use(bodyParser.urlencoded({extended: true}));

//GET
app.get('/user', user.get);

//POST
app.post('/user', user.post);
app.post('/user/characters', validation.post);
//PUT
//app.put('/user');

//DELETE
//app.delete('/user');

app.listen(3000, () => console.log('Server start, listening on 3000!'));
