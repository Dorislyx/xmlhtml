window.iphone6record = (function() {
	var server = '',
		i = 20,
		_key = getajax.getsessionStorage('_key'),
		auction_id = getajax.getQueryString('id'),
		range_price = '',
		timer = null,
		timer1 = null,
		limit = '',
		member_info = '',
		lst = '',
		etime = '',
		button_text = '',
		round_num = 1,
		pay_sn='',
		htm = '',
		tprice = '',
		params = {};


	//获取竞拍详情
	function getcomplete() {
		server = 'index.php';
		params = {
			'act': 'auction',
			'op': 'detail',
			'key': _key,
			'auction_id': auction_id
		}
		getajax.getAction(server, params, function(res) {
			console.log('获取竞拍详情', res);
			if (res['code'] == 200) {
				if (!res['datas']['error']) {
					var data = res['datas'];
					//显示是否出价
					var deposit_payed = res['datas']['deposit_payed'];
					var auction_state_text = res['datas']['auction_state_text'];
					button_text = data['button_text'];
					if (button_text == '未开始'||button_text=='已结束') {
						$('.btn').css('display', 'block');
						$('.bottom_btn').css('display', 'none');
						clearInterval(timer1);
					} else {
						if (deposit_payed == 1) {
							$('.btn').css('display', 'none');
							$('.bottom_btn').css('display', 'block');
						}
						iscompted();//判断是否中标
					}
					//deposit_payed = 1;

					$('.btn').text(data['button_text']);
					button_text = data['button_text'];
					$('.along').text(data['count_down_text']);
					if (data['auction_state_text'] == '已结束') {
						$('.bot').css('display', 'none');
					}
					$('.banner_run>ul>li>img').attr('src', data['auction_image']);
					$('.gname').text(data['auction_name']);
					$('.addonce').text(data['range_price']);
					range_price = data['range_price'];
					$('.pomisefee').text(data['auction_deposit']);
					getajax.setsessionStorage('auction_deposit', data['auction_deposit']);
					$('.cankp').text(data['start_price']);
					$('.yujabuy').attr('name', data['goods_id']);
					$('.godsnum').text(data['auction_num']);

					$('.serve').text(data['auction_intro']);
					$('.shopname>b').text(data['store_name']);
					$('.shopname').attr('name', data['store_id']);
					$('.scoreo').text('' + data['store_credit_average'] + '分');
					$('.scoret').text('' + data['store_desccredit'] + '分');
					$('.scoreh').text('' + data['store_deliverycredit'] + '分');
					$('.scoref').text('' + data['store_servicecredit'] + '分');
					round_num = data['round_num'];
					if (round_num == undefined || round_num == null) {
						round_num = 1;
					} else {

						getajax.setsessionStorage('round_num', round_num);
					}
					$('.roundnum').text('第' + round_num + '轮');
					getajax.setsessionStorage('auction_id', auction_id);
					var store_id = data['store_id'];
					lst = data['price_list'];
					tprice = data['start_price'];
					$('#nowprice').val(parseInt(tprice));
					$('.currentp').text('￥' + tprice + '');
					//控制横向滚动条的宽
					liwidth(lst);

					//显示当前价格
					showprice();


					//显示距开始或者结束的时间
					etime = parseInt(data['count_down']);
					etime = Math.abs(etime);
					timeshow();

					//点击进入店铺
					$('.tab>li').eq(1).click(function() {
						window.location.href = '../shop/shophome.html?store_id=' + data['store_id'];
					});

					//点击收藏店铺
					$('.tab>li').eq(0).click(function() {
						getaddtorecollect(store_id);
					});
					//点击原价购买
					$('.yujabuy').click(function() {
						window.location.href = '../shop/shopdetails.html?id=' + data['goods_id'];
					});
				} else {
					getajax.showmsg(res['datas']['error']);
				}
			}
		}, function(error) {});
	}

	//控制横向滚动条的宽
	function liwidth(lst) {
		var _lis = lst.length;
		var liwidth = _lis * 109; //li的宽以及margin值
		$('.cord_lst').width(liwidth);
	};

	//显示距开始或者结束的时间
	function timeshow() {

		var hour = parseInt(etime / 3600);
		if (hour < 10) {
			hour = '0' + hour;
		}
		var minute = parseInt((etime % 3600) / 60);
		if (minute < 10) {
			minute = '0' + minute;
		}
		var second = parseInt((etime % 3600) % 60);
		if (second < 10) {
			second = '0' + second;
		}
		if (etime > 0) {
			etime--;
		}

		$('.fendtime').text('' + hour + ':' + minute + ':' + second + '');
	};

	//在页面显示最新出价列表
	function competlstshow() {
		if (lst.length != 0) {
			
			var a = lst.length;
			liwidth(lst);
			$('.roundnum').text('第' + a + '轮');
			switch (a) {
				case 1:
					$('.p1').text('￥' + lst[0]['member_mobile'] + '');
					$('.m1').text('￥' + lst[0]['bid_price']);
					break;
				case 2:
					$('.p1').text('￥' + lst[0]['member_mobile']);
					$('.m1').text('￥' + lst[0]['bid_price']);
					$('.p2').text('￥' + lst[1]['member_mobile']);
					$('.m2').text('￥' + lst[1]['bid_price']);
					break;
				case 3:
					$('.p1').text('￥' + lst[0]['member_mobile']);
					$('.m1').text('￥' + lst[0]['bid_price']);
					$('.p2').text('￥' + lst[1]['member_mobile']);
					$('.m2').text('￥' + lst[1]['bid_price']);
					$('.p3').text('￥' + lst[2]['member_mobile']);
					$('.m3').text('￥' + lst[2]['bid_price']);
					break;
				case 4:
					$('.p1').text('￥' + lst[0]['member_mobile']);
					$('.m1').text('￥' + lst[0]['bid_price']);
					$('.p2').text('￥' + lst[1]['member_mobile']);
					$('.m2').text('￥' + lst[1]['bid_price']);
					$('.p3').text('￥' + lst[2]['member_mobile']);
					$('.m3').text('￥' + lst[2]['bid_price']);
					$('.p4').text('￥' + lst[3]['member_mobile']);
					$('.m4').text('￥' + lst[3]['bid_price']);
					break;
				case 5:
					$('.p1').text('￥' + lst[0]['member_mobile']);
					$('.m1').text('￥' + lst[0]['bid_price']);
					$('.p2').text('￥' + lst[1]['member_mobile']);
					$('.m2').text('￥' + lst[1]['bid_price']);
					$('.p3').text('￥' + lst[2]['member_mobile']);
					$('.m3').text('￥' + lst[2]['bid_price']);
					$('.p4').text('￥' + lst[3]['member_mobile']);
					$('.m4').text('￥' + lst[3]['bid_price']);
					$('.p5').text('￥' + lst[4]['member_mobile']);
					$('.m5').text('￥' + lst[4]['bid_price']);
					break;
				default:
					$('.p1').text('￥' + lst[0]['member_mobile']);
					$('.m1').text('￥' + lst[0]['bid_price']);
					$('.p2').text('￥' + lst[1]['member_mobile']);
					$('.m2').text('￥' + lst[1]['bid_price']);
					$('.p3').text('￥' + lst[2]['member_mobile']);
					$('.m3').text('￥' + lst[2]['bid_price']);
					$('.p4').text('￥' + lst[3]['member_mobile']);
					$('.m4').text('￥' + lst[3]['bid_price']);
					$('.p5').text('￥' + lst[4]['member_mobile']);
					$('.m5').text('￥' + lst[4]['bid_price']);
					break;
			}
		}
	};

	//点击跳到确认订单页面
	$('.paynow').click(function() {
		window.location.href = '../order/Pay.html?pay_sn='+pay_sn;
		maskhide();
	});
	//稍后支付
	$('.later').click(function() {
		maskhide();
	});

	//判断是否中标
	function iscompted() {
		if (member_info != null && member_info != '' && member_info != undefined) {
			pay_sn = member_info['pay_sn'];
			if (pay_sn != undefined) {
				console.log('============'+pay_sn+'================');
				if(button_text != '未开始'&&button_text!='已结束'){
					maskshow();
				}
				
				clearInterval(timer1);
				auction_price=member_info['auction_price'];
				getajax.setsessionStorage('prices',auction_price);
				
			}else {
				if (button_text != '未开始'&&button_text!='已结束') {
					getcomptelst();//获取出价列表
				}
			}

		} else {
			if (button_text != '未开始'&&button_text!='已结束') {
					getcomptelst();//获取出价列表
			}
		}
	}
	//弹框出现
	function maskshow() {
		$('.mask').css('display', 'block');
	}

	//弹框消失
	function maskhide() {
		$('.mask').css('display', 'none');
	}

	//添加店铺收藏
	function getaddtorecollect(sid) {
		server = 'index.php';
		params = {
			'act': 'member_favorites',
			'op': 'favorites_add',
			'fav_type': 'store',
			'id': sid,
			'key': _key
		}
		getajax.getAction(server, params, function(res) {
			console.log('添加店铺收藏', res);
			if (res['code'] == 200) {
				if (res['datas'] == 1) {
					getajax.loadhide();
					getajax.showmsg('添加店铺收藏成功');
				} else {
					getajax.loadhide();
					getajax.showmsg(res['datas']['error']);
				}
			}
		}, function(error) {
			getajax.loadhide();
		});
	}

	//获取出价列表
	function getcomptelst() {
		server = 'index.php';
		params = {
			'act': 'auction',
			'op': 'price_list',
			'auction_id': auction_id,
			'round_num': round_num,
			'limit': limit
		}
		getajax.getAction(server, params, function(res) {
			console.log('获取出价列表', res);
			if (res['code'] == 200) {
				if (!res['datas']['error']) {
					member_info = res['datas']['member_info'];
					var _length = res['datas']['price_list'].length;
					$('.nua').text(_length);
					lst = res['datas']['price_list'];
					if (!res['datas']['price_list'] == undefined) {
						getajax.showmsg(res['datas']['price_list']['state']);
					}
					if (lst.length == 0) {
						//$('.cord_lst').css('display', 'none');
						/*if(res['datas']['button_text'] == '已结束'){
							htm = '<div class="nolst" style="padding-left:10px; line-height:24px;">已结束出价</div>';
						}else{
							htm = '<div class="nolst" style="padding-left:10px; line-height:24px;">暂时没有出价</div>';
						}
						
						$('.scroll_box').empty().append(htm);*/
						//tprice = res['datas']['start_price'];
						//$('.currentp').text('￥' + tprice + '');
						//$('#nowprice').val(parseInt(tprice));
					} else {
						//在页面显示最新出价列表
						//$('.cord_lst').css('display', 'block');
						$('.nolst').css('display', 'none');
						competlstshow();
						tprice = $('.cur .tprice').text();
						tprice = tprice.substring(1, tprice.length);

					}
					
					competlstshow();
					showprice();
					setTimeout(function() {
						iscompted();
					}, 1000);
				} else {
					getajax.showmsg(res['datas']['error']);
				}
			}
		}, function(error) {});
	}

	//显示当前价格

	function showprice() {
		if (lst.length != 0) {
			tprice = $('.cur .tprice').text();
			tprice = tprice.substring(1, tprice.length);
			console.log(tprice);
			//$('#nowprice').val(parseInt(tprice));
			$('.currentp').text('￥' + tprice + '');
		}

	};

	//点击出价
	$('#giveprice').click(function() {
		clearInterval(timer);
		i = 20;
		var price = $('#nowprice').val();
		server = 'index.php';
		params = {
			'act': 'auction',
			'op': 'submit_price',
			'key': _key,
			'auction_id': auction_id,
			'round_num': round_num,
			'price': price
		}
		getajax.getAction(server, params, function(res) {
			console.log('提交出价', res);
			if (res['code'] == 200) {
				if (!res['datas']['error']) {

					//timer = setInterval(ending, 1000);
					lst = res['datas']['price_list'];
					htm = '';
					competlstshow();
					showprice();

				} else {
					getajax.showmsg(res['datas']['error']);
				}
			}

		}, function(error) {});
	});

	//点击增加价格
	$('.add').click(function() {
		var nprice = $('#nowprice').val();
		nprice = parseInt(nprice) + parseInt(range_price);
		$('#nowprice').val(nprice);
	});

	//点击减少价格
	$('.down').click(function() {
		var nprice = $('#nowprice').val();
		if (nprice > tprice) {
			nprice = parseInt(nprice) - parseInt(range_price);
		}
		$('#nowprice').val(nprice);
	});

	$('.all').click(function() {
		window.location.href = 'moneyrecord.html';
	});


	var IstotalPage = false;
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有


	function loaded() {
		myScroll = new iScroll('iScrolliphone6record', {
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
		getcomplete();
		
		$('.btn').click(function() {
			if (button_text != '我要拍') {
				return false;
			} else {
				window.location.href = 'paydeposit.html';
			}

		});
		bInitScorll = 0;
		reScroll();

		setInterval(timeshow, 1000);
	}

	return {
		start: start
	}
})();
window.iphone6record.start();