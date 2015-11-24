window.appraisegoods = (function() {
	var server = '',
		htm = '',
		htn='',
		hasmore=false,//表示是否存在下一页
		imglst=[];
		params = {};
	$('#appraisegoods_btn').click(function() {
		window.location.href='appraisedetail.html';
	});
	$('.img-mask').click(function(){
		$('.img-mask1').css('display','none');
		$(this).css('display','none');
	});
	//获取评价列表	
	function getappraisegoodlist(){
			var _key = getajax.getsessionStorage('_key');
			//var _key='44bd0009ad025d01af658605ecc8246b';
			server ='index.php';
			params ={
				'act':'member_evaluate',
				'op':'list',
				'key':_key

			};
			getajax.getAction(server,params,function(res){
				console.log('获取评价列表',res);
				if(res['code']==200){
					if(!res['datas']['error']){
					getajax.loadhide();
					hasmore = res['hasmore'];
					var lst = res['datas'];
					
					htm ='';
					if (lst.length == 0) {
						htm = '<li style="text-align: center;line-height: 40px;font-size: 1.3em;color: #888;">' +getajax.voidmsg('commentmsg') + '</li>';
					}
					$(lst).each(function(k,v){
						htm+='<li ids="'+v['goods_id']+'">';
						htm+='<div>';
						htm+='<img src="'+v['goods_image_url']+'"/>';
						htm+='</div>';
						htm+='<div>';
						htm+='<p>'+v['goods_name']+'</p>';
						htm+='</div>';
						htm+='<p>'+v['geval_content']+'</p>';
						if(lst[k]['geval_image']==null){
							htm+='<div style="display:none;">';
							htm+='<img src="">';
							htm+='<img src="">';
							htm+='</div>';
						}else{
							htm+='<p>评价晒图</p>';
							htm+='<div>';
							$(lst[k]['geval_image']).each(function(j,i){
								if(j<lst[k]['geval_image'].length){
									htm+='<img src="'+lst[k]['geval_image'][j]+'">';
								}
							});
						htm+='</div>';
						}
						htm+='<div>';
						htm+='<span>价格：</a>￥'+v['goods_price']+'</a></span>';
						htm+='<span class="score">评分：</a>'+v['geval_scores']+'</a>分</span>';
						htm+='</div>';
						htm+='</li>';
					});
					$('#project_list').empty().append(htm);
					$('#project_list li>div:nth-of-type(3)').find('img').click(function(){
						var a=$(this).index();
						console.log(a)
						imglst=[];
						var imgs=$(this).parent().find('img').get();
						$('.img-mask1').css('display','block');
						$('.img-mask').css('display','block');
						console.log(imgs)
						for(var i=0;i<imgs.length;i++){
							var src=imgs[i].getAttribute('src');
							imglst.push(src);
						}
						htn='';
						$(imglst).each(function(k,v){
							htn+='<li>';
							htn+='<img src="'+imglst[k]+'" alt="" />';
							htn+='</li>';
						});
						$('.img-mask>ul').empty().append(htn);
						runimg(a);
						$('.img-masklst li>img').click(function(ev){
							ev.stopPropagation();
						});
						//
					});
				}else{
					getajax.loadhide();
					getajax.showmsg(res['datas']['error']);
				}
			}
		},function(error){
			getajax.loadhide();
		});
	}
	//滑动轮播晒图
	function runimg(index) {
		var //index = 0,
			maxlen = $('.img-mask li').length,
			time = 5000,
			width = 100,
			runtime = 500;
			$(".img-mask>ul").css('margin-left',-index * width + "%");
		//_timeInterval();
		/*function _timeInterval() {
			tm = setInterval(function() {
				if (index < maxlen - 1) {
					index += 1;
				} else {
					index = 0;
				}
				_mover();
			}, time);
		}*/

		touchs._right(".img-mask", function() {
			//window.clearInterval(tm);
			if (index == maxlen - 1) {
				getajax.showmsg('已经是最后一张了');
				//index = 0;
			} else {
				index += 1;
			}
			_mover();
			//_timeInterval();

		});
		touchs._left(".img-mask", function() {
			//window.clearInterval(tm);
			if (index == 0) {
				getajax.showmsg('已经是第一张了');
				//index = maxlen - 1;
			} else {
				index -= 1;
			}
			_mover();
			//_timeInterval();

		});

		function _mover() {
			/*$(".runindex>a").removeClass("this");
			$(".runindex>a").eq(index).addClass("this");*/
			$(".img-mask>ul").animate({
				'margin-left': -index * width + "%"
			}, runtime);
		}
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
		myScroll = new iScroll('iScrollappraisegoods', {
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
		bInitScorll = 0;
		reScroll(index);
		getajax.loadshow();
		getappraisegoodlist();
	}

	return {
		start: start
	}
})();
window.appraisegoods.start();