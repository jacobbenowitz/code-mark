const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Note = require('../../models/Note');
const User = require('../../models/User');
const validateNoteInput = require('../../validation/notes');

//get all notes
router.get('/', (req, res) => {
    Note.find()
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

        const newNote = new Note({
            codebody: req.body.codebody,
            user: { username: req.user.username, userId: req.user.id },
            title: req.body.title,
            textdetails: req.body.textdetails,
            resources: req.body.resources,
            tags: req.body.tags
        });

        newNote.save().then(note => {
            req.user.notes.push(newNote.id)
            req.user.save()
                .then(() => res.json(note))
        });
    }
);

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
                    note.codebody = req.body.codebody;
                    note.title = req.body.title;
                    note.textdetails = req.body.textdetails;
                    note.resources = req.body.resources;
                    note.tags = req.body.tags;
                    note.save()
                        .then(note => res.json(note))
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
                    Note.deleteOne({ _id: req.params.id })
                        .then(() => {
                            User.findById(userid)
                                .then(user => {
                                    user.notes = user.notes.filter(item => item.toString() !== noteid);
                                    user.save().then(user => res.json(user));
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