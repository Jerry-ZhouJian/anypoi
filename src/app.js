const HTTP =  require("http");
const Path = require("path");
const Chalk = require("chalk");

const Config = require('./config/defaultConfig.js');
const Route = require("./helper/route.js");

const server = HTTP.createServer((req,res) => {

    /*
        req:用户请求的信息；
        res:服务器返回的信息；
    */ 

    // 获取用户的访问路径
    const url = req.url;

    // 用戶当前所在的文件位置
    const filePath =  Path.join(Config.root,url);

    Route(req,res,filePath);
    

})

server.listen(Config.post,Config.hostname,() => {

    const addr = `http://${Config.hostname}:${Config.post}`;

    console.info(`server start at ${Chalk.green(addr)}`)


})