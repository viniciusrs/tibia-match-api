const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();


//routes
const player = require('./routes/player');

app.use(bodyParser.urlencoded({extended: true}));

//GET
//app.get('/player',);

//POST
//app.post('/player',);

//PUT
//app.put('/player');

//DELETE
//app.delete('/player');

db.connect();

app.listen(3000, () => console.log('Server start, listening on 3000!'));
