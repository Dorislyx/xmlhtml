window.confirmorder = (function() {
	var server = '',
		opt={},
		params = {},
		res = {},
		ifcart = 0,
		_voucher_price=0,
		pd_pay = 0,
		couponnum=0,
		allow_offpay='',
		cart_id = '',
		_invlistid='',//发票id
		pay_name = 'online',
		_cid='',
		_aid='',
		cid='',
		aid='',
		ifshow_offpay=getajax.getsessionStorage('ifshow_offpay');
		_address_id='',
		htm = '';
	var _ifcart = getajax.getQueryString('ifcart');
	if (_ifcart == 0) {
		ifcart = 0;
		res = getajax.getsessionStorage('res');
		cart_id = getajax.getsessionStorage('cart_id');
	} else {
		ifcart = 1;
		res = getajax.getsessionStorage('res1');
		cart_id = getajax.getsessionStorage('cart_id1');
	}	
		

		
		vat_hash = res['datas']['vat_hash'];
		
		freight_hash = res['datas']['freight_hash'];
		getajax.setsessionStorage('freight_hash',freight_hash);
	//var content = res['datas']['inv_info']['content'];

	//var allow_offpay = getajax.getsessionStorage('allow_offpay',allow_offpay);
	//var allow_offpay_batch=getajax.getsessionStorage('allow_offpay_batch',allow_offpay_batch); 
	
	console.log(res);
	$('#openInvoice').click(function() {
		window.location.href = '../my/myinvoice.html';
	});
	$('#rnext').click(function() {
		window.location.href = '../delivery/addressList.html?name=name';
	});
	$('.projiec-desc').click(function() {
		window.location.href = '../shop/shopdetails.html';
	});
	$('#zf-ps').click(function() {
		window.location.href = '../my/paymethod.html';
	});
	

	//获取订单的信息
	function getorderdeta() {

		if(opt){

			$('#consigneeName').text(opt['id']);
			$('#consigneeMobile').text(opt['ids']);
			$('#consigneeAddress').text(opt['arear'] + opt['addr']);
		}else{

			var address = res['datas']['address_info'];
			
		}
		var storelst = res['datas']['store_cart_list']; 
		var prices = 0;
		for (var i in storelst) {
			
			prices += parseFloat(storelst[i]['store_goods_total']);
			
		};
		if((prices+"").indexOf('.')==-1){
				prices+='.00';
			}
		getajax.setsessionStorage('prices',prices);		
		
		if(address==''||address==null||address.length==0){
			if(opt){
				$('#consigneeName').text(opt['id']);
				$('#consigneeMobile').text(opt['ids']);
				$('#consigneeAddress').text(opt['arear'] + opt['addr']);
			}else{
				$('.ads').css('visibility','hidden');
				$('#consigneeAddress').text('点此添加收货地址');
			}
			
		}else{
			$('#consigneeName').text(address['true_name']);
			$('#consigneeMobile').text(address['mob_phone']);
			$('#consigneeAddress').text(address['area_info'] + address['address']);
		}
		
		$('#prices').text('￥' + prices + '');
		$('.adprice').text('实付款:￥ ' + prices + '');
		//$('#order-shop>h2').text(storelst['store_name']);
		//$('.p-one>ul>img').attr('src','storelst['']')

		var html = '';
		//循环店铺信息
		for (var i in storelst) {
			html += '<li id="order-shop">';
			//html += '<h2>' + storelst[i]['store_name'] + '</h2>';
			html += '<div class="projiec-desc">';
		
			var objlst = storelst[i]['goods_list'];
			var buy_title='';
			for (var j in objlst) {
				html += '<ul class="p-one" id="'+objlst[j]['goods_id']+'">';
				html += '<li>';
				html += '<img src="' + objlst[j]['goods_image_url'] + '" />';
				html += '</li>';
				html += '<li class="p-two">';
				html += '<span>' + objlst[j]['goods_name'] + '</span>';
				html += '<span>X' + objlst[j]['goods_num'] + '</span>';
				html += '</li>';
				html += '<li class="p-price rnext">';
				html += '￥' + objlst[j]['goods_price'] + '';
				html += '</li>';
				html += '</ul>';
				buy_title+=objlst[j]['goods_name']+',';
			}
			
			html += '</div>';
			html += '<div class="zf-ps" id="zf-ps">';
			html += '<span class="left">支付及配送 </span>';
			html += '<span class="right">';
			
			html += '<select>';
			if(ifshow_offpay==0){
				html += '<option name="online">在线支付</option>';
			}else{
				if(allow_offpay==0){
					html += '<option name="online">在线支付</option>';
				}else{
					html += '<option name="online">在线支付</option>';
					html += '<option name="offline">货到付款</option>';
				}
			}
			
			
			html += '</select>';
			html += '</span>';
			html += '</div>';
			html += '<div class="zf-ps" id="_zf-ps">';
			html += '<span class="left">运费 </span>';
			html += '<span class="right">';
			html += '<a id="sentfeel'+objlst[j]['store_id']+'">￥0.00 </a>';
			//sentfeel1,sentfeel2
			html += '<a>普通快递<em>' + objlst[j]['goods_freight'] + '</em></a>';
			html += '</span>';
			html += '</div>';
			html += '<span class="ddly">订单留言 </span>';
			html += '<div class="m-textare">';
			html += '<textarea maxlength="50" placeholder="限50字以内"></textarea>';
			html += '</div>';
			html += '<div class="count-price">共计<a id="countproduct">' + storelst[i]['goods_list'].length + '</a>件商品 合计：<a>￥' + storelst[i]['store_goods_total'] + '</a>';
			html += '</div>';
			html += '</li>';

		}
		$('.lst').append(html);
//		buy_title=buy_title.substring(0,buy_title.length-1);
//			getajax.setsessionStorage('buy_title',buy_title);
//			console.log(buy_title);

		//选择支付方式
		$('select').change(function(){
			var pmethod=$('select>option:selected').attr('name');
			pay_name=pmethod;
			console.log(pmethod);
		});
		//点击跳转详情
		$('.projiec-desc>ul').click(function(){
			var gid=$(this).attr('id');
			window.location.href='../shop/shopdetails.html?id='+gid;
		});
	}

	$('#mycoupon').click(function() {
		var prices = getajax.getsessionStorage('prices');
		window.location.href = '../my/mycoupon.html?mycoupon='+prices;
	});
	
	
	//点击购买
	$('li[name=addOrder]').click(function() {

		if(opt){
			address_id=_address_id;
		}else{
			address_id = res['datas']['address_info']['address_id'];
		}
		
		getajax.loadshow();
		var _key = getajax.getsessionStorage('_key');
		var pay_message=$('.m-textare>textarea').val();
		var offpay_hash = getajax.getsessionStorage('offpay_hash');
		var offpay_hash_batch = getajax.getsessionStorage('offpay_hash_batch');
		
		server = 'index.php';
		params = {
			'act': 'member_buy',
			'op': 'buy_step2',
			'key': _key,
			'ifcart': ifcart,
			'cart_id': cart_id,
			'address_id': address_id,
			'vat_hash': vat_hash,
			'offpay_hash': offpay_hash,
			'offpay_hash_batch': offpay_hash_batch,
			'pay_name': pay_name,
			'invoice_id': _invlistid,
			'voucher': '',
			'pd_pay': pd_pay,
			'password': '',
			'fcode': '',
			'pay_message':pay_message
		}
		getajax.getAction(server, params, function(res) {
			console.log('购买第二步', res);
			if (res['code'] == 200) {
				if (!res['datas']['error']) {
					getajax.loadhide();
					getajax.showmsg('购买成功');
					var pay_sn = res['datas']['pay_sn'];
					getajax.setsessionStorage('pay_sn', pay_sn);
					getajax.removesessionStorage('myinvlist');
					getajax.setsessionStorage('pay_name',pay_name);
					setTimeout(function() {
						window.location.href = 'Pay.html';
					}, 500);
				}else{
					getajax.loadhide();
					getajax.showmsg(res['datas']['error']);
				}
			}
		}, function(error) {
			getajax.loadhide();
		});
	});
	
	//获取代金券列表
	function getcouponlst(){

		var _key = getajax.getsessionStorage('_key');
		server ='index.php';
		params ={
			'act':'member_voucher',
			'op':'voucher_list',
			'voucher_state':1,
			'key':_key
		};
		getajax.postAction(server,params,function(res){
			console.log('获取代金券列表',res);
			if(res['code']==200){
				if(!res['datas']['error']){
					getajax.loadhide();
					hasmore = res['hasmore'];
					var lst1 = res['datas']['voucher_list'];
					var coupon=lst1.length;
					couponnum=coupon;
					$('#couponnum').text(''+couponnum+'张可用');
					
					//获取优惠券的面额
					var voucherid = getajax.getsessionStorage('voucherid');
					$(lst1).each(function(k,v){
						if(v['voucher_id']==voucherid){
							var voucher_price =v.voucher_price;
							console.log(voucher_price);
							_voucher_price=voucher_price;
							
						}
					});
				}
				
	
			}
		},function(error){
			getajax.loadhide();
		});
	}
	
	//更换收货地址的接口
		function getchangaddress() {

			cid = res['datas']['address_info']['city_id'];
			aid = res['datas']['address_info']['area_id'];
			//alert(JSON.stringify(res['datas']['address_info']));
		if(aid==undefined&&cid==undefined){
			aid=_aid;
			cid=_cid;
		}
			var _key = getajax.getsessionStorage('_key');
			server = 'index.php';
			params = {
				'act': 'member_buy',
				'op': 'change_address',
				'key': _key,
				'freight_hash': freight_hash,
				'city_id': cid,
				'area_id': aid
			}
			getajax.getAction(server, params, function(res) {
				console.log('加载更换地址接口', res);
				if (res['code'] == 200) {
					if (!res['datas']['error']) {
						//alert(3);
						getajax.loadhide();
						var offpay_hash = res['datas']['offpay_hash'];
						var offpay_hash_batch = res['datas']['offpay_hash_batch'];
						var content = res['datas']['content'];
						allow_offpay=res['datas']['allow_offpay'];
						getajax.setsessionStorage('allow_offpay', allow_offpay);
						getajax.setsessionStorage('offpay_hash', offpay_hash);
						getajax.setsessionStorage('offpay_hash_batch', offpay_hash_batch);
						var sentfeel = res['datas']['content'];
						var sumsentfeel = 0;
						for(var i in sentfeel){
							$('#sentfeel'+i).text('￥'+sentfeel[i]+'');
							sentfeel[i]=parseFloat(sentfeel[i]);
							sumsentfeel+=sentfeel[i];
							
						}
						sumsentfeel=parseFloat(sumsentfeel);
						var _prices = getajax.getsessionStorage('prices');
						_prices = parseFloat(_prices);
						var totalpric = parseFloat(_prices+sumsentfeel);
						totalpric-= _voucher_price;
						if((totalpric+'').indexOf('.')==-1){
							totalpric+='.00';
						}
						getajax.setsessionStorage('prices',totalpric);
						$('.adprice').text('实付款:￥ ' + totalpric + '');
						
						//getajax.setsessionStorage('allow_offpay',allow_offpay);
						//getajax.setsessionStorage('allow_offpay_batch',allow_offpay_batch);
						getorderdeta();
					}else{
						getajax.showmsg(res['datas']['error']);
					}
				}
			}, function(error) {
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
		myScroll = new iScroll('iScrollconfirmorder', {
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
		opt = getajax.getsessionStorage('opt');
		if (opt) {
			$('#consigneeName').text(opt['id']);
			$('#consigneeMobile').text(opt['ids']);
			$('#consigneeAddress').text(opt['arear'] + opt['addr']);
			 _aid=opt['aid'];
			 _cid=opt['cid'];
			 _address_id=opt['name'];
		}
		getajax.loadshow();
		console.log('obj', res);
		bInitScorll = 0;
		$('.lst').empty();
		getcouponlst();
		
		getchangaddress();
		reScroll(index);
		var _invlist=getajax.getsessionStorage('myinvlist');
		if(_invlist!=''){
			$('#inv-type').text(_invlist['inv_content']+"-"+_invlist['inv_title']);
			_invlistid=_invlist['inv_id'];
		}else{
			$('#inv-type').text('不需要发票');
		}
		
		
	}

	return {
		start: start
	};
})();
window.confirmorder.start();