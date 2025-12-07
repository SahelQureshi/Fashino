const mongoose=require('mongoose')



const userSchema=mongoose.Schema({
    first_name:String,
    last_name:String,
    user_name:String,
    email:String,
    password:String,
    contact_no:Number,
    age:Number,
    date_of_birth:Number,
    address_1:String,
    address_2:String,
    city:String,
    pin_code:Number,
    cart:{
        type:Array,
        default:[]
    },
    user_img:{
        type:String,
        default:"default.png"
    },
    orders:{
        type:Array,
        default:[]
    }

})

module.exports=mongoose.model('user',userSchema);