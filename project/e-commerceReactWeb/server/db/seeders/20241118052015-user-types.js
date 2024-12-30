'use strict';

const user_type = require("../models/user_type");


module.exports = {
  up: (models, mongoose) => {
    return user_type.insertMany([
      {
        _id: "673acf2bdd0578b3e378e828",
        user_type: "admin"
      },
      {
        _id: "673acf45dd0578b3e378e829",
        user_type: "buyer"
      },
      {
        _id: "673ad1d2dd0578b3e378e82a",
        user_type:"seller"
      }
    ]).then(res => {
      console.log(`${res.insertedCount} user types inserted.`);
    }).catch(err => {
      console.error("Error inserting user types:", err);
    });
  },

  down: (models, mongoose) => {
    return user_type.deleteMany(
      {
        _id: {
          $in: [
            '673acf2bdd0578b3e378e828',
            '673acf45dd0578b3e378e829',
            '673ad1d2dd0578b3e378e82a'
          ]
        }
      }
    ).then(res => {
      console.log(`${res.deletedCount} user types deleted.`);
    }).catch(err => {
      console.error("Error deleting user types:", err);
    });
  }
};