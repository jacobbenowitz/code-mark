const MongoClient = require("mongodb").MongoClient;
const db = require('./config/keys').mongoURI;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const keys = require('./config/keys');
const passport = require('passport');
const validateRegisterInput = require('./validation/register');

const createUser = (req) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        // return res.status(400).json(errors);
        return;
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                // return res.status(400).json({ email: "A user has already registered with this address" })
                console.log('not possible');
                return;
            } else {
                User.findOne({username: req.body.username})
                    .then(user => {
                        if (user) {
                            // return res.status(400).json({ username: "A user has already registered with this name" })
                            console.log('not possible');
                            return;
                        }else{
                            const newUser = new User({
                                username: req.body.username,
                                email: req.body.email,
                                password: req.body.password
                            })
                            
                            bcrypt.genSalt(10, (err, salt) => {
                                bcrypt.hash(newUser.password, salt, (err, hash) => {
                                    if (err) throw err;
                                    newUser.password = hash;
                                    newUser.save()
                                    // .then(user => res.json(user))
                                    .catch(err => console.log(err))
                                })
                            })
                        }
                    }
                )
            }
        })
}

async function seedDB() {
    // Connection URL
    const uri = db;

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Connected correctly to server");

        const user_collection = client.db("myFirstDatabase").collection("users");
        // const note_collection = client.db("myFirstDatabase").collection("notes");
        // const comment_collection = client.db("myFirstDatabase").collection("comments");

        // The drop() command destroys all data from a collection.
        // Make sure you run it against proper database and collection.

        // user_collection.drop();
        // note_collection.drop();
        // comment_collection.drop();

        // make a bunch of time series data

        let userData = [];
        // let noteData = [];
        // let commentData = [];

        let demo = {
            body: {
                username: 'demo',
                email: 'demo@dem.com',
                password: 'password'
            }
        }

        userData.push(demo);

        user_collection.insertMany(userData);
        // note_collection.insertMany(noteData);
        // comment_collection.insertMany(commentData);

        console.log("Database seeded! :)");
        client.close();
    } catch (err) {
        console.log(err.stack);
    }
}

let demo = {
    body: {
        username: 'demo',
        email: 'demo@dem.com',
        password: 'password'
    }
}

// seedDB();
createUser(demo)