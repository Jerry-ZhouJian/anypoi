const Fs = require("fs");
const promisify = require("util").promisify;
const statsFun = promisify(Fs.stat);
const readdir = promisify(Fs.readdir);

module.exports = async function (req,res,filePath){

    try {
        const stats = await statsFun(filePath);
        // 判断是文件
        if(stats.isFile()){
            res.statusCode = 200;
            res.setHeader('content-Type','text/plain');
            Fs.createReadStream(filePath).pipe(res);
        }else
        // 判断是路径
        if (stats.isDirectory()){
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('content-Type','text/plain');
            res.end(files.join(","));
        }
    } catch (ex) {
        res.statusCode = 404;
        res.setHeader('content-Type','text/plain');
        res.end(`${filePath} is not a deirect or file`);
    }



}