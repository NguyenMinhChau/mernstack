const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = mongoose.Schema({
    content: {type: String, required: [true, "Articles must have content"], trim: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', Post);