window.Pay = (function() {
	var server = '',
		_key = getajax.getsessionStorage('_key'),
		pay_sn = '', //订单编号
		prices = '', //支付价格
		buy_title = '', //支付描述
		num = 1, //线上支付
		isclick = false,
		params = {};
	var payment_param, out_trade_no, subject, total_fee, body, notify_url;
	//提交去支付
	$('#submit').one('click', function() {
		if (num == 0) {
			return false;
		} else {
			if (isclick == false) {
				isclick = true;
				setTimeout(function() {
					isclick = false;
				}, 500);
				GoToBuy();
			}
		}
	});

	function GoToBuy() {
		server = 'index.php';
		params = {
			'act': 'member_payment',
			'op': 'payment_param',
			'key': _key,
			'pay_sn': pay_sn
		}
		getajax.getAction(server, params, function(res) {
			console.log('获取支付参数', res);
			if (res['code'] == 200) {
				if (!res['datas']['error']) {
					payment_param = res['datas']['payment_param'];
					out_trade_no = payment_param['out_trade_no']; //商户交易单号
					subject = payment_param['subject']; //商户订单名称
					total_fee = payment_param['total_fee']; //总金额
					body = payment_param['body']; //订单主体内容
					notify_url = payment_param['notify_url']; //异步通知路径
					console.log(subject);
					console.log(body);
					console.log(out_trade_no);
					console.log(total_fee);
					console.log(notify_url);
					try {
						if (getajax.andOrios()) {
							window.method5.pay(subject, body, total_fee, out_trade_no, notify_url);
						} else {
							window.location.href = "objc://gotoBuy:/," + out_trade_no + "," + total_fee + "," + subject + "," + body + "," + notify_url;
						}
					} catch (e) {
						//TODO handle the exception
					}
				} else {
					getajax.showmsg(res['datas']['error']);
					$('#submit').one('click', function() {
						if (num == 0) {
							return false;
						} else {
							if (isclick == false) {
								isclick = true;
								setTimeout(function() {
									isclick = false;
								}, 500);
								GoToBuy();
							}
						}
					});
				}
			}
		}, function(error) {
			$('#submit').one('click', function() {
				if (num == 0) {
					return false;
				} else {
					if (isclick == false) {
						isclick = true;
						setTimeout(function() {
							isclick = false;
						}, 500);
						GoToBuy();
					}
				}
			});
		});
	}

	//接受支付成功的回调
	function payCallback(x) {
		if (x == 0) {
			window.location.href = 'pay_res.html?x=' + x;
		} else {
			window.location.href = 'pay_res.html?x=' + x;
		}
	}

	var IstotalPage = false;
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有


	function loaded(index) {
		myScroll = new iScroll('iScrollPay', {
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
		//var allow_offpay=getajax.getsessionStorage('allow_offpay');
		//console.log(allow_offpay);
		//		if(allow_offpay==0){
		//			var htm='';
		//			htm+='<option>支付方式</option>';
		//			htm+='<option>支付宝</option>';
		//			$('select').empty().append(htm);
		//		}
		//getajax.showmsg(getajax.andOrios());
		var pay_name = getajax.getsessionStorage('pay_name');
		if (pay_name == 'online') {
			$('#zfb').text('支付宝');
			$('#submit').css('display', 'block');
			getajax.removesessionStorage('pay_name');
			num = 1;
		} else if (pay_name == 'offline') {
			$('#zfb').text('货到付款');
			num = 0;
			$('#submit').text('订单提交成功！即将跳转。。。');
			setTimeout(function() {
				getajax.removesessionStorage('pay_name');
				//window.location.href='../user/userindex.html';

			}, 2000);
		} else {
			$('#zfb').text('支付宝');
			$('#submit').css('display', 'block');
			getajax.removesessionStorage('pay_name');
			num = 1;
		}
		prices = getajax.getsessionStorage('prices');
		pay_sn = getajax.getQueryString('pay_sn');
		if (pay_sn == '' || pay_sn == undefined) {
			pay_sn = getajax.getsessionStorage('pay_sn');
		}

		//buy_title = getajax.getsessionStorage('buy_title');
		$('#oid').text(pay_sn);
		$('#oprice').text('￥' + prices + '');
		bInitScorll = 0;
		reScroll(index);
	}

	return {
		start: start,
		payCallback: payCallback
	};
})();
window.Pay.start();