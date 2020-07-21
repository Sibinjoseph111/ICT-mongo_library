const express = require("express");
const _ = require('lodash');

const userModel = require('../models/userData');

const userRouter = express.Router(); 

var router = (nav)=>{

    userRouter.get('/login',(req,res)=>{
        res.render('login',{
            title: 'Login',
            nav,
            alerts: false
        });
    });

    userRouter.get('/signup',(req,res)=>{
        res.render('signup',{
            title: 'Signup',
            nav,
            alerts:false
        })
    });

    userRouter.post('/login',(req,res)=>{
       
        userModel.findOne({email: req.body.email}).then((user)=>{
            if(req.body.password == user.password){
                res.redirect('/books');
            }else res.send('Email and password donot match');
        }).catch((err)=>{
            res.send('User not found');
        });

    });

    userRouter.post('/signup',(req,res)=>{

        var data = _.pick(req.body,['username','email','password']);

        var user = new userModel(data);
        user.save().then((user)=>{
            console.log(user);
            res.redirect('/user/login');
        },(err)=>{
            res.send('Email already exists')
        });
       
    });

    return userRouter;

}

module.exports = router;