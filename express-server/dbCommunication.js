
var configurationData = require('./config')
var mongoose = require('mongoose');





//get the database connection
// var db = mongoose.createConnection(configurationData.database);

// var localDB = db.useDb('local')





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

// var userTableSchema = localDB.model('userTableSchema', userTableSchema)
// var usersObj = new userTableSchema({
//     username: 'leia',
//     name: "Leia Skywalker",
//     emailId: 'leiaben@gmail.com',
//     // password will be hashed
//     password: 'ThisIsAPassword',
//     // profilePhoto : Buffer

// })

// usersObj.save(function (err) {

//     if (err) throw err

//     console.log('Insert Successful!')

// })

// db.on('error', console.error.bind(console, "SOME CRAPPY ERROR OCCURED!"))

// db.once('open', function () {
//     console.log('PIZZAH!');
//     // this.close()

// })



// ---------------------------THE ACTUAL CRUD OPS------------------------


// ---------------------------SINGLETON OBJECTS---------------------------

//used to return a handle of a singleton database connection
var createDatabaseConnection = (function () {
    //establish connection to the db with 'local' as db name    
    var db;

    function createConnection() {
        var dbase = mongoose.createConnection(configurationData.database);
        var db = dbase.useDb('local')
        return db;
    }

    return {
        getInstance: function () {
            if (!db)
                db = createConnection();
            return db;
        }
    }
})();

//used to return a handle of a singleton 'userTableSchema' collection
var userTableSchemaHandle = (function () {
    var userTableSchemaHandle;

    function mountUserTableSchema(db) {
        userTableSchemaHandle = new mongoose.Schema({

            username: String,
            name: String,
            emailId: String,
            // 'password' will be hashed 
            password: String,
            profilePhoto: Buffer,
            // the token of the user
            key: String

        })
        // console.log("utS : " , userTableSchemaHandle)
        return userTableSchemaHandle;
    }

    return {
        getInstance: function (db) {
            if (!userTableSchemaHandle)
                userTableSchemaHandle = mountUserTableSchema(db)
            
            return userTableSchemaHandle;
        }
    }
})();

//used to return a handle of a singleton 'userTableSchema' collection
var notesTableSchemaHandle = (function () {
    var notesTableSchemaHandle;

    function mountNotesTableSchema(db) {
        notesTableSchemaHandle = new mongoose.Schema({

            // id of the user who created it
            uId: String,
            title: String,
            date: Date,
            isDeleted: Boolean

        })
        return notesTableSchemaHandle;
    }

    return {
        getInstance: function (db) {
            if (!notesTableSchemaHandle)
                notesTableSchemaHandle = mountNotesTableSchema(db)

            return notesTableSchemaHandle;
        }
    }
})();

//used to return a handle of a singleton 'userTableSchema' collection
var contentTableSchemaHandle = (function () {
    var contentTableSchemaHandle;

    function mountContentTableSchema(db) {
        contentTableSchemaHandle = new mongoose.Schema({

            username: String,
            name: String,
            emailId: String,
            // 'password' will be hashed 
            password: String,
            profilePhoto: Buffer,
            // the token of the user
            key: String

        })
        return contentTableSchemaHandle;
    }

    return {
        getInstance: function (db) {
            if (!contentTableSchemaHandle)
                contentTableSchemaHandle = mountContentTableSchema(db)

            return contentTableSchemaHandle;
        }
    }
})();


// call and destructure to get all ready-to-use handles....
function getHandles(){
    //get the singleton instance of db
    var dbHandle = createDatabaseConnection.getInstance();

    //get the singleton instance of all the 3 collections...
    var userCollection = dbHandle.model('userTableCollection', userTableSchemaHandle.getInstance());
    var notesCollection = dbHandle.model('notesTableCollection', notesTableSchemaHandle.getInstance());
    var contentCollection = dbHandle.model('contentTableCollection', contentTableSchemaHandle.getInstance());
    return { userCollection , notesCollection , contentCollection }
}
// ---------------------------------SINGLETON OBJECTS-----------------------


var { userCollection , notesCollection , contentCollection } = getHandles()

exports.create = function (userCredentialsJSONObject) {
    //insert operation

    // var dbHandle = createDatabaseConnection.getInstance();
    // var userTableSchemaz = dbHandle.model('userTableCollection', userTableSchemaHandle.getInstance());  
    var mountedObj = new userCollection(userCredentialsJSONObject)

    //TRY USING THE ALTERNATE - CREATE()!!
    mountedObj.save({upsert : true} , function (err) {
        if (err) throw err

        console.log("INSERTED : " , userCredentialsJSONObject)
    })

}


exports.read = function () {

    userCollection.find({username : 'yoda'}, function(err, msg){
        if(err) throw err
        console.log("msg : " , msg)
    })

}

exports.update = function () {

}

//  delete is a keyword
exports.remove = function () {

}

function searchUserCreds(emailId) {

    // var dbHandle = createDatabaseConnection.getInstance();

    //generate query object for a specific collection - userTableSchema in this case
    var query = userTableSchema.find();



}

// ----------------------------------------------------------------------
