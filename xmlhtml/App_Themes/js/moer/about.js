
window.about=(function(){
	var server='',
		params={};
	//获取验证码
	function getqrcode(){
		server='index.php';
		params={
			'act':'index',
			'op':'qrcode'
		}
		getajax.getAction(server,params,function(res){
			console.log('获取验证码',res);
			if(res['code']==200){
				if(!res['datas']['error']){
					var data=res['datas'];
					if(getajax.andOrios()){
						//console.log('111');
						$('.logo>img').attr('src',data['android_qrcode']);
					}else{
						//console.log('222');
						$('.logo>img').attr('src',data['ios_qrcode']);
					}
					
				}
			}
		},function(error){});
	}

	var IstotalPage = false;
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有
	
	
	function loaded(index) {
		myScroll = new iScroll('iScrollabout', {
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
		getqrcode();
		bInitScorll=0;
		reScroll();
	}
	
	return{
		start:start
	};
})();
window.about.start();