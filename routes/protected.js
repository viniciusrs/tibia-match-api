'use strict';

const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
  console.log("toni");
    res.json(req.decoded);
});

module.exports = router;
