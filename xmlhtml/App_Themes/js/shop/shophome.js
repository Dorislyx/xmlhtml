

window.shophome=(function(){
	var server='',
		order=0,
		_key=1,
		fav_type='store',
		htm='',
		params={};
	var store_id=getajax.getQueryString('store_id');
	var keys=getajax.getsessionStorage('_key');
	
		$('.home-title').click(function(){
			window.location.href='../shop/oneshopdetail.html?store_id='+store_id;

		});
		$('.lst>li').click(function(){
			window.location.href='../shop/shopdetails.html';
		});

		$('.addStoreFavorite').click(function(){
			getajax.loadshow();
			getaddtorecollect();
		});
		
		//添加店铺收藏
		function getaddtorecollect(){
			server='index.php';
			params={
				'act':'member_favorites',
				'op':'favorites_add',
				'fav_type':fav_type,
				'id':store_id,
				'key':keys
			}
			getajax.getAction(server,params,function(res){
				console.log('添加店铺收藏',res);
				if(res['code']==200){
					if(res['datas']==1){
						getajax.loadhide();
						getajax.showmsg('添加店铺收藏成功');
					}else{
						getajax.loadhide();
						getajax.showmsg(res['datas']['error']);
					}
				}
			},function(error){
				getajax.loadhide();
			});
		}
		
	//获取店铺首页接口
	function getshophome(){
		server='index.php';
		params={
			'act':'store',
			'op':'index',
			'store_id':store_id
		}
		getajax.getAction(server,params,function(res){
			console.log('获取店铺首页',res);
			if(res['code']==200){
				
				if(!res['datas']['error']){
					getajax.loadhide();
					var shopdata=res['datas'];
					$('#homelogo').attr('src',shopdata['store_logo_url']);
					$('#storeName').text(shopdata['store_name']);
					$('#collectnum').text(''+shopdata['store_collect']+'人收藏此店铺');
					$('.img-one>span>img').attr('src',shopdata['store_banner_url']);
					//$('.telephone').attr('href','tel:'+shopdata['store_phone']+'');
					$('.telephone').attr('href','http://baidu.com');
					$('.telephone').click(function(){
						console.log('12');
					})
				}
			}
		},function(error){
			getajax.loadhide();
		});
	}
	
	//获取店铺内商品列表
	function getshopgoodlst(){
		server='index.php';
		params={
			'act':'store',
			'op':'goods_list',
			'store_id':store_id,
			'key':_key,
			'order':order
		}
		getajax.getAction(server,params,function(res){
			console.log('获取店铺内商品',res);
			if(res['code']==200){
				if(!res['datas']['error']){
					getajax.loadhide();
					var lst=res['datas']['goods_list'];
					htm='';
					$(lst).each(function(k,v){
						htm+='<li id="'+v['goods_id']+'">';
						htm+='<span>';
						htm+='<img src="'+v['goods_image_url']+'">';
						htm+='</span>';
						htm+='<span class="all-p-d">';
						htm+='<a>'+v['goods_name']+'</a>';
						htm+='<a>';
						htm+='<em>￥'+v['goods_price']+'</em>';
						htm+='<em>已销售'+v['goods_salenum']+'件</em>';
						htm+='<em>'+v['evaluation_count']+'评价</em>';
						htm+='</a>';
						htm+='</span>';
						htm+='</li>';
					});
					$('.lst').empty().append(htm);
					$('.lst>li').click(function(){
						var gid=$(this).attr('id');
						window.location.href='shopdetails.html?id='+gid;
					});
				}
			}
		},function(error){
			getajax.loadhide();
		});
	}
	
	//搜索店铺内的商品
	$('#Search-one-img').click(function(){
		getajax.loadshow();
		var keyword=$('#Search-value').val();
		searchgoods(keyword);
	});
	
	//搜索方法
	function searchgoods(keyword){
		server='index.php';
		params={
			'act':'store',
			'store_id':store_id,
			'op':'goods_list',
			'keyword':keyword
		}
		getajax.getAction(server,params,function(res){
			console.log('搜索商品',res);
			if(res['code']==200){
				if(!res['datas']['error']){
					getajax.loadhide();
					htm='';
					var searlst=res['datas']['goods_list'];
					if(searlst.length==0){
						htm+='<p style="font-size:14px;">未搜索到相关商品哦！</p>'
					}else{
						$(searlst).each(function(k,v){
						htm+='<li id="'+v['goods_id']+'">';
						htm+='<span>';
						htm+='<img src="'+v['goods_image_url']+'">';
						htm+='</span>';
						htm+='<span class="all-p-d">';
						htm+='<a>'+v['goods_name']+'</a>';
						htm+='<a>';
						htm+='<em>￥'+v['goods_price']+'</em>';
						htm+='<em>已销售'+v['goods_salenum']+'件</em>';
						htm+='<em>'+v['evaluation_count']+'评价</em>';
						htm+='</a>';
						htm+='</span>';
						htm+='</li>';
					});
					}
					
					$('.lst').empty().append(htm);
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
		myScroll = new iScroll('iScrollshophome', {
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
		getshophome();
		getshopgoodlst();
		bInitScorll=0;
		reScroll(index);
	}
	
	return{
		start:start
	}
})();
window.shophome.start();