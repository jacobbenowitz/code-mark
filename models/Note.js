const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  user: {
    // type: Schema.Types.ObjectId,
    // ref: 'users'
    type: Object
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
  },
  comments: [{type: Schema.Types.ObjectId, ref:"comments"}],
  resources: [Object],
  tags: [String],
  likes: [{type: Schema.Types.ObjectId, ref:"users"}],
  public: {
    type: Boolean,
    default: true
  }
},
{timestamps: true}
);

module.exports = Note = mongoose.model('note', NoteSchema);