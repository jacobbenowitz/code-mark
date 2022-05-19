const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
    keyword: {
        type: String
    },
    link: {
        type: String
    },
    title: {
        type: String
    }
},
{timestamps: true}
);

module.exports = Resource = mongoose.model('resource',ResourceSchema);