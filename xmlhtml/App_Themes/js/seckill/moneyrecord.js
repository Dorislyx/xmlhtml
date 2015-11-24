window.moneyrecord=(function(){
	var server='',
		htm='',
		auction_id=getajax.getsessionStorage('auction_id'),
		round_num=getajax.getsessionStorage('round_num'),
		limit='',
		params={};
		function toTwo( n ) {return n<10?'0'+n:''+n; }
		function changeTime(time, sp, istrue) {
			var b;
			if (time.length == 10) {
				time = time + "000";
			}
			var a = parseInt(time);
			if (time == '') {
				b = new Date();
			} else {
				b = new Date(a);
			}
			var year = b.getFullYear();
			var mouth = b.getMonth() + 1;
			var day = b.getDate();
			var h = b.getHours();
			var m = b.getMinutes();
			var s = b.getSeconds();
			var c = year + sp + mouth + sp + day;
			if (istrue) {
				c = toTwo( c ) + " " +toTwo( h )  + ":" +toTwo(m ) + ":" + toTwo( s );
				return c;
			} else {
				return c;
			}
		}
	//获取出价列表
	function getcomptelst(){
		server='index.php';
		params={
			'act':'auction',
			'op':'price_list',
			'auction_id':auction_id,
			'round_num':round_num,
			'limit':limit
		}
		getajax.getAction(server,params,function(res){
			console.log('获取出价列表',res);
			if(res['code']==200){
				if(!res['datas']['error']){
					var lst=res['datas']['price_list'];
					htm='';
					$(lst).each(function(k,v){
						var _state=v['state'];
							if(_state==10){
								htm+='<li>';
								htm+='<span><a>出局</a></span>';
							}else{
								htm+='<li class="this">';
								htm+='<span><a>领先</a></span>';
							}
							
							htm+='<span>'+v['member_mobile']+'</span>';
							htm+='<span>￥'+v['bid_price']+'</span>';
							htm+='<span>'+changeTime(v['date'],'-',true)+'</span>';
							htm+='</li>';
					});
					$('.record_lst').empty().append(htm);
				}else{
					getajax.showmsg(res['datas']['error']);
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
	
	
	function loaded() {
		myScroll = new iScroll('iScrollmoneyrecord', {
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
		$('.record_lst').empty();
		getcomptelst();
		bInitScorll=0;
		reScroll();
	}
	
	return{
		start:start
	}
})();
window.moneyrecord.start();