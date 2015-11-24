
window.orderdetail=(function(){
	var server = '',
		hasmore=false,//表示是否存在下一页
		oid=getajax.getQueryString('id'),
		htm='',
		htm1='',
		n=0,
		params = {};
	var _key = getajax.getsessionStorage('_key');
		//点击跳转
		$('.order_status>div').eq(1).click(function(){
			window.location.href='../shop/shopindex.html';
		});
//		$('.paymeth').click(function(){
//			window.location.href='../my/paymethod.html';
//		});
		$('.sendmeth').click(function(){
			window.location.href='order-tracking.html';
		});
		$('#applysale').click(function(){
			window.location.href='../my/changegoods.html';
		});
		
	
	//获订单详情内容	
	function getorderdetail(){
		
		//var _key = '44bd0009ad025d01af658605ecc8246b';
		//oid=56;
		server ='index.php';
		params ={
			'act':'member_order',
			'op':'order_show',
			'order_id':oid,
			'key':_key
		};
		getajax.getAction(server,params,function(res){
			console.log('获订单详情内容',res);
			if(res['code']==200){
				if(!res['datas']['error']){
					getajax.loadhide();
					hasmore = res['hasmore'];
					var lst = res['datas']['order_info'];
					var	goodlst=lst['goods_list'];
					var reciverlst=lst['extend_order_common'];
					var reciverlst1=reciverlst['reciver_info'];
					getajax.setsessionStorage('goodlst',goodlst);
					
					htm='';
					htm1='';
					$('#order_status').text(lst['state_desc']);	//订单状态
					$('#order_id').text('订单号'+lst['order_sn']);	//订单号
					$('#consignee_name').text(reciverlst['reciver_name']);	//收件人姓名
					$('#consignee_mobile').text(reciverlst1['mob_phone']);	//收件人手机号
					$('#consignee_address_detail').text(reciverlst1['area']+' '+reciverlst1['street']);	//收件人地址
					htm1+='<span id="store_name" ids="'+reciverlst['store_id']+'">'+lst['store_name']+'</span>';
					$('#h2home').empty().append(htm1);	//创建我的网站
//					$('#h2home').click(function(){
//						var store_id=$(this).children('span').attr('ids');
//						window.location.href='../shop/shophome.html?store_id='+store_id;
//					});
					$(goodlst).each(function(k,v){
						htm+='<div class="project_decoration1" goods_id="'+v['goods_id']+'">';
						htm+='<span>';
						htm+='<img src="'+v['image_60_url']+'" width="30" height="30"/>';
						htm+='<b>';
						htm+='<a>'+v['goods_name']+'</a>';
						htm+='<b>x'+v['goods_num']+'</b>';
						htm+='</b>';
						htm+='</span>';
						htm+='<span>￥'+v['goods_price']+'</span>';
						if(v['refund']==1){
							htm+='<a rec_id="'+v['rec_id']+'">退款/退货</a>';	
						}//是否显示退换货按钮
						
						htm+='</div>';
					});
					$('#project_lst').empty().append(htm);	//创建商品列表
					$('.project_decoration1>a').click(function(event){
						event.stopPropagation();
						var rec_id=$(this).attr('rec_id');
						var rec_order=rec_id+'|'+oid;
						console.log(rec_order);
						window.location.href='../my/ReturnPro.html?tid='+rec_order;
					});
					//点击跳转商品详情
					$('.project_decoration1').click(function(){
						var goods_id=$(this).attr('goods_id');
						window.location.href='../shop/shopdetails.html?id='+goods_id;
					});
					$('.paymeth span:eq(1)').text(lst['payment_name']);	//支付方式
					$('#confirmTime').text('送货日期：'+getajax.getTime(reciverlst['shipping_time'],'-',false));	//送货日期
					if(reciverlst['invoice_info'].length==0){
						$('#is_invoice>p').eq(0).text('不开发票');
						$('#is_invoice>p').eq(1).css('display','none');
					}else{
						$('#invoice_title').text('发票抬头：'+reciverlst['invoice_info']['抬头']+'');
						$('#invoice_content').text('发票内容：'+reciverlst['invoice_info']['内容']+'');
					}
					
					$('#prod_totel_amt').text('￥'+lst['goods_amount']);	//商品金额
					//$('#express_company_name').text();
					if(reciverlst['voucher_price']!==null&&reciverlst['voucher_price']!==''&&reciverlst['voucher_price']!==undefined){
						$('#deductible').text('-￥'+reciverlst['voucher_price']); //抵扣金额
							n=parseFloat(lst['goods_amount'])-parseFloat(reciverlst['voucher_price']);
						$('#allprice').text('￥'+n);	//实付金额
					}else{
						$('#deductible').text('-￥0.00'); 
						$('#allprice').text('￥'+parseFloat(lst['goods_amount']));//实付金额
					}
					
					$('#integral').text(reciverlst['order_pointscount']);	//积分金额
					$('.truepay p:eq(1)').text('下单时间：'+getajax.getTime(lst['add_time'],'-',true));//下单时间
					
					//显示按钮
					if(lst['if_lock']){
						$('#stepNo').append('<a class="btn_order">锁定中</a>');
					}
					if(lst['if_cancel']){
						$('#stepNo').append('<a class="btn_order" tid="'+lst['order_id']+'" data="del">删除订单</a>');
						$('a[data=del]').click(function(){
							var tid=$(this).attr('tid');
						});
					}
					if(lst['if_refund_cancel']){
						$('#stepNo').append('<a class="btn_order" tid="'+lst['order_id']+'" data="refund">申请退款</a>');
						$('a[data=refund]').click(function(){
							var tid=$(this).attr('tid');
							window.location.href='../my/refund.html?tid='+oid;
						});
					}
					if(lst['if_receive']){
						$('#stepNo').append('<a class="btn_order" tid="'+lst['order_id']+'" data="tobeok">确认收货</a>');
						$('a[data=tobeok]').click(function(){
							getajax.loadshow();
							var tid=$(this).attr('tid');
							recive_order(tid);
						});
					}
					if(lst['if_deliver']){
						$('#stepNo').append('<a class="btn_order" tid="'+lst['order_id']+'" data="ordertrack">查看物流</a>');
						$('a[data=ordertrack]').click(function(){
							var tid=$(this).attr('tid');
							window.location.href='../order/order-tracking.html?tid='+oid;
						});
					}
//					if(lst['if_evaluation']){
//						$('#stepNo').append('<a class="btn_order" tid="'+lst['order_id']+'" data="toappraise">去评价</a>');
//						$('a[data=toappraise]').click(function(){
//							var tid=$(this).attr('tid');
//							window.location.href='../my/appraisestore.html?tid='+oid;
//						});
//					}
					if(lst['if_share']){
						$('#stepNo').append('<a class="btn_order" tid="'+lst['order_id']+'" data="share">分享</a>');
						
					}
				}
			
			}
		},function(error){
			getajax.loadhide();
		});
	}

	//确认收货
	function recive_order(order_id){
		server='index.php';
		params={
			'act':'member_order',
			'op':'',
			'key':_key,
			'order_id':order_id
		}
		getajax.getAction(server,params,function(res){
			console.log('确认收货',res);
			if(res['code']==200){
				if(res['datas']==1){
					getajax.loadhide();
					getajax.showmsg('确认收货成功');
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
	
	
	function loaded() {
		myScroll = new iScroll('iScrollorderdetail', {
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
		getorderdetail();
	}
	
	return{
		start:start
	}
})();
window.orderdetail.start();