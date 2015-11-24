window.iphone6more=(function(){

	/*//控制横向滚动条的宽
	var _lis=lis.length;
	var liwidth=_lis*109;//li的宽以及margin值
	$('.cord_lst').width(liwidth);
	*/
	
	
	
	
	
	$('.all').click(function(){
		window.location.href='moneyrecord.html';
	});

		function runimg() {
			var index = 0,
				maxlen = $('.banner_run li').length,
				time = 3000,
				width = 100,
				runtime = 500;
			_timeInterval();

			function _timeInterval() {
				tm = setInterval(function() {
					if (index < maxlen - 1) {
						index += 1;
					} else {
						index = 0;
					}
					_mover();
				}, time);
			}

			touchs._right(".banner_run", function() {
				window.clearInterval(tm);
				if (index == maxlen - 1) {
					index = 0;
				} else {
					index += 1;
				}
				_mover();
				_timeInterval();
			});

			touchs._left(".banner_run", function() {
				window.clearInterval(tm);
				if (index == 0) {
					index = maxlen - 1;
				} else {
					index -= 1;
				}
				_mover();
				_timeInterval();
			});

			function _mover() {
				$(".banner_run_index>a").removeClass("this");
				$(".banner_run_index>a").eq(index).addClass("this");
				$(".banner_run>ul").animate({
					'margin-left': -index * width + "%"
				}, runtime);
			}
		}
		
	
		var IstotalPage = false;
		var myScroll,
			pullDownEl, pullDownOffset,
			pullUpEl, pullUpOffset,
			generatedCount = 0;
		var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有
		
		
		function loaded() {
			myScroll = new iScroll('iScrolliphone6more', {
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
	
		function reScroll() {
			if (bInitScorll === 0) {
				loadScroll = setTimeout(function() {
					loaded();
					bInitScorll = 1;
				}, 300)
			} else {
				loadScrollRefresh = setTimeout(function() {
					myScroll.refresh();
				}, 300);
			}
		}
	function start() {
		bInitScorll=0;
		reScroll();
		runimg();

	}
	
	return{
		start:start
	}
})();
window.iphone6more.start();