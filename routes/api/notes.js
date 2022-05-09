const { response } = require('express');
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
        .catch(err => res.status(404).json({ notweetsfound: 'No Notes found' }));
});

//get notes of one user
router.get('/user/:user_id', (req, res) => {
    Note.find({user: req.params.user_id})
        .then(notes => res.json(notes))
        .catch(err =>
            res.status(404).json({ nonotesfound: 'No notes found from that user' }
        )
    );
});

//get one note by id
router.get('/:id', (req, res) => {
    Note.findById(req.params.id)
        .then(note => res.json(note))
        .catch(err =>
            res.status(404).json({ nonotefound: 'No note found with that ID' })
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
        user: req.user.id,
        title: req.body.title,
        textdetails: req.body.textdetails
      });
  
      newNote.save().then(note => {
          req.user.notes.push(newNote.id)
          req.user.save()
            .then(() => res.json(note))
        });
    }
);

//edit a note if the current user made it
router.post('/:id/edit',
    passport.authenticate('jwt', { session: false }),
    (req,res) => {
    Note.findById(req.params.id)
        .then(note => {
            if(note.user !== req.user.id){
                res.status(404).json({editnotallowed: 'Not Authorized to edit note'})
            }else {
                note.codebody = req.body.codebody;
                note.title = req.body.title;
                note.textdetails = req.body.textdetails;
                note.save()
                    .then(note => res.json(note))
            }
        })
        .catch(err =>
            res.status(404).json({ nonotefound: 'No note found with that ID' })
        )
})

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    (req,res) => {
        Note.findById(req.params.id)
            .then(note => {
                if(note.user !== req.user.id){
                    res.status(404).json({deletenotallowed: 'Not Authorized to delete note'})
                }else{
                    const noteid = note.id;
                    const userid = note.user;
                    Note.deleteOne({_id: req.params.id})
                        .then(() => {
                            var user = User.findById(userid);
                            user.notes = user.notes.filter(item => item !== noteid)
                            user.save().then(user => res.json(user))
                        })
                }
            })
            .catch(err =>
                res.status(404).json({ nonotefound: 'No note found with that ID' }) 
            )
    }
)

module.exports = router;