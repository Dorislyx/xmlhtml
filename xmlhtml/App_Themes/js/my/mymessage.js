window.mymessage=(function(){
	var server = '',
		htm = '',
		hasmore=false,//表示是否存在下一页
		params = {};
	//获取我的消息列表	
	function getmessagelist(){
			var _key = getajax.getsessionStorage('_key');
			server ='index.php';
			params ={
				'act':'member_index',
				'op':'message',
				'key':_key
			};
			getajax.getAction(server,params,function(res){
				console.log('获取我的消息列表',res);
				if(res['code']==200){
					if(!res['datas']['error']){
					getajax.loadhide();
					hasmore = res['hasmore'];
					var lst = res['datas']['message_list'];
					htm ='';
					$(lst).each(function(k,v){
						
						htm+='<li class="list" id="'+v['message_id']+'">';
						if(v['message_open']==0){
							htm+='<div class="xf">';
						}else{
							htm+='<div>';
						}
						
						htm+='<p><span>'+getajax.getTime(v['message_time'], '-', false)+'</span></p>';
						htm+='<p>'+v['message_body']+'</p>';
						htm+='</div>';
						htm+='</li>';
					});
					$('.mymessage_list').empty().append(htm);
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
		myScroll = new iScroll('iScrollmymessage', {
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
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '已经是最后一页';
					setTimeout(function() {
						pullUpEl.className = '';
						pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
						$(pullUpEl).css("visibility", "hidden");
					}, 1500);
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
		bInitScorll=0;
		reScroll(index);
		getmessagelist();
	}
	
	return{
		start:start
	}
})();
window.mymessage.start();