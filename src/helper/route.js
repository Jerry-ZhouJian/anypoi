const Fs = require("fs");
const Path = require("path");
const promisify = require("util").promisify;
const statsFun = promisify(Fs.stat);
const readdir = promisify(Fs.readdir);
const HandleBars = require("handlebars");
const Config = require("../config/defaultConfig.js");
const MimeType = require("../helper/mime.js");
const Compress = require("./compress.js");
const Range = require("./range.js");
// 使用模板引擎渲染页面
const tplPath = Path.join(__dirname,'../template/dir.tpl')
// readFileSync:读出来的数据是buffer数据，性能较快
const source = Fs.readFileSync(tplPath);

// 渲染模板
const template = HandleBars.compile(source.toString());
 
module.exports = async function (req,res,filePath){

    try {
        const stats = await statsFun(filePath);

        // 判断是文件
        if(stats.isFile()){
            const MimeTypeName = MimeType(filePath);
            res.setHeader('content-Type',MimeTypeName);
            // 先将读进来的文件存起来
            let rs ;
            // 获取range之后的结果
            const { code ,start,end} = Range(stats.size,req,res);
            if(code === 200){
                res.statusCode = 200;
                rs = Fs.createReadStream(filePath);
            }else {
                res.statusCode = 206;
                rs = Fs.createReadStream(filePath,{start,end});
            }

            // 符合config中配置的文件类型就压缩
            if(filePath.match(Config.compress)){
                rs = Compress(rs,req,res);
            }

            rs.pipe(res);

        }else
        // 判断是路径
        if (stats.isDirectory()){
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('content-Type','text/html');
            // 当filePath === Config.root的时候，relative返回的是一个空的字符串；
            const dir = Path.relative(Config.root,filePath);
            
            // 返回的数据
            const data = {
                // 标题就是文件名
                title:Path.basename(filePath),
                dir:dir?`/${dir}`:"",
                files:files.map( file => {
                    return {
                        file:file,
                        iconType:MimeType(file)
                    }
                })
            }

            res.end(template(data));
        }
    } catch (ex) {

        res.statusCode = 404;
        res.setHeader('content-Type','text/plain');
        res.end(`${filePath} is not a deirect or file,${ex.toString()}`);
    }



}