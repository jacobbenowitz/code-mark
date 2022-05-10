const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    note: {
        type: Schema.Types.ObjectId,
        ref: 'notes'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    textbody: {
        type: String,
        required: true
    }
},
{timestamps: true}
);

module.exports = Comment = mongoose.model('comment', CommentSchema);