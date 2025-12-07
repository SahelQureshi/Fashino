require("dotenv").config();
const express=require('express');
const cookieParse=require('cookie-parser')
const app=express();

const db=require('./config/mongoose-connection')

const ownersRouter=require('./routes/ownersRouter')
const usersRouter=require('./routes/usersRouter')
const productsRouter=require('./routes/productsRouter')

const expressSession=require('express-session')
const flash=require('connect-flash');



const path=require('path');
const { isLoggedIn } = require('./middlewares/isLoggedIn');
const PORT=3000;




app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(expressSession({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESS_SECRET,

}))

app.use(flash())
app.use(cookieParse());
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');

app.get('/',isLoggedIn,(req,res)=>{
    res.render('index.ejs');

});


app.use('/owners',ownersRouter);
app.use('/users',usersRouter);
app.use('/products',productsRouter);


app.listen(PORT,()=>{
    console.log(`Server running on:\nhttp://localhost:${PORT}`);
})
