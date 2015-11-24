window.mycart = (function() {
	var server = '',
		htm = '',
		ifcart = 1,
		num = 0,
		isclick = false,
		params = {};

	$('.open-shop>li').click(function() {
		window.location.href = '../shop/shopdetails.html';
	});
	$('.shop-title').click(function() {
		window.location.href = '../shop/shophome.html';

	});
	$('.pimg').click(function() {
		window.location.href = '../shop/shopdetails.html';

	});

	//点击选择商品进行
	function selectfun() {
		$('.cart-left').click(function() {
			$(this).find('span').toggleClass('selecteds');
			isallselect();
			getcartnum();
			getcartprice();
		});
		$('li[name=allselect]').click(function() {
			if (isclick === false) {
				isclick = true;
				setTimeout(function() {
					isclick = false;
				}, 500);
				var selecked = $(this).hasClass('selecteds');
				if (selecked) {
					$(this).removeClass('selecteds');
					$('span[name=selected]').removeClass('selecteds');
				} else {
					$(this).addClass('selecteds');
					$('span[name=selected]').addClass('selecteds');
				}
				//isallselect();
				getcartnum();
				getcartprice();
			}

		});

		//判断是否全选
		function isallselect() {
			var selected = $('.left-option');
			var _selected = selected.length;
			_selected = parseInt(_selected);
			console.log(_selected);
			var noselect = $('.left-option.selecteds');
			var _noselect = noselect.length;
			_noselect = parseInt(_noselect);
			console.log(_noselect);
			if (_selected == _noselect) {
				$('li[name=allselect]').addClass('selecteds');
			} else {
				$('li[name=allselect]').removeClass('selecteds');
			}
		}

		//		//当手动输入商品数量
		//			$('#number_count').keyup(function(){
		//				var goods_storage=$(this).attr('goods_storage');
		//				var number_count =$(this).val();
		//				var _number_count=number_count;
		//				if(parseInt(_number_count)>goods_storage){
		//					$(this).val(goods_storage);
		//				}else if(parseInt(_number_count)<0){
		//					$(this).val(Math.abs(parseInt(_number_count)));
		//				}else if(parseInt(_number_count)<0){
		//					$(this).val(1);
		//				}
		//			})

		//购物车数量的加
		$('a[name=add]').click(function() {
			var cartid = $(this).prev().find('input').attr('cartid');
			var number_count = $(this).prev().find('input').val();
			var goods_storage = $(this).prev().find('input').attr('goods_storage');
			var obj = $(this);
			if (parseInt(number_count) < goods_storage) {
				number_count = parseInt(number_count) + 1;
			}
			$(this).prev().find('input').val(number_count);
			changenum(cartid, number_count, obj);
			getcartprice();
		});

		//购物车数量的减
		$('a[name=down]').click(function() {
			
			var cartid = $(this).next().find('input').attr('cartid');
			var number_count = $(this).next().find('input').val();
			var obj = $(this);
			if (parseInt(number_count) > 1) {
				number_count = parseInt(number_count) - 1;
			}
			$(this).next().find('input').val(number_count);
			changenum(cartid, number_count, obj);
			getcartprice();
		});

		//购物车数量的加减
		function changenum(x, y, obj) {
			var _key = getajax.getsessionStorage('_key');
			getajax.loadshow();
			server = 'index.php';
			params = {
				'act': 'member_cart',
				'op': 'cart_edit_quantity',
				'key': _key,
				'cart_id': x,
				'quantity': y
			}
			getajax.getAction(server, params, function(res) {
				console.log('购物车数量修改', res);
				if (res['code'] == 200) {
					if (!res['datas']['error']) {
						getajax.loadhide();
						getajax.showmsg('购物车数量修改成功');

						obj.parent().find('input').val(res['datas']['quantity']);
						obj.parents('.desc').next().find('em').text(res['datas']['total_price']);
						getcartprice();
					}
				}
			}, function(error) {
				getajax.loadhide();
			});
		}
	}

	//获取购物车的列表
	function getmycartlst() {
		var _key = getajax.getsessionStorage('_key');
		server = 'index.php';
		params = {
			'act': 'member_cart',
			'op': 'cart_list',
			'key': _key
		}
		getajax.getAction(server, params, function(res) {
			console.log('获取购物车列表', res);
			if (res['code'] == 200) {
				if (!res['datas']['error']) {
					getajax.loadhide();
					var lst = res['datas']['cart_list'];
					htm = '';
					if (lst == undefined || lst == null || lst.length == 0) {
						htm = '<li style="text-align: center;line-height: 50px;font-size: 1.3em;color: #808080;">你的购物车空空如也！</li>';
					}
					$(lst).each(function(k, v) {
						htm += '<li>';
						//htm += '<div class="shop-title">';
						//htm += '<span name="select"><a class="left-option-one"></a></span>';
						//htm += '<span class="store_name" ids="' + v['store_id'] + '" >' + v['store_name'] + '</span>';
						//htm += '<span class="left-option-right"></span>';
						//htm += '</div>';
						htm += '<div class="cart-right">';
						htm += '<span class="title"></span>';
						htm += '<span class="desc">';
						htm += '<div class="cart-left">';
						htm += '<span name="selected" class="left-option"></span>';
						htm += '</div>';
						htm += '<ul class="project-desc">';
						htm += '<li>';
						htm += '<span class="pimg" id="' + v['goods_id'] + '">';
						htm += '<img src="' + v['goods_image_url'] + '"/>';
						htm += '</span>';
						htm += '</li>';
						htm += '<li class="projiec-npt">';
						htm += '<span>' + v['goods_name'] + '</span>';
						htm += '<span class="price">当前价格：￥  <a id="newprice">' + v['goods_price'] + '</a></span>';
						htm += '<span class="count">';
						htm += '<a name="down"></a>';
						htm += '<a>';
						htm += '<input cartid="' + v['cart_id'] + '" goods_storage="' + v['goods_storage'] + '" class="number_count" type="text" name="number_count" id="number_count" value="' + v['goods_num'] + '" readonly="readonly"/>';
						htm += '</a>';
						htm += '<a name="add"></a>';
						htm += '</span>';
						htm += '</li>';
						htm += '</ul>';
						htm += '</span>';
						htm += '<span class="cart-this-price">小计：￥<em>' + v['goods_sum'] + '</em></span>';
						htm += '</div>';
						htm += '</li>';
					});
					$('.lst').empty().append(htm);

					//$('#sumprice').text('合计：￥ '+res['datas']['sum']+'');
					//$('#gobuy').text('去结算（'+res['datas']['cart_list'].length+'）');
					selectfun();
					$('.pimg').click(function() {
						var oid = $(this).attr('id');
						window.location.href = '../shop/shopdetails.html?id=' + oid;
					})
					$('.store_name').click(function() {
						var ids = $(this).attr('ids');
						window.location.href = '../shop/shophome.html?store_id=' + ids;
					});
				} else {
					getajax.loadhide();
					getajax.showmsg(res['datas']['error']);
				}
			}
		}, function(error) {
			getajax.loadhide();
		});
	}


	//计算购物车的数量
	function getcartnum() {
			var spans = $('span[class="left-option selecteds"]');
			var sum = 0;
			var _sum = spans.length;
			$(spans).each(function(k, v) {
				sum += parseInt($(v).parent().next().find('input').val());
			});
			//显示购买数量
			$('#gobuy').text('去结算（' + _sum + '）');
		}
		//计算购物车的商品被选中总计金额

	function getcartprice() {
		var spans = $('span[class="left-option selecteds"]');
		var sumprice = 0;
		$(spans).each(function(k, v) {
			//console.log($(v).parents('.cart-right'));
			//console.log($(v).parents('.cart-right').find('em').text());
			sumprice += parseFloat($(v).parents('.cart-right').find('em').text());
		});

		if ((sumprice + "").indexOf('.') == -1) {
			sumprice += '.00';
		}
		//显示购买金额
		$('#sumprice').text('合计：￥ ' + sumprice + '');
	}


	//购物车删除
	$('header>span.right').click(function() {
		if (num == 0) {
			$('.right').text('取消');
			$('#cart-edit').css('display', 'block');
			num = 1;
		} else if (num == 1) {
			$('#cart-edit').css('display', 'none');
			$('.right').text('编辑');
			num = 0;
		}

	});

	$('#delCartProdect').click(function() {
		if (num == 1) {
			var spans = $('span[class="left-option selecteds"]');
			if (spans.length == 0) {
				getajax.showmsg('请选择要删除的商品');
			} else {
				getajax.loadshow();
				$(spans).each(function() {
					var cart_id = $(this).parent().next().find('input').attr('cartid');
					delcartgoods(cart_id);
					$('#sumprice').text('合计：￥ 0.00');
					$('#gobuy').text('去结算（ 0 ）');
				});

			}
		}
	});
	//删除方法
	function delcartgoods(cart_id) {
		var _key = getajax.getsessionStorage('_key');
		server = 'index.php';
		params = {
			'act': 'member_cart',
			'op': 'cart_del',
			'key': _key,
			'cart_id': cart_id
		}
		getajax.getAction(server, params, function(res) {
			console.log('删除购物车', res);
			if (res['code'] == 200) {
				if (res['datas'] == 1) {
					getajax.loadhide();
					getajax.showmsg('删除商品成功');
					$('#cart-edit').css('display', 'none');
					$('.right').text('编辑');
					num = 0;
					getmycartlst();
//					getcartnum();
//					getcartprice();

				} else {
					getajax.loadhide();
					getajax.showmsg(res['datas']['error']);
				}
			}
		}, function(error) {});
	}

	//购物车点击结算
	$('#gobuy').click(function() {

		var _key = getajax.getsessionStorage('_key');
		var spans = $('span[class="left-option selecteds"]');
		if (spans.length == 0) {
			getajax.showmsg('请选择要购买的商品');
		} else {
			getajax.loadshow();
			var _cart_id = '';
			$(spans).each(function(k, v) {
				var cart_id = $(this).parent().next().find('input').attr('cartid');
				var numb = $(this).parent().next().find('input').val();
				_cart_id += cart_id + '|' + numb + ',';
			});
			_cart_id = _cart_id.substring(0, _cart_id.length - 1);
			getajax.setsessionStorage('cart_id1', _cart_id)
			server = 'index.php';
			params = {
				'act': 'member_buy',
				'op': 'buy_step1',
				'key': _key,
				'cart_id': _cart_id,
				'ifcart': ifcart
			}
			getajax.getAction(server, params, function(res) {
				console.log('购物车点击结算', res);
				if (res['code'] == 200) {
					if (!res['datas']['error']) {
						getajax.loadhide();
						getajax.showmsg('购物车结算成功');
						getajax.setsessionStorage('res1', res);
						setTimeout(function() {
							window.location.href = '../order/confirmorder.html?ifcart=' + ifcart;
						}, 500);
					} else {
						getajax.loadhide();
						getajax.showmsg(res['datas']['error'])
					}
				}
			}, function(error) {});
		}

	});

	var IstotalPage = false;
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有


	function loaded(index) {
		myScroll = new iScroll('iScrollmycart', {
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
		getajax.loadshow();
		bInitScorll = 0;
		getmycartlst();
		reScroll(index);

	}

	return {
		start: start
	};
})();
window.mycart.start();