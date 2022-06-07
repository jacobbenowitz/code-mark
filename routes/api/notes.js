const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Note = require('../../models/Note');
const User = require('../../models/User');
const validateNoteInput = require('../../validation/notes');

const getResources = require('../../resources/resources');

//get all notes
router.get('/', (req, res) => {
    Note.find()
        // .then(notes => {
        //     res.json(notes.filter(note => !note._doc.sample))
        // })
        .then(notes => res.json(notes))
        .catch(err => res.status(404).json({ nonotesfound: 'No Notes Found' }));
});

//

//get notes of one user
router.get('/user/:user_id', (req, res) => {
    User.findById(req.params.user_id)
        .then(user => {
            Note.find({ '_id': { $in: Object.values(user.notes) } })
                .then(notes => res.json(notes))
                .catch(err => res.status(404).json(err.message))
        })
        .catch(err =>
            res.status(404).json({ nouserfound: 'No Such User Found' }
            ))
});

//get one note by id
router.get('/:id', (req, res) => {
    Note.findById(req.params.id)
        .then(note => res.json(note))
        .catch(err =>
            res.status(404).json({ nonotefound: 'No Note Found With That ID' })
        );
});

//make a note
router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateNoteInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        getResources(req.body.keywords, req.body.codebody)
            .then(resources => {
                const newNote = new Note({
                    codebody: req.body.codebody,
                    user: { username: req.user.username, userId: req.user.id },
                    title: req.body.title,
                    textdetails: req.body.textdetails,
                    resources: resources,
                    tags: req.body.tags,
                    public: req.body.public,
                    language: req.body.language,
                    sample: false
                });

                newNote.save().then(note => {
                    req.user.notes.push(newNote.id)
                    req.user.save()
                        .then(() => res.json([note,['success', 'Note Successfully Created!']]))
                });
            })
            .catch(err => console.log(err))
    }
);

// route only for updating a note's tags 
router.patch('/:id/tags', passport.authenticate('jwt',
    { session: false }), (req, res) => {
        Note.findById(req.params.id)
            .then(note => {
                note.tags = req.body.tags;
                note.save()
                    .then(note => res.json([note, ['success', 'Note Successfully Updated!']]))
            })
            .catch(err => res.status(404).json({ nonotefound: "No Note Found With That ID" }))
});

// route only for updating a note's public status
router.patch('/:id/public', passport.authenticate('jwt',
    { session: false }), (req, res) => {
        Note.findById(req.params.id)
            .then(note => {
                note.public = req.body.public;
                let noteMessage;
                if (req.body.public === true) {
                    noteMessage = 'This note is now public'
                } else {
                    noteMessage = 'This note is now private'
                }
                note.save()
                    .then(note => res.json([note, ['success', noteMessage]]))
            })
            .catch(err => res.status(404).json({ nonotefound: "No Note Found With That ID" }))
});


// only backend route for updating a note's likes
router.patch('/note_likes/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Note.findById(req.params.id)
        .then(note => {
            note.likes = req.body.likes;
            note.save()
                .then(note => {
                    res.json(note)
                    if (note.likes.includes(req.user.id)) {
                        req.user.note_likes.push(note.id);
                    } else {
                        req.user.note_likes = req.user.note_likes.filter(item => item.toString() !== note.id)
                    }
                    req.user.save();
                })
        })
        .catch(err => res.status(404).json({ nonotefound: "No Note Found With That ID" }));
})

//edit a note if the current user made it
router.patch('/:id/edit',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Note.findById(req.params.id)
            .then(note => {
                // User.findById(note.user).then(user => console.log(user));
                if (note.user.userId.toString() !== req.user.id) {
                    res.status(404).json({ editnotallowed: 'Not Authorized To Edit Note' })
                } else {
                    getResources(req.body.keywords, req.body.codebody)
                        .then(resources => {
                            note.codebody = req.body.codebody || note.codebody;
                            note.title = req.body.title || note.title;
                            note.textdetails = req.body.textdetails || note.textdetails;
                            // note.resources = req.body.resources;
                            note.likes = req.body.likes || note.likes;
                            note.tags = req.body.tags || note.tags;
                            note.language = req.body.language || note.language;
                            note.resources = resources || note.resources;
                            if (req.body.public != null &&
                                req.body.public !== undefined) {
                                note.public = req.body.public
                            }
                            note.save()
                                .then(note => {
                                    res.json([note,['success', 'Note Successfully Updated!']])
                                    // res.json({success: 'Note Successfully Updated!'})
                                })
                        })
                }
            })
            .catch(err =>
                res.status(404).json({ nonotefound: 'No Note Found With That ID' })
            )
    })

//delete note if the current user made it
router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Note.findById(req.params.id)
            .then(note => {
                if (note.user.userId.toString() !== req.user.id) {
                    res.status(404).json({ deletenotallowed: 'Not Authorized To Delete Note' })
                } else {
                    const noteid = note.id;
                    const userid = note.user.userId;
                    const comments = note.comments;
                    const likes = note.likes;
                    res.json([note,['success', 'Note Successfully Deleted!']]);
                    Note.deleteOne({ _id: req.params.id })
                        .then(() => {
                            User.findById(userid)
                                .then(user => {
                                    user.notes = user.notes.filter(item => item.toString() !== noteid);
                                    user.save();
                                })
                        })
                        .then(() => {
                            comments.forEach(commentid => {
                                Comment.findById(commentid)
                                    .then(comment => {
                                        Comment.deleteOne({ _id: commentid })
                                    })
                                    .then(comment => {
                                        User.findById(comment.user.userId)
                                            .then(user => {
                                                user.comments = user.comments.filter(item => item.toString() !== commentid);
                                                user.save();
                                            })
                                    })
                            })
                        })
                        .then(() => {
                            likes.forEach(likeId => {
                                User.findById(likeId)
                                    .then(user => {
                                        user.note_likes = user.note_likes.filter(item => item.toString() !== noteid)
                                        user.save();
                                    })
                            })
                        })
                }
            })
            .catch(err =>
                res.status(404).json({ nonotefound: 'No Note Found With That ID' })
                // res.status(404).json(err.message) 
            )
    }
)

module.exports = router;