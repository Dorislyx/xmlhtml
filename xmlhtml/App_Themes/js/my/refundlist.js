
window.refundlist=(function(){
	var server='',
		_key=getajax.getsessionStorage('_key'),
		htm='',
		htm1='',
		params={};
	//tab栏切换
	$('li[name=title1]').click(function(){
		$(this).addClass('this').siblings().removeClass('this');
		$('.lst').empty();
		getajax.loadshow();
		getreturnlist();
		exchangelst();
	});
	
	$('li[name=title2]').click(function(){
		$(this).addClass('this').siblings().removeClass('this');
		$('.lst').empty();
		getajax.loadshow();
		getrefundlist();
	});
	
	//获取退货列表
	function getreturnlist(){
		server='index.php';
		params={
			'act':'member_return',
			'op':'index',
			'key':_key
		}
		getajax.getAction(server,params,function(res){
			console.log('获取退货列表',res);
			if(res['code']==200){
				if(!res['datas']['error']){
					getajax.loadhide();
					var lst=res['datas'];
					htm='';
//					if (lst.length == 0) {
//					htm = '<li style="text-align: center;line-height: 40px;font-size: 1.3em;color: #888;">' +getajax.voidmsg('refundmsg1') + '</li>';}
					$(lst).each(function(k,v){
						htm+='<li>';
						htm+='<div>';
						htm+='<span class="red">订单编号：'+v['order_sn']+'</span>';
						htm+='<span>'+getajax.getTime(v['add_time'],'-',false)+'</span>';
						if(v['seller_state']==1){
							htm+='<span class="seller_state">待审核</span>';
						}else if(v['seller_state']==2){
							htm+='<span class="seller_state">同意</span>';
						}else if(v['seller_state']==3){
							htm+='<span class="seller_state">不同意</span>';
						}
						htm+='</div>';
						htm+='<div>';
						htm+='<span>'+v['goods_name']+'</span>';
						htm+='<span class="see returnid" refund_id="'+v['refund_id']+'">查看</span>';
						htm+='</div>';
						htm+='</li>';
					});
					$('.lst').append(htm);
					$('.returnid').click(function(){
						var refund_id=$(this).attr('refund_id');
						window.location.href='returndetails.html?refund_id='+refund_id;
					});
					exchangelst();
					var ulis=$('.lst>li');
					var ulength=ulis.length;
					console.log(ulength);
					if(ulength==0){
						var htm2= '<li style="text-align: center;line-height: 40px;font-size: 1.3em;color: #888;">' +getajax.voidmsg('refundmsg1') + '</li>';
						$('.lst').append(htm2);
					}
//					var val=$('.seller_state').html();
//					if(val=='同意'){
//						$('.see').css({
//							display:'block'
//						});
//						$('.see').click(function(){
//							window.location.href='ReturnPro.html';
//						});
//					}else{
//						$('.see').css({
//							display:'none'
//						});
//					}
		//点击查看详情
		
				}else{
					getajax.loadhide();
					getajax.showmsg(res['datas']['error']);
				}
			}
		},function(error){
			getajax.loadhide();
		});
	}
	
	//获取换货列表
	function exchangelst(){
		server='index.php';
		params={
			'act':'member_return',
			'op':'exchange',
			'key':_key
		}
		getajax.getAction(server,params,function(res){
			console.log('获取换货列表',res);
			if(res['code']==200){
				if(!res['datas']['error']){
					getajax.loadhide();
					var lst=res['datas'];
					htm1='';
//					if (lst.length == 0) {
//					htm1 = '<li style="text-align: center;line-height: 40px;font-size: 1.3em;color: #888;">' +getajax.voidmsg('refundmsg1') + '</li>';}
					$(lst).each(function(k,v){
						htm1+='<li>';
						htm1+='<div>';
						htm1+='<span class="red">订单编号：'+v['order_sn']+'</span>';
						htm1+='<span>'+getajax.getTime(v['add_time'],'-',false)+'</span>';
						if(v['seller_state']==1){
							htm1+='<span class="seller_state">待审核</span>';
						}
						if(v['seller_state']==2){
							htm1+='<span class="seller_state">同意</span>';
						}
						if(v['seller_state']==3){
							htm1+='<span class="seller_state">不同意</span>';
						}
						htm1+='</div>';
						htm1+='<div>';
						htm1+='<span>'+v['goods_name']+'</span>';
						htm1+='<span class="see refundid" refund_id="'+v['refund_id']+'">查看</span>';
						htm1+='</div>';
						htm1+='</li>';
					});
					$('.lst').append(htm1);
					$('.refundid').click(function(){
						var refund_id=$(this).attr('refund_id');
						window.location.href='exchangedetails.html?refund_id='+refund_id;
					});
//					var val=$('.seller_state').html();
//					if(val=='同意'){
//						$('.see').css({
//							display:'block'
//						});
//						$('.see').click(function(){
//							window.location.href='ReturnPro.html';
//						});
//					}else{
//						$('.see').css({
//							display:'none'
//						});
//					}
				}else{
					getajax.loadhide();
					getajax.showmsg(res['datas']['error']);
				}
			}
		},function(error){
			getajax.loadhide();
		});
	
	}
	//获取退款列表
	function getrefundlist(){
		server='index.php';
		params={
			'act':'member_refund',
			'op':'index',
			'key':_key
		}
		getajax.getAction(server,params,function(res){
			console.log('获取退款列表',res);
			if(res['code']==200){
				if(!res['datas']['error']){
					getajax.loadhide();
					var lst=res['datas'];
					htm='';
					if (lst.length == 0) {
					htm = '<li style="text-align: center;line-height: 40px;font-size: 1.3em;color: #888;">' +getajax.voidmsg('refundmsg2') + '</li>';}
					$(lst).each(function(k,v){
						htm+='<li>';
						htm+='<div>';
						htm+='<span class="red">订单编号：'+v['order_sn']+'</span>';
						htm+='<span>'+getajax.getTime(v['add_time'],'-','false')+'</span>';
						htm+='<span>客户同意退款</span>';
						htm+='</div>';
						htm+='<div>';
						htm+='<span>商品名称</span>';
						htm+='<span class="see" refund_id="'+v['refund_id']+'">查看</span>';
						htm+='</div>';
						htm+='</li>';
					});
					$('.lst').append(htm);
					$('.see').click(function(){
						var refund_id=$(this).attr('refund_id');
						window.location.href='refundetails.html?refund_id='+refund_id;
					});
				}else{
					getajax.loadhide();
					getajax.showmsg(res['datas']['error']);
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
		myScroll = new iScroll('iScrollrefundlist', {
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
		$('.lst').empty();
		getreturnlist();
		exchangelst();
		bInitScorll=0;
		reScroll(index);
	}
	
	return{
		start:start
	};
})();
window.refundlist.start();
