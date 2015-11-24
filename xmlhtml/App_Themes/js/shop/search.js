window.search = (function() {
	var num = 1,
		htn = '',
		htm = '',
		server='',
		params={},
		lst = {};
		
	//隐藏清除历史
	function hidebtn(){
		var histseaechs = $('#histseaech>a');
		var _histseaechs=histseaechs.length;
		console.log(_histseaechs);
		if(_histseaechs==0){
			$('.clear').css('display','none');
		}
	}
	
	$('.hotsearch>a').click(function() {
		window.location.href = '../shop/shopdetails.html';
	});

	//商品店铺点击切换
	$('.wacsca').click(function() {
		if (num == 1) {
			//$('.wacsca').text('店铺');
			num = 2;
		} else {
			$('.wacsca').text('商品');
			num = 1;
		}
	});

	$('.search-btn').click(function() {
		var keyword = $('#_search').val();
		console.log(keyword);
		lst[keyword] = num;
		//lst={'a':1,'b':1,'c':2,'d':1};
		getajax.setsessionStorage('searchwords', lst);
		if (!keyword) {
			//getajax.showmsg('请输入搜索的内容');
			//return false;
			window.location.href = 'goodslist.html';
		}
		if (num == 2) {
			getajax.setsessionStorage('keywordshop', keyword);
			window.location.href = 'shophomelst.html';
		} else {
			getajax.setsessionStorage('keywordgood', keyword);
			window.location.href = 'goodslist.html';
		}

	});

	//清除历史搜索
	$('.clear').click(function() {
		$('#histseaech').empty();
		hidebtn();
		getajax.removesessionStorage('searchwords');
	});

	//获取热搜词组
	function gethotsearch() {
		server = 'index.php';
		params = {
			'act': 'index',
			'op': 'hot_search'
		};

		getajax.getAction(server, params, function(res) {
			console.log('获取热词', res);
			if (res['code'] == 200) {
				if(!res['datas']['error']){
					getajax.loadhide();
					var hotword = res['datas'];
					htm = '';
					htm += '<b>热搜</b>';
					$(hotword).each(function(k, v) {
						htm += '<a>' + hotword[k] + '</a>';
					});
					$('.hotsearch').empty().append(htm);
					hidebtn();
					$('.hotsearch>a').click(function() {
						var akeyword = $(this).text();
						getajax.setsessionStorage('keywordgood',akeyword);
						window.location.href = 'goodslist.html';
					});
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
	myScroll = new iScroll('iScrollsearch', {
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
	lst = getajax.getsessionStorage('searchwords');
	if (lst == '') {
		lst = {};
	}
	$('#histseaech').empty();
	for (var i in lst) {
		htn = '<a class="' + lst[i] + '" style="margin-right:5px; display:inline-block;">' + i + '</a>';
		$('#histseaech').prepend(htn);
		$('#histseaech>a').click(function() {
			var akeyword = $(this).text();
			getajax.setsessionStorage('keywordgood',akeyword);
			window.location.href = 'goodslist.html';
		});
	};
	
	hidebtn();
	getajax.loadshow();
	bInitScorll = 0;
	reScroll(index);
	gethotsearch();
}

return {
	start: start
}
})();
window.search.start();