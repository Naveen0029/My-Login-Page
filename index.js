var createError = require('http-errors');
var express=require('express');
var app=express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore=require('session-file-store')(session);
const passport = require('passport');

var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

const mongoose=require('mongoose');
const signups=require('./models/submitSignup');

const {url} = require('./config');
const connect = mongoose.connect(url,{useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology:true});

connect.then((db) => {
    console.log('connected directly to the server');
}, (err) => { console.log(err); });

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');



app.use(express.static(__dirname + '/Bootstrap4'));
var indexRouter=require('./routes/indexrouter');

app.use(passport.initialize());
app.use('/',indexRouter);

var server=app.listen(process.env.PORT||3000,function(){
      console.log('server is running at 3000');
  });
  
 module.exports = app;
//var server=app.listen(271017,function(){
  //  console.log("server is running at 4000..");
//});