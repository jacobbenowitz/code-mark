const mongoose = require('mongoose');
const User = require('./models/User');
const Note = require('./models/Note');
const Comment = require('./models/Comment');
const db = require('./config/keys').mongoURI;

const bcrypt = require('bcryptjs');

// mongoose
//     .connect(db, {useNewUrlParser: true})
//     .then(() => console.log('Connected to MongoDB successfully'))
//     .catch(err => console.log(err));

function makePasswordHash(password){
    const salt = bcrypt.genSaltSync(10)
    const encrypted = bcrypt.hashSync(password, salt)
    return encrypted;
}

// var testpassword = makePasswordHash('password');
// console.log(testpassword);
// console.log(bcrypt.compareSync("password", testpassword))

seedUsers = [
    {
        username: 'demo',
        email: 'demo@email.com',
        password: makePasswordHash('password'),
        notes: [],
        comments: []
    },
    {
        username: 'demo1',
        email: 'demo1@email.com',
        password: makePasswordHash('password'),
        notes: [],
        comments: []
    },
    {
        username: 'demo2',
        email: 'demo2@email.com',
        password: makePasswordHash('password'),
        notes: [],
        comments: []
    },
    {
        username: 'demo3',
        email: 'demo3@email.com',
        password: makePasswordHash('password'),
        notes: [],
        comments: []
    },
    {
        username: 'demo4',
        email: 'demo4@email.com',
        password: makePasswordHash('password'),
        notes: [],
        comments: []
    },
    {
        username: 'demo5',
        email: 'demo5@email.com',
        password: makePasswordHash('password'),
        notes: [],
        comments: []
    },
    {
        username: 'demo6',
        email: 'demo6@email.com',
        password: makePasswordHash('password'),
        notes: [],
        comments: []
    },
    {
        username: 'demo7',
        email: 'demo7@email.com',
        password: makePasswordHash('password'),
        notes: [],
        comments: []
    },
    {
        username: 'demo8',
        email: 'demo8@email.com',
        password: makePasswordHash('password'),
        notes: [],
        comments: []
    },
    {
        username: 'demo9',
        email: 'demo9@email.com',
        password: makePasswordHash('password'),
        notes: [],
        comments: []
    }
]

function makeNote(username,title,codebody,textdetails,tags){
    //need to get resources, then get user and make note
    User.find({username})
        .then(founduser => {
            let newNote = new Note({
                codebody: codebody,
                user: founduser.id,
                title: title,
                textdetails: textdetails,
                resources: resources,
                tags: tags
            });
            newNote.save()
                .then(note => {
                    founduser.notes.push(newNote.id)
                    founduser.save()
                })
        })
}

const seedDB = async () => {
    // await User.deleteMany();
    await User.insertMany(seedUsers);
};

// seedDB().then(() => {
//     mongoose.connection.close();
// });

