// 计算周长
function len(r){
    return 2 * Math.PI * r;
}

// 计算面积
function area(r){
    return Math.PI * Math.pow(r,2);
}

// 导出
module.exports={
    len:len,
    area:area
}

console.log(__dirname); // 模块的绝对路径
console.log(__filename); // 模块
