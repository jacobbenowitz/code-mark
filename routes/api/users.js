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
                password: req.body.password,
                color: req.body.color
              })

              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser.save()
                    .then(user => {
                      res.json([user,['success', 'User Successfully Registered!']])
                      Note.findById('629e5961cb981eeef9b649a0')     //id of template note in Jacob account
                        .then(note => {
                          const newNote = new Note({
                            user: { username: user.username, userId: user.id },
                            codebody: note.codebody,
                            title: note.title,
                            textdetails: note.textdetails,
                            comments: note.comments,
                            resources: note.resources,
                            tags: note.tags,
                            likes: note.likes,
                            language: note.language,
                            public: false,
                            sample: true
                          })
                          newNote.save()
                            .then(note => {
                              user.notes.push(note.id);
                              user.save();
                            })
                        })
                        .catch(err => res.json({user: err}))
                    })
                    .catch(err => res.json({user: err}))
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
        return res.status(404).json({ usernameOrEmail: 'This user does not exist' });
      }
      // if(password === user.password){      //bad idea since the whole point of hashing is to not have passwords revealed on database
      //   const payload = {
      //     id: user.id,
      //     username: user.username,
      //     followers: user.followers,
      //     following: user.following,
      //     note_likes: user.note_likes,
      //     color: user.color
      //   };
      //   jwt.sign(
      //     payload,
      //     keys.secretOrKey,
      //     // Tell the key to expire in one hour
      //     { expiresIn: 86400 },
      //     (err, token) => {
      //       res.json({
      //         success: true,
      //         token: 'Bearer ' + token
      //       });
      //     }
      //   );
      // }else{
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              const payload = {
                id: user.id,
                username: user.username,
                followers: user.followers,
                following: user.following,
                note_likes: user.note_likes,
                color: user.color
              };
  
              jwt.sign(
                payload,
                keys.secretOrKey,
                // Tell the key to expire in one hour
                { expiresIn: 86400 },
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
      // }
    })
})

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  const payload = {
    id: req.user.id,
    username: req.user.username,
    followers: req.user.followers,
    following: req.user.following,
    note_likes: req.user.note_likes,
    color: req.user.color
  }
  return res.json(payload);
})


router.get('/:userId', (req, res) => {
    User.findById(req.params.userId)
      .then(user => res.json(user))
      .catch(err =>
        res.status(404).json({ nouserfound: "No User Found With That ID" })
    )
})

// only backend route for updating a user's followers
router.patch('/followers/:userId', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (req.user.following.includes(user.id)) {
        user.followers = user.followers.filter(item => item.toString() !== req.user.id);
      } else {
        user.followers.push(req.user.id);
      }
      user.save()
        .then(user => {
          // res.json({followedUser:user})
          if (user.followers.includes(req.user.id)) {
            req.user.following.push(user.id);
          } else {
            req.user.following = req.user.following.filter(item => item.toString() !== user.id)
          }
          res.json({ followedUser: user, currentUser: req.user });
          req.user.save();
          // .then(user => res.json({currentUser:user}));
        });
    })
    .catch(err => res.status(404).json({ nouserfound: "No User Found With That ID" }));
})

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
              return res.status(400).json({ username: "A user has already registered with this username" })
            } else {
              User.findOne({ email: req.body.email })
                .then(user => {
                  if (user && user.email !== req.user.email) {
                    return res.status(400).json({ email: "A user has already registered with this email address" })
                  } else {
                    let differentColor = req.body.color !== mainuser.color;
                    let differentUsername = req.body.username !== mainuser.username;
                    mainuser.username = req.body.username || mainuser.username;
                    mainuser.email = req.body.email || mainuser.email;
                    mainuser.color = req.body.color || mainuser.color;
                    if (req.body.password !== mainuser.password) {
                      bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(req.body.password, salt, (err, hash) => {
                          if (err) { throw err }
                          mainuser.password = hash;
                          mainuser.save()
                            .then(user => res.json(user))
                            // .catch(err => console.log(err))
                        })
                      })
                    } else {
                      mainuser.save()
                        .then(user => {
                          const payload = {
                            id: user.id,
                            username: user.username,
                            followers: user.followers,
                            following: user.following,
                            note_likes: user.note_likes,
                            email: user.email,
                            color: user.color
                          };
                          res.json([payload,['success', 'User Account Successfully Updated!']])
                          // res.json(user)
                          if(differentColor || differentUsername){
                            user.comments.forEach(commentId => {
                              Comment.findById(commentId)
                                .then(comment => {
                                  comment.user = {
                                    username: differentUsername ? user.username : comment.user.username,
                                    userId: comment.user.userId,
                                    color: differentColor ? user.color : comment.user.color
                                  };
                                  comment.save();
                                })
                            })
                          }
                          if(differentUsername){
                            user.notes.forEach(noteId => {
                              Note.findById(noteId)
                                .then(note => {
                                  note.user.username = user.username;
                                  note.save();
                                })
                            })
                          }

                        })
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
        var commentLikesIds = deleteuser.comment_likes;
        var noteLikesIds = deleteuser.note_likes;
        var followers = deleteuser.followers;
        var following = deleteuser.following;

        User.deleteOne({ _id: deleteuser.id })
          .then(() => {
            followers.forEach(followerId => {
              User.findById(followerId)
                .then(user => {
                  user.following = user.following.filter(item => item.toString() !== req.params.userId);
                  user.save();
                })
            })
            following.forEach(followId => {
              User.findById(followId)
                .then(user => {
                  user.followers = user.followers.filter(item => item.toString() !== req.params.userId);
                  user.save();
                })
            })
            commentLikesIds.forEach(commentLikeId => {
              Comment.findById(commentLikeId)
                .then(comment => {
                  comment.likes = comment.likes.filter(item => item.toString() !== req.params.userId);
                  comment.save().then(comment => res.json(comment));
                })
                .catch(err => res.status(404).json({ nocommentfound: "No Comment Found With That ID" }))
            })
            noteLikesIds.forEach(noteLikeId => {
              Note.findById(noteLikeId)
                .then(note => {
                  note.likes = note.likes.filter(item => item.toString() !== req.params.userId);
                  note.save().then(note => res.json(note));
                })
                .catch(err => res.status(404).json({ nonotefound: "No Note Found With That ID" }))
            })
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
      .then(() => res.json([req.params.userId,['success', 'User Account Successfully Deleted!']])) // was id
      // .then(deleteuser => res.json(deleteuser._id)) // was id
      .catch(err =>
        res.status(404).json({ nouserfound: "No User Found With That ID" })
      );
  }
})

module.exports = router;