
var configurationData = require('./config')
var mongoose = require('mongoose');





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

            userName: String,
            name: String,
            emailId: {
                type: String,
                unique : true     
            },
            // 'password' will be hashed 
            password: String,
            profilePhoto: Buffer

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

            // id of the owner
            uId: String,
            title: String,
            createdAt: {
                default : Date.now(),
                type : Date
            },
            updatedAt : Date,
            deletedAt : Date,
            //collaborators of the note
            sharedWith: Array

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

            // the id of the note it is present in
            notesID: String,
            content: String,
            isChecked: {
                type : Boolean,
                default : false
            }

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

//used to return a handle of a singleton 'noteAttachmentsSchema' collection
var noteAttachmentSchemaHandle = (function(){
        var noteAttachmentSchemaHandle;

        function mountNoteAttachmentsSchemaHandle(db){
            noteAttachmentSchemaHandle = new mongoose.Schema({
                uId : String,
                notesID : String,
                attachmentName : String,
                size : String,
                mimeType : String

            })

            return noteAttachmentSchemaHandle;
        }

        return{
            getInstance : function(db){
                if(!noteAttachmentSchemaHandle)
                    noteAttachmentSchemaHandle = mountNoteAttachmentsSchemaHandle(db)

                return noteAttachmentSchemaHandle;
            }
        }
})();



// call and destructure to get all ready-to-use handles....
function getHandles() {
    //get the singleton instance of db
    var dbHandle = createDatabaseConnection.getInstance();

    //get the singleton instance of all the 3 collections...
    var userCollection = dbHandle.model('userTableCollection', userTableSchemaHandle.getInstance());
    var notesCollection = dbHandle.model('notesTableCollection', notesTableSchemaHandle.getInstance());
    var contentCollection = dbHandle.model('contentTableCollection', contentTableSchemaHandle.getInstance());
    var noteAttachmentCollection = dbHandle.model('noteAttachmentCollection', noteAttachmentSchemaHandle.getInstance());
    return { userCollection, notesCollection, contentCollection , noteAttachmentCollection }
}
// ---------------------------------SINGLETON OBJECTS-----------------------


var { userCollection, notesCollection, contentCollection, noteAttachmentCollection } = getHandles()



exports.read = function (notesObjArray) {
    //check if the user exists in the db
    userCollection.findOne({ username: 'yoda' }, function (err, msg) {
        if (err) throw err
        var yoda_id = msg._id;
        // insert notes for the particular user
        notesObjArray.map(x => {

            var temp = {};
            temp.uId = yoda_id;
            temp.title = x.title;
            temp.date = new Date();
            temp.isDeleted = Math.random() % 2 == 0 ? true : false;

            new notesCollection(temp).save(function (err, obj) {
                if (err) throw err

                x.list.map(content => {

                    var t = {}
                    t.notesID = obj._id
                    t.content = content.content
                    t.isChecked = content.isChecked

                    new contentCollection(t).save(function (err, obj) {
                        if (err) throw err

                        console.log("SUCCESS!")
                    })

                })

            })
        })

    })

}



// search for the user in the database -> sign in functionality
exports.searchUserCreds = function (emailId, password) {
    // return a promise
    return userCollection.findOne({ emailId: emailId, password: password })
}

// to check if the email id supplied exists in the database -> signup functionality
exports.searchUserEmail = function(emailId){
    return userCollection.findOne({ emailId : emailId })
}

//insert new users into the database -. sign up functionality
exports.newUser = function (userCredObject) {

    //return a promise
    return userCollection(userCredObject).save();
}

// insert a new note title entry in the notesCollection
exports.insertNoteTitle = function (userTableId, noteTitle) {
    // return the promise object containing the 
    // saved object as the returned object...
    return notesCollection({ uId: userTableId, title: noteTitle, createdAt: new Date(), isDeleted: false }).save()
}


// insert individual notes in a particular todo-note
exports.insertNoteEntry = function (noteTitleId, individualNotesEntry, checkBoxStatus) {
    return contentCollection({ notesID: noteTitleId, content: individualNotesEntry, isChecked: checkBoxStatus }).save()

}

//for notes title for dashboard
exports.getNotesTitle = function(userId){

    //returns an array consisting of note titles created
    // by a particular user 
    return notesCollection.find({ uId : userId , deletedAt : { $eq : null } })
}

exports.getAllNoteContent = function(notesTitleId){
    return contentCollection.find({ notesID : notesTitleId })
}

//technically deleting a note
exports.removeNotesTitle = function(notesTitleId){
    return notesCollection.findOneAndUpdate({ _id : notesTitleId },
        { $set : {deletedAt : Date.now()} }, {new : true} )
}


exports.updateEntry = function(entryId, content, isChecked){
    return contentCollection.findOneAndUpdate({ _id : entryId } , { $set : { content : content, isChecked : isChecked } })
}

exports.updateTitle = function(noteId, title){
    return notesCollection.findOneAndUpdate({ _id : noteId },{ $set : { title : title , updatedAt : new Date(Date.now()).toLocaleString("en-US") } })
}


exports.removeSingleEntry = function(entryId){
    return contentCollection.findOneAndRemove({ _id : entryId })
}

exports.updateUserInfo = function(userObj){
    return userCollection.findOneAndUpdate({ emailId : userObj.emailId },{ $set : {  userName : userObj.userName, name : userObj.fullName, password : userObj.password } })
}
// ----------------------------------------------------------------------
