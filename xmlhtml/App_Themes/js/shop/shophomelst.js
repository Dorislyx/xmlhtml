window.shophomelst = (function() {
	var server = '',
		hasmore = false, //表示是否存在下一页
		htm = '',
		params = {};
	var keyword = getajax.getsessionStorage('keywordshop');
	if (keyword == '' || keyword == null || keyword == undefined) {
		keyword = '';
	}
	//获取店铺列表
	function getshophomelst() {
		//var _key = getajax.getsessionStorage('_key');
		server = 'index.php';
		params = {
			'act': 'store',
			'op': 'store_list',
			'key': 'store_sales',
			'order': 'desc',
			'keyword': keyword
		};
		getajax.getAction(server, params, function(res) {
			console.log('获取店铺列表', res);
			if (res['code'] == 200) {
				getajax.loadhide();
				hasmore = res['hasmore'];
				var lst = res['datas']['store_list'];
				htm = '';
				if (lst.length == 0) {
					htm = '<li style="text-align: center;line-height: 40px;font-size: 1.2em;color: #888;">' + getajax.voidmsg('stringifymsg') + '</li>';
				} else {
					$(lst).each(function(k, v) {
						htm += '<li id="' + v['store_id'] + '">';
						htm += '<div>';
						htm += '<img src="' + v['store_image_url'] + '"/>'
						htm += '</div>';
						htm += '<div class="h-home">';
						htm += '<span>' + v['store_name'] + '</span>';
						htm += '<span>' + v['store_description'] + '描述</span>';
						htm += '<span>店铺评分：<a>' + v['store_credit_average'] + '分</a></span>';
						htm += '<span class="rhm">进入店铺</span>';
						htm += '</div>';
						htm += '</li>';
					});
				}

				$('.lst').empty().append(htm);
				$('.lst>li').click(function(){
					var store_id=$(this).attr('id');
					window.location.href='shophome.html?store_id='+store_id;
				});
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
		myScroll = new iScroll('iScrollshophomelst', {
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
		reScroll(index);
		getshophomelst();
	}
	return {
		start: start
	};
})();
window.shophomelst.start();