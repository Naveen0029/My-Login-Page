const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');
const Schema=mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const currency = mongoose.Types.currency;


const signupSchema = new Schema({
    Email:{
        type:String,
        unique:true,
        default:""
    },
    hash1: {
         type:String,
         default:""
    },
    salt1: {
         type:String,
        
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

signupSchema.plugin(passportLocalMongoose);
var signups=mongoose.model('siginup',signupSchema);
module.exports = signups;