const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
mongoose.plugin(schema => { schema.options.usePushEach = true });


const userSchema = new Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ['User', 'Admin', 'Boss',],
    default : 'User'
  },
  specialty: {
    type: String,
    enum: ['Null', 'Programmer', 'Designer', 'Voice-Actor'],
    default : 'Null'
  },
  imgName: String,
  imgPath: String,
  coins: {
    type: Number,
    default: 10,
  },
  friends:[
    { 
      type: Schema.Types.ObjectId, 
      ref: "User",
    }
  ],
  inbox:[
    { 
      type: Schema.Types.ObjectId, 
      ref: "Message",
    }
  ],
  friendReq:[
    { 
      type: Schema.Types.ObjectId, 
      ref: "User",
    }
  ],
  about: String,
  experiences: [
    {
      title: String,
      imgName: String,
      imgPath: String,
      links: [String],
      //later add if users collaborated
      description: String,

    }
  ],
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);
module.exports = User;