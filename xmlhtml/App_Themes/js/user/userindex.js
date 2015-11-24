

window.userindex=(function(){
	var server = '',
		_point=0,
		params = {};

//		//测试用按钮
//		$('.login-desc').click(function(){
//			var _key=getajax.getsessionStorage('_key');
//			getajax.showmsg(_key);
//		});

		//点击登陆
		$('.login-btn').click(function(){
			window.location.href='../login/login.html';
		})
		//我的收藏
		$('#mycollect1').click(function(){
			var _key=getajax.getsessionStorage('_key');
			if(_key===''){
				getajax.showmsg('请先登录');
				setTimeout(function(){
					window.location.href='../login/login.html';
				},500);
			}else{
				window.location.href='../my/mycollect.html';
			}
		});
		//浏览记录
		$('.u-twos>li').eq(1).click(function(){
			var _key=getajax.getsessionStorage('_key');
			if(_key===''){
				getajax.showmsg('请先登录');
				setTimeout(function(){
					window.location.href='../login/login.html';
				},500);
			}else{
				window.location.href='../shop/record.html';
			}
		});
		//订单
		$('#allorder').click(function(){
			var _key=getajax.getsessionStorage('_key');
			if(_key===''){
				getajax.showmsg('请先登录');
				setTimeout(function(){
					window.location.href='../login/login.html';
				},500);
			}else{
				window.location.href='../order/allorders.html';
			}
		});
		//订单
		$('.user-r-lst>ul>li').click(function(){
			var _key=getajax.getsessionStorage('_key');
			if(_key===''){
				getajax.showmsg('请先登录');
				setTimeout(function(){
					window.location.href='../login/login.html';
				},500);
			}else{
				var name=$(this).attr('name');
				window.location.href='../order/allorders.html?order_state='+name;
			}
		});
		
		//点击跳转退换货记录
		$('#aftersale').click(function(){
			window.location.href='../my/refundlist.html';
		});
		
//		$('#refundRecord').click(function(){
//			window.location.href='../my/refundRecord.html';
//		});
		//礼卷
		$('#mycoupon').click(function(){
			var _key=getajax.getsessionStorage('_key');
			if(_key===''){
				getajax.showmsg('请先登录');
				setTimeout(function(){
					window.location.href='../login/login.html';
				},500);
			}else{
				window.location.href='../my/mycoupon.html';
			}
		});
		//我的消息
		$('#mymessage').click(function(){
			var _key=getajax.getsessionStorage('_key');
			if(_key===''){
				getajax.showmsg('请先登录');
				setTimeout(function(){
					window.location.href='../login/login.html';
				},500);
			}else{
				window.location.href='../my/mymessage.html';
			}
		});
		//评价商品
		$('#appraisegoods').click(function(){
			var _key=getajax.getsessionStorage('_key');
			if(_key===''){
				getajax.showmsg('请先登录');
				setTimeout(function(){
					window.location.href='../login/login.html';
				},500);
			}else{
				window.location.href='../my/appraisegoods.html';
			}
		});
		//我的积分
		$('.scores').click(function(){
			var _key=getajax.getsessionStorage('_key');
			if(_key===''){
				getajax.showmsg('请先登录');
				setTimeout(function(){
					window.location.href='../login/login.html';
				},500);
			}else{
				window.location.href='../my/myIntegral.html?_point='+_point;
			}
		});
		//收货地址 
		$('#address').click(function(){
			var _key=getajax.getsessionStorage('_key');
			if(_key===''){
				getajax.showmsg('请先登录');
				setTimeout(function(){
					window.location.href='../login/login.html';
				},500);
			}else{
				window.location.href='../delivery/addressList.html';
			}
		});
		//我的收藏夹
		$('#myfavorites').click(function(){
			var _key=getajax.getsessionStorage('_key');
			if(_key===''){
				getajax.showmsg('请先登录');
				setTimeout(function(){
					window.location.href='../login/login.html';
				},500);
			}else{
				window.location.href='../my/mycollect.html';
			}
		});
		//我的购物车
		$('#myshoppingart').click(function(){
			var _key=getajax.getsessionStorage('_key');
			if(_key===''){
				getajax.showmsg('请先登录');
				setTimeout(function(){
					window.location.href='../login/login.html';
				},500);
			}else{
				window.location.href='../my/mycart.html';
			}
		});
		//浏览记录
		$('#browserecord').click(function(){
			var _key=getajax.getsessionStorage('_key');
			if(_key===''){
				getajax.showmsg('请先登录');
				setTimeout(function(){
					window.location.href='../login/login.html';
				},500);
			}else{
				window.location.href='../shop/record.html';
			}
		});
		//密码管理 
		$('#uppwd').click(function(){
			var _key=getajax.getsessionStorage('_key');
			if(_key===''){
				getajax.showmsg('请先登录');
				setTimeout(function(){
					window.location.href='../login/login.html';
				},500);
			}else{
				window.location.href='../user/updatePwd.html';
			}
		});
		//账户与安全
		$('#accountsafe').click(function(){
			var _key=getajax.getsessionStorage('_key');
			if(_key===''){
				getajax.showmsg('请先登录');
				setTimeout(function(){
					window.location.href='../login/login.html';
				},500);
			}else{
				window.location.href='../my/accountsafe.html';
			}
		});
		//更多
		$('#control').click(function(){
			window.location.href='../moer/moerindex.html';
		});
		//个人信息
		$('.login-ad').click(function(){
			var _key=getajax.getsessionStorage('_key');
			if(_key===''){
				getajax.showmsg('请先登录');
				setTimeout(function(){
					window.location.href='../login/login.html';
				},500);
			}else{
				window.location.href='../user/myaccount.html';
			}
		});
	
	//获取userindex
	function getuserindex(){
		var _key=getajax.getsessionStorage('_key');
		getajax.loadshow();
		server = 'index.php';
		params = {
			'act':'member_index',
			'key':_key
		}
		getajax.postAction(server,params,function(res){
			console.log('获取我的商城',res);
			var rade =res['datas']['member_info'];
			if(rade!=''&&rade!=undefined){
				$('.user-r-lst>ul>li >i,.user-lst>li>span:nth-child(1)>i').fadeIn(50);
				getajax.loadhide();
				//getajax.setsessionStorage('rade',rade);
				doinfun(rade);
				};
			
			
		},function(error){
			getajax.loadhide();
		});
	}
	
	function doinfun(rade){
		$('.login-btn').css('display','none');
		$('.login-ad').text(rade['user_name']).css({'height':60,'float':'left','line-height':'60px','text-align':'center','font-size':'1.3em','margin-top': '13px','width':110,'background-image':'url(../App_Themes/img/Write1.png)','background-repeat':'no-repeat','background-size':'20px','background-position':'right center','padding-right':'30px'});
		
		
//		var _tmpimg = new Image();
//			_tmpimg.src = rade['avator'];
//			_tmpimg.onload=function(){
//				var _tw = _tmpimg.width;
//				var _th = _tmpimg.height;
//				//getajax.MyAlert(tw);
//				//getajax.MyAlert(th);
//				//getajax.MyAlert(tw > th);
//				if(_tw > _th){
//					$('.login-img').css('display','block').children('img').css('height','100%');
//				}else{
//					$('.login-img').css('display','block').children('img').css('width','100%');
//				}
//			}
			//alert(rade['avator']);
		$('.login-img').css('display','block').children('img').attr('src',rade['avator']+"?"+Math.random());	
	
		$('#scores').text(rade['point']);
		var point = rade['point'];
		_point=point;
		$('#accountnum').text(rade['predepoit']);
		$('#mycollectcount').text(rade['fav_count']);
		$('.number_count').text(rade['browse_count']);
		$('#topay>i').text(rade['order_notpay']);
		$('#state_pay>i').text(rade['order_notsend']);
		$('#tohad>i').text(rade['order_notreceive']);
		$('#aftersale>i').text(rade['order_refund']);
		$('#mymessage i').text(rade['message_new']);
		$('#myshoppingart i').text(rade['cart_count']);
		//点击更换用户头像
		$('.login-img>img').click(function(){
			
	 		$('span').removeClass('pthis');
	        $('.ulhide').fadeIn(500);
	  	});
		$('.ulhide>li').click(function(){
			$('.ulhide').fadeOut(500);
		});
		//拍照
		$('.takep').click(function(){
			$('.ulhide').fadeOut(500);
			$(this).addClass('pthis');
			//getajax.showmsg('拍照');
			if(getajax.andOrios()){
				//getajax.MyAlert('拍照');
				window.uploads1.uploadimg1('img',1);
			}else{
				getImg(1);
			}
			
			
		});
		//相册
		$('.pics').click(function(){
			$('.ulhide').fadeOut(500);
			$(this).addClass('this');
			getajax.showmsg('相册');
			if(getajax.andOrios()){
				//getajax.MyAlert('相册');
				//alert(window.uploads1);
				window.uploads1.uploadimg1('img',2);
			}else{
				getImg(2);
			}
		});
	}
	
	function getImg(index){
		var _key=getajax.getsessionStorage('_key');
		try{
			window.location.href='objc://loadUserImg:/,'+index+','+_key;
		}catch(e){
			//TODO handle the exception
		}
	}
	
	function UpLoadUserImg(imgurl){
		//alert(imgurl);
		$('#img').attr("src", imgurl);
	}
				
	var IstotalPage = false;
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有
	
	
	function loaded(index) {
		myScroll = new iScroll('iScrolluserindex', {
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

	function start(index) {
		reScroll(index);
		var _key = getajax.getsessionStorage('_key');

		if(_key!=''){
			getuserindex();
		}
	}
	
	return{
		start:start,
		getuserindex:getuserindex,
		UpLoadUserImg:UpLoadUserImg
	}
})();
window.userindex.start();