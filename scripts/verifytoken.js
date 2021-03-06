'use strict';

const jwt = require('jsonwebtoken');

module.exports = function(req,res,next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
    // verifies secret and checks exp
        jwt.verify(token, 'jmprZX5D0VosRSvckBLRQCd1paCwnyAN', function(err, decoded) {
            if (err) { //failed verification.
                return res.json({error: "Verification failed"});
            }
            req.decoded = decoded;
            next(); //no error, proceed
        });
    } else {
        // forbidden without token
        return res.status(400).send( {error: "No token found"} );
    }
}
