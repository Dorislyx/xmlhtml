

window.myappraisestore=(function(){
		var server = '',
		hasmore=false,//表示是否存在下一页
		oid=getajax.getQueryString('tid'),
		htm='',
		score_des=0,
		score_ser=0,
		score_del=0,
		orderilst=getajax.getsessionStorage('orderilst'),
		//goodlst=getajax.getsessionStorage('goodlst'),
		params = {};
		var storelst=orderilst[oid];
		//console.log(orderilst);
		console.log(storelst);
		
	
		//循环店铺
		function getstoreinfo(){
			for(var i in storelst){
				getshophome(i);
				var goodslst=storelst[i];
				console.log(goodslst);
				getajax.setsessionStorage('goodslst',goodslst);
			}
		}
	
		//获取店铺首页
		function getshophome(k){
			server='index.php';
			params={
				'act':'store',
				'op':'index',
				'store_id':k
			}
			getajax.getAction(server,params,function(res){
				console.log('获取店铺首页');
				if(res['code']==200){
					if(!res['datas']['error']){
						var data=res['datas'];
						$('.appraise_store>img').attr('src',data['store_logo_url']).css('border',0);
						$('.appraise_store p').text(data['store_name']);
					}
				}
			},function(error){});
		}
	
	$('#appraise_product>ul li').click(function(){
			$('#appraise_product>ul li').removeClass('current');
			$(this).prevAll().addClass('current');
			$(this).addClass('current');
			score_des=$(this).index()+1;
			getajax.setsessionStorage('myscore_des',score_des);
	});
	$('#appraise_seller>ul li').click(function(){
			$('#appraise_seller>ul li').removeClass('current');
			$(this).prevAll().addClass('current');
			$(this).addClass('current');
			score_ser=$(this).index()+1;
			getajax.setsessionStorage('myscore_ser',score_ser);
	});
	$('#appraise_logis>ul li').click(function(){
			$('#appraise_logis>ul li').removeClass('current');
			$(this).prevAll().addClass('current');
			$(this).addClass('current');
			score_del=$(this).index()+1;
			getajax.setsessionStorage('myscore_del',score_del);
	});
	//获取商品的详情
//	function getshopdetail(){
//		htm='';
//		$(goodlst).each(function(k,v){
//			htm+='<li>';
//			htm+='<div class="appraise_store">';
//			htm+='<img src="'+v['image_60_url']+'" width="60" height="60">';
//			htm+='<div>';
//			htm+='<p><a>'+v['goods_name']+'</a></p>';
//			htm+='</div>';
//			htm+='</div>';
//			htm+='</li>';
//		});
//		$('.goodlst').empty().append(htm);
//	}
	
	$('.publish_raise>span').click(function(){
		if(score_des==0){
			getajax.showmsg('请对商品描述是否相符进行评价');
		}else if(score_ser==0){
			getajax.showmsg('请对卖家服务态度进行评价');
		}else if(score_del==0){
			getajax.showmsg('请对物流发货速度进行评价');
		}else{
			window.location.href='appraisedetail.html?id='+oid;
		}
		
	});
		
	var IstotalPage = false;
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有


	function loaded(index) {
		myScroll = new iScroll('iScrollappraisestore', {
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

	function start(index){
		//getajax.loadshow();
		//getshopdetail();
		getstoreinfo();
		bInitScorll = 0;
		reScroll(index);
		
	}
	return{
		start:start
	}
})();
window.myappraisestore.start();
	
		
		
		
				
	