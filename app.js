var express = require('express');
var app=express();
var bodyParser=require('body-parser')


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/SampleDatabase";


app.post('/signup',function(req, res){
  console.log(req);
var first=req.body.firstName;
  var last=req.body.lastName;
  var email=req.body.email;
  var pass=req.body.password;
  var date=req.body.date;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("SampleDatabase");



  var myobj = {firstName: first, lastName: last, email: email, password: pass};
  dbo.collection("tasks").insertOne(myobj, function(err, res) {
    if (err) throw err;
  
   
    db.close();
  });
  res.sendFile('/Users/A/Desktop/sample/login.html');
}); 
}); 

app.get('/demo',function(req, res){
	 res.sendFile('/Users/A/Desktop/sample/login.html');
});

app.get('/sign',function(req, res){
   res.sendFile('/Users/A/Desktop/sample/signup.html');
});


app.post('/login',function(req, res){
 
  var email=req.body.email;
  var pass=req.body.password;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("SampleDatabase");
  dbo.collection("tasks").findOne({email:email,password:pass}, function(err, result) {
    if (err) throw err;
    if(result){
   res.sendFile('/Users/A/Desktop/sample/welcome.html');
    
  }else{
    res.sendFile('/Users/A/Desktop/sample/error.html');
  }
db.close();
  });
}); 

});



app.listen(3000);