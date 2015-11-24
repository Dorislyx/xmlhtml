window.compteagrees = (function(){
	var server = '',
		hasmore=false,//表示是否存在下一页
		htm='',
		params = {};
	//获取文章内容	
	function gecompteagrees(){
		server='index.php';
			params={
				'act':'document',
				'op':'content',
				'doc_id':8
			}
			getajax.getAction(server,params,function(res){
				console.log('获取注册协议',res);
				if(res['code']==200){
					getajax.loadhide();
					var con=res['datas'];
					htm='';
					htm+='<h1>'+con['doc_title']+'</h1>';
					htm+=con['doc_content'];
					$('.ntegraltext').empty().append(htm);
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
		myScroll = new iScroll('iScrollcompteagrees', {
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
	function start (index){
		getajax.loadshow();
		bInitScorll = 0;
		reScroll(index);
		gecompteagrees();
	}
	return {
		start:start
	};
})();
window.compteagrees.start();
