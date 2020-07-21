const express = require("express");
const loginRouter = express.Router(); 

var router = (nav)=>{

    loginRouter.get('/',(req,res)=>{
        res.render('login',{
            title: 'Login',
            nav
        });
    })

    return loginRouter;

}

module.exports = router;

