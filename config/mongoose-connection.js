const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/fashino').then(()=>{
    console.log('Data Base connected');
}).catch((err)=>{
    console.log(err);
})

module.exports=mongoose.connect;