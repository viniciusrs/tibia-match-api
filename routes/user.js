const db = require('../db');
const MongoDB = require('mongodb');

exports.get = async function(req, res) {

  let user = await db.readOne('user', {"_id": new MongoDB.ObjectID(req.params.id)});

  if (user.error){
    res.json(user);
  }
  else {
    res.json({ 
      id: user._id, 
      name: user.login,
      email: user.email,
      token: user.token,
      premium: user.premium,
      level: user.level,
      reputation: user.reputation,
      rank: user.rank,
      experience: user.experience,
      gold: user.gold
    });
  }
}
