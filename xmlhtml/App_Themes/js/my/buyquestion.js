

window.buyquestion=(function(){
		var server = '',
		hasmore=false,//表示是否存在下一页
		htm='',
		oid = getajax.getQueryString('id'),
		params = {};
		$('header>.right').click(function(){
			window.location.href='question.html?id='+oid;
		});
	//获取咨询列表
	function getbuyquestion(){
		server ='index.php';
		params ={
			'act':'goods',
			'op':'consult_list',
			'goods_id':oid
		};
		getajax.getAction(server,params,function(res){
			console.log('获取咨询列表',res);
			if(res['code']==200){
				if(!res['datas']['error']){
					getajax.loadhide();
				hasmore = res['hasmore'];
				var lst = res['datas'];
				htm='';
				if (lst.length == 0) {
					htm='<li style="text-align: center;line-height: 40px;font-size: 1.3em;color: #888;">' +getajax.voidmsg('questionrecord') + '</li>';}
				$(lst).each(function(k,v){
					htm+='<li>';
					htm+='<p>';
					htm+='<span>'+v['member_name']+'</span>';
					htm+='<span class="time">'+getajax.getTime(v['consult_addtime'],'-',true)+'</span>';
					htm+='</p>';
					htm+='<p>'+v['consult_content']+'</p>';
					htm+='<p>'+v['consult_reply']+'</p>';
					htm+='</li>';
				});
				$('.buyquestion_list').empty().append(htm);
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
		pullUpEl = document.getElementById('pullUp');
		$('#pullUp').css('display','block');
		pullUpOffset = pullUpEl.offsetHeight;
		myScroll = new iScroll('iScrollbuyquestion', {
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
		getbuyquestion();
	};
	return{
		start:start
	}
})();
window.buyquestion.start();