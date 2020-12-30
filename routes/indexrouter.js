var express = require('express');

const bodyParser=require('body-parser');
const mongoose=require('mongoose');


const signups=require('../models/submitSignup');
const { db } = require('../models/submitSignup');
var indexRouter = express.Router();
indexRouter.use(bodyParser.json({ type: 'application/*+json' })); // parse various different custom JSON types as JSON
indexRouter.use(bodyParser.json());

indexRouter.get('/',function(req,res){
    res.sendFile('./Backend/Bootstrap4/index.html');
});
indexRouter.get('/signup',function(req,res){
    //return res.sendFile('./Backend/Bootstrap4/index.html');
    res.sendFile('Result.html', { root: './Bootstrap4' });
});
indexRouter.post('/signup',function(req,res){
    signups.findOne({Email:req.body.Email})
    .then((user)=>{
        if(user!=null){
            var err = new Error('User ' + req.body.Email + 'already exists!');
            err.status=403;
            console.log(err);
        }
        else{
            signups.create(req.body)
            .then((signup)=>{
            console.log("Your account is created",signup);   
           res.statusCode = 200;
            return  res.redirect('/signup');
            })
           .catch((err)=>{
           console.log((err));
           }); 
      }
    });
    
    

    /*
    var email=req.body.Email;
    var password=req.body.Password;

    var data={
        "Email":email,
        "Password":password
    }
    db.collection('details').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
              
    }); 
          
    return res.redirect('signup_success.html'); */
});
indexRouter.post('/submit-data',function(req,res){
       if(!req.session.user){
           var authHeader=req.body.Email;

           if(!authHeader){
            var err=new Error ('You are not authenticated!');
            res.setHeader('WWW-Authenticate','Basic');
            err.status=401;
            return console.log(err); 
           }
           /*var auth= new Buffer.from(authHeader.split(' ')[1],'base64').toString().split(':');
           var Email=auth[0];
           var password=auth[1];*/
           var Email=req.body.Email;
           var password=req.body.password;
        

        signups.findOne({Email:Email})
        .then((user)=>{
            if(user==null){
                var err=new Error('User' + + Email + ' does not exist!');
                err.status = 403;
                return console.log(err);
            }
            else if (user.Password !== password) {
                var err = new Error('Your password is incorrect!');
                err.status = 403;
                return console.log(err);
              }
            else if (user.Email === Email && user.Password === password) {
                req.session.user = 'authenticated';
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                console.log('yupppp');
                res.end('You are authenticated!')
            }
        })
        .catch((err)=>console.log(err));
    }
    else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('You are already authenticated!');
      }
});


module.exports=indexRouter;

