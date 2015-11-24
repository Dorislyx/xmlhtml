window.moerindex = (function() {
	var _key = getajax.getsessionStorage('_key');
	var server = '',
		params = {};
	$('.moer-lst>li').eq(3).click(function() {
		window.location.href='about.html';
	});
	$('.moer-lst>li').eq(1).click(function() {
		window.location.href='../user/apphelp.html';
	});

//	$('.moer-lst>li').eq(3).click(function() {
//		try{
//			if(getajax.andOrios()){
//				//alert('安卓');
//				window.method5Action.Updateb();
//			}else{
//				alert('请前往appstore进行查看');
//			}
//			
//		}catch(e){
//			//TODO handle the exception
//		}
//		
//	});
	$('.out-login').click(function() {
		getajax.loadshow();
		var uname = getajax.getsessionStorage('uname');
		
		server = 'index.php';
		params = {
			'act': 'logout',
			'username': uname,
			'key': _key,
			'client': 'android'
		}
		getajax.postAction(server, params, function(res) {
			console.log('退出登录', res);
			if (res['code'] == 200) {
				if (res['datas'] == 1) {
					getajax.loadhide();
					//getajax.showmsg('退出登录成功');
					getajax.removesessionStorage('_key');
					getajax.removesessionStorage('uname');
					getajax.removesessionStorage();
					window.location.href='../user/userindex.html';
				}else{
					getajax.loadhide();
					getajax.showmsg(res['datas']['error']);
				}
			}
		}, function(error) {
			getajax.loadhide();
		});
	});
	
	//点击清除缓存
	$('#closeCache').click(function(){
		getajax.removesessionStorage();
	});
	
	//点击版本信息展示
	$('.moer-lst>li').eq(2).click(function(){
		$('.odlst').css('display','block');
		getversion();
		
	});
	
	//获取版本信息
	function getversion(){
		server='index.php';
		params={
			'act':'index',
			'op':'article_show',
			'article_id':43
		}
		getajax.getAction(server,params,function(res){
			console.log('获取版本信息',res);
			if(res['code']==200){
				if(!res['datas']['error']){
					var data=res['datas'];
					$('.two-two>a').eq(0).text(data['article_title']);
					$('.two-two>b').remove();
					 
					var htn='<div style="text-align:center; font-size:1.2em;">'+data['article_title']+'</div>';
					htn+=data['article_content'];
					console.log(htn);
					$('.two-two').empty().append(htn);
				}
			}
		},function(error){});
		}
	
	$('#close').click(function(){
		$('.odlst').css('display','none');
	});
	
	var IstotalPage = false;
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有


	function loaded(index) {
		myScroll = new iScroll('iScrollmoerindex', {
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
		
		bInitScorll = 0;
		reScroll(index);
	}

	return {
		start: start
	};
})();
window.moerindex.start();