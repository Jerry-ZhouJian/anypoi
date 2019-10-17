const HTTP =  require("http");
const Path = require("path");
const Chalk = require("chalk");

const Config = require('./config/defaultConfig.js');
const Route = require("./helper/route.js");

const openUrl = require("./helper/openUrl");


class Server {

    constructor(config){
        this.conf = Object.assign({},Config,config);
    }
    start(){

        const server = HTTP.createServer((req,res) => {

            /*
                req:用户请求的信息；
                res:服务器返回的信息；
            */ 
        
            // 获取用户的访问路径
            const url = req.url;
        
            // 用戶当前所在的文件位置
            const filePath =  Path.join(this.conf.root,url);
        
            Route(req,res,filePath,this.conf);
            
        
        })
        
        server.listen(this.conf.port,this.conf.hostname,() => {
        
            const addr = `http://${this.conf.hostname}:${this.conf.port}`;
            
            console.info(`server start at ${Chalk.green(addr)}`)

            openUrl(addr);
        
        })

    }

}

module.exports = Server;

