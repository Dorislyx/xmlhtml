

window.changerecord=(function(){
		
		$('.project_list>li').click(function(){
			window.location.href='../shop/shopdetails.html';
		})
	

	var IstotalPage = false;
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有
	
	
	function loaded(index) {
		pullUpEl = document.getElementById('pullUp');
		$('#pullUp').css('display','block');
		pullUpOffset = pullUpEl.offsetHeight;
		myScroll = new iScroll('iScrollchangerecord', {
			useTransition: true,
			vScrollbar: false,
			checkDOMChanges: true,
			topOffset: pullDownOffset,
			onRefresh: function() {
				if (pullUpEl.className.match('loading')) {
					pullUpEl.className = '';
					$(pullUpEl).css("visibility", "visible");
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
				}
			},
			onScrollMove: function() {
				if (this.y < (this.maxScrollY - 50) && !pullUpEl.className.match('flip')) {
					$(pullUpEl).css("visibility", "visible");
					pullUpEl.className = 'flip';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '松开立即刷新';
					this.maxScrollY = this.maxScrollY;
				} else if (this.y > (this.maxScrollY - 50)) {
					$(pullUpEl).css("visibility", "visible");
					pullUpEl.className = '';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
				}
			},
			onScrollEnd: function() {
				if (pullUpEl.className.match('flip')) {
					pullUpEl.className = 'loading';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '已经是最后一页';
					setTimeout(function() {
						pullUpEl.className = '';
						pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
						$(pullUpEl).css("visibility", "hidden");
					}, 1500);
				}
			}
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
	}
})();
window.changerecord.start();