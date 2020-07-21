const express = require("express");

const bookModel = require('../models/bookData');

const booksRouter = express.Router(); 

var router = (nav)=>{
    
    booksRouter.get('/',(req,res)=>{

        bookModel.find().then((books)=>{
            res.render('books',
            {
                nav,
                title: 'Books',
                books
            });
        });
    }); 
    
    booksRouter.get('/:id',(req,res)=>{

        bookModel.findOne({_id: req.params.id}).then((book)=>{
            res.render('book',{
                nav,
                title: 'Books',
                book: book
        
            });
        });
       
    });

    booksRouter.get('/:id/edit', (req,res)=>{

        bookModel.findOne({_id: req.params.id}).then((book)=>{
            res.render('editBook',{
                nav,
                title: 'Books',
                book: book
        
            });
        });

    });

    return booksRouter;
}


module.exports = router;


