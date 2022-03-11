/*

var emp={
	eid:1,
	ename:'taosang',
	sex:'nan',
	salary:50000
};
for(var k in emp){
	console.log(k,emp[k]);
};

var ChangJi={
	aa:68,
	ab:84,
	ac:94,
	ad:54,
	ae:13
};
// 遍历属性得到每一个成绩
var sum=0; // 用于保存成绩
var count=0; // 用于保存数量
for(var k in ChangJi){
//	console.log(k,ChangJi[k]);
	// 把每一个成绩加到sum
	sum+=ChangJi[k];
	//遍历一个成绩，数量+1
	count++;
};
console.log(sum,count,sum/count);

*/



var students={
	aa:68,
	ab:84,
	ac:94,
	ad:54,
	ae:13
};
var sum=0;
var count=0;
for(var k in students){
	sum+=students[k];
	count++;
};
console.log(sum,sum/count);











