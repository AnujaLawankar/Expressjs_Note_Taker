const express = require("express");

const path = require("path");

const notesdb = require("./db/db.json");

const { clog } = require("./middleware/clog");
const api = require("./routes/index.js");
const { Console } = require("console");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(clog);

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", api);


app.get('/', (req, res) => {

    res.sendFile(path.json(__dirname, '/public/assets/index.html'))
});

app.get('/notes', (req, res) => {

    res.sendFile(path.join(__dirname, '/public/assets/notes.html'))
});


// app.post('/notes', (req, res) => {

//     res.send(path.join(__dirname, '/public/assets/notes.html'))
// });


app.listen(PORT, () => {

    console.log(`App listening at http://localhost:${PORT}`);

});