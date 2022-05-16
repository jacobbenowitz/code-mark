const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    note: {
        type: Schema.Types.ObjectId,
        ref: 'notes'
    },
    user: {
        // type: Schema.Types.ObjectId,
        // ref: 'users'
        type: Object
        // ref: 'users'
    },
    textbody: {
        type: String,
        required: true
    },
    codeSnippet: {
        type: String
    }
},
{timestamps: true}
);

module.exports = Comment = mongoose.model('comment', CommentSchema);