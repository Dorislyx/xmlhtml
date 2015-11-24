window.stringify = (function() {
	var server = '',
		params = {},
		htm = '';


	$('div').on('click', '.stringify_list li', function() {
		var aid = $(this).attr('aid');
		window.location.href = '../shop/goodslist.html?id=' + aid;
	});

	$('.search_title').click(function() {
		window.location.href = '../shop/search.html';
	});


	//获取分类信息
	function getstringify() {
			server = 'index.php';
			params = {
				'act': 'goods_class'
			};
			getajax.getAction(server, params, function(res) {
				console.log('获取一级分类信息', res);
				if (res['code'] == 200) {
					getajax.loadhide();
					var lst = res['datas']['class_list'];
					$(lst).each(function(k, v) {
						if (k == 0) {
							htm += '<li class="current" ids="' + v['gc_id'] + '">';
							var ids = v['gc_id'];
							getnext(ids);
						} else {
							htm += '<li ids="' + v['gc_id'] + '">';
						}

						htm += '<p>' + v['gc_name'] + '</p>';
						htm += '</li>';
					});
					$('.gps').empty().append(htm);
					$('.gps>li').click(function() {
						var ids = $(this).attr('ids');
						$(this).addClass('current').siblings().removeClass('current');
						getnext(ids);
					});
				}
			}, function(error) {
				getajax.loadhide();
			});
		}
		//获取二级分类

	function getnext(ids) {
		server = 'index.php';
		params = {
			'act': 'goods_class',
			'gc_id': ids
		};
		getajax.getAction(server, params, function(res) {
			console.log('获取二级分类', res);
			getajax.loadhide();
			var lst1 = res['datas']['class_list'];
			var htm1 = '';
			$(lst1).each(function(k, v) {
				htm1 += '<div class="stringify_list"  id="' + v['gc_id'] + '">';
				htm1 += '<p>' + v['gc_name'] + '</p>';
				htm1 += '<ul>';
				getnnext(v['gc_id']);
				htm1 += '</ul>';
				htm1 += '</div>';
				
			});
			$('#CategoryListTwo').empty().append(htm1);

		}, function(error) {
			getajax.loadhide();
		});


	}

	//获取三级分类
	function getnnext(a) {
		server = 'index.php';
		params = {
			'act': 'goods_class',
			'gc_id': a
		}
		getajax.getAction(server, params, function(res) {
			console.log('获取三级分类', res);
			if (res['code'] == 200) {
				if (!res['datas']['error']) {
					var htm3='';
					var lst2 = res['datas']['class_list'];
					$(lst2).each(function(k, v) {
						htm3 += '<li aid="'+v['gc_id']+'">';
						htm3 += '<dl>';
						htm3 += '<dt><img src="' + v['image'] + '"/></dt>';
						htm3 += '<dd>' + v['gc_name'] + '</dd>';
						htm3 += '</dl>';
						htm3 += '</li>';
					});
					$('#'+a+' ul').empty().append(htm3);
				} else {
					getajax.showmsg(res['datas']['error']);
				}
			}

		}, function(error) {});
	}

	var IstotalPage = false;
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有


	function loaded(osd) {
		myScroll = new iScroll(osd, {
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

	function reScroll(osd) {
		if (bInitScorll === 0) {
			loadScroll = setTimeout(function() {
				loaded(osd);
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
		getstringify();
		//reScroll(index);
		new reScroll('iscrollgps');
		new reScroll('iScrollstringifyindex');
	}


	return {
		start: start
	};
})();

window.stringify.start();