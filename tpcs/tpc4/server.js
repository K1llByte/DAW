var http = require('http');
var url = require('url');
var fs = require('fs');
var logger = require('./logger').logger;

logger.info(`Starting server ...`);


const PAGES_DIR='pages/'
const PORT=7777
const HTTP_HEADER={'Content-Type':'text/html;charset=utf-8;'};

var NUM_ARQ_FILES;
fs.readdir(PAGES_DIR,(err,files) => {
    NUM_ARQ_FILES = files.filter(e => e.match(/^arq(([1-9]+)|([1-9]0+)).html$/)).length;
});

logger.info(NUM_ARQ_FILES);

function serve_file(res,filename,code=200)
{
    fs.readFile(filename,(err,data) =>
    {
        res.writeHead(code,HTTP_HEADER);
        res.write(data);
        res.end();
    });
}

try {
    http.createServer((req,res) =>
    {
        let http_code;

        if(req.url.match(/^(((\/index)(\.html)?)|\/)$/)) 
        {
            http_code = 200;
            serve_file(res,PAGES_DIR + 'index.html');
        }
        else if(req.url.match(/^\/arq\/(([1-9]+)|([1-9]0+))$/))
        {
            let arq_num = parseInt(req.url.substring(5, req.url.length));
            if(arq_num > NUM_ARQ_FILES)
            {
                logger.info("URL matched but number doesn't exist");
                http_code = 404
                serve_file(res,PAGES_DIR + '404.html',http_code);
            }
            else
            {
                http_code = 200;
                serve_file(res,PAGES_DIR + 'arq' + arq_num + '.html');
            }
        }
        else
        {
            http_code = 404;
            serve_file(res,PAGES_DIR + '404.html',http_code);
        }
        logger.request(req.method, req.url, http_code);

    }).listen(PORT);
} 
catch(err) {
    logger.error(err);
}

logger.info(`Server opened in ${PORT}`);