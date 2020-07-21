const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({

    name: String,
    image: String

});

var AuthorModel = mongoose.model('Author', AuthorSchema);

module.exports = AuthorModel;