//Dependencies, add more here later
const express = require("express");
const path = require("path");
const fs = require("fs");


//Express part/port
const app = express ();
var PORT = process.env.PORT || 8080;

//Express hookup with everything else 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//using css, js, etc.
app.use(express.static("public"));

//using HTML files 
//NON assets CORRECT

app.get("index", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

//Retrieve notes
const savedNotes = require("./db/db")
// const { notStrictEqual } = require("assert");
// app.get("/api/notes", function (req, res) {
//     return fs.readFile("db/db.json");
// // not 'notes'
// });
app.get("/api/notes", function (req, res) {
    return fs.readFile(path.join(__dirname, "db/db.json"));
});

//Post that new note
app.post("/api/notes", function (req, res) {
    const mynewNote = req.body;

    console.log(mynewNote);
//save that new note
    mynewNote.id = myNotes.length + 1;
    myNotes.push(mynewNote);
//show saved notes
    console.log('Unsaved notes: ', myNotes.length);
    mynewNote.id = myNotes.length + 1;
    console.log('Saved notes: ', myNotes.id);

    fs.writeFile("./db/db.json", JSON.stringify(myNotes), function(err) {
        if (err) {
            throw err;
        }
    });
        res.send(myNotes);
    });

app.post("/api/notes", function (req, res) {
const mynewNote = req.body;

fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    //const savedNotes = JSON.parse(data);
    
    mynewNote.id = savedNotes.length + 1;
    savedNotes.push(mynewNote);
    
    fs.writeFile("./db/db.json", JSON.stringify(savedNotes), (err) => {
        if (err) throw err;
        res.json(mynewNote);
        });
    });
})

//delete any note
app.delete("api/notes/:id", function (req, res) {
    const deleteNoteId = req.params.id;
    console.log("Note to be deleted::", deleteNoteId);

    const deleteNote = savedNotes.map(function (item) {
        return item.id;
    }).indexof(deleteNoteId);

    savedNotes.splice(deleteNote);
    console.log('saved-notes: ', savedNotes);


fs.deleteFile("./db/db.json", JSON.stringify(deleteNote), (err) => {
        if (err) throw err;
        });
    
        res.send(savedNotes);

});
//Delete note
// app.delete("/db", function (req, res) {
//     res.sendFile(path.join(__dirname, "db/db.json"));
// });


//Port function
app.listen(PORT, function () {
    console.log(`App listening on http://localhost:${PORT}`);
})