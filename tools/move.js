/*
	定义一个函数，获取指定元素的当前样式（兼容所有浏览器）
	obj		要获取样式的元素对象
	name	要查询的属性名
*/
function getStyle(obj,name){
	//不加window是变量，找不到会报错，加了window是属性，找不到是undefined
	if(window.getComputedStyle){
		return getComputedStyle(obj,null)[name];
	}else{
		return obj.currentStyle[name];
	}
}
/*
	提取出的改变运动的函数
	obj:移动的对象；
	name：改变的属性名称
	speed:移动的速度（正值）
	target：目标位置
	interval：计时器间隔时间
*/
function move(obj,name,speed,target,interval,callback){
	clearInterval(obj.timer);
	//函数执行就先判断当前位置，如果大于目标值，则速度取负值
	var current = parseInt(getStyle(obj,name));
	if(current > target){
		speed = -speed;
	}
	obj.timer = setInterval(function(){
		var oldValue = parseInt(getStyle(obj,name));
		var newValue = oldValue + speed;
		//&&优先级高于||，为了好看，加上了括号
		if((speed < 0 && newValue < target) || (speed > 0 && newValue > target)){
			newValue = target;
		}
		obj.style[name] = newValue + "px";
		if(newValue === target){
			clearInterval(obj.timer);
			//到达目标位置后，执行回调函数
			callback && callback();//callback判断是否存在，如果存在，则调用callback()
		}
	},interval);
}