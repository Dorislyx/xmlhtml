window.shopdetails = (function() {
	var oid = getajax.getQueryString('id'),
		run = ''; //当前层的id
	var _key = getajax.getsessionStorage('_key');
	//var _key = '44bd0009ad025d01af658605ecc8246b';
	var run = 'iScrollshopdetails';
	var _istouch = false,
		hideindex = -1,
		server = '',
		params = {},
		htm = '',
		htm1 = '',
		ifcart = 0,
		store_id = '',
		type = 1,
		isclick = false;

	//点击跳转
	$('.gmzx').click(function() {
		window.location.href = '../my/buyquestion.html?id=' + oid;
	});

	$('#details-cx1').click(function() {
		window.location.href = '../shop/b.html?id=' + oid;
	});

	$('#paisong').click(function() {
		window.location.href = '../shop/city.html';
	});

	$('#shop-details').click(function() {
		window.location.href = '../shop/b.html?id=' + oid;
	});

	$('.two>span').eq(0).click(function() {
		window.location.href = '../shop/shopindex.html';
	});
	$('.two>span').eq(1).click(function() {
		window.location.href = '../shop/search.html';
	});
	$('.two>span').eq(2).click(function() {
		window.location.href = '../stringify/stringifyindex.html';
	});
	$('.two>span').eq(3).click(function() {
		window.location.href = '../user/userindex.html';
	});
	//购买该商品的用户最终购买了
	$('div').on('click', '#llgm>li', function() {
		if (isclick == false) {
			isclick = true;
			setTimeout(function() {
				isclick = false;
			}, 500);
			//var aid = $(this).attr('id');
			oid = $(this).attr('id');
			window.location.href = '../shop/shopdetails.html?id=' + oid;
		}
	});
	getajax._click('#backs', function() {
		if (isclick == false) {
			isclick = true;
			setTimeout(function() {
				isclick = false;
			}, 500);
			history.back();
		}

	});
	getajax._click('#hideone', function() {
		if (isclick == false) {
			isclick = true;
			setTimeout(function() {
				isclick = false;
			}, 500);
			ulhide();
			hideindex = -1;
		}
	});
	//三点
	getajax._click('.right', function() {
		if (isclick == false) {
			isclick = true;
			setTimeout(function() {
				isclick = false;
			}, 500);

			ulshow();
			if (hideindex == 0) {
				ulhide();
				hideindex = -1;
			} else {
				hideindex = 0;
				$('.two').fadeIn(10);
				$('.two').animate({
					'margin-top': 0
				}, 500);
			}
		}

	});

	//浏览历史
	getajax._click('.right1', function() {
		if (isclick == false) {
			isclick = true;
			setTimeout(function() {
				isclick = false;
			}, 500);

			$('.two').animate({
				'margin-top': -50
			}, 10);
			ulshow();
			hideindex = 1;
			$("#hideone").css("top", "0").css("z-index", 1110);
			$('.three').fadeIn(10);
			$('.three').animate({
				'right': 0
			}, 500);
		}
	});


	//规格、
	getajax._click('#details-cx', function() {
		if (isclick == false) {
			isclick = true;
			setTimeout(function() {
				isclick = false;
			}, 500);
			ulshow();
			hideindex = 2;
			$("#hideone").css("top", "0").css("z-index", 1110);
			$('.four').fadeIn(10);
			$('.four').animate({
				'left': 20 + "%"
			}, 500);
		}

	});

	function ulhide() {
		if (hideindex == 0) {
			$('.two').animate({
				'margin-top': -50
			}, 500, function() {
				$('.hidedetails').css('display', "none");
			});
		} else if (hideindex == 1) {
			$('.three').animate({
				'right': -100
			}, 500, function() {
				$('.hidedetails').css('display', "none");
				$("#hideone").css("top", "50").css("z-index", 991);
			});
		} else if (hideindex == 2) {
			$('.four').animate({
				'left': 100 + "%"
			}, 500, function() {
				$('.hidedetails').css('display', "none");
				$("#hideone").css("z-index", 991);
			});
		}
	}
	$('.four-btn').click(function() {
		ulhide();
	});

	function ulshow() {
		$('.hidedetails').css('display', "block");
	}



	//	//点击跳转店铺详情
	//	$('#shophomes').click(function() {
	//			window.location.href = '../shop/shophome.html?store_id='+store_id;
	//		})
	//点击添加收藏
	$('footer li[name=getaddmyc]').click(function() {

		if (_key === '') {
			setTimeout(function() {
				window.location.href = '../login/login.html';
			}, 500);
		} else {
			getajax.loadshow();
			server = 'index.php';
			params = {
				'act': 'member_favorites',
				'op': 'favorites_add',
				'id': oid,
				'key': _key
			};
			getajax.getAction(server, params, function(res) {
				console.log('添加收藏', res);
				if (res['code'] == 200) {
					if (res['datas'] == 1) {
						getajax.loadhide();
						getajax.showmsg('添加收藏成功');
					} else {
						getajax.loadhide();
						getajax.showmsg(res['datas']['error']);
					}
				}
			}, function(error) {
				getajax.loadhide();
			});
		}
	});
	//立即购买
	$('li[name=thisbuy]').click(function() {
		var buyid = $('#' + run).attr('buyid');
		if ($('#storage').text() == 0) {
			getajax.showmsg('库存不足');
			return false;
		}
		var _a = $("#numbers").val();
		getajax.setsessionStorage('cart_id', buyid + '|' + _a);
		if (_key === '') {
			getajax.showmsg('您还未登陆哦');
			setTimeout(function() {
				window.location.href = '../login/login.html';
			}, 500);
		} else {
			getajax.loadshow();
			server = 'index.php';
			params = {
				'act': 'member_buy',
				'op': 'buy_step1',
				'key': _key,
				'cart_id': buyid + '|' + _a,
				'ifcart': ifcart
			}
			getajax.getAction(server, params, function(res) {
				console.log('立即购买', res);
				if (res['code'] == 200) {
					if (!res['datas']['error']) {
						getajax.loadhide();
						getajax.showmsg('请确认订单');
						if (res['datas']['ifshow_offpay'] == null) {
							getajax.setsessionStorage('ifshow_offpay', 0);
						} else {
							getajax.setsessionStorage('ifshow_offpay', 1);
						}
						if (res['datas']['address_info'] != '') {
							getajax.setsessionStorage('res', res);
							setTimeout(function() {
								window.location.href = '../order/confirmorder.html?ifcart=' + ifcart;
							}, 500);
						} else {
							getajax.showmsg('请添加收货地址!', null);
							setTimeout(function() {
								window.location.href = '../delivery/creadaddress.html';
							}, 500);
						}


					} else {
						getajax.loadhide();
						getajax.showmsg(res['datas']['error']);
					}
				}
			}, function(error) {
				getajax.loadhide();
			});
		}
	});

	//点击加入购物车
	$('.addcart').click(function() {
		var buyid = $('#' + run).attr('buyid');
		//var _key = getajax.getsessionStorage('_key');
		var _a = $("#numbers").val();
		if (_key === '') {
			getajax.showmsg('您还未登陆哦');
			setTimeout(function() {
				window.location.href = '../login/login.html';
			}, 500);
		} else {
			getajax.loadshow();
			server = 'index.php';
			params = {
				'act': 'member_cart',
				'op': 'cart_add',
				'key': _key,
				'goods_id': buyid,
				'quantity': _a
			}
			getajax.getAction(server, params, function(res) {
				console.log('加入购物车', res);
				if (res['code'] == 200) {
					if (res['datas'] == 1) {
						getajax.loadhide();
						getajax.showmsg('添加购物车成功');
					} else {
						getajax.loadhide();
						getajax.showmsg(res['datas']['error']);
					}
				}
			}, function(error) {
				getajax.loadhide();
			});
		}
	});
	//设置选择的城市
	function setcity(citys) {
			var _cnm = '';
			var _cid = '';
			$(citys).each(function(k, v) {
				_cnm += v['cname'] + ' ';
				_cid += v['cid'] + ' ';
			});
			$('#' + run).find('#cityname').text(_cnm).attr('cids', _cid);
		}
		//浏览记录

	function getViewHistoryList() {
		//var _key = getajax.getsessionStorage('_key');
		server = 'index.php';
		params = {
			'act': 'member_index',
			'op': 'goods_browse',
			'key': _key
		}
		getajax.getAction(server, params, function(res) {
			console.log('浏览记录', res);
			if (res['code'] == 200) {
				if (!res['datas']['error']) {
					getajax.loadhide();
					var lst = res['datas']['goods_list'];
					htm = '<span class="histtitle">浏览足迹</span>';
					if (lst != undefined && lst.length > 0) {
						$(lst).each(function(k, v) {
							if (k < 4) {
								htm += '<span id="' + v['goods_id'] + '">';
								htm += '<a name="imgname">';
								htm += '<img src="' + v['goods_image_url'] + '">';
								htm += '</a>';
								htm += '<a>' + v['goods_name'] + '</a>';
								htm += '<a>&yen;' + ((v['goods_promotion_price'] + "").indexOf('.') == -1 ? v['goods_promotion_price'] + ".00" : v['goods_promotion_price']) + '</a>';
								htm += '</span>';
							}
						});
						$('#getHistViewList').append(htm);
						//var _h = ((_width / 3) + (_width / 3) * 0.1);
						//					//$("#getHistViewList a[name=imgname]").css("height", +parseInt(_h) + "px");
					} else {
						$('#getHistViewList').append(htm);
					}
					$('#getHistViewList>span').click(function() {
						var goods_id = $(this).attr('id');
						window.location.href = 'shopdetails.html?id=' + goods_id;
					});
				}
			}
		}, function(error) {
			getajax.loadhide();
		});

	}


	//获取商品详情
	function getshopdetail() {
			server = 'index.php';
			params = {
				'act': 'goods',
				'op': 'goods_detail',
				'goods_id': oid,
				'key': _key
					//'goods_id': 49
			};
			getajax.getAction(server, params, function(res) {
				console.log('获取商品详情', res);
				if (res['code'] == 200) {
					if (!res['datas']['error']) {
						getajax.loadhide();
						var lstone = res['datas']['goods_info'].spec_name;
						var lsttwo = res['datas']['goods_info'].spec_value;
						var imglst = res['datas']['spec_image'];
						var countlst = res['datas']['spec_list'];
						var goods_storage = res['datas']['goods_info']['goods_storage'];
						var goods_id = res['datas']['goods_info']['goods_id'];
						var goods_price = res['datas']['goods_info']['goods_price'];
						var prodAdword = res['datas']['goods_info']['goods_name'];
						//存入商品详细的
						var goods_attr = res['datas']['goods_info']['goods_attr'];
						getajax.setsessionStorage('goods_attr', goods_attr);
						$('#' + run).attr('buyid', oid); //保存当前商品的id
						$('#' + run).find('#shopdimgs').attr('src', res['datas']['spec_image'][0]);
						getspec(lstone, lsttwo, imglst, countlst, goods_storage);
						$('#' + run).find('#prodPrice').text(res['datas']['goods_info']['goods_promotion_price'] + '');
						$('#' + run).find('#prodAdword').text(prodAdword);
						var goods_promotion_type = res['datas']['goods_info']['goods_promotion_type'];
						if (goods_promotion_type == 0) {
							$('#' + run).find('#prodOriginPrice').css('display', 'none');
						} else {
							$('#' + run).find('#prodOriginPrice').text('原价:￥ ' + res['datas']['goods_info']['goods_price'] + '');
						}

						$('#' + run).find('#storage').text(res['datas']['goods_info']['goods_storage']);
						$('#' + run).find('#shopdid').text('商品编号:' + res['datas']['goods_info']['goods_id'] + '');
						$('#' + run).find('#storeName').text(res['datas']['store_info']['store_name']);
						store_id = res['datas']['store_info']['store_id'];
						//$('#' + run).find('#goodCommentNum').text(res['datas']['goods_info']['evaluation_count']);
						$('#' + run).find('#countCommentNum').text(res['datas']['goods_info']['evaluation_count']);
						$('#' + run).find('.lxhf>a').attr('href', 'tel:' + res['datas']['store_info']['store_phone'] + '');
						var stars = res['datas']['goods_info']['evaluation_good_star'];
						//getappriselst(stars);
						//获取规格中默认图片
						$('#shopdimgs').attr('src', imglst[res['datas']['goods_info']['color_id']]);
						$('#shopdid').text('商品编号:' + goods_id + '');
						$('#shopdprice').text('￥' + goods_price + '');
						if (parseInt(res['datas']['goods_info']['evaluation_count']) == 0) {
							$('#' + run).find('li[name=pl]').css('display', 'none');
						}


						htm = '';
						var _lst = res['datas']['goods_image'];
						var lst = _lst.split(',');
						var lstlen = lst.length;
						$(lst).each(function(k, v) {
							htm += '<li>';
							htm += '<img src="' + v + '" />';
							htm += '</li>';
						});
						$('#' + run).find('#runimg').empty().append(htm);
						$('#' + run).find('#runimg').css("width", lst.length + "00%");
						$('#' + run).find('#runimg>li').css("width", 100 / lst.length + "%");
						runimg();
						$('#' + run).find('#originscount').empty().append('<a>1</a>/<span>' + lstlen + '</span>');

						var mlst = res['datas']['goods_commend_list'];
						htm1 = '';
						$(mlst).each(function(k, v) {
							htm1 += '<li id="' + v['goods_id'] + '">';
							htm1 += '<span>' + v['goods_name'] + '</span>';
							htm1 += '<span>';
							htm1 += '<img src="' + v['goods_image_url'] + '" />';
							htm1 += '</span>';
							htm1 += '<span>￥' + v['goods_price'] + '</span>';
							htm1 += '</li>';
						});
						$('#' + run).find('#llgm').empty().append(htm1);
						new reScroll();
					} else {
						getajax.loadhide();
						getajax.showmsg(res['datas']['error']);
					}

				}
			}, function(error) {
				getajax.loadhide();
			});
		}
		//获取规格listone, listtwo

	function getspec() {
		var listone = arguments[0];
		var listtwo = arguments[1];
		var imglst = arguments[2];
		var countlst = arguments[3];
		var goods_storage = arguments[4];
		var _khtml = '';
		for (var i in listone) {
			//拿到key
			_khtml += '<span>' + listone[i] + '</span>';
			_khtml += '<span class="color-lst">';
			for (var j in listtwo) {
				//根据key获取对应属性值集合
				var klst = listtwo[i];
				if (klst != null && klst != undefined && klst != '') {
					for (var k in klst) {
						_khtml += '<a ids="' + k + '" count="' + countlst[k] + '" imgurl="' + imglst[k] + '" name="' + goods_storage + '">' + klst[k] + '</a>';
					}
				}
			}
			_khtml += '</span>';

		}
		_khtml += '<span>数量</span>';
		_khtml += '<span class="number-n">';
		_khtml += '<a id="down"></a>';
		_khtml += '<a>';
		_khtml += '<input type="text" id="numbers" value="1" readonly="readonly">';
		_khtml += '</a>';
		_khtml += '<a id="add"></a>';
		_khtml += '</span>';
		$('#four-two').empty().append(_khtml);
		$('.color-lst>a').click(function() {
			$(this).addClass('this').siblings().removeClass('this');
			var ids = $(this).attr('ids');
			var imgurl = $(this).attr('imgurl');
			var count = $(this).attr('count');
			var goods_storage = $(this).attr('name');
			oid = count;

			getshopdetail();

			$('#shopdimgs').attr('src', imgurl);
		});
		//点击减少数量
		$('#down').click(function() {
			var a = $("#numbers").val();
			if (parseInt(a) > 1) {
				a = parseInt(a) - 1;
				_count = a;
				$("#numbers").val(a);
			}
		});
		//点击增加数量
		$('#add').click(function() {
			var a = $("#numbers").val();
			if (parseInt(a) < goods_storage) {
				a = parseInt(a) + 1;
				_count = a;
				$("#numbers").val(a);
			}
		});

	}

	//获取规格对应的图片
	function getspecimg(imglst, _ids) {
		var spec_image = imglst._ids;
		$('#shopdimgs').attr('src', spec_image);
	}

	function runimg() {
		var index = 0,
			maxlen = $(".runimg li").length,
			runtime = 500,
			width = 100;

		touchs._right(".runimg", function() {
			if (index < maxlen - 1) {
				index += 1;
			} else {
				index = 0;
			}
			mover();
		});
		touchs._left(".runimg", function() {
			if (index > 0) {
				index -= 1;
			} else {
				index = maxlen - 1;
			}
			mover();
		});

		function mover() {
			$(".runimg-count>a").empty().append(index + 1);
			$("#runimg").animate({
				'margin-left': -index * width + "%"
			}, runtime);
		}
	}

	//获取评价列表
	function getappriselst(stars) {
		server = 'index.php';
		params = {
			'act': 'goods',
			'op': 'comments_list',
			'goods_id': oid,
			'type': type
		}
		getajax.getAction(server, params, function(res) {
			console.log('获取评价列表', res);
			if (res['code'] == 200) {
				if (!res['datas']['error']) {
					getajax.loadhide();
					var comments_list = res['datas']['comments_list'];
					var htm2 = '';
					$(comments_list).each(function(k, v) {
						if (k < 2) {
							htm2 += '<li class="sd pl">';
							htm2 += '<div>';
							htm2 += '<span class="_left">';
							for (var a = 0; a < parseInt(comments_list[k]['geval_scores']); a++) {
								htm2 += '<img src="../App_Themes/img/star.png">';
							}

							htm2 += '</span>';
							htm2 += '<span class="_right">' + v['geval_frommembername'] + ' ' + getajax.getTime(v['geval_addtime'], '-', false) + ' </span>';
							htm2 += '</div>';
							htm2 += '<div class="pl-txt">' + v['geval_content'] + '</div>';
							htm2 += '</li>';
						}
					});
					$('li[name=pl]').replaceWith(htm2);
					new reScroll();
					if (res['datas']['all'] == 0 || res['datas']['all'] == '') {
						$('#' + run).find('#goodCommentNum').text('0%');
					} else {
						$('#' + run).find('#goodCommentNum').text((res['datas']['good_percent'] + '%'));
					}
				} else {
					getajax.loadhide();
					getajax.showmsg(res['datas']['error']);
				}
			}
		}, function(error) {
			getajax.loadhide();
		});
	}

	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有
	function loaded() {
		myScroll = new iScroll('iScrollshopdetails', {
			useTransition: true,
			vScrollbar: false,
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
		new reScroll();
		getajax.loadshow();
		getshopdetail();
		getViewHistoryList();
		//getappriselst();
	}
	return {
		start: start,
		setcity: setcity
	}
})();
window.shopdetails.start();