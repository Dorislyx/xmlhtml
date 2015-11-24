

window.refundRecord=(function(){
	
	//tab栏切换
	$('li[name=title1]').click(function(){
		$(this).addClass('this').siblings().removeClass('this');
	});
	
	$('li[name=title2]').click(function(){
		$(this).addClass('this').siblings().removeClass('this');
	});
	function getrefundRecord(){
		server='index.php';
		params={
			'act':'member_refund',
			'op':'index',
			'key':_key
		}
	}
	var IstotalPage = false;
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有
	
	
	function loaded(index) {
		myScroll = new iScroll('iScrollrefundRecord', {
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
	}
	
	return{
		start:start
	};
})();
window.refundRecord.start();
