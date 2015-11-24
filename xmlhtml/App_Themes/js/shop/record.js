window.record = (function() {
	var server = '',
		htm = '',
		hasmore = false, //表示是否存在下一页
		params = {};
	var _key = getajax.getsessionStorage('_key');
	
	function lionload() {
		$('div[name=nms]').click(function(event) {
			event.stopPropagation();
			$(this).toggleClass('sele');
		});
		function del(){
			$('#del').click(function() {
				var del_val=$(this).text();
				if(del_val==='删除'){
					$(this).text('取消')
					$('div[name=nms]').css('display', 'block');
					$('.delok').css('display', 'block');
			
				}else{
					$(this).text('删除')
					$('div[name=nms]').css('display', 'none');
					$('.delok').css('display', 'none');
					
				}
			});
		}
		del();

		$('.project_list>li').click(function() {
			var id=$(this).attr('id');
			window.location.href = '../shop/shopdetails.html?id='+id;
		})
		//点击删除浏览记录
		$('.delok').click(function(){
			getajax.loadshow();
			var seles=$('.sele');
			console.log(seles);
			$(this).css('display', 'none');
			$('#del').text('删除');
			del();
			$(seles).each(function(k,v){
				var goods_id=$(v).attr('oid');
				delrecord(goods_id);
				getajax.showmsg('删除浏览记录成功');
			});
		});
	}

	//获取浏览记录列表
	function getrecordlist() {
		server = 'index.php';
		params = {
			'act': 'member_index',
			'op': 'goods_browse',
			'key': _key
		};
		getajax.getAction(server, params, function(res) {
			console.log('获取浏览记录列表', res);
			if (res['code'] == 200) {
				if(!res['datas']['error']){
					getajax.loadhide();
					hasmore = res['hasmore'];
					var lst = res['datas']['goods_list'];
					htm = '';
					if (lst.length == 0) {
						htm = '<li style="text-align: center;line-height: 40px;font-size: 1.2em;color: #888; border-top:1px solid #eee; border-bottom:1px solid #eee;">' + getajax.voidmsg('seerecode') + '</li>';
					}
					$(lst).each(function(k, v) {
						htm += '<li id="' + v['goods_id'] + '">';
						htm += '<div name="nms" oid="' + v['goods_id'] + '"></div>';
						htm += '<div>';
						htm += '<img src="' + v['goods_image_url'] + '"/>';
						htm += '</div>';
						htm += '<div>';
						htm += '<p>' + v['goods_name'] + '</p>';
						htm += '<span>￥' + v['goods_marketprice'] + '</span>';
						htm += '</div>';
						htm += '</li>';
					});
					$('.project_list').empty().append(htm);
					lionload();
				}
			}
		}, function(error) {
			getajax.loadhide();
		});
	}

	//删除浏览记录
	function delrecord(goods_id){
		server='index.php';
		params={
			'act':'member_index',
			'op':'goods_browse_del',
			'key':_key,
			'goods_id':goods_id
		}
		getajax.getAction(server,params,function(res){
			console.log('删除浏览记录',res);
			if(res['code']==200){
				if(res['datas']==1){
					getajax.loadhide();
					//getajax.showmsg('删除浏览记录成功');
					getrecordlist();
					
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
		$('#pullUp').css('display', 'block');
		pullUpOffset = pullUpEl.offsetHeight;
		myScroll = new iScroll('iScrollrecord', {
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
		bInitScorll = 0;
		reScroll(index);
		getrecordlist();
	}

	return {
		start: start
	}
})();
window.record.start();