const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const Note = require("../../models/Note");
const Comment = require("../../models/Comment")

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ nousersfound: 'No Users Found' }));
})

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({ email: "A user has already registered with this address" })
      } else {
        User.findOne({ username: req.body.username })
          .then(user => {
            if (user) {
              return res.status(400).json({ username: "A user has already registered with this name" })
            } else {
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
                    .then(user => res.json(user))
                    .catch(err => console.log(err))
                })
              })
            }
          }
          )
      }
    })
}
)

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const nameValue = req.body.usernameOrEmail;
  const password = req.body.password;

  User.findOne({ $or: [{ username: nameValue }, { email: nameValue }] })
    .then(user => {
      if (!user) {
        return res.status(404).json({ username: 'This user does not exist' });
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = { id: user.id, username: user.username };

            jwt.sign(
              payload,
              keys.secretOrKey,
              // Tell the key to expire in one hour
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              }
            );
          } else {
            return res.status(400).json({ password: 'Incorrect password' });
          }
        })
    })
})

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email
  });
})

router.get('/:userId', (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.json(user))
    .catch(err =>
      res.status(404).json({ nouserfound: "No User Found With That ID" })
    );
});

router.patch('/:userId', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.params.userId !== req.user.id) {
    res.status(400).json({ editnotallowed: 'Not Authorized to Edit User' })
  } else {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) { return res.status(400).json(errors) }
    User.findById(req.params.userId)
      .then(mainuser => {
        User.findOne({ username: req.body.username })
          .then(user => {
            if (user && user.username !== req.user.username) {
              return res.status(400).json({ email: "A user has already registered with this username" })
            } else {
              User.findOne({ email: req.body.email })
                .then(user => {
                  if (user && user.email !== req.user.email) {
                    return res.status(400).json({ email: "A user has already registered with this email address" })
                  } else {
                    mainuser.username = req.body.username;
                    mainuser.email = req.body.email;
                    if (req.body.password !== mainuser.password) {
                      bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(req.body.password, salt, (err, hash) => {
                          if (err) { throw err }
                          mainuser.password = hash;
                          mainuser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                        })
                      })
                    } else {
                      mainuser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                    }
                  }
                })
            }
          })
      })
      .catch(err => res.status(404).json(
        { nouserfound: "No User Found With That ID" }
      ));
  }
})

router.delete('/:userId', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.params.userId !== req.user.id) {
    res.status(400).json({ deletenotallowed: 'Not Authorized to Delete User' })
  } else {
    User.findById(req.params.userId)
      .then(deleteuser => {
        var noteIds = deleteuser.notes;
        var commentIds = deleteuser.comments;
        User.deleteOne({ _id: deleteuser.id })
          .then(() => {
            commentIds.forEach(commentid => {
              Comment.findById(commentid)
                .then(comment => {
                  Comment.deleteOne({ _id: commentid })
                })
                .catch(err => res.status(404).json({ nocommentfound: "No Comment Found With That ID" }))
            })
            noteIds.forEach(noteId => {
              Note.findById(noteId)
                .then(note => {
                  const innercommentIds = note.comments;
                  Note.deleteOne({ _id: noteId })
                    .then(() => {
                      innercommentIds.forEach(innercommentid => {
                        Comment.findById({ _id: innercommentid })
                          .then(comment => {
                            Comment.deleteOne({ _id: innercommentid })
                          })
                          .then(comment => {
                            User.findById(comment.user.userId)
                              .then(user => {
                                user.comments = user.comments.filter(item => item.toString() !== innercommentid);
                                user.save().then(user => res.json(user));
                              })
                          })
                          .catch(err => res.status(404).json({ nocommentfound: "No Comment Found With That ID" }))
                      })
                    })
                })
                .catch(err => res.status(404).json(
                  { nonotefound: "No Note Found With That ID" }
                ))
            })
          })
      })
      .then(() => res.json(req.params.userId)) // was id
      // .then(deleteuser => res.json(deleteuser._id)) // was id
      .catch(err =>
        res.status(404).json({ nouserfound: "No User Found With That ID" })
      );
  }
})

module.exports = router;