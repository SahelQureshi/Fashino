const mongoose=require('mongoose')


const productSchema=mongoose.Schema({
    product_img:String,
    name:String,
    price:Number,
    description:String,
    discount:{
        type:Number,
        default:0
    }

})

module.exports=mongoose.model('product',productSchema);