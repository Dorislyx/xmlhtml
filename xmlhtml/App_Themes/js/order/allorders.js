

window.allorders=(function(){
	var server = '',
		_key = '',
		htm = '',
		good_id=[],
		params = {},
		hasmore=false,
		current_page=1,
		page=10,
		curpage =1,
		orderilst={};
	var _key = getajax.getsessionStorage('_key');
	var state_type  = getajax.getQueryString('order_state');
	
/*	$('.payagain').click(function(){
		
		//window.location.href='../shop/shopdetails.html';
	});*/
		
	//获取订单页面的状态
	if(state_type!=undefined&&state_type!=''&&state_type!=null){
		
		switch(state_type){
			case "state_new":
				$('header>.center').text('待支付订单');
			break;
			case "state_send":
				$('header>.center').text('待收货订单');
			break;
			case "state_noeval":
				$('header>.center').text('待评价订单');
			break;
			case "state_pay":
				$('header>.center').text('待发货订单');
			break;
		}
	}else{
		state_type='';
	}
	//获取订单列表
	function getorderlst(){
		 //_key = '44bd0009ad025d01af658605ecc8246b';
		server = 'index.php';
		params = {
			'act':'member_order',
			'op':'order_list',
			'key':_key,
			'page':page,
			'curpage':curpage,
			'state_type':state_type 
		}
		getajax.getAction(server,params,function(res){
			console.log('获取订单列表',res);
			if(res['code']==200){
				if(!res['datas']['error']){
					getajax.loadhide();
					hasmore=res['hasmore'];
					current_page=res['current_page'];
					var lst = res['datas']['order_group_list'];
//					var order_list=lst['order_list'];
//					getajax.setsessionStorage('order_list',order_list);
					htm = '';
					var _shoplst;
					var _prolst;
					if (lst.length == 0) {
						htm = '<li style="text-align: center;line-height: 40px;font-size: 1.2em;color: #888; border:1px solid #eee;">' +getajax.voidmsg('ordermsg') + '</li>';}
					//一级循环：订单
					$(lst).each(function(k,v){
						htm+='<li>';
						//console.log(v['pay_sn']);
						 _shoplst=v['order_list'];
						//二级循环：订单中的店铺
						$(_shoplst).each(function(k1,v1){
							var storelst={};
							var storeid=v1['store_id'];
							var orderid=v1['order_id'];
							
							htm+='<div>';
	//					htm+='<b>'+v['state_desc']+'</b>';
						htm+='<div>';
						htm+='<span>订单号：'+v1['order_sn']+'</span>';
						htm+='<b></b>';
						htm+='</div>';
						htm+='</div>';
						htm+='<div onclick="window.location.href=\'../order/orderdetail.html?id='+v1['order_id']+'\';">';
						htm+='<h2>'+v1['store_name']+'<em>'+v1['state_desc']+'</em></h2>';
							_prolst=v1['extend_order_goods'];
							//三级循环：订单中店铺里的商品
							var goodsids={};
							var goodsdec={};
							$(_prolst).each(function(k2,v2){
								var gid=v2['goods_id'];
								htm+='<dl goods_id="'+v2['goods_id']+'">';
								htm+='<dt><img src="'+v2['goods_image_url']+'"/></dt>';
								htm+='<dd>';
								htm+='<a>'+v2['goods_name']+'&nbsp;&nbsp;X'+v2['goods_num']+'</a>';
								if(v2['if_refund']==1){
									htm+='<span rec_id="'+v2['rec_id']+'" order_id="'+v2['order_id']+'">退换货</span>';
								}
								htm+='</dd>';
								htm+='</dl>';
								goodsids['goods_image']=v2['goods_image_url'];
								goodsids['goods_name']=v2['goods_name'];
								goodsdec[gid]=goodsids;
								
								//console.log(goodsids);
							});
								htm+='</div>';
								htm+='<div>';
								htm+='<div class="truepay">';
								htm+='<span>实付款：</span>';
								htm+='<b>￥'+v1['order_amount']+'</b>';
								htm+='</div>';
								if(v1['if_cancel']){
									htm+='<div data="1" class="payagain" order_id="'+v1['order_id']+'">取消订单 </div>';
									
								}
								if(v1['if_deliver']){
									htm+='<div data="2" name="CKWL" class="payagain" order_id="'+v1['order_id']+'">查看物流 </div>';
									
								}
								if(v1['if_refund_cancel']){
									htm+='<div data="5" class="payagain" order_id="'+v1['order_id']+'">申请退款 </div>';
									
								}
								if(v1['if_lock']){
									htm+='<div data="3" class="payagain" order_id="'+v1['order_id']+'">锁定中 </div>';
								}
								if(v1['if_receive']){
									htm+='<div data="4" class="payagain" order_id="'+v1['order_id']+'">确认收货 </div>'; 
								}
//								if(v1['if_evaluation']){
//									htm+='<div data="6" class="payagain" order_id="'+v1['order_id']+'">去评价 </div>'; 
//								}
								if(state_type=='state_new'){
									htm+='<div data="9" class="payagain" pay_sn="'+v1['pay_sn']+'" prices="'+v1['order_amount']+'">去支付</div>';
								}
								htm+='</div>';
								storelst[storeid]=goodsdec;
								orderilst[orderid]=storelst;
								
						});
						
						htm+='</li>';
					});
					console.log(orderilst);
					getajax.setsessionStorage('orderilst',orderilst);
					
					$('.order_list').append(htm);
					//点击去支付
					$('div[data=9]').click(function(){
						var pay_sn=$(this).attr('pay_sn');
						var prices=$(this).attr('prices');
						getajax.setsessionStorage('prices',prices);
						window.location.href='Pay.html?pay_sn='+pay_sn;
					});
					//点击申请退换货
					$('dd>span').click(function(event){
						event.stopPropagation();
						var rec_id=$(this).attr('rec_id');
						//console.log(rec_id);
						var order_id=$(this).attr('order_id');
						var tid=rec_id+'|'+order_id;
						console.log(tid);
						window.location.href='../my/ReturnPro.html?tid='+tid;
					});
					//点击取消订单
					$('div[data=1]').click(function(){
						var order_id = $(this).attr('order_id');
						getajax.loadshow();
						cancelorder(order_id);
						getorderlst();
					});
					//点击确认收货
					$('div[data=4]').click(function(){
						var order_id = $(this).attr('order_id');
						getajax.loadshow();
						order_receive(order_id);
					});
					//点击申请退款
					$('div[data=5]').click(function(){
						var order_id = $(this).attr('order_id');
						window.location.href='../my/refund.html?order_id='+order_id;
					});
					//点击去评价
					$('div[data=6]').click(function(){
						var good_ids=$(this).parents('li').find('dl').get();
						for(var i=0;i<good_ids.length;i++){
							var id=good_ids[i].getAttribute('goods_id');
							good_id.push(id);
						}
						/*$(good_ids).each(function(k,v){
							var id=good_ids[k].attr('goods_id');
							good_id.push(id);
						});*/
						//console.log(good_id);
						getajax.setsessionStorage('mygood_ids',good_id);
						var order_id = $(this).attr('order_id');
						window.location.href='../my/appraisestore.html?tid='+order_id;
					});
				}
				
			}
		},function(error){
			getajax.loadhide();
		});
	}
	//查看物流
	$('div').on('click','[name=CKWL]',function(){
		var order_id=$(this).attr('order_id');//获取订单编号
		window.location.href='order-tracking.html?oid='+order_id;
	});
	
	//取消订单
	function cancelorder(order_id){
		
		server = 'index.php';
		params= {
			'act':'member_order',
			'op':'order_cancel',
			'key':_key,
			'order_id':order_id
		}
		getajax.getAction(server,params,function(res){
			console.log('取消订单',res);
			if(res['code']==200){
				if(res['datas']==1){
					getajax.loadhide();
					getajax.showmsg('取消订单成功');
					getorderlst();
				}
			}
		},function(error){
			getajax.loadhide();
		});
	}
	
	//确认收货
	function order_receive(order_id){
		server='index.php';
		params={
			'act':'member_order',
			'op':'order_receive',
			'key':_key,
			'order_id':order_id
		}
		getajax.getAction(server,params,function(res){
			console.log('确认收货',res);
			if(res['code']==200){
				if(res['datas']==1){
					getajax.loadhide();
					getajax.showmsg('确认收货成功');
					getorderlst();
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
		pullUpEl = document.getElementById('pullUp');
		$('#pullUp').css('display','block');
		pullUpOffset = pullUpEl.offsetHeight;
		myScroll = new iScroll('iScrollallorders', {
			useTransition: true,
			vScrollbar: false,
			checkDOMChanges: true,
			topOffset: pullDownOffset,
			onRefresh: function() {
				if (pullUpEl.className.match('loading')) {
					pullUpEl.className = '';
					$(pullUpEl).css("visibility", "visible");
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
				}
			},
			onScrollMove: function() {
				if (this.y < (this.maxScrollY - 50) && !pullUpEl.className.match('flip')) {
					$(pullUpEl).css("visibility", "visible");
					pullUpEl.className = 'flip';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '松开立即刷新';
					this.maxScrollY = this.maxScrollY;
				} else if (this.y > (this.maxScrollY - 50)) {
					$(pullUpEl).css("visibility", "visible");
					pullUpEl.className = '';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
				}
			},
			onScrollEnd: function() {
				if (pullUpEl.className.match('flip')) {
					pullUpEl.className = 'loading';
					if (hasmore === true) {
						curpage += 1;
						getorderlst();
					} else {
						pullUpEl.querySelector('.pullUpLabel').innerHTML = '已经是最后一页';
						setTimeout(function() {
							pullUpEl.className = '';
							pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
							$(pullUpEl).css("visibility", "hidden");
						}, 1500);
					}
				}
			}
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
		//var _key = getajax.getsessionStorage('_key');
		bInitScorll=0;
		$('.order_list').empty();
		getorderlst();
		reScroll(index);
	}
	
	return{
		start:start
	}
})();
window.allorders.start();