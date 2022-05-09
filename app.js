const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require('body-parser');
const users = require("./routes/api/users");
const passport = require('passport');

const app = express();
const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World"));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server is running on port ${port}`));