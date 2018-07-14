const mongoose    = require('mongoose');
const User        = require('../models/user');
const dbtitle     = 'comvors';

mongoose.connect(`mongodb://localhost/${dbtitle}`);

User.collection.drop();

const users = [
  {
    username: "mad",
    password: "5",
    role: 'Boss',
    specialty: 'Null',
    coins: 1000,
  },
];

User.create(users,(err)=>{
  if (err) {throw err}
  console.log("Made it to MongoDB.comvors!!!")
  mongoose.connection.close()
});
