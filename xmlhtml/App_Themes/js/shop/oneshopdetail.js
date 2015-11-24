

window.oneshopdetail=(function(){
	var server='',
		params={};
	var store_id=getajax.getQueryString('store_id');

		$('div').on('click','.stringify_list',function(){
			window.location.href='../shop/goodslist.html';
		});

	//获取店铺详情
	function getoneshopdetail(){
		server='index.php';
		params={
			'act':'store',
			'op':'store_detail',
			'store_id':store_id
		}
		getajax.getAction(server,params,function(res){
			console.log('获取店铺详情',res);
			if(res['code']==200){
				if(!res['datas']['error']){
					getajax.loadhide();
					var store_info=res['datas']['store_info'];
					$('#hlogo').attr('src',store_info['store_logo_url']);
					$('#homename').text(store_info['store_company_name']);
					$('#storeType').text('店铺类型  :  '+store_info['grade_text']+'');
					$('#favNum').text(''+store_info['store_collect']+'人收藏此店铺');
					$('#hname').text('店铺名称  :  '+store_info['store_name']+'');
					$('#address').text('店铺地址  :  '+store_info['store_address']+'');
					var store_pf=res['datas']['store_pf']['store_deliverycredit'];
					$('#evalDeliver').text('发货速度评分  :  '+store_pf['credit']+'分');
					var store_desccredit=res['datas']['store_pf']['store_desccredit'];
					$('#prodScore').text('商品描述评分  :  '+store_desccredit['credit']+'分');
					$('#linkhome').attr('href','tel:'+store_info['store_phone']+'');
				}
			}
		},function(error){
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
		myScroll = new iScroll('iScrolloneshopdetail', {
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
		getoneshopdetail();
		bInitScorll=0;
		reScroll(index);
	}

	
	return{
		start:start
	};
})();
window.oneshopdetail.start();
