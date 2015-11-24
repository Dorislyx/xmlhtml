
window.paydeposit=(function(){
	var server = '',
		auctid=getajax.getsessionStorage('auction_id'),
		money=getajax.getsessionStorage('auction_deposit'),
		params = {};
	
		$('#need-paydeposit').text('￥'+parseFloat(money)+'元');
			
		//点击跳转地址
		$('#rnext').click(function(){
			window.location.href='../delivery/addressList.html?name=name';
		});
		
		//获取地址列表
		function getaddresslst() {
			var _key = getajax.getsessionStorage('_key');
			server = 'index.php';
			params = {
				'act': 'member_address',
				'op': 'address_list',
				'key': _key
			}
			getajax.getAction(server,params,function(res){
				console.log('获取地址列表',res);
				if(res['code']==200){
					if(!res['datas']['error']){
						var addresslst=res['datas']['address_list'];
						$(addresslst).each(function(k,v){
							if(v['is_default']==1){
								console.log(this);
								$('#consigneeName').text(this.true_name);
								$('#consigneeMobile').text(this.mob_phone);
								$('#consigneeAddress').text(this.area_info+this.address);
								$('#consigneeAddress').attr('name',this.address_id);
							}
						});
					}else{
						getajax.showmsg(res['datas']['error']);
					}
				}
			},function(error){});
		}
		//同意拍卖协议
		function agrees(){
			var address_id=$('#consigneeAddress').attr('name');
			server='index.php';
			var _key = getajax.getsessionStorage('_key');
			params={
				'act':'auction',
				'op':'agreement',
				'key':_key,
				'auction_id':auctid,
				'address_id':address_id,
				'agree':1
				
			}
			getajax.getAction(server,params,function(res){
				console.log('同意拍卖协议',res);
				if(res['code']==200){
					if(res['datas'] == 1){
						history.back();
						//getajax.showmsg('已同意拍卖协议');
					}else{
						getajax.showmsg(res['datas']['error']);
					}
				}
			},function(error){});
		};
	$('.yes-no>span').eq(1).click(function(){
		var selected=$('.auction-agreement>span:first').hasClass('this');
		if(!selected){
			getajax.showmsg('竞拍需同意限量卖竞拍协议');
		}else{
			agrees();
			
		}
	});
	$('.yes-no>span').eq(0).click(function(){
		history.back();
	});
	$('.auction-agreement>span:eq(0)').click(function(){
		$(this).toggleClass('this');
	});
	
	var IstotalPage = false;
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有
	
	
	function loaded(index) {
		myScroll = new iScroll('iScrollmysecskill', {
			useTransition: true,
			vScrollbar: false,
			checkDOMChanges: true,
			topOffset: pullDownOffset,
			onRefresh: function(){},
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
	
	function start(){
		reScroll();
		getaddresslst();
		var opt=getajax.getsessionStorage('opt');
		console.log(opt,'opt');
		if(opt){
			$('#consigneeName').text(opt['id']);
			$('#consigneeMobile').text(opt['ids']);
			$('#consigneeAddress').text(opt['arear']+opt['addr']);
		}
		
	}
	return {
		start:start
	}
})();
window.paydeposit.start();