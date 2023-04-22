const notes = require('express').Router();

const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');

notes.get('/', (req, res) => {

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));

});

//post

notes.post('/', (req, res) => {

    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {

        const newnote = {

            title,
            text,

        };

        readAndAppend(newnote, './db/db.json');
        res.json(`note added successfully`);


    } else {
        res.error('Error while adding notes');

    }
});

module.exports = notes;
