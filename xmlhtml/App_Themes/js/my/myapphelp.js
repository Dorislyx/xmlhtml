window.myapphelp = (function(){
	var server = '',
		hasmore=false,//表示是否存在下一页
		htm='',
		params = {};
	//获取文章内容	
	function gemyapphelplist(){
		//var _key = getajax.getsessionStorage('_key');
		server ='index.php';
		params ={
			'act':'index',
			'op':'article_show',
			'article_id':42
		};
		getajax.getAction(server,params,function(res){
			console.log('获取文章内容',res);
			if(res['code']==200){
				if(!res['datas']['error']){
					getajax.loadhide();
				hasmore = res['hasmore'];
				var lst = res['datas'];
				htm='';
				htm+='<h1>'+lst['article_title']+'</h1>';
				htm+='<p>'+lst['article_content']+'</p>';
				$('.ntegraltext').empty().append(htm);
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
		myScroll = new iScroll('iScrollmyapphelp', {
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
		gemyapphelplist();
	}
	return {
		start:start
	};
})();
window.myapphelp.start();
