const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const crypto = require('crypto');

const jwt = require('jsonwebtoken');
const {secretKey} = require('./config');
const signups = require('./models/submitSignup');



exports.genPassword = function(password){
    console.log('i am genPassword');
    console.log(password);
    let salt = crypto.randomBytes(32).toString('hex');
    let genHash = crypto.pbkdf2Sync(password,salt,10000,64, 'sha512').toString('hex');

    return  {
        salt:salt,
        hash:genHash
    }
};

exports.isvalidPassword = function(password,hash,salt){
    console.log(password);
    console.log(hash);
    console.log(salt);
    console.log('i am in isvalidPassword');
    let hashVerify = crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex');
    return hash===hashVerify;

}

exports.generateToken = function(user){

    const payload = {
        sub:user._id,
        iat:Date.now()
    }
    console.log(secretKey);
    return "Bearer "+jwt.sign(payload,secretKey,{expiresIn:3600});
}

var opts={
    jwtFromRequest :ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : secretKey
}

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload,done)=>{
        console.log('jwt_payload:',jwt_payload);
        signups.findOne({_id:jwt_payload.sub},(err,user)=>{
            if(err){
                return done(err,false);
            }
            else if(user){
                return done(null,user);
            }
            else {
                return done(null,false);
            }
        })

    }));

passport.serializeUser(signups.serializeUser());
passport.deserializeUser(signups.deserializeUser());

exports.verifyUser = passport.authenticate('jwt',{session:false});
