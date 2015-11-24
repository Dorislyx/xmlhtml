

window.touchs=(function(){
	var istouch=false,
		startX=0,
		startY=0,
		thisindex=0,
		endX=0,
		endY=0,
		touch_left,
		touch_right,
		touch_top,
		touch_bottom;
	
	function touchSatrtFunc(evt) {
		try {
			//evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等

			var touch = evt.touches[0]; //获取第一个触点
			var x = Number(touch.pageX); //页面触点X坐标
			var y = Number(touch.pageY); //页面触点Y坐标
			//记录触点初始位置
			startX = x;
			startY = y;
			var width = $(window).width();
			var height = $(window).height();
		} catch (e) {

		}
	}
	//touchmove事件，这个事件无法获取坐标
	function touchMoveFunc(evt) {
		try {
			//evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
			var touch = evt.touches[0]; //获取第一个触点
			var x = Number(touch.pageX); //页面触点X坐标
			var y = Number(touch.pageY); //页面触点Y坐标
			endX=x;
			endY=y;
			//判断滑动方向 上下
		} catch (e) {

		}
	}

	//touchend事件
	function touchEndFunc(evt) {
		try {
			//evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
			touchMover();
		} catch (e) {
	
		}
	}

	//绑定事件
	function bindEvent(b) {
		var k=$(b)[0];
		k.addEventListener('touchstart', touchSatrtFunc, false);
		k.addEventListener('touchmove', touchMoveFunc, false);
		k.addEventListener('touchend', touchEndFunc, false);
		$(b).click(function(event) {
			event.stopPropagation();
		});
	}

	//判断是否支持触摸事件
	function isTouchDevice() {
		try {
			document.createEvent("TouchEvent");
			istouch=true;
			
		} catch (e) {
			istouch=false;
		}
	}
	
	
	
	function touchMover(){
		if(endX-startX>0){
			//console.log("右滑动")
			touch_left();
		}else if(endX-startX<-1&&endX!=0){
			//console.log("左滑动")
			touch_right();
		}else if(endY-startY>0){
			//console.log("左滑动")
			touch_top();
		}else if(endY-startY<0&&endY!=0){
			//console.log("左滑动")
			touch_bottom();
		}
		startX=0;
		startY=0;
		endX=0;
		endY=0;
	}
	
	function _left(a,fun){
		if(istouch){
			bindEvent(a); //绑定事件
		    touch_left=fun;
		}
		
	}
	function _right(byobj,fun){
		if(istouch){
		    bindEvent(byobj); //绑定事件
		   touch_right=fun;
		}
	}
	function _top(byobj,fun){
		if(istouch){
		    bindEvent(byobj); //绑定事件
		   touch_top=fun;
		}
	}
	function _bottom(byobj,fun){
		if(istouch){
		    bindEvent(byobj); //绑定事件
		   touch_bottom=fun;
		}
	}
	
	function start(){
		isTouchDevice();
	}
	return{
		start:start,
		_left:_left,
		_right:_right,
		_top:_top,
		_bottom:_bottom
	};
})();
window.touchs.start();
