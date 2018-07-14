const mongoose    = require('mongoose');
const User        = require('../models/user');
const dbtitle     = 'comvors';

mongoose.connect(`mongodb://localhost/${dbtitle}`);

User.collection.drop();

//{user.password = 'ko'}

const users = [
  {
    username: "mad",
    password: "$2b$10$Rw10Tv6Y5uEnodBd.P3kUOe8YKrsR74IwYh.HyeuJwpYsbXvl.QJW",
    role: 'Boss',
    specialty: 'Null',
    coins: 1000,
    friends:[],
    inbox:[],
    friendReq:[],
  },
  {
    username: "Direl",
    password: "$2b$10$Rw10Tv6Y5uEnodBd.P3kUOe8YKrsR74IwYh.HyeuJwpYsbXvl.QJW",
    role: 'User',
    specialty: 'Programmer',
    coins: 100,
    friends:[],
    inbox:[],    
    friendReq:[],
  },
  {
    username: "Fraz",
    password: "$2b$10$Rw10Tv6Y5uEnodBd.P3kUOe8YKrsR74IwYh.HyeuJwpYsbXvl.QJW",
    role: 'User',
    specialty: 'Voice-Actor',
    coins: 120,
    friends:[],
    inbox:[],    
    friendReq:[],
  },
  {
    username: "hui8",
    password: "$2b$10$Rw10Tv6Y5uEnodBd.P3kUOe8YKrsR74IwYh.HyeuJwpYsbXvl.QJW",
    role: 'User',
    specialty: 'Null',
    coins: 30,
    friends:[],
    inbox:[],
    friendReq:[],
  },
  {
    username: "JavaOnly",
    password: "$2b$10$Rw10Tv6Y5uEnodBd.P3kUOe8YKrsR74IwYh.HyeuJwpYsbXvl.QJW",
    role: 'User',
    specialty: 'Programmer',
    coins: 230,
    friends:[],
    inbox:[],
    friendReq:[],
  },
  {
    username: "JavaScriptSpreader",
    password: "$2b$10$Rw10Tv6Y5uEnodBd.P3kUOe8YKrsR74IwYh.HyeuJwpYsbXvl.QJW",
    role: 'User',
    specialty: 'Programmer',
    coins: 240,
    friends:[],
    inbox:[],
    friendReq:[],
  },
  {
    username: "MorganFreemanR",
    password: "$2b$10$Rw10Tv6Y5uEnodBd.P3kUOe8YKrsR74IwYh.HyeuJwpYsbXvl.QJW",
    role: 'User',
    specialty: 'Voice-Actor',
    coins: 440,
    friends:[],
    inbox:[],    
    friendReq:[],
  },
];

User.create(users,(err)=>{
  if (err) {throw err}
  console.log("Made it to MongoDB.comvors!!!")
  mongoose.connection.close()
});
