const mongoose=require('mongoose')
const debg=require('debug')('development:mongoose');

mongoose.connect(`${process.env.DB_URL}`).then(()=>{
    debg('Data Base connected');
}).catch((err)=>{
    debg(err);
})

module.exports=mongoose.connection;