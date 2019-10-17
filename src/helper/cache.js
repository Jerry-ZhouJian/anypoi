const { cache } = require("../config/defaultConfig.js");

function refreshRes(stats,res){
    

    // 引入服务器的配置项
    const { maxAge,expires,cacheControl,lastModified,etag } = cache;

    
    
    if(expires){
        // 在当前时间加上maxAge时间,值为毫秒数时间对象
       
        res.setHeader('Expires', (new Date(Date.now() + maxAge * 1000)).toUTCString());

       
    }
    if(cacheControl){
        // 
        res.setHeader('Cache-Control', `public, max-age=${maxAge}`)
    }
    if(lastModified){
        // stats.mtime:修改时间
        res.setHeader('Last-Modified', stats.mtime.toUTCString());
    }
    if(etag){        
        //
        res.setHeader('ETag', `${stats.size}-${stats.mtime.toUTCString()}`);
       
    }
}

module.exports = function isFresh(stats,req,res){
    refreshRes(stats,res);
    // 获取请求头中的信息
    const lastModified = req.headers['if-modified-since'];
    // 获取请求头中etag的信息
    const etag = req.headers['if-none-match'];
    // 是否是第一次请求
    if(!lastModified && !etag){
        return false;
    }
    if(lastModified && lastModified !== res.getHeader('Last-Modified')){
        return false;
    }
    if(etag && etag !== res.getHeader('ETag').split(",")[0]){
        return false;
    }
    return true;
}