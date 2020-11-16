var express=require('express');
var app=express();

var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));


app.use(express.static(__dirname + '/Bootstrap4'));

app.get('/',function(req,res){
    res.sendFile('./Backend/Bootstrap4/index.html');
})

app.post('/submit-data',function(req,res){
    var name=req.body.username;
    res.send(name+" you are succesfully logged in!");    
});

var server=app.listen(4000,function(){
    console.log("server is running at 4000..");
});