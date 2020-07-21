const express = require("express");
const signupRouter = express.Router(); 

var router = (nav)=>{

    signupRouter.get('/',(req,res)=>{
        res.render('signup',{
            title: 'Signup',
            nav
        })
    })

    return signupRouter;

}

module.exports = router;