const mongoose    = require('mongoose');
const User        = require('../models/user');
const Message     = require('../models/message');
const dbtitle     = 'comvors';

mongoose.connect(`mongodb://localhost/${dbtitle}`);

User.collection.drop();
//Message.collection.drop();

//{user.password = 'ko'}

const users = [
  {
    //id: '5b4a56a10001ac291f3f1a4e'
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
    //id: '5b4a56a10001ac291f3f1a4f'
    username: "Direl",
    password: "$2b$10$Rw10Tv6Y5uEnodBd.P3kUOe8YKrsR74IwYh.HyeuJwpYsbXvl.QJW",
    role: 'User',
    specialty: 'Programmer',
    coins: 100,
    friends:[],
    inbox:['5b4a6b42ed37d637b30d5cc9', '5b4a6b42ed37d637b30d5cc5'],    
    friendReq:[],
  },
  {
    //id: '5b4a56a10001ac291f3f1a50'
    username: "Fraz",
    password: "$2b$10$Rw10Tv6Y5uEnodBd.P3kUOe8YKrsR74IwYh.HyeuJwpYsbXvl.QJW",
    role: 'User',
    specialty: 'Voice-Actor',
    coins: 120,
    friends:[],
    inbox:['5b4a6130961ae82f9e53a0ba'],    
    friendReq:[],
  },
  {
    //id: '5b4a56a10001ac291f3f1a51'
    username: "hui8",
    password: "$2b$10$Rw10Tv6Y5uEnodBd.P3kUOe8YKrsR74IwYh.HyeuJwpYsbXvl.QJW",
    role: 'User',
    specialty: 'Null',
    coins: 30,
    friends:[],
    inbox:['5b4a6130961ae82f9e53a0b6'],
    friendReq:[],
  },
  {
    //id: '5b4a56a10001ac291f3f1a52'
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
    //id: '5b4a56a10001ac291f3f1a53'
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
    //id: '5b4a56a10001ac291f3f1a54'
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

const msgs = [
  {
    //id: '5b4a6b42ed37d637b30d5cc9'
    subject: "Whats sup!",
    users: ['5b4a56a10001ac291f3f1a4f','5b4a56a10001ac291f3f1a51'],
    texts: [
      {
        msg:'sup',
        user:'5b4a56a10001ac291f3f1a4f',
      },
      {
        msg:'sup man',
        user:'5b4a56a10001ac291f3f1a51',
      },
      {
        msg:'nothing much, and you?',
        user:'5b4a56a10001ac291f3f1a4f',
      }
    ],
  },
  {
    //id: '5b4a6130961ae82f9e53a0ba'
    subject: "Supply plz!",
    users: ['5b4a56a10001ac291f3f1a4f','5b4a56a10001ac291f3f1a50'],
    texts: [
      {
        msg:'supply me now!',
        user:'5b4a56a10001ac291f3f1a4f',
      },
      {
        msg:'got it bro.',
        user:'5b4a56a10001ac291f3f1a50',
      },
    ],
  }
]
// Message.create(msgs,(err)=>{
//   if (err) {throw err}
//   console.log("Made it to MongoDB.comvors!!!")
//   mongoose.connection.close()
// });

User.create(users,(err)=>{
  if (err) {throw err}
  console.log("Usrs Made it to MongoDB.comvors!!!")
  // Message.create(msgs,(err)=>{
  //   if (err) {throw err}
  //   console.log("Msgs Made it to MongoDB.comvors!!!")
    mongoose.connection.close()
  });

