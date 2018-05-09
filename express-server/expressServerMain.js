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


//         THE MIDDLEWARE FUNCTION         //

function tokenChecker(req,res,next){
    
    switch(req.route.path){
        case '/':
        console.log("def path");
        console.log("def path");
        console.log("def path");
        break;

        case '/signup':
        console.log("signup");
        break;

        case '/logout':
        //call a function that deletes the token from
        //the database
        // the localstorage item will be deleted by the app after getting a specific request
        //from here 
        console.log("Logout");
        break;

        default:
        console.log("DEFAULT STATE");
        break;
    }
    console.log("TokenCheckingMiddleware : " , req.body);
    next();     //THIS IS IMPORTANT
}

//         THE MIDDLEWARE FUNCTION ENDS   //



app.post('/logout',function(req, res){
    console.log("GOT LOGOUT");
    res.end();
})

//very important as u are receiving a JSON object
app.use(bodyParser.json())


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



var users ={
    id: 1,
    name: 'Sreerag',
    password: 'qwerty'
  }
  

  app.post('/',tokenChecker ,function(req,res){

    // res.json({ hello : 'There' })
    var name, pwd;

    if(req.body.userNameSignIn && req.body.passwordSignIn){
         name = req.body.userNameSignIn
         pwd = req.body.passwordSignIn
    }
    

    if(name != users.name)      //TALK TO THE DATABASE
        res.status(401).json({ error : "USERNAME NOT FOUND! "})

    if(pwd === users.password){
        var payload = {id : users.id};

        //THE SIGNING FUNCTIONATLITY IE. THE TOKEN GENERATION
        var token = jwt.sign(payload, configurationData.secretKey)
        res.json({message : "OK", token : token})
    }

})


//THE DEFAULT PATH ie. FOR LOGGING IN
// app.post('/',function(req,res){
//         console.log("SIGN IN");
//         // Storage
//         console.log(req.body)

//         // TO SIMULATE THE SPINNERCLASS ADDITION AND REMOVAL FROM THE APP
//         // setTimeout(function(){
//         //     res.send(req.body)
//         // }
//         // ,3000);

//         res.send(req.body)
        
//     })

// FOR SIGNING UP
app.post('/signup', tokenChecker ,function(req,res){
        console.log("SIGN UP");

        //THE req object recieved is not json
        // console.log(req.route.path)
        // res.send(req)
    })

app.post('/logout', function(req,res){
    console.log('Logged out')
})




app.listen(8001,function(){
    console.log("SERVER RUNNING AT 8001");
});