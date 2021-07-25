var createError = require('http-errors');
var express=require('express');
var app=express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore=require('session-file-store')(session);

var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

const mongoose=require('mongoose');
const signups=require('./models/submitSignup');

const url = 'mongodb+srv://admin-naveen0029:Naveen123@cluster0.j0gwg.mongodb.net/myFirstDatabase';
const connect = mongoose.connect(url,{useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology:true});

connect.then((db) => {
    console.log('connected directly to the server');
}, (err) => { console.log(err); });

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');



app.use(express.static(__dirname + '/Bootstrap4'));
var indexRouter=require('./routes/indexrouter');

app.use(session({
  name:'session-id',
  secret:'12345-67890-09876-54321',
  saveUninitialized:false,
  resave:new FileStore()

}));
app.use('/',indexRouter);

function auth(req,res,next){
  console.log(req.session);
  if(!req.session.user){
    var err=new Error('You are not authenticated!');
    err.status=403;
    return next(err);
  }
  else{
    if(req.session.user==='authenticated'){
      next();
    }
    else{
      var err=new Error('You are not authenticated!');
      err.status=403;
      return console.log(err);
    }
  }

}
app.use(auth);


var server=app.listen(process.env.PORT||3000,function(){
      console.log('server is running at 3000');
  });
  
 module.exports = app;
//var server=app.listen(271017,function(){
  //  console.log("server is running at 4000..");
//});