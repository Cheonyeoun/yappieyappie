const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:
        {
            type:String,
            required:true
        },
    username:
        {
            type:String,
            required:true,
            unique:true
        },
    email:
        {
            type:String,
            required:true,
            unique:true
        },
    password:
        {
            type:String,
            required:true
        },
    image:
        {
            type:String,
            default:""
        }
        
},

{ timestamps: true }
)  

const User = mongoose.model('User',userSchema);
module.exports = User;