window.mycollect = (function() {
	var server = '',
		_key = '',
		htm = '',
		fav_type = 'goods',
		hasmore = false, //表示是否存在下一页
		params = {};



	$('.type-lst>ul>li:eq(0)').click(function() {
		$(this).addClass('this').siblings().removeClass('this');
		getajax.loadshow();
		fav_type = 'goods';
		$('.lst').empty();
		getcollectlst();
	});
	$('.type-lst>ul>li:eq(1)').click(function() {
		$(this).addClass('this').siblings().removeClass('this');
		getajax.loadshow();
		fav_type = 'store';
		$('.lst').empty();
		_getcollectlst();
	});
	//获取商品收藏列表
	function getcollectlst() {
		server = 'index.php';
		params = {
			'act': 'member_favorites',
			'op': 'favorites_list',
			'fav_type': fav_type,
			'key': _key
		};
		getajax.getAction(server, params, function(res) {
			console.log('获取商品收藏列表', res);
			if (res['code'] == 200) {
				if(!res['datas']['error']){
				getajax.loadhide();
				hasmore = res['hasmore'];
				var lst = res['datas']['favorites_list'];
				htm = '';
				if (lst.length == 0) {
					htm = '<li style="text-align: center;line-height: 40px;font-size: 1.3em;color: #888;">' +getajax.voidmsg('mycollectprojectmsg') + '</li>';}
				$(lst).each(function(k, v) {
					htm += '<li name="' + v['store_id'] + '" id="' + v['goods_id'] + '" ids="' + v['fav_id'] + '">';
					htm += '<div class="img-p">';
					htm += '<img src="' + v['goods_image_url'] + '" />';
					htm += '</div>';
					htm += '<div class="context-p">';
					htm += '<span class="context-a">';
					htm += '<a>' + v['goods_name'] + '</a>';
					//htm+='<a>北京电子称,电子秤,电子称规格齐全</a>';
					//htm+='<del>原价：￥ 340</del>';
					htm += '</span>';
					htm += '<span class="right-a"></span>';
					htm += '<span class="price-a">';
					htm += '<a>价格：<em>￥' + v['goods_price'] + '</em></a>';
					htm += '<a name="delcoll">  <em>删除</em></a>';
					htm += '</span>';
					htm += '</div>';
					htm += '</li>';
				});
				$('.lst').append(htm);
				$('.lst>li').click(function() {
					var cid = $(this).attr('id');
					window.location.href = '../shop/shopdetails.html?id=' + cid;
				});

				//删除收藏
				$('a[name=delcoll]').click(function(event) {
					event.stopPropagation();
					getajax.loadshow();
					var ids = $(this).parents('li').attr('ids');
					server = 'index.php';
					params = {
						'act': 'member_favorites',
						'op': 'favorites_del',
						'fav_id': ids,
						'key': _key
					}
					getajax.getAction(server, params, function(res) {
						console.log('删除', res);
						if (res['datas'] == 1) {
							getajax.loadhide();
							getajax.showmsg('删除成功');
							$('.lst').empty();
							getcollectlst();
						}
					}, function(error) {
						getajax.loadhide();
					});
				});
				}
			}
		}, function(error) {
			getajax.loadhide();
		});
	}

	//获取店铺收藏列表
	function _getcollectlst() {
		server = 'index.php';
		params = {
			'act': 'member_favorites',
			'op': 'favorites_list',
			'fav_type': fav_type,
			'key': _key
		};
		getajax.getAction(server, params, function(res) {
			console.log('获取店铺列表', res);
			if (res['code'] == 200) {
				if (!res['datas']['error']) {
					getajax.loadhide();
					var lst = res['datas']['favorites_list'];
					htm = '';
					if (lst.length == 0) {
					htm = '<li style="text-align: center;line-height: 40px;font-size: 1.3em;color: #888;">' +getajax.voidmsg('mycollecthomemsg') + '</li>';}
					$(lst).each(function(k, v) {
						htm += '<li name="' + v['store_id'] + '" ids="' + v['fav_id'] + '">';
						htm += '<div class="img-p">';
						htm += '<img src="' + v['store_image_url'] + '" />';
						htm += '</div>';
						htm += '<div class="context-p">';
						htm += '<span class="context-a">';
						htm += '<a>' + v['store_name'] + '</a>';
						htm+='<a>'+v['description']+'</a>';
						//htm+='<del>原价：￥ 340</del>';
						htm += '</span>';
						htm += '<span class="right-a"></span>';
						htm += '<span class="price-a">';
						htm+='<a style="visibility: hidden;">价格：<em>￥'+v['goods_price']+'</em></a>';
						htm += '<a name="delcoll">  <em>删除</em></a>';
						htm += '</span>';
						htm += '</div>';
						htm += '</li>';
					});
					$('.lst').append(htm);
					$('.lst>li').click(function() {
						var tid = $(this).attr('ids');
						window.location.href = '../shop/shophome.html?store_id=' + tid;
					});

				//删除收藏
				$('a[name=delcoll]').click(function(event) {
					event.stopPropagation();
					getajax.loadshow();
					var ids = $(this).parents('li').attr('ids');
					server = 'index.php';
					params = {
						'act': 'member_favorites',
						'op': 'favorites_del',
						'fav_id': ids,
						'key': _key
					}
					getajax.getAction(server, params, function(res) {
						console.log('删除', res);
						if (res['datas'] == 1) {
							getajax.loadhide();
							getajax.showmsg('删除成功');
							$('.lst').empty();
							_getcollectlst();
						}
					}, function(error) {
						getajax.loadhide();
					});
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
		myScroll = new iScroll('iScrollmycollect', {
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
					if (hasmore === false) {

					} else {}
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
		_key = getajax.getsessionStorage('_key');
		if (_key === '') {
			window.location.href = '../login/login.html';
		}
		bInitScorll = 0;
		$('.lst').empty();
		getcollectlst();
		reScroll(index);
	}

	return {
		start: start
	}
})();
window.mycollect.start();