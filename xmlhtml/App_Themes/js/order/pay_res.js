
window.pay_res=(function(){
	
	var IstotalPage = false;
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有
	
	
	function loaded(index) {
		myScroll = new iScroll('iScrollpay_res', {
			useTransition: true,
			vScrollbar: false,
			checkDOMChanges: true,
			topOffset: pullDownOffset,
			onRefresh: function() {},
			onScrollMove: function() {},
			onScrollEnd: function() {}
		});
	}
	var loadScroll = null;
	var loadScrollRefresh = null;

	function reScroll(index) {
		if (bInitScorll === 0) {
			loadScroll = setTimeout(function() {
				loaded(index);
				bInitScorll = 1;
			}, 300)
		} else {
			loadScrollRefresh = setTimeout(function() {
				myScroll.refresh();
			}, 300);
		}
	}

	function start(index) {
		bInitScorll=0;
		reScroll(index);
		var x=getajax.getQueryString('x');
		if(x==0){
			$('.s_top').text('支付成功');
			setTimeout(function(){
				window.location.href='../user/userindex.html';
			},500);
		}else{
			$('.s_top').text('支付失败');
			setTimeout(function(){
				window.location.href='../user/userindex.html';
			},500);
		}
		
	}
	
	return{
		start:start,
	};
})();
window.pay_res.start();
