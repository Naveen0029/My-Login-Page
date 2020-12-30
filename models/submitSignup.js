const mongoose=require('mongoose');
const Schema=mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const currency = mongoose.Types.currency;

const signupSchema = new Schema({
    Email:{
        type:String,
       // required:true,
        unique:true
    },
    Password:{
        type:String
        //required:true
        
    },
    Address:{
         type:String
         //required:true

    },
    Address2:{
         type:String
         //required:true
    },
    City:{
         type:String
        //required:true
    },
    State:{
         type:String
         //required:true
    },
    Zip:{
         type:String
         //required:true
    }
},{
    timestamps:true
});

var signups=mongoose.model('siginup',signupSchema);
module.exports = signups;