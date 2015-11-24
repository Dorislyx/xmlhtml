

window.exchangedetails=(function(){
	var server='',
		_key =getajax.getsessionStorage('_key'),
		refund_id=getajax.getQueryString('refund_id'),
		params={};
	
	//获取换货详情
	function getexchangedetails(){
		server='index.php';
		params={
			'act':'member_return',
			'op':'exchange_view',
			'key':_key,
			'return_id':refund_id
		}
		getajax.getAction(server,params,function(res){
			console.log('获取换货详情',res);
			if(res['code']==200){
				if(!res['datas']['error']){
					getajax.loadhide();
					var data=res['datas'];
					$('#server_order').text('服务单号：'+data['order_sn']+'');
					$('#goods_name').text(data['goods_name']);
					var refund_state=data['refund_state'];
					if(refund_state==1){
						$('#refund_state').text('处理中');
					}else if(refund_state==2){
						$('#refund_state').text('待管理员处理');
					}else{
						$('#refund_state').text('已完成');
					}
					var state=data['seller_state'];
					if(state==1){
						$('#status').text('待商家审核');
					}else if(state==2){
						$('#status').text('商家同意');
					}else{
						$('#status').text('商家不同意');
					}
					$('#refund_reson').text(data['reason_info']);
					$('#reson_decoration').text(data['buyer_message']);
					$('#person').text(data['buyer_name']);
					$('#tel').text(data['reciver_mobile']);
					if(data['invoice_no']==null){
						$('#isneedticket').text('不需要返回发票');
					}else{
						$('#isneedticket').text(data['invoice_no']);
					}
					$('#shop_address').text(res['datas']['store_address']);
					$('#person2').text(res['datas']['seller_name']);
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
		myScroll = new iScroll('iScrollexchangedetails', {
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
		getexchangedetails();
		bInitScorll=0;
		reScroll(index);
	}
	
	return{
		start:start
	};
})();
window.exchangedetails.start();
