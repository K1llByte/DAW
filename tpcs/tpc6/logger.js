class Logger
{
    constructor() {
        this.dt = new Date();
    }

    info(msg)
    {
        console.log(`(${this.dt.getHours()}:${this.dt.getMinutes()}) [INFO] > ${msg}`);
    }

    error(err)
    {
        console.log(`(${this.dt.getHours()}:${this.dt.getMinutes()}) [ERROR] > ${err}`);
    }

    request(method,url,http_code)
    {
        console.log(`(${this.dt.getHours()}:${this.dt.getMinutes()}) [${http_code}] > ${method} ${url}`);
    }
}

exports.logger = new Logger();