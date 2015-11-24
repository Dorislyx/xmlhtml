window.mysecskill = (function() {
	var _width = $(document).width();
	var server = '',
		htm = '',
		htn = '',
		isclick = false,
		hasmore = false, //表示是否存在下一页
		params = {};
	$('.secskill_goods').on('click', '#secskill_goods>li', function() {
		var id = $(this).attr("id");
		if (isclick == false) {
			isclick = true;
			setTimeout(function() {
				isclick = false;
			}, 500);
			setTimeout(function() {
				window.location.href = '../seckill/mysecskilldetail.html?id=' + id;
			}, 300);
		}
	});



	//秒杀列表
	function mysecskill() {
		server = 'index.php';
		params = {
			'act': 'group_buy',
			'op': 'list',
			'type': 'miao'
		}
		getajax.getAction(server, params, function(res) {
			console.log('获取秒杀列表', res);
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
						window.location.href = 'mysecskilldetail.html?id=' + oid;
					});
					if (lst.length == 0) {
						var htg = '';
						htg = '<li style="text-align: center; font-size: 1.2em; color:#999;">暂时无秒杀商品</li>';
						$('#secskill_goods').empty().append(htg);
					} else {
						$(lst).each(function(k, v) {
							var prcent = (parseInt(lst[k]['goods_salenum']) / lst[k]['goods_totalnum']) * 100;
							var time = parseInt(v['start_time']);
							var hours = 0;
							var min = 0;
							var sec = 0;
							hours = parseInt(time / 3600);
							min = parseInt(time % 3600 / 60);
							sec = parseInt(time % 3600 % 60);
							if (parseInt(lst[k]['goods_salenum']) == lst[k]['goods_totalnum']) {
								htm += '<li class="this" id="' + v['goods_id'] + '">';
								htm += '<div>';
								htm += '<img src="' + v['groupbuy_image'] + '"/>';
								htm += '</div>';
								htm += '<div>';
								htm += '<div>';
								htm += '<p>' + v['groupbuy_name'] + '</p>';
								htm += '</div>';
								htm += '<a>￥' + v['groupbuy_price'] + '元</a>';
								htm += '<del>&nbsp;￥' + v['goods_price'] + '元</del>';
								htm += '<div class="secskill_price">';
								htm += '<div>';
								htm += '<span style="width:' + prcent + '%;"></span>';
								htm += '<strong>已售' + parseInt(prcent) + '%</strong>';
								htm += '</div>';
								htm += '<span>已抢完</span>';
								htm += '</div>';
								htm += '</div>';
								htm += '</li>';
							} else {

								htm += '<li id="' + v['goods_id'] + '" endtime="' + v['end_time'] + '" strtime="' + v['start_time'] + '">';
								/*htm+='<p class="time"><strong>距开始：</strong><span>'+toTwo(hours)+'</span><a>:</a><span>'+toTwo(min )+'</span><a>:</a><span>'+toTwo( sec )+'</span></p>';*/
								htm += '<div>';
								htm += '<img src="' + v['groupbuy_image'] + '"/>';
								htm += '</div>';
								htm += '<div>';
								htm += '<div>';
								htm += '<p>' + v['groupbuy_name'] + '</p>';
								htm += '</div>';
								htm += '<a>￥' + v['groupbuy_price'] + '元</a>';
								htm += '<del>&nbsp;￥' + v['goods_price'] + '元</del>';
								htm += '<div class="secskill_price">';
								htm += '<div>';
								htm += '<span style="width:' + prcent + '%;"></span>';
								htm += '<strong>已售' + parseInt(prcent) + '%</strong>';
								htm += '</div>';
								htm += '<span>去抢购</span>';
								htm += '</div>';
								htm += '</div>';
								htm += '</li>';
							}

						});

						$('#secskill_goods').empty().append(htm);
					}

					/*	$('#secskill_goods>li').click(function(k,v){
							var selecked=$(this).hasClass('this');
							id = $(this).attr("id");
							if(selecked){
								
							}else{
								var _endtime=parseInt($(this).attr('endtime'));
								var _strtime=parseInt($(this).attr('strtime'));
								getajax.setsessionStorage('startime',_strtime);
								getajax.setsessionStorage('endtime',_endtime);
							}
							$('.secskill_goods').on('click', '#secskill_goods>li', function() {
									 
									if (isclick == false) {
										isclick = true;
										setTimeout(function() {
											isclick = false;
										}, 500);
										setTimeout(function() {
											window.location.href='../seckill/mysecskilldetail.html?id='+id;
										}, 300);
									}
								});
							
							
						});*/
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
		myScroll = new iScroll('iScrollmysecskill', {
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
		bInitScorll = 0;
		reScroll();

		mysecskill();
	}
	return {
		start: start
	}
})();
window.mysecskill.start();