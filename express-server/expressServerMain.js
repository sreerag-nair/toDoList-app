var express = require('express');
var mongo = require('mongodb').MongoClient
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var app = express();
var bodyParser = require('body-parser');
var configurationData = require('./config');
var passport = require('passport')
var passportJWT = require('passport-jwt')

//THIS IS THE DEFAULT WAY OF PARSING POST REQUEST 
// app.use(bodyParser.urlencoded({extended : false}))





// JSON FORMAT
// {
//      "asas" : "sdf" 
// }
// use double quotes only



//very important as u are receiving a JSON object
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


  
// ------------------MOCK METHODS AND DATA--------------
var users ={
    id: 1,
    name: 'Sreerag',
    password: 'qwerty'
  }
  

  app.post('/test',function(req,res){
    // res.json({message : 'All set and working'});

    var name, pwd;

    if(req.body.username && req.body.password){
         name = req.body.username
         pwd = req.body.password
    }

    console.log("Username recvd : " , req.body);
    console.log("Password recvd : " , req.body.password);

    if(name != users.name)
        res.status(401).json({ error : "USERNAME NOT FOUND! "})

    if(pwd === users.password){
        var payload = {id : users.id};

        //THE SIGNING FUNCTIONATLITY IE. THE TOKEN GENERATION
        var token = jwt.sign(payload, configurationData.secretKey)
        res.json({message : "OK", token : token})
    }

})
// ------------------MOCK METHODS AND DATA-------------


//THE DEFAULT PATH ie. FOR LOGGING IN
app.post('/',function(req,res){
        console.log("SIGN IN");
        // Storage
        console.log(req.body)
        res.send(req.body)
    })

// FOR SIGNING UP
app.post('/signup',function(req,res){
        console.log("SIGN UP");

        //THE req object recieved is not json
        console.log(req.body.email)
        res.send(req.body)
    })





app.listen(8001,function(){
    console.log("SERVER RUNNING AT 8001");
});