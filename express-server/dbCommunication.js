
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

var queryObject = (function () {
    var query;

    function createQuery() {
        // var dbHandle = createDatabaseConnection.getInstance();
        query = new mongoose.Query();
        return query;
    }

    return {
        getInstance: function () {
            if (!query)
                query = createQuery();
            return query;
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

    function mountUserTableSchema(db) {
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
    }

    return {
        getInstance: function (db) {
            if (!contentTableSchemaHandle)
                contentTableSchemaHandle = mountUserTableSchema(db)

            return contentTableSchemaHandle;
        }
    }
})();

// ---------------------------------SINGLETON OBJECTS-----------------------


exports.create = function (userCredentialsJSONObject) {
    //insert operation

    var dbHandle = createDatabaseConnection.getInstance();
    var userTableSchemaz = dbHandle.model('userTableSchemaHandle', userTableSchemaHandle.getInstance());  
    var u = new userTableSchemaz(userCredentialsJSONObject)

    //TRY USING THE ALTERNATE - CREATE()!!
    u.save(function (err) {
        if (err) throw err

        console.log("INSERTED : " , userCredentialsJSONObject)
    })

}


exports.read = function () {

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

