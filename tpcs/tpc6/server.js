const http = require('http');
const logger = require('./logger').logger;
const fs = require('fs')
const axios = require('axios');
const { parse } = require('querystring')

logger.info(`Starting server ...`);


const PORT=4000
const HTTP_HEADER={'Content-Type':'text/html;charset=utf-8;'};

// =============== Aux Functions =============== //

function serve_404(res,http_code)
{
    res.writeHead(http_code,HTTP_HEADER);
    res.write("404 Not Found");
    res.end();
}

function serve_405(res,http_code)
{
    res.writeHead(http_code,HTTP_HEADER);
    res.write("405 Method Not Allowed");
    res.end();
}

function serve_file(res,filename,http_code)
{
    fs.readFile(filename,(err,data) =>
    {
        res.writeHead(code,HTTP_HEADER);
        res.write(data);
        res.end();
    });
}



// =============== HTML =============== //

function serve_index(res,http_code)
{
    // Fetch Data

    let active_array = [];
    axios.get(`http://localhost:3000/tasks?type=Completed`)
    .then(db_res => {
        active_array = db_res.data;

        let completed_array = [];
        axios.get(`http://localhost:3000/tasks?type=Active`)
        .then(db_res => {
            completed_array = db_res.data;

    // ATENTION: Not correctly idented for test porpuses

    // Create HTML

    html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>TODO</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    </head>

    <style>
        input[type=text], select {
          width: 100%;
          padding: 12px 20px;
          margin: 8px 0;
          display: inline-block;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
        }

        input[type=submit] {
          width: 100%;
          background-color: #4CAF50;
          color: white;
          padding: 14px 20px;
          margin: 8px 0;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        input[type=submit]:hover {
          background-color: #45a049;
        }

        div {
          border-radius: 5px;
          background-color: #f2f2f2;
          padding: 20px;
        }
    </style>


    <body>
        <div> <!-- New Task -->
            <form>
                <form action="/" method="post">
                    <!-- ID -->
                    <label for="id">Identifier</label>
                    <input type="text" id="id" name="id"/>

                    <!-- Description -->
                    <label for="description">Description</label>
                    <input type="text" id="description" name="description"/>

                    <!-- Created -->
                    <label for="created">Created</label>
                    <input type="text" id="created" name="created"/>

                    <!-- Deadline -->
                    <label for="deadline">Deadline</label>
                    <input type="text" id="deadline" name="deadline"/>

                    <!-- Author -->
                    <label for="author">Author</label>
                    <input type="text" id="author" name="author"/>

                    <!-- Type -->
                    <label for="type">Type</label>
                    <select id="type" name="type">
                        <option value="Active">Active</option>
                        <option value="Complete">Complete</option>
                    </select>

                    <input type="submit" value="Add">
                </form>
            </form>
        </div>
        <br/>

        <div> <!-- Active Tasks -->
            <table class="w3-table-all w3-xlarge">
                <tr>
                    <th style="width: 50%">Active</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Created</th>
                    <th>Deadline</th>
                    <th>Author</th>
                    <th>Type</th>
                    <th></th>
                </tr>
                `

    active_array.forEach(e => {
        html += `
        <tr>
            <td>${e['id']}</td>
            <td>${e['description']}</td>
            <td>${e['created']}</td>
            <td>${e['deadline']}</td>
            <td>${e['author']}</td>
            <td>${e['type']}</td>
            <td>
                <button onclick="set_edit_mode('${e['id']}','${e['description']}','${e['created']}','${e['deadline']}','${e['author']}','${e['type']}')" class="w3-button w3-green">Edit</button>
            </td>
        </tr>`
    });
    
    html += `
            </table>
        </div>
        <br/>
        
        <div> <!-- Complete Tasks -->
            <table class="w3-table-all w3-xlarge">
                <tr>
                    <th style="width: 50%">Completed</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    
                    <th>Description</th>
                    <th>Created</th>
                    <th>Deadline</th>
                    <th>Author</th>
                    <th>Type</th>
                    <th></th>
                </tr>`

    completed_array.forEach(e => {
        html += `
        <tr>
            <td>${e['id']}</td>
            <td>${e['description']}</td>
            <td>${e['created']}</td>
            <td>${e['deadline']}</td>
            <td>${e['author']}</td>
            <td>${e['type']}</td>
            <td>
                <button onclick="set_edit_mode('${e['description']}','${e['id']}','${e['created']}','${e['deadline']}','${e['author']}','${e['type']}')" class="w3-button w3-green">Edit</button>
            </td>
        </tr>`
    });
    html += `</table>
        </div>
    </body>
    <script>
        function set_edit_mode(id,description, created, deadline, author, type)
        {
            
            document
            .getElementById("todo_form")
            .setAttribute("method", "put");

            document
            .getElementById("description")
            .value = description;

            document
            .getElementById("deadline")
            .value = deadline;

            document
            .getElementById("author")
            .value = author;

            documentz
            .getElementById("type")
            .value = type;
        }
    </script>
    </html>
    `


    res.writeHead(http_code,HTTP_HEADER);
    res.write(html);
    res.end();



        })
        .catch(error => {
            logger.error(error);
        });
    })
    .catch(error => {
        logger.error(error);
    });
}

// Active
// Complete

// =============== ==== =============== //

try {
    http.createServer((req,res) =>
    {
        let http_code = 200;

        if(req.method == "GET")
        {
            if(req.url.match(/^(((\/index)(\.html)?)|\/)$/))
            {
                serve_index(res,http_code);
            }
            else if(req.url == "/favicon")
            {
                serve_file(res,"static/favicon.ico",http_code);
            }
            else
            {
                http_code = 404;
                serve_404(res,http_code);
            }
        }
        else if(req.method == "POST")
        {
            if(req.url == "/tasks")
            {
                serve_index(res,http_code);
            }
        }
        else
        {
            http_code = 405;
            serve_405(res,http_code);
        }
        logger.request(req.method, req.url, http_code);

    }).listen(PORT);
} 
catch(err) {
    logger.error(err);
}

logger.info(`Server opened in ${PORT}`);