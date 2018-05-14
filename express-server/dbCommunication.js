
var configurationData = require('./config')
var mongoose = require('mongoose');





//get the database connection
// var db = mongoose.createConnection(configurationData.database);

// var localDB = db.useDb('local')


// var userTableSchema = new mongoose.Schema({

//     username : String,
//     name : String,
//     emailId : String,
//     // 'password' will be hashed 
//     password : String,
//     profilePhoto : Buffer,
//     // the token of the user
//     key : String

// })


// var notesTableSchema = new mongoose.Schema({

//     // id of the user who created it
//     uId : String,
//     title : String,
//     date : Date,
//     isDeleted : Boolean 

// })

// var contentTableSchema = new mongoose.Schema({


//     // the id of the note it is present in
//     notesID : String,     
//     content : String,        
//     isChecked : Boolean

// })



var userTableSchema = localDB.model('userTableSchema',userTableSchema)
var usersObj = new userTableSchema({
    username : 'leia',
    name : "Leia Skywalker",
    emailId : 'leiaben@gmail.com',
    // password will be hashed
    password : 'ThisIsAPassword',
    // profilePhoto : Buffer

})

usersObj.save(function(err){
    
    if(err) throw err

    console.log('Insert Successful!')

})

db.on('error',console.error.bind(console,"SOME CRAPPY ERROR OCCURED!"))

db.once('open',function(){
    console.log('PIZZAH!');
    // this.close()

})

// ----------------------------THE DB SCHEMA-----------------------------

            
var userTableSchema = new mongoose.Schema({

    username : String,
    name : String,
    emailId : String,
    // 'password' will be hashed 
    password : String,
    profilePhoto : Buffer,
    // the token of the user
    key : String

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

//----------------------------------------------------------------------- 


// ---------------------------THE ACTUAL CRUD OPS------------------------

var createDatabaseConnection = (function(){
        //establish connection to the db with 'local' as db name    
        var db;

        function createConnection(){
            var dbase = mongoose.createConnection(configurationData.database);
            var db = dbase.useDb('local')
            return db;
        }

        return {
            getInstance : function(){
                    if(!db)
                        db = createInstance();
                    return db;
            }
        }
})();

export function create(userCredentialsJSONObject){
    //insert operation

    // JSON OBJ {
    //     usernameSignUp : ... ,
    //     passwordSignUp : ...
    // }

    var dbHandle = createDatabaseConnection.getInstance();
    var userTableSchema = dbHandle.model('userTableSchema',userTableSchema)

    
}


export function read(){
    
}

export function update(){

}

//  delete is a keyword
export function remove(){

}

// ----------------------------------------------------------------------

