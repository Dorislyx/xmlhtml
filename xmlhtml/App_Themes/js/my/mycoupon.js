window.mycoupon = (function() {
	var server = '',
		_key = '',
		htm = '',
		hasmore = false, //表示是否存在下一页
		n = 1,
		_mycouponpri = 0, //
		params = {};


	var $li = $('.type-lst>li');
	var $div = $('.con>div');

	$li.click(function() {
			var $this = $(this);
			$li.removeClass();
			$this.addClass('this');
			getajax.loadshow();
			if ($this.html() === "未使用") {
				n = 1;
				getcollectlst();
			}
			if ($this.html() === "已使用") {
				n = 2;
				getcollectlst();
			}
		})
		//获取代金券列表

	function getcollectlst() {
		var _key = getajax.getsessionStorage('_key');
		server = 'index.php';
		params = {
			'act': 'member_voucher',
			'op': 'voucher_list',
			'voucher_state': n,
			'key': _key
		};
		getajax.postAction(server, params, function(res) {
			console.log('获取代金券列表', res);
			if (res['code'] == 200) {
				if(!res['datas']['error']){
				getajax.loadhide();
				hasmore = res['hasmore'];
				var lst1 = res['datas']['voucher_list'];

				htm = '';
				if (lst1.length == 0) {
					htm = '<li style="text-align: center;line-height: 40px;font-size: 1.2em;color: #888; border:1px solid #eee;height:130px;">' +getajax.voidmsg('couponmsg') + '</li>';}
				$(lst1).each(function(k, v) {
					if (n == 1) {
						if (_mycouponpri != '' && _mycouponpri != null && _mycouponpri != undefined) {
							console.log(parseInt(_mycouponpri) <= parseInt(v['voucher_limit']));
							if (parseInt(_mycouponpri) >= parseInt(v['voucher_limit'])) {
								htm += '<li limitpri="' + v['voucher_limit'] + '" id="' + v['voucher_id'] + '" >';
								htm += '<div class="lst">';
								htm += '<span>￥' + v['voucher_price'] + '</span>';
								htm += '<span>有效期：' + getajax.getTime(v['voucher_end_date'], '-', false) + '</span>';
								htm += '</div>';
								htm += '</li>';
							}
						} else {
							htm += '<li limitpri="' + v['voucher_limit'] + '" id="' + v['voucher_id'] + '" >';
							htm += '<div class="lst">';
							htm += '<span>￥' + v['voucher_price'] + '</span>';
							htm += '<span>有效期：' + getajax.getTime(v['voucher_end_date'], '-', false) + '</span>';
							htm += '</div>';
							htm += '</li>';
						}

					}
					if (n == 2) {
						htm += '<li id="' + v['voucher_id'] + '" limitpri="' + v['voucher_limit'] + '">';
						htm += '<div class="lst">';
						htm += '<span>￥' + v['voucher_price'] + '</span>';
						htm += '<span>有效期：' + getajax.getTime(v['voucher_end_date'], '-', false) + '</span>';
						htm += '<img src="' + v['voucher_state_text'] + '"/>';
						htm += '</div>';
						htm += '</li>';
					}
				});
				$('.couponlst').empty().append(htm);
				//每张优惠券点击事件
					$('.couponlst>li').click(function() {
						var voucherid = $(this).attr('id');
						getajax.setsessionStorage('voucherid', voucherid);
						getajax._back();
					});
				/*//让不可用的优惠券隐藏
				if (_mycouponpri != '' && _mycouponpri != null && _mycouponpri != undefined) {
					$('.type-lst').css('display', 'none');
					var limitpris = $('.couponlst>li');
					$(limitpris).each(function(k, v) {
						if (_mycouponpri < $(v).attr('limitpri')) {
							$(this).css('display', 'none');
						}
					});
					
				}*/
				}
			}
		}, function(error) {
			getajax.loadhide();
		});
	}

	var IstotalPage = false;
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有


	function loaded(index) {
		pullUpEl = document.getElementById('pullUp');
		$('#pullUp').css('display', 'block');
		pullUpOffset = pullUpEl.offsetHeight;
		myScroll = new iScroll('iScrollmycoupon', {
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
		getajax.loadshow();
		bInitScorll = 0;
		_mycouponpri = getajax.getQueryString('mycoupon');
		if(_mycouponpri!=''&&_mycouponpri!=null&&_mycouponpri!=undefined){
			$('.type-lst').css('display', 'none');
		}
		$('.couponlst').empty();
		getcollectlst();
		reScroll(index);
	}

	return {
		start: start
	}
})();
window.mycoupon.start();