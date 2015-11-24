window.paimai = (function() {
	var _width = $(document).width();
	var server = '',
		htm = '',
		htn = '',
		htp = '',
		_id = '',
		_time_id = '',
		hasmore = false, //表示是否存在下一页
		params = {};



	$('.time>li').click(function() {
		_time_id = $(this).attr('name');
		$(this).addClass('this').siblings().removeClass('this');
		getajax.loadshow();
		mypaimailst();
	});

	function toTwo(n) {
			return n < 10 ? '0' + n : '' + n;
		}
		//获取拍卖列表

	function mypaimailst() {

		server = 'index.php';
		params = {
			'act': 'auction',
			'op': 'list',
			'time_id': _time_id
		};
		getajax.getAction(server, params, function(res) {
			console.log('获取拍卖列表', res);
			if (res['code'] == 200) {
				if (!res['datas']['error']) {
					getajax.loadhide();
					var lst = res['datas']['auction_list'];
					var timelst = res['datas']['time_list'];
					var cur_id = res['datas']['time_id_cur'];
					var banner_list = res['datas']['banner_list'];
					if (_time_id == '') {
						_id = cur_id;
					}
					htm = '';
					htp = '';
					htn = '';
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
					$('.time>li:eq(0)>span:eq(0)').text(timelst[0]['value']).parent().attr('name', timelst[0]['time_id']);
					$('.time>li:eq(1)>span:eq(0)').text(timelst[1]['value']).parent().attr('name', timelst[1]['time_id']);
					$('.time>li:eq(2)>span:eq(0)').text(timelst[2]['value']).parent().attr('name', timelst[2]['time_id']);
					$('.time>li').each(function() {
						var _name = $(this).attr('name');
						if (_name == cur_id) {
							$(this).addClass('this').siblings().removeClass('this');
						}
					});
					if (lst.length == 0) {
						htm = '<li style="width:88%; border:0; line-height:35px; padding-left:4%; font-size:1.2em; color:#999; text-align:center;">当前时段暂时没有竞拍商品</li>';
					} else {


						$(lst).each(function(k, v) {
							if (v['time_id'] == cur_id) {
								htm += '<li timeid="' + v['time_id'] + '" id="' + v['auction_id'] + '" ids="' + v['goods_id'] + '" state="' + v['auction_state'] + '" startime="' + v['start_time'] + '" time="' + v['count_down'] + '">';
								htm += '<p>距结束：10:20:34</p>';
								htm += '<div class="pic"><img src="' + v['auction_image'] + '" alt="" /></div>';
								htm += '<p class="name">' + v['goods_name'] + '</p>';
								htm += '<div class="wantpai">';
								htm += '<div class="price">';
								htm += '<span>起拍价:￥' + v['start_price'] + '</span>';
								htm += '<span class="want">我要拍</span>';
								htm += '</div>';
								htm += '<span>参考价:￥' + v['goods_price'] + '</span>';
								htm += '</div>';
								htm += '</li>';
							}
						});
					}
					$('.goods_lst').empty().append(htm);

					$('.goods_lst>li').each(function(k, v) {
						var _state = $(this).attr('state');
						var _timeid = $(this).attr('timeid');

						var that = $(this);
						if (_state == 30) {
							that.find('p:first').text('拍卖已结束');
							that.find('span').filter('.want').text('已拍完');
						} else if (_state == 20) {
							that.find('p:first').text('拍卖中');
							that.find('span').filter('.want').text('我要拍');
						} else {
							var _time = parseInt($(this).attr('time'));
							var str = '';
							var that = $(this);
							var _hours = 0;
							var _min = 0;
							var _sec = 0;

							_hours = parseInt(_time / 3600);
							_min = parseInt(_time % 3600 / 60);
							_sec = parseInt(_time % 3600 % 60);
							str = toTwo(_hours) + ':' + toTwo(_min) + ':' + toTwo(_sec);
							that.find('p:first').text('距开始：' + str);
							that.find('span').filter('.want').text('未开始');

							that.timer = setInterval(function() {
								_time -= 1;
								_hours = parseInt(_time / 3600);
								_min = parseInt(_time % 3600 / 60);
								_sec = parseInt(_time % 3600 % 60);
								str = toTwo(_hours) + ':' + toTwo(_min) + ':' + toTwo(_sec);
								if (_time <= 0) {
									clearInterval(that.timer);
									that.find('p:first').text('拍卖中');
									that.find('span').filter('.want').text('我要拍');
								}
								that.find('p:first').text('距开始：' + str);
								that.find('span').filter('.want').text('未开始');
							}, 1000);
						}

					});
					$('.goods_lst>li').click(function() {
						var oid = $(this).attr('id');
						getajax.setsessionStorage('auction_id', oid);
						window.location.href = 'iphone6record.html?id=' + oid;
					});

				}
			}
		}, function(error) {
			getajax.loadhide();
		});
	};

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
		myScroll = new iScroll('iScrollmypaimai', {
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
		runimg();
		mypaimailst();

	}

	return {
		start: start
	}
})();
window.paimai.start();