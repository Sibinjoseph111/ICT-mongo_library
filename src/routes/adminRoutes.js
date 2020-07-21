const express = require("express");
const _ = require('lodash');
var multer  = require('multer')

var upload = multer({ dest: 'public/images/' })

const bookModel = require('../models/bookData');
const authorModel = require('../models/authorData');

const adminRouter = express.Router(); 

var router = (nav)=>{

    adminRouter.get('/addbook',(req, res)=>{
        res.render('addbook',{
            nav, 
            title: 'Add New Book'
        })
    });

    adminRouter.get('/addauthor',(req, res)=>{
        res.render('addauthor',{
            nav, 
            title: 'Add New Book'
        })
    });

    adminRouter.post('/addbook', upload.single('image'), (req,res)=>{

        var data = _.pick(req.body,['title', 'author', 'genre']);
        data.image = req.file.filename;

        var book = new bookModel(data);
        book.save().then((newBook)=>{
            console.log(newBook);
            res.redirect('/books');
        });

    });

    adminRouter.post('/addauthor',upload.single('image'),(req,res)=>{

        var data = _.pick(req.body,['name']);
        data.image = req.file.filename;

        var author = new authorModel(data);
        author.save().then((newauthor)=>{
            console.log(newauthor);
            res.redirect('/authors');
        });

    });

    adminRouter.post('/editbook/:id', upload.single('image'), (req,res)=>{

        var data = _.pick(req.body,['title', 'author', 'genre']);
        data.image = req.file.filename;
        
        bookModel.findByIdAndUpdate(req.params.id, {$set: data}, {new: true}).then((newBook)=>{
            console.log(newBook);
            res.redirect('/books')
        });
    });

    adminRouter.get('/deletebook/:id', (req,res)=>{

        bookModel.findByIdAndDelete(req.params.id).then(()=>{
            res.redirect('/books');
        })

    });

    adminRouter.post('/editauthor/:id', upload.single('image'), (req,res)=>{

        var data = _.pick(req.body,['name']);
        data.image = req.file.filename;
        
        authorModel.findByIdAndUpdate(req.params.id, {$set: data}, {new: true}).then((newAuthor)=>{
            console.log(newAuthor);
            res.redirect('/authors')
        });
    });

    adminRouter.get('/deleteauthor/:id', (req,res)=>{

        authorModel.findByIdAndDelete(req.params.id).then(()=>{
            res.redirect('/authors');
        })

    });

    return adminRouter;

}

module.exports = router;