const express=require('express');
require("dotenv").config();
const app=express();

const db=require('./config/mongoose-connection')

const ownersRouter=require('./routes/ownersRouter')
const usersRouter=require('./routes/usersRouter')
const productsRouter=require('./routes/productsRouter')



const cookieParse=require('cookie-parser')
const path=require('path');
const PORT=3000;




app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParse());
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');


app.use('/owners',ownersRouter);
app.use('/users',usersRouter);
app.use('/products',productsRouter);


app.listen(PORT,()=>{
    console.log(`Server running on:\nhttp://localhost:${PORT}`);
})
