const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    ,
    notes: [{type: Schema.Types.ObjectId, ref: "notes"}],
    comments: [{type: Schema.Types.ObjectId, ref: "comments"}],
    note_likes: [{type: Schema.Types.ObjectId, ref: "notes"}],
    comment_likes: [{type: Schema.Types.ObjectId, ref: "comments"}],
    following: [{type: Schema.Types.ObjectId, ref: "users"}],
    followers: [{type: Schema.Types.ObjectId, ref: "users"}],
    color: {
        type: String
    }
    }, 
    {timestamps: true}
)

module.exports = User = mongoose.model('User', UserSchema);