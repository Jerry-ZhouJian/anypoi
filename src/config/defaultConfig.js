module.exports = {

    // 当前访问目录
    root:process.cwd(),
    // 域名
    hostname:"127.0.0.1",
    // 端口
    post:"9527",
    // 需要压缩的文件类型
    compress:/\.(html|js|css|md)/,
    // 设置缓存配置
    cache:{
        // 秒为单位
        maxAge:600,
        // 
        expires:true,
        //
        cacheControl:true,
        //
        lastModified:true,
        //
        etag:true

    }


}