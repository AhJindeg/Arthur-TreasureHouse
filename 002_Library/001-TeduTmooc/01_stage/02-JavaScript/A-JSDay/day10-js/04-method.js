/*

var person={
	// 属性
	name:'涛桑',
	// 方法：对应的是一个函数
	play:function(){
		// this执行调用方法的对象
		console.log(this.name+'涛哥正在玩单杠');
	},
	work:function(){
		console.log(this.name+'涛哥正在摊煎饼');
	}
}
person.play();
person.work();

var Yuan={
	aa:5,
	ab:3.14,
	aaa:function(){
		return 2*this.ab*this.aa;
	},
	aab:function(){
		return this.ab*this.aa*this.aa;
	}
}
console.log( Yuan.aaa() );
console.log( Yuan.aab() );


*/

var laptop={
	title:'电脑',
	price:4000
}
if(laptop.madeIn === undefined){
	laptop.madeIn='深圳';
}
if(laptop.hasOwnProperty('price')){
	laptop.price+=1000;
}
console.log(laptop);





