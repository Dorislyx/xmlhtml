window.groupbuy = (function() {
	var _width = $(document).width();
	var server = '',
		htm = '',
		htn = '',
		isclick = false,
		hasmore = false, //表示是否存在下一页
		params = {};
	$('.group_goods').on('click', '.group_goodslist>li', function() {
		id = $(this).attr("id");
		if (isclick == false) {
			isclick = true;
			setTimeout(function() {
				isclick = false;
			}, 500);
			setTimeout(function() {
				window.location.href = '../shop/shopdetails.html?id=' + id;
			}, 300);
		}
	});
	//团购列表
	function groupbuy() {
		server = 'index.php';
		params = {
			'act': 'group_buy',
			'op': 'list',
			'type': ''
		}
		getajax.getAction(server, params, function(res) {
			console.log('获取团购列表', res);
			if (res['code'] == 200) {
				if (!res['datas']['error']) {
					getajax.loadhide();
					var lst = res['datas']['goods_list'];
					var banner_list = res['datas']['banner_list'];
					htn = '';
					htm = '';
					$(banner_list).each(function(k, v) {
						htn += '<li id="' + v['link'] + '">';
						htn += '<img src="' + v['pic'] + '"/>';
						htn += '</li>';
						if (k == 0) {
							$('.runindex').empty().append('<a class="this"></a>');
						} else {
							$('.runindex').append('<a></a>');
						}
					});
					$('#runimg').empty().append(htn);
					$(".runimg").css('width', _width + "px");
					$(".runimg>ul").css("width", $('.runimg li').length + "00%");
					$(".runimg>ul>li").css("width", 100 / $('.runimg li').length + "%");
					runimg();
					$(".runimg>ul>li").click(function() {
						var oid = $(this).attr('id');
						window.location.href = '../shop/shopdetails.html?id=' + oid;
					});
					if (lst.length==0) {
							htm += '<li style="font-size:1.2em; color:#999; text-align:center;">暂时没有团购的商品</li>';
					} else {
						$(lst).each(function(k, v) {
							htm += '<li id="' + v['goods_id'] + '">';
							htm += '<div>';
							htm += '<img src="' + v['groupbuy_image'] + '"/>';
							htm += '</div>';
							htm += '<div>';
							htm += '<div><a>' + v['groupbuy_name'] + '</a></div>';
							htm += '<span>￥' + v['groupbuy_price'] + '元</span>';
							htm += '<span>' + v['buyer_count'] + '人已购买</span>';
							htm += '</div>';
							htm += '</li>';
						});
					}


					$('.group_goodslist').empty().append(htm);
				}
			}
		}, function(error) {
			getajax.loadhide();
		});
	}

	//轮播
	function runimg() {
		var index = 0,
			maxlen = $('.runimg li').length,
			time = 5000,
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

		touchs._right(".runimg", function() {
			window.clearInterval(tm);
			if (index == maxlen - 1) {
				index = 0;
			} else {
				index += 1;
			}
			_mover();
			_timeInterval();
		});
		touchs._left(".runimg", function() {
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
			$(".runindex>a").removeClass("this");
			$(".runindex>a").eq(index).addClass("this");
			$(".runimg>ul").animate({
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
		myScroll = new iScroll('iScrollgroupbuy', {
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
		getajax.loadshow();
		bInitScorll = 0;
		reScroll();

		groupbuy();
	}
	return {
		start: start
	}
})();
window.groupbuy.start();