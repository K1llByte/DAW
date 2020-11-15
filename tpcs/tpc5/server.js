const http = require('http');
//var url = require('url');
const logger = require('./logger').logger;

const axios = require('axios');

logger.info(`Starting server ...`);


const PORT=4000
const HTTP_HEADER={'Content-Type':'text/html;charset=utf-8;'};


function gen_404(res,http_code)
{
    res.writeHead(http_code,HTTP_HEADER);
    res.write("404 NOT FOUND");
    res.end();
}

function gen_index(res,http_code)
{
    res.writeHead(http_code,HTTP_HEADER);
    res.write("");
    res.end();
}

function gen_alunos(res,http_code)
{
    res.writeHead(http_code,HTTP_HEADER);
    axios.get('http://localhost:3000/alunos')
    .then(api_res => {
        api_res.data.forEach(aluno => {
            res.write(`<b>${aluno['id']}</b> <br/>`);
        });
        res.end();
    })
    .catch(error => {
        console.log('ERROR:',error);
    });
}

function gen_cursos(res,http_code)
{
    res.writeHead(http_code,HTTP_HEADER);
    axios.get('http://localhost:3000/cursos')
    .then(api_res => {
        api_res.data.forEach(curso => {
            res.write(`<b>${curso['id']}</b> <br/>`);
        });
        res.end();
    })
    .catch(error => {
        console.log('ERROR:',error);
    });
}

function gen_instrumentos(res,http_code)
{
    res.writeHead(http_code,HTTP_HEADER);
    axios.get('http://localhost:3000/instrumentos')
    .then(api_res => {
        api_res.data.forEach(instrumento => {
            res.write(`<b>${instrumento['id']}</b><br/>`);
        });
        res.end();
    })
    .catch(error => {
        console.log('ERROR:',error);
    });
}

try {
    http.createServer((req,res) =>
    {
        let http_code = 200;

        if(req.url.match(/^(((\/index)(\.html)?)|\/)$/))
        {
            gen_index(res,http_code);
        }
        else if(req.url == '/alunos')
        {
            gen_alunos(res,http_code);
        }
        else if(req.url == '/cursos')
        {
            gen_cursos(res,http_code);
        }
        else if(req.url == '/instrumentos')
        {
            gen_instrumentos(res,http_code);
        }
        else
        {
            http_code = 404;
            gen_404(res,http_code);
        }
        logger.request(req.method, req.url, http_code);

    }).listen(PORT);
} 
catch(err) {
    logger.error(err);
}


logger.info(`Server opened in ${PORT}`);