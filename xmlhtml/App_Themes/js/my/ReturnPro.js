

window.ReturnPro=(function(){
	var server='',
		params={},
		htm='',
		num=0,
		reason_id='',
		goods_price='',
		tid=getajax.getQueryString('tid');
		_key=getajax.getsessionStorage('_key');
		//_key='44bd0009ad025d01af658605ecc8246b';
		
		var _tid=tid.split('|');
		var rec_id=_tid[0];
		var oid=_tid[1];
	//tab栏切换
	$('.ret-type>li').eq(0).click(function(){
		$(this).addClass('this').siblings().removeClass('this');
		$('.type-thh').text('换货');
		num=0;
		getajax.loadshow();
		refundpro();
	});
	$('.ret-type>li').eq(1).click(function(){
		$(this).addClass('this').siblings().removeClass('this');
		getajax.loadshow();
		$('.type-thh').text('退货');
		num=1;
		returnpro();
	});
	
	$('#reason-lst').change(function(){
		if(num==0){
			reason_id=this[this.selectedIndex].getAttribute("reason_id");
		}else{
			reason_id=this[this.selectedIndex].getAttribute("value");
		}
		
	});
	
	//提交事件
	$('.change_btn').click(function(){
		if(num==0){
			var reason_info =$('#reason-lst option:selected').text();
			//var reason_id=$('#reason-lst option:selected').val();
			var buyer_message =$('#reason').val();
			getajax.loadshow();
			
			_refund_submit(reason_info,reason_id,buyer_message);
		}else{
			var reason_info =$('#reason-lst option:selected').text();
			//var reason_id=$('#reason-lst option:selected').val();
			var buyer_message =$('#reason').val();
			getajax.loadshow();
			//提交退货申请
			return_submit(reason_info,reason_id,buyer_message);
		}
	});
		
		
	
	//退货申请入口
	function returnpro(){
		server='index.php';
		params={
			'act':'member_refund',
			'op':'refund',
			'key':_key,
			'order_id':oid,
			'rec_id':rec_id
		}
		getajax.getAction(server,params,function(res){
			console.log('退货申请入口',res);
			if(res['code']==200){
				if(!res['datas']['error']){
					getajax.loadhide();
					var return_good=res['datas'][0]['goods'];
					goods_price=return_good['goods_price'];
					$('#maxMoney').text(goods_price);
					var reason_list=res['datas'][0]['reason_list'];
					htm='';
					for(var i in reason_list){
						htm+='<option value="'+reason_list[i]['reason_id']+'">'+reason_list[i]['reason_info']+'</option>';
					};
					$('#reason-lst').empty().append(htm);
				}else{
					getajax.loadhide();
					getajax.showmsg(res['datas']['error']);
				}
			}
		},function(error){});
	}
	
	//退货申请提交
	function return_submit(reason_info,reason_id,buyer_message){
		server='index.php';
		params={
			'act':'member_refund',
			'op':'refund_submit',
			'key':_key,
			'order_id':oid,
			'rec_id':rec_id,
			'refund_amount':goods_price,
			'goods_num':1,
			'reason_id':reason_id,
			'buyer_message':buyer_message,
			'refund_pic1':'',
			'refund_pic2':'',
			'refund_pic3':''
		}
		getajax.postAction(server,params,function(res){
			console.log('退货申请提交',res);
			if(res['code']==200){
				if(res['datas']==1){
					getajax.loadhide();
					getajax.showmsg('退货申请提交成功');
					setTimeout(function(){
						window.location.href='../user/userindex.html';
					},500);
				}else{
					getajax.loadhide();
					getajax.showmsg(res['datas']['error']);
				}
			}
		},function(error){
			getajax.loadhide();
		});
	}
	
	//换货申请入口
	function refundpro(){
		server='index.php';
		params={
			'act':'member_refund',
			'op':'exchange',
			'key':_key,
			'order_id':oid,
			'rec_id':rec_id
		}
		getajax.getAction(server,params,function(res){
			console.log('换货申请入口',res);
			if(res['code']==200){
				if(!res['datas']['error']){
					getajax.loadhide();
					var reason_list=res['datas'][0]['reason_list'];
					htm='';
					$('#maxMoney').text('0.00');
					for(var i in reason_list){
						htm+='<option reason_id="'+reason_list[i]['reason_id']+'">'+reason_list[i]['reason_info']+'</option>';
					};
					$('#reason-lst').empty().append(htm);
				}else{
					getajax.loadhide();
					getajax.showmsg(res['datas']['error']);
				}
			}
		},function(error){
			getajax.loadhide();
		});
	}
	
	//换货申请提交
	function _refund_submit(reason_info,reason_id,buyer_message){
		server='index.php';
		params={
			'act':'member_refund',
			'op':'exchange_submit',
			'key':_key,
			'order_id':oid,
			'rec_id':rec_id,
			'reason_id':reason_id,
			'buyer_message':buyer_message,
			'refund_pic1':'',
			'refund_pic2':'',
			'refund_pic3':''
		}
		getajax.postAction(server,params,function(res){
			console.log('换货申请提交',res);
			if(res['code']==200){
				if(res['datas']==1){
					getajax.loadhide();
					getajax.showmsg('换货申请提交成功');
					setTimeout(function(){
						window.location.href='../user/userindex.html';
					},500);
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
		myScroll = new iScroll('iScrollReturnPro', {
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
		refundpro();
//		$('.change_btn').click(function(){
//			getajax.loadshow();
//			var reason_info=$('#reason-lst').val();
//			var reason_id=$('#reason-lst>option[selected=selected]').attr('reason_id');
//			var buyer_message =$('#reason').val();
//			_refund_submit(reason_info,reason_id,buyer_message);
//		});
		bInitScorll=0;
		reScroll(index);
	}
	
	return{
		start:start
	};
})();
window.ReturnPro.start();
