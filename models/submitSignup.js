const mongoose=require('mongoose');

const Schema=mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const currency = mongoose.Types.currency;


const signupSchema = new Schema({
    Email:{
        type:String,
        unique:true
    },
    Password:{
        type:String,
        required:true
    },
    Address:{
         type:String,
         default:{}
    },
    Address2:{
         type:String
         
    },
    City:{
         type:String,
         defualt:{}   
    },
    State:{
         type:String,
         defualt:{}
    },
    Zip:{
         type:String,
         defualt:{}
         
    }
},{
    timestamps:true
});


var signups=mongoose.model('siginup',signupSchema);
module.exports = signups;