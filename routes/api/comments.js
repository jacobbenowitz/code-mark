const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Note = require('../../models/Note');
const User = require('../../models/User');
const validateCommentInput = require('../../validation/comments');

//get all comments

module.exports = router;
