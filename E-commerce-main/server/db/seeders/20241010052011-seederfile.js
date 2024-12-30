'use strict';

module.exports = {
  up: (models, mongoose) => {
    
      
      return models.user_types.insertMany([
        {
         _id:"67093843c0ea8c996aa031a1",
         user_type:"admin"
        },
        {
          _id:"67093864c0ea8c996aa031a2",
         user_type:"Buyer"
        },
        {
          _id:"672afb51f82dda9f3059e32f",
          user_type:"Seller"
        }
      ]).then(res => {
     
      console.log(res.insertedCount);
    });
    
  },

  down: (models, mongoose) => {
    
      return models.user_types.deleteMany(
        {
         _id:{
          $in:[
            '67093843c0ea8c996aa031a1',
            '67093864c0ea8c996aa031a2',
            '672afb51f82dda9f3059e32f'
          ]
         }
        }
      ).then(res => {
     
      console.log(res.deletedCount);
      });
    
  }
};
