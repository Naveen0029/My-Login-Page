var express = require('express');

const bodyParser=require('body-parser');
const mongoose=require('mongoose');


const signups=require('../models/submitSignup');
var indexRouter = express.Router();
indexRouter.use(bodyParser.json({ type: 'application/*+json' })); // parse various different custom JSON types as JSON
indexRouter.use(bodyParser.json());

indexRouter.get('/',function(req,res){
    res.sendFile('./Backend/Bootstrap4/index.html');
});
indexRouter.post('/',function(req,res){
    signups.create(req.body)
    .then((signup)=>{
        console.log("Your account is created",signup);   
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
       // var name=signup.Email;
        //res.send(name+"is your email id");
        return res.json(signup);
    })
    .catch((err)=>{
        console.log((err));
    });
});
indexRouter.post('/submit-data',function(req,res){
    var name=req.body.username;
    res.send(name+" you are succesfully logged in!");    
});


module.exports=indexRouter;

