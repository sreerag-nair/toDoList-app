var express = require('express');
var mongo = require('mongodb').MongoClient
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var app = express();
var bodyParser = require('body-parser');
var configurationData = require('./config');

//this is working....till now

//THIS IS THE DEFAULT WAY OF PARSING POST REQUEST VALUES
// app.use(bodyParser.urlencoded({extended : false}))

//very important as u are receiving a JSON object
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


//THE DEFAULT PATH
app.post('/',function(req,res){
        console.log("Hello there");
        // Storage
        console.log(req.body)
        res.send(req.body)
    })


app.listen(8001);