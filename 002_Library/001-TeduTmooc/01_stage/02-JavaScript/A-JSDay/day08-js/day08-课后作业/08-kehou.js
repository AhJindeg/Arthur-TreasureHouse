function a(x){
    var a1 = 1,a2 = 1;
    for(var i=3;i<=x;i++){
        var c = a1;
            a1 = a2;
            a2 = c + a1;
    };
    return a2;
};
var b = a(7);
console.log(b);

