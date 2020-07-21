const express = require("express");
const authorsRouter = express.Router(); 

const authorModel = require('../models/authorData');

var router = (nav)=>{

    authorsRouter.get('/',(req,res)=>{

        authorModel.find().then((authors)=>{
            res.render('authors',{
                authors,
                title: 'Authors',
                nav
            });
        });
    });

    authorsRouter.get('/:id/edit', (req,res)=>{

        authorModel.findOne({_id: req.params.id}).then((author)=>{
            res.render('editAuthor',{
                nav,
                title: 'Edit Author',
                author: author
        
            });
        });

    });
   

    return authorsRouter;

}

module.exports = router;