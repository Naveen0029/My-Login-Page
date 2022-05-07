var express = require('express');
var passport= require('passport');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const authenticate = require('../authenticate')


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

indexRouter.get('/secret',authenticate.verifyUser,function(req,res){
    //return res.sendFile('./Backend/Bootstrap4/index.html');
    res.sendFile('secret.html', { root: './Bootstrap4' });
});


indexRouter.post('/signup',function(req,res){
    signups.findOne({Email:req.body.Email})
    .then((user)=>{
        if(user!=null){
            var err = new Error('User ' + req.body.Email + 'already exists!');
            err.status=403;
            res.redirect('/');
        }
        else{

            const saltHash = authenticate.genPassword(req.body.Password);

            const salt = saltHash.salt;
            const hash = saltHash.hash;

            const newUser = new signups({
                Email:req.body.Email,
                hash:hash,
                salt:salt,
                Address:req.body.Address,
                Address2:req.body.Address2,
                City:req.body.City,
                State:req.body.State,
                Zip:req.body.Zip
            })
            newUser.save()
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
    
});
indexRouter.post('/submit-data',function(req,res){
      signups.findOne({Email:req.body.Email})
      .then((user)=>{
          if(!user){
              return res.status(401).json({sucess:false,
                msg:"could not find user"});
          }
        //   console.log(`i am user ${user}`);
          
          const isValid = authenticate.isvalidPassword(req.body.Password,user.hash1,user.salt1);
          
          if(isValid){
            //   console.log('i am here');
              const tokenObj = authenticate.generateToken(user);
              res.header('Authorization ',tokenObj).status(200).send(tokenObj);

          }
          else{
              res.status(401).json({sucess: false,msg:"You entered wrong password"});
          }
      })
      .catch((err)=>{
          res.status(401).json({success:false,msg:"some error occured"});
      })

});

indexRouter.get('/logout', (req, res) => {
    if (req.session) {
      req.session.destroy();
      res.clearCookie('session-id');
      res.redirect('/');
    }
    else {
      var err = new Error('You are not logged in!');
      err.status = 403;
      console.log(err);
    }
  });


module.exports=indexRouter;

