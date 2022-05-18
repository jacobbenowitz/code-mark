const path = require('path');
const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require('body-parser');
const users = require("./routes/api/users");
const passport = require('passport');
const notes = require("./routes/api/notes");
const comments = require("./routes/api/comments");

// require('dotenv').config();
// console.log(process.env);
// console.log(process.env.REACT_APP_TEST_API_KEY);



const app = express();
const db = require('./config/keys').mongoURI;

// production settings
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
};

// connect to MongoDB via mongoose
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

// setup middleware for body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// tell Express to use imported routes
app.use("/api/users", users);
app.use("/api/notes", notes);
app.use("/api/comments", comments);

// setup middleware for passport
app.use(passport.initialize());
require('./config/passport')(passport);

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server is running on port ${port}`));