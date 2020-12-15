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
const savedNotes = require("./db/db");

app.get("/api/notes", function (req, res) {
    res.json(savedNotes)
 
});

app.post("/api/notes", function (req, res) {
    console.log("POST:", req.body)
    
    const mynewNote = req.body;
    console.log(mynewNote);

    //To add note    
    mynewNote.id = savedNotes.length + 1;
    savedNotes.push(mynewNote);
    
    fs.writeFile("./db/db.json", JSON.stringify(savedNotes), (err) => {
        if (err) throw err;

        });

    res.json(savedNotes)

});


//delete any note
app.delete("/api/notes/:id", function (req, res) {
    const noteToDelete = req.params.id;
    console.log ("Note to Delete: ", noteToDelete);

    //removed fs.delete file and created second constant
    //first constant takes place of the note and second constant is the deleter
    const deleteSavedNote = savedNotes.map(function (item) {
        return item.id
    }).indexOf(noteToDelete);

    //splice = replace.
    //saved note (savedNotes) replaced by deleteSavedNote
    savedNotes.splice(deleteSavedNote);

    console.log(deleteSavedNote)
        
    res.json(savedNotes)

});

//PORT function
app.listen(PORT, function () {
    console.log(`App listening on http://localhost:${PORT}`);
    
});