window.myrefund=(function(){
	var server = '',
		htm = '',
		hasmore=false,//表示是否存在下一页
		oid = getajax.getQueryString('order_id'),
		params = {};
	var _key = getajax.getsessionStorage('_key');
	//var _key = '44bd0009ad025d01af658605ecc8246b';
		
	//获取退款入口	
	function gettkrk(){
		
		server ='index.php';
		params ={
			'act':'member_refund',
			'op':'refund_all',
			'order_id':oid,
			'key':_key
			};
			getajax.getAction(server,params,function(res){
			console.log('获取退款入口',res);
			if(res['code']==200){
				 if(!res['datas']['error']){
				 	getajax.loadhide();
				 	var lst=res['datas'];
				 	htm='';
				 	$(lst).each(function(k,v){
				 		htm+='<div class="refund">';
				 		htm+='<span>退款金额：</span>';
				 		htm+='<span order_id="'+v['order_id']+'"><a id="money">'+v['order_amount']+'</a>元</span>';
				 		htm+='</div>';
				 		htm+='<div class="reason">';
				 		htm+='<span>退款原因</span>';
				 		htm+='<select id="'+v['order_id']+'">';
				 		var lst1=v['reason_list'];
				 		for(var i in lst1){
				 			htm+='<option reason_id="'+lst1['reason_id']+'">'+lst1[i]['reason_info']+'</option>';
				 		}
				 		htm+='</select>';
				 		htm+='</div>';
				 		htm+='<div class="decoration">';
				 		htm+='<span>详细描述</span>';
				 		htm+='<div>';
				 		htm+='<textarea id="reasonDesc"></textarea>';
				 		htm+='<p>请您如实填写申请原因及商品情况，字数在200字内</p>';
				 		htm+='</div>';
				 		htm+='</div>';
				 		htm+='<div class="pic">';
				 		htm+='<span>退款凭证</span>';
				 		htm+='<div class="showpic">';
				 		htm+='<div>';
				 		htm+='<span></span>';
				 		htm+='</div>';
				 		htm+='<div class="hide"></div>';
				 		htm+='<div class="hide"></div>';
				 		htm+='</div>';
				 		htm+='<p class="add">为了帮助我们更好的解决问题，请您上传图片<br />对多可上传3张图片，每张图片大小不超过5M，支持bmp,gif,jpg,png,jpeg格式文件</p>';
				 		htm+='</div>';
				 	});
				 	htm+='<div class="change_btn">提 交</div>'
				 	$('#iScrollrefund>div').empty().append(htm);
				 	
				 	//提交咨询内容
					$('.change_btn').click(function(){
						if($('#reasonDesc').val()==""){
							getajax.showmsg('请输入详细描述');
							return false;
						}else{
							getajax.loadshow();
							var _option=$('select>option[selected=selected]');
							var reason_id=_option.attr('reason_id');
							var reason_info=$('select').val();
							var money=$('#money').text();
							getmytksq(reason_id,reason_info,money);
						}
					});
				 }else{
				 	getajax.loadhide();
				 	getajax.showmsg(res['datas']['error']);
				 }
				
			}
		},function(error){});
	}
	
	//点击添加照片或拍照
 	$('.showpic>div').click(function(){
 		$('span').removeClass('this');
        $('.ulhide').fadeIn(500);
 	});
	$('.ulhide>li').eq(1).click(function(){
		$('.ulhide').fadeOut(500);
	});
	
	$('.takep').click(function(){
		$('.ulhide').fadeOut(500);
		$(this).addClass('this');
		var htn='<img id="img" style="width:100%;"/>';
		$('.showpic>div').empty().append(htn);
		window.uploads.uploadimg('img',1);
		
	});
	$('.pics').click(function(){
		$('.ulhide').fadeOut(500);
		$(this).addClass('this');
		var htn='<img id="img" style="width:100%;"/>';
		$('.showpic>div').empty().append(htn);
		window.uploads.uploadimg('img',2);
	});	
	
	//获取退款申请提交	
	function getmytksq(reason_id,reason_info,money){
			
			var con=$('#reasonDesc').val();
			server ='index.php';
			params ={
				'act':'member_refund',
				'op':'refund_all_submit',
				'order_id':oid,			//订单编号
				'reason_id':reason_id,	//退款原因ID
				'reason_info':reason_info,			//退款原因说明
				'order_amount':money,		//退款金额
				'buyer_message':con,	//详细描述
				'refund_pic1':'',			//退款凭证图片1
				'refund_pic2':'',			//退款凭证图片2
				'refund_pic3':'',			//退款凭证图片3
				'key':_key
			};
			getajax.postAction(server,params,function(res){
				console.log('获取退款申请提交',res);
				if(res['code']==200){
					if(res['datas']==1){
						getajax.loadhide();
						getajax.showmsg('申请提交成功');
						setTimeout(function(){
							window.location.href='../order/allorders.html';
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
		myScroll = new iScroll('iScrollrefund', {
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
		
		bInitScorll=0;
		reScroll(index);
		getajax.loadshow();
		gettkrk();
	}
	
	return{
		start:start
	}
})();
window.myrefund.start();