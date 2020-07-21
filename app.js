const express = require("express");


const mongoose = require('./src/models/mongoose');

const nav = 
[
    {link: '/books', name: 'Books'},
    {link: '/authors', name: 'Authors'},
    {link: '/admin/addbook',name: 'Add Book'},
    {link: '/admin/addauthor', name: 'Add Author'}
]

const booksRouter = require('./src/routes/bookRoutes')(nav);
const authorsRouter = require('./src/routes/authorRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const userRouter = require('./src/routes/userRoutes')(nav);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));
app.set("view engine", 'ejs');
app.set('views','./src/views');
app.use('/books',booksRouter);
app.use('/authors',authorsRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);

app.get('/',(req,res)=>{
    res.render(`index`,
    {
        nav,
        title: 'Library'
    });
});



app.listen(3000,()=>{
    console.log('App started')
});