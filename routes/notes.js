const notes = require('express').Router();

const { v4: uuidv4 } = require('uuid');

const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');
const { json } = require('express');



// GET Route for retrieving all the notes
// /api/notes/
notes.get('/', (req, res) => {

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));

});

// GET Route for a specific tip
// /api/tips/:tip_id

notes.get('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.note_id === noteId);
            return result.length > 0
                ? res.json(result)
                : res.json('No tip with that ID');
        });
});




// DELETE Route for a specific notes

notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {

            const result = json.filter((note) => note.note_id !== noteId);

            // Save that array to the filesystem
            writeToFile('./db/db.json', result);

            // Respond to the DELETE request
            res.json(`Item ${noteId} has been deleted 🗑️`);
        });
});

//post method
notes.post('/', (req, res) => {

    console.log(req.body);

    const { title, text } = req.body;



    if (req.body) {

        const newnote = {

            title,
            text,
            note_id: uuidv4(),

        };

        readAndAppend(newnote, './db/db.json');
        res.json(`note added successfully`);


    } else {
        res.error('Error while adding notes');

    }
});



module.exports = notes;
