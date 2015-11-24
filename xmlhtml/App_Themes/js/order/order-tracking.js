
window.ordertracking=(function(){
		var oid=getajax.getQueryString('oid'),
			htm='',
		 _key = getajax.getsessionStorage('_key');

	//获取订单的物流信息
	function getorder_receive(){
		//_key='44bd0009ad025d01af658605ecc8246b';
		var servers='index.php';
		params={
			'act':'member_order',
			'op':'search_deliver',
			'key':_key,
			'order_id':oid
		};
		getajax.getAction(servers,params,function(res){
			console.log('物流信息',res);
			if(res['code']==200){
				if(!res['datas']['error']){
					getajax.loadhide();
					$('#EXPRESS_COMPANY_NAME').text('承运单位： '+res['datas']['express_name']+'');
					$('#EXPRESS_NO').text('订单号：'+res['datas']['shipping_code']+'');
					var deliver_info=res['datas']['deliver_info'];
					var legth=deliver_info.length;
					htm='';
					for(var i=legth-1;i>0;i--){
						var deliverinfo=deliver_info[i];
						var _deliverinfo=deliverinfo.split('&nbsp;&nbsp;');
						//console.log(_deliverinfo);
						htm+='<li>';
						htm+='<div>';
						if(i==legth-1){
							htm+='<a class="current"></a>';
						}else{
							htm+='<a></a>';
						}
						htm+='</div>';
						htm+='<div>';
						htm+='<p class="black">'+_deliverinfo[1]+'</p>';
						htm+='<p class="nopadding">'+_deliverinfo[0]+'</p>';
						htm+='</div>';
						htm+='</li>';
					}
					$('#order_tracking').empty().append(htm);
				}else{
					htn='<div style="line-height: 50px; text-align: center; font-size: 1.2em;">暂未查询到物流信息</div>';
					$('.order_tracking_wrap').empty().append(htn);
					getajax.loadhide();
					//getajax.showmsg(res['datas']['error']);
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
	
	function loaded() {
		myScroll = new iScroll('iScrollordertracking', {
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
		getajax.loadshow();
		reScroll();
		getorder_receive();
	}
	
	return{
		start:start
	}
})();
window.ordertracking.start();