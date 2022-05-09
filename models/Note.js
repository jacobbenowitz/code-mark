const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  codebody: {
    type: String,
    required: true
  },
  title: {
      type: String
  },
  textdetails: {
      type: String
  }
},
{timestamps: true}
);

module.exports = Note = mongoose.model('note', NoteSchema);