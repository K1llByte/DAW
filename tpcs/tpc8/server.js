const express = require('express');
const bodyParser = require('body-parser');
const templates = require('./templates/files');
const jsonfile = require('jsonfile');
const fs = require('fs');
const multer = require('multer');
const upload = multer({dest: 'uploads_cache/'});
const { dirname } = require('path')

var app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static('static_files'));

// ================= APP VARS ================= //

const PORT = 8081;
const HTTP_HEADER = {'Content-Type': 'text/html;charset=utf-8'};
const FILES_JSON_DB = './db_files.json';

// ================== ROUTES ================== //

app.get('/', (req,res) => {
    const files = jsonfile.readFileSync(FILES_JSON_DB);

    res.writeHead(200, HTTP_HEADER);
    res.write(templates.list_files(files));
    res.end();
})

app.get('/files/upload', (req,res) => {
    const date = new Date().toISOString().substr(0,16);
    res.writeHead(200, HTTP_HEADER);
    res.write(templates.upload_files(date));
    res.end();
})

app.get('/files/download/:fname', (req,res) => {
    // TODO: REMOVE THIS CODE THIS WILL ALLOW DOWNLOAD
    // OF ANY FILESYSTEM FILE THE USER HAS ACCESS
    res.download(__dirname + '/static_files/uploads/' + req.params.fname);
})

app.post('/files', upload.array('myFile'), (req,res) => {

    for(let i = 0 ; i < req.files.length ; ++i)
    {
        const old_path = `${__dirname}/${req.files[i].path}`;
        const new_path = __dirname + '/static_files/uploads/' + req.files[i].originalname;
        fs.rename(old_path, new_path, (err) => {
            if(err) 
                throw err;
        });

        const date = new Date().toISOString().substr(0,16);
        var files = jsonfile.readFileSync(FILES_JSON_DB);
        files.push(
            {
                date: date,
                name: req.files[i].originalname,
                size: req.files[i].size,
                mimetype: req.files[i].mimetype,
                description: req.body.desc[i]
            }
        );
        jsonfile.writeFileSync(FILES_JSON_DB, files);
    }
    res.redirect('/');
})

// ================== START SERVER ================== //

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT} ...`);
});