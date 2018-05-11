
var mongoose = require('mongoose');
var mongodb = require('mongodb').MongoClient;



//the location of the Server
var db = 'mongodb://localhost:27017/';
//establishing connection
db = mongoose.createConnection(db);
// selecting database
var localDB = db.useDb('local');



var userTableSchema = new mongoose.Schema({

    username : String,
    name : String,
    emailId : String,
    // password will be hashed
    password : String,
    profilePhoto : Buffer

})


var notesTableSchema = new mongoose.Schema({

    // id of the user who created it
    uId : String,
    title : String,
    date : Date,
    isDeleted : Boolean 

})

var contentTableSchema = new mongoose.Schema({


    // the id of the note it is present in
    notesID : String,     
    content : String,        
    isChecked : Boolean

})


var userTableSchema = localDB.model('userTableSchema',userTableSchema)
var notesTableSchema = localDB.model('notesTableSchema',notesTableSchema)
var contentTableSchema = localDB.model('contentTableSchema',contentTableSchema) 


// --------------------------- Objects for testing ---------------------------------------
var usersObj = new userTableSchema({
    username : 'anakin',
    name : "Anakin Skywalker",
    emailId : 'test123@gmail.com',
    // password will be hashed
    password : 'ThisIsAPassword',
    // profilePhoto : Buffer

})

var notesObj = new notesTableSchema({

    uId : "USER ID IN NOTES COLLECTION",
    title : 'NOTES OBJECT',
    date : new Date(),
    isDeleted : true 

})

var contentTableSchema = new contentTableSchema({
    notesID : 'SOMETHING GOES HERE',
    content : 'each individual check list entry',
    isChecked : true

})

// --------------------------- Objects for testing ---------------------------------------

usersObj.save(function(err){
    
    if(err) throw err

    console.log('Insert Successful!')

})

notesObj.save(function(err){
    if(err) throw err

    console.log('Insert Successful!')

})

contentTableSchema.save(function(err){
    if(err) throw err

    console.log('Insert Successful!')

})


db.on('error',console.error.bind(console,"SOME CRAPPY ERROR OCCURED!"))

db.once('open',function(){
    console.log('PIZZAH!');
    // this.close()

})
