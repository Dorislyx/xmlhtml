

window.refundetails=(function(){
	var server='',
		refund_id =getajax.getQueryString('refund_id'),
		_key=getajax.getsessionStorage('_key'),
		params={};
		
	//获取退款详情
	function getrefundetails(){
		server='index.php';
		params={
			'act':'member_refund',
			'op':'view',
			'key':_key,
			'refund_id':refund_id 
		}
		getajax.getAction(server,params,function(res){
			console.log('获取退款详情',res);
			if(res['code']==200){
				if(!res['datas']['error']){
					getajax.loadhide();
					var data=res['datas'];
					$('#server_order').text('服务单号：'+data['order_sn']+'');
					$('#pro_name').text('商品名称：'+data['goods_name']+'');
					var order_state=data['order_state'];
					if(order_state==1){
						$('#order_state').text('处理中');
					}else if(order_state==2){
						$('#order_state').text('待管理员处理');
					}else{
						$('#order_state').text('已完成');
					}
					
					$('#refund_money').text(data['refund_amount']);
					$('#refund_reson').text(data['reason_info']);
					$('#reson_decoration').text(data['buyer_message']);
					var status=data['seller_state'];
					if(status==1){
						$('#status').text('待商家审核');
					}else if(status==2){
						$('#status').text('商家同意');
					}else{
						$('#status').text('商家不同意');
					}
					
					$('#person').text(data['buyer_name']);
					if(data['invoice_no']==null){
						$('#isneedticket').text('不需要返回发票');
					}else{
						$('#isneedticket').text(data['invoice_no']);
					}
					$('#shop_address').text(res['datas']['store_address']);
					$('#person2').text(res['datas']['seller_name']);
					$('#tel').text(res['datas']['reciver_mobile']);
					$('#tel2').text(res['datas']['store_phone']);
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
		myScroll = new iScroll('iScrollrefundetails', {
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
		getrefundetails();
		bInitScorll=0;
		reScroll(index);
	}
	
	return{
		start:start
	};
})();
window.refundetails.start();
