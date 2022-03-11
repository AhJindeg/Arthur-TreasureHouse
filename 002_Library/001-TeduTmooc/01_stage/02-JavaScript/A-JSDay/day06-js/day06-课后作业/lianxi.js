var danj = Number(prompt('请输入商品单价：'));
var shul = Number(prompt('请输入商品数量：'));
var sum = danj * shul
var x = 1200;
sum >= 1000 ? sum * 0.9 : sum;
if(sum <= x){
	alert('pay success');
}else{
	alert('pay error');
};/·		