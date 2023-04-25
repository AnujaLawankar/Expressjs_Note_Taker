
//import the packages which require
const express = require("express");

const path = require("path");

const notesdb = require("./db/db.json");

const { clog } = require("./middleware/clog");
const api = require("./routes/index.js");
//const { console } = require("console");

//Assign the port number
const PORT = process.env.PORT || 3001;

//Create instance of express
const app = express();

//middleware
app.use(clog);



app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", api);

//GET method to acess api
app.get('/', (req, res) => {

    res.sendFile(path.json(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {

    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

//POST method to update notes
app.post('/notes', (req, res) => {

    res.send(path.join(__dirname, '/public/assets/notes.html'))
});

//Listen port
app.listen(PORT, () => {

    console.log(`App listening at http://localhost:${PORT}`);

});