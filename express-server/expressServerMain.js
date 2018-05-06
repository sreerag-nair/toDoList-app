var express = require('express');
var mongo = require('mongodb').MongoClient
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var app = express();
var configurationData = require('./config');

//this is working....till now

//THE DEFAULT PATH
app.post('/',function(req,res){
        console.log("Hello there");
        // Storage
        console.log(req)
    })


app.listen(8001);