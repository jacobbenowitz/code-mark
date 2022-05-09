const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    Title: {
      type: String,
      required: false
    },
    codebody: {
      type: String,
      required: true
    },
    additionalnotes: {
      type: String,
      required: false
    }
    }, {timestamps: true}
)

module.exports = Note = mongoose.model('Note', NoteSchema);