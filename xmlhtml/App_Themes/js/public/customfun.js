/*
作者： oysd0628@ sina.cn
时间： 2015 - 07 - 07
描述：自定义方法|自定义封装函数|自定义插件
*/
window.customfun = (function() {
	var timer = 500;
	//从右向左滑出
	function slide_righttoleft(name,index){
		var obj=$(name);
		obj.css({'position':'absolute','right':'-100%','top':0,'z-index':'9000'+index});
		obj.animate({'right':'0%'},timer);
	}
	
	//从左往右滑出
	function slide_lefttoright(name,index){
		var obj = $(name);
		obj.css({'position':'absolute','right':'0%','top':0,'z-index':'9000'+index});
		obj.animate({'right':'-100%'},timer,function(){
			obj.replaceWith('');
		});
	}
	
	//从上往下滑出
	function slide_toptobottom(name,index){
		var obj = $(name);
		obj.css({'position':'absolute','top':'100%','left':0,'z-index':'9000'+index});
		obj.animate({'top':'0%'},timer);
	}
	
	//从下往上滑出
	function slide_bottomtotop(name,index){
		var obj = $(name);
		obj.css({'position':'absolute','top':'-100%','left':0,'z-index':'9000'+index});
		obj.animate({'top':'0%'},timer);
	}

	//从小到大从中间弹出
	function slide_smalltobig(name,index){
		var obj = $(name);
		setTimeout(function(){
			obj.css({
				'position':'absolute',
				'top':'0%',
				'left':'0%',
				'width':'100%',
				'height':'100%',
				'z-index':'9000'+index
			});
			obj.css({'position':'absolute','top':'50%','left':'50%','width':0,'height':0,'z-index':'9000'+index});
			obj.animate({'width':'100%','height':'100%','top':'0%','left':'0%'},timer);
		},timer/2);
		
		
	}
	
	//从大到小从中间消失
	function slide_bigtosmall(name,index){
		var obj = $(name);
		obj.replaceWith('');
		/*obj.css({'position':'relative','top':'0','left':'0','width':'100%','height':'100%'});
		obj.animate({'width':'0','height':'0','top':'50%','left':'50%'},timer,function(){
			obj.replaceWith('');
		});*/
		
	}
	
	function start() {

	}

	return {
		start: start,
		slide_righttoleft:slide_righttoleft,
		slide_lefttoright:slide_lefttoright,
		slide_toptobottom:slide_toptobottom,
		slide_bottomtotop:slide_bottomtotop,
		slide_smalltobig:slide_smalltobig,
		slide_bigtosmall:slide_bigtosmall,
	};
})();
window.customfun.start();