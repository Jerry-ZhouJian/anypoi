// 引入nodejs内置的压缩算法
const { createGzip,createDeflate } =  require('zlib');

module.exports = (rs,req,res) => {
    // 获取的浏览器支持的压缩方式
    const acceptEncoding = req.headers['accept-encoding'];
    // 判断浏览器是否支持压缩,或者浏览器支持的方式，服务器不支持
    if(!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)){
        return rs;
    }else 
    // gzip压缩方式
    if(acceptEncoding.match(/\bgzip\b/)){
        res.setHeader('Content-Encoding','gzip');
        return rs.pipe(createGzip());
    }else
    // deflate 压缩方式
    if(acceptEncoding.match(/\bdeflate\b/)){
        res.setHeader('Content-Encoding','deflate');
        return rs.pipe(createDeflate());
    }


}