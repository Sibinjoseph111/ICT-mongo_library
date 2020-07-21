const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    image: String
});

var BookModel = mongoose.model('book',BookSchema);

module.exports = BookModel;