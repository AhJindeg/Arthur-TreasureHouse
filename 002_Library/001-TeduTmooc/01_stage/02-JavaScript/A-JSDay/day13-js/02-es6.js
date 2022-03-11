// // 块级作用域
// let n1 = 2;
// console.log(n1);


// let n2 = 3;
// let n3 = 4;
// conlose.log(n2);


// // 大括号之间的语句块就是块级作用域
// {
//     // 块级作用域
//     var m1 = 2;
//     let m2 = 5; // 局部变量
//     const m3 = 3; // 局部常量
// }
// console.log(m2);


// let n = 0;
// for(let i = 1; i <= 100; i++){
//     n += i;
// }
// console.log(n);



// // 箭头函数\
// var arr = [23,9,45,12];
// arr.sort(function(a,b){
//     return b-a;
// });
// console.log(arr);

// arr.sort((a,b)=>b-a);


// var getAvg = (a,b,c)=>{
//     return (a+b+c)/3;
// }
// var getAvg
// console.log(getAvg(12,15,15));



// var ename = '涛哥';
// var sex = 1;
// var phone = '184521812';

// console.log(`
//     姓名：${ename}
//     性别：${sex === 1 ? '男' : '女'}
//     手机：${phone}

// `);

var laptop = {
    lid:01,
    title:'biaoti',
    price:65150,
    isOnsale:0
}
console.log(`
    编号：${laptop.lid}
    标题：${laptop.title}
    价格：${laptop.price.toFixed(2)}
    是否在售：${laptop.idOnsale === 1 ? '是' : '否'}
`);

