// 天数相加
function getDays(x,y,z){
	var shuDay = [31,28,31,30,31,30,31,31,30,31,30,31];
	if( x%4===0 && x%100!==0 || x%400===0){
		shuDay.splice(1,1,29);
	}
	var sum = z;
	for(var i=0; i<y-1; i++){
		sum += shuDay[i];
	}
	return sum;
}
console.log( getDays(2021,8,17) );

// 毫秒数判断
function getDays(year,month,date){
	// 计算这一天日期距离相差多少天
	// 创建对象 保存日期
	var d1 = new Date(year,month-1,date);

	// 创建对象保存这一年的第一天
	var d2 = new Date(year,0,1);

	// 计算两者相差毫秒数
	var d = d1 - d2;

	// 换算为天
	return d / (24*60*60*1000);

}
console.log( getDays(2021,8,17) );





