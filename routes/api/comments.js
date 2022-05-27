const { json } = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Comment = require('../../models/Comment');
const Note = require('../../models/Note');
const User = require('../../models/User');
const validateCommentInput = require('../../validation/comments');

//get all comments
router.get('/', (req, res) => {
    Comment.find()
        .then(comments => res.json(comments))
        .catch(err => res.status(404).json({ nocommentsfound: 'No Comments Found' }));
})

//get comments of one user
router.get('/user/:user_id', (req, res) => {
    User.findById(req.params.user_id)
        .then(user => {
            Comment.find({ '_id': { $in: Object.values(user.comments) } })
                .then(comments => res.json(comments))
                .catch(err => res.status(404).json(err.message))
        })
        .catch(err =>
            res.status(404).json({ nouserfound: 'No Such User Found' }
            ))
});

//get comments of one note
router.get('/note/:note_id', (req, res) => {
    Note.findById(req.params.note_id)
        .then(note => {
            Comment.find({ '_id': { $in: Object.values(note.comments) } })
                .then(comments => res.json(comments))
                .catch(err => res.status(404).json(err.message))
        })
        .catch(err =>
            res.status(404).json({ nonotefound: 'No Such Note Found' }
            ))
});

//get one comment by id
router.get('/:id', (req, res) => {
    Comment.findById(req.params.id)
        .then(comment => res.json(comment))
        .catch(err =>
            res.status(404).json({ nocommentfound: 'No Comment Found With That ID' })
        );
});

//make a comment
router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateCommentInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newComment = new Comment({
            // user: req.user.id,
            user: { username: req.user.username, userId: req.user.id, color: req.user.id },
            note: req.body.note,
            textbody: req.body.textbody,
            codeSnippet: req.body.codeSnippet
        });
        newComment.save()
            .then(() => {
                req.user.comments.push(newComment.id)
                req.user.save()
            })
            .then(() => {
                Note.findById(newComment.note.toString())
                    .then(note => {
                        note.comments.push(newComment.id)
                        note.save()
                    });
            })
            // .then(() => {
            //     newComment.populate('user');
            // })
            .then(() => res.json(newComment));
    }
);

// only backend route for updating a comment's likes
router.patch('/comment_likes/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Comment.findById(req.params.id)
        .then(comment => {
            comment.likes = req.body.likes;
            comment.save()
                .then(comment => {
                    res.json(comment)
                    if (comment.likes.includes(req.user.id)) {
                        req.user.comment_likes.push(comment.id);
                    } else {
                        req.user.comment_likes = req.user.comment_likes.filter(item => item !== comment.id);
                    }
                    req.user.save();
                });
        })
        .catch(err => res.status(404).json({ nocommentfound: "No Comment Found With That ID" }));
})

//edit a comment if the current user made it
router.patch('/:id/edit',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Comment.findById(req.params.id)
            .then(comment => {
                if (comment.user.userId.toString() !== req.user.id) {
                    res.status(404).json({ editnotallowed: 'Not Authorized to Edit Note' })
                } else {
                    comment.textbody = req.body.textbody || comment.textbody;
                    comment.likes = req.body.likes || comment.likes;
                    // comment.codeSnippet = req.body.codeSnippet;
                    comment.save().then(comment => res.json(comment))
                }
            })
            .catch(err =>
                res.status(404).json({ nocommentfound: 'No Comment Found With That ID' })
            )
    }
)

//delete comment if the current user made it
router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Comment.findById(req.params.id)
            .then(comment => {
                // if (comment.user.userId.toString() !== req.user.id) {
                //     res.status(404).json({ deletenotallowed: 'Not Authorized To Delete Note' })
                // } else {
                const commentid = comment.id;
                const noteid = comment.note;
                const userid = comment.user.userId;
                const likes = comment.likes;
                Comment.deleteOne({ _id: req.params.id })
                    .then(() => {
                        User.findById(userid)
                            .then(user => {
                                user.comments = user.comments.filter(item => item.toString() !== commentid);
                                user.save();
                            });
                    })
                    .then(() => {
                        Note.findById(noteid)
                            .then(note => {
                                note.comments = note.comments.filter(item => item.toString() !== commentid);
                                note.save();
                            });
                    })
                    .then(() => {
                        likes.forEach(likeId => {
                            User.findById(likeId)
                                .then(user => {
                                    user.comment_likes = user.comment_likes.filter(item => item.toString() !== commentid)
                                    user.save().then(user => res.json(user));
                                })
                        })
                    })
                    .then(() => res.json(commentid));
                // }
            })
            .catch(err =>
                res.status(404).json({ nocommentfound: 'No Comment Found With That ID' })
            )
    }
)

module.exports = router;
