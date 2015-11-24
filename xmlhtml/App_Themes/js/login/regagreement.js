window.regareement=(function(){
	var server = '',
		htm='',
		params = {};
	function regareement(){
			server='index.php';
			params={
				'act':'document',
				'op':'content',
				'doc_id':7
			}
			getajax.getAction(server,params,function(res){
				console.log('注册协议',res);
				if(res['code']==200){
					var con=res['datas'];
					htm='';
					htm+='<h1>'+con['doc_title']+'</h1>';
					htm+=con['doc_content'];
					$('.ntegraltext').empty().append(htm);
				}
			},function(error){});
		};
		
		var IstotalPage = false;
		var myScroll,
			pullDownEl, pullDownOffset,
			pullUpEl, pullUpOffset,
			generatedCount = 0;
		var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有
		
		
		function loaded() {
			myScroll = new iScroll('iScrollregareement', {
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
	function start(){
		bInitScorll=0;
		reScroll();
		regareement();
	}
	return {
		start:start
	}
})();
window.regareement.start();
