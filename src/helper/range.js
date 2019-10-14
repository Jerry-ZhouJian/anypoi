/*  
    request中声明查询的范围:
    range:bytes=[satrt]-[end];

    respones中表明range的类型：
    Accept-ranges=bytes

    Content-range:bytes start-end/totalSize


*/ 

module.exports = (totalSize,req,res) => {

    // 获取请求头中的range值
    const range = req.headers['range'];

    // 头部信息中没有声明该值
    if(!range){

        return {
            code:200
        }

    }

    // 存在值
    const size = range.match(/bytes=(\d*)-(\d*)/);

    // 
    const end = size[2] || totalSize - 1;

    // 
    const statr = size[1] || totalSize - end;


    // 无法处理的情况
    if(statr > end || statr < 0 || end > totalSize){
        return {
            code:200
        }
    }


    // 设置respones头部信息

    res.setHeader('Accept-ranges','bytes');
    res.setHeader('Content-range',`bytes=${statr}-${end}/${totalSize}`);
    res.setHeader('Content-Length',end - start);

    return {
        code:206,
        statr:parseInt(statr),
        end:parseInt(end)
    }
}