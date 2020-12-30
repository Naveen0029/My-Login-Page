var express=require('express');
const bodyParser=require('body-parser');
var User=require('../models/submitSignup');

var usersRouter=express.Router();
usersRouter.use(bodyParser.json());

