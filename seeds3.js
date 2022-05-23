const mongoose = require('mongoose');
const User = require('./models/User');
const Note = require('./models/Note');
const Comment = require('./models/Comment');
const db = require('./config/keys').mongoURI;


mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch(err => console.log(err));

const seedDB = async () => {
      // await connectToMongo();
      // await User.deleteMany();
      // await Note.updateMany({"likes":{$exists:false}},{$set:{"likes":[]}});
      await Note.updateMany({"public":{$exists:false}},{$set:{"public":true}});
      // await Comment.updateMany({"likes":{$exists:false}},{$set:{"likes":[]}});
      // await User.insertMany(seedUsers);
      // await seed(seedUsers,seedNotes);
  };
  
  seedDB().then(() => {
      console.log("Going to close connection");
      mongoose.connection.close();
  });