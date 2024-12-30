'use strict';
const bcrypt = require('bcrypt');
// const user_type = require('../models/user_type');
module.exports = {
  up: (models, mongoose) => {
    let password = "admin@123";
    let salt = bcrypt.genSaltSync(10);
    let hashed_pass = bcrypt.hashSync(password, salt);

    return models.users.insertMany([
      {
        "name": "admin",
        "email": "admin@gmail.com",
        "password": hashed_pass,
        "user_type": "673acf2bdd0578b3e378e828"
      }
    ]).then(res => {
      console.log(res.insertedCount);
    })
  },

  down: (models, mongoose) => {
    return models.users.deleteMany(
      {
        _id: "673acf2bdd0578b3e378e828"
      }
    ).then(res => {
      console.log(res.deletedCount);
    })
  }
};