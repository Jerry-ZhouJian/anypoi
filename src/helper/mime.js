const path = require("path");

const mimeTypes = {
    "css":"text/css" ,
    "gif": "image/gif" ,
    "html": "text/html" ,
    "ico": "image/x-icon" ,
    "jpeg": "image/jpeg" ,
    "jpg": "image/jpeg" ,
    "js": "application/x-javascript" ,
    "json": "application/json" ,
    "pdf": "application/pdf" ,
    "png": "image/png" ,
    "svg": "image/svg+xml" ,
    "swf": "application/x-shockwave-flash" ,
    "tiff": "image/tiff" ,
    "txt": "text/plain" ,
    "wav": "audio/x-wav" ,
    "wma": "audio/x-ms-wma" ,
    "wmv": "audio/x-ms-wmv" ,
    "xml":"application/xml",
}

module.exports = function(filePath){

    // 根据路径获取文件拓展名
    let ext = path.extname(filePath).split(".").pop().toLowerCase();

    if(!ext){
        ext = filePath;
    }
   
    // 不存在拓展名默认返回文本类型；
    return mimeTypes[ext] || mimeTypes['txt'];
}