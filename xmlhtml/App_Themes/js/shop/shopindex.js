window.shopindex = (function() {
		var IstotalPage = false,
			server = '',
			params = {},
			isclick = false,
			indexhome = {},
			tm,
			htm = '';
			var _width = $(document).width();
		
	$('.title-sachs').click(function(){
		window.location.href='./search.html';
	});

	//判断跳转到哪里
	function locationwhere(a,b){
		if(a=='goods'){
			window.location.href='shopdetails.html?id='+b;
		}else if(a=='keyword'){
			getajax.setsessionStorage('keywordgood',b);
			window.location.href='goodslist.html';
		}else{
			return false;
		}
	}
	
	//判断是否加载图片
	function loadImg(){
		var _width=$(window).height();
		var imgs=$('#iScrollshopindex img');
		//console.log(imgs);
		$(imgs).each(function(k,v){
			var _top=$(v).offset().top;
			//console.log(_top);
			if(_top>0&&_top<_width){
				LoadingImg(v);
			}
		});
	}
	
	//加载图片
	function LoadingImg(obj){
		var imgUrl=$(obj).attr('_src');
		//console.log(imgUrl);
		var img=new Image();
		img.src=imgUrl;
		img.onload=function(event){
			$(obj).attr('src',img.src);
			if(event.complete){
				$(obj).attr('src',img.src);
			}
		}
	}
	
	function getindex() {
		server = 'index.php';
		params = {
			'act': 'index',
			'type':'json'
		};
		getajax.getAction(server, params, function(res) {
			console.log('获取首页数据', res);
			if(res['code']==200){
				if(!res['datas']['error']){
					getajax.loadhide();
					var lst1=res['datas'][0]['adv_list']['item'];
					//console.log(lst1);
					htm='';
					$(lst1).each(function(k,v){
						//console.log(v['image']);
						htm+='<li name="'+v['type']+'" id="'+v['data']+'"><img src="'+v['image']+'"/></li>';
						if(k==0){
							$('.runindex').empty().append('<a class="this"></a>');
						}else{
							$('.runindex').append('<a></a>');
						}
						
					});
					$(".runimg").css('width', _width + "px");
					$(".runimg>ul").empty().append(htm);
					$(".runimg>ul").css("width", $(lst1).length + "00%");
					$(".runimg>ul>li").css("width", 100 / $(lst1).length + "%");
					runimg();
					$(".runimg>ul>li").click(function(){
						var _name=$(this).attr('name');
						var oid=$(this).attr('id');
						locationwhere(_name,oid);
					});
					var lst2 = res['datas'][1]['home2'];
					//console.log(lst2);
					//$('.sh').text(lst2['rectangle1_data']);
					$('#Promotionlst>li').children('img').attr('_src',lst2['square_image']);
					$('#Promotionlst>li').eq(0).click(function(){
						var sh=lst2['rectangle1_data'];
						window.location.href='../seckill/mysecskill.html';
					});
					
					
					//$('.xhqg').text(lst2['rectangle2_data']);
					$('#complate>img').attr('_src',lst2['rectangle2_image']);
					
					$('#complate').click(function(){
						window.location.href='../seckill/groupbuy.html';
					})
					//$('.mxjx').text(lst2['square_data']);
					
					$('#active>img').attr('_src',lst2['rectangle1_image']);
					
					$('#active').click(function(){
						window.location.href='../seckill/paimai.html';
					});
					var lst3=res['datas'][3]['home1'];
					$('.sasa>img').attr('_src',lst3['image']); 
					var isclick=false;
					$('.sasa>img').click(function(event){
						if(isclick==false){
							isclick=true;
							return false;
						}
						setTimeout(function(){isclick=true},500);
						var type=lst3['type'];
						var data=lst3['data'];
						locationwhere(type,data);
					});
					
					var lst9=res['datas'][6]['home1'];
					$('.jj1>img').attr('_src',lst9['image']);
					$('.jj1>img').click(function(event){
						if(isclick==false){
							isclick=true;
							return false;
						}
						setTimeout(function(){isclick=true},500);
						var type=lst9['type'];
						var data=lst9['data'];
						locationwhere(type,data); 
					});
					var lst4 = res['datas'][2]['home3'];
					//console.log(lst4);
					$('.title1').text(lst4['title']);
					var _lst4 = res['datas'][2]['home3']['item'];
					var htm2 = '';
					$(_lst4).each(function(k,v){
						if(k<6){
							htm2+='<li ids="'+v['data']+'" type="'+v['type']+'">';
							//htm2+='<span class="title-one">物色</span>';
							//htm2+='<span class="title-two">爪机换新装</span>';
							htm2+='<span class="title-three-img">';
							htm2+='<img _src="'+v['image']+'" src="../App_Themes/img/320--130.png">';
							htm2+='</span>';
							htm2+='</li>';
						}
					});
					$('.two-lst').empty().append(htm2);
					
					//点击列表展示商品
					$('.two-lst>li').click(function(){
						var data=$(this).attr('ids');
						var type=$(this).attr('type');
						locationwhere(type,data);
					});
					var lst5=res['datas'][4]['home3'];
					$('.title2').text(lst5['title']);
					var _lst5 = res['datas'][4]['home3']['item'];
					var htm3 = '';
					$(_lst5).each(function(k,v){
						htm3+='<li ids="'+v['data']+'" type="'+v['type']+'">';
						//htm2+='<span class="title-one">物色</span>';
						//htm2+='<span class="title-two">爪机换新装</span>';
						htm3+='<span class="title-three-img">';
						htm3+='<img src="../App_Themes/img/210.png" _src="'+v['image']+'">';
						htm3+='</span>';
						htm3+='</li>';
					
					});
					$('.two-lst1').empty().append(htm3);
					$('.two-lst1>li').click(function(event){
						
						var data=$(this).attr('ids');
						var type=$(this).attr('type');
						locationwhere(type,data);
					});
					
					var lst6=res['datas'][5]['home3'];
					$('.title3').text(lst6['title']);
					var _lst6 = res['datas'][5]['home3']['item'];
					var htm4 = '';
					$(_lst6).each(function(k,v){
						htm4+='<li ids="'+v['data']+'" type="'+v['type']+'">';
						//htm2+='<span class="title-one">物色</span>';
						//htm2+='<span class="title-two">爪机换新装</span>';
						htm4+='<span class="title-three-img">';
						htm4+='<img _src="'+v['image']+'" src="../App_Themes/img/210.png">';
						htm4+='</span>';
						htm4+='</li>';
					
					});
					$('.two-lst2').empty().append(htm4);
					$('.two-lst2>li').click(function(){
						var data=$(this).attr('ids');
						var type=$(this).attr('type');
						//var data='100019';
						locationwhere(type,data);
					});
					
					var lst7=res['datas'][7]['home3'];
					$('.title4').text(lst7['title']);
					var _lst7 = res['datas'][7]['home3']['item'];
					var htm5 = '';
					$(_lst7).each(function(k,v){
						htm5+='<li ids="'+v['data']+'" type="'+v['type']+'">';
						//htm2+='<span class="title-one">物色</span>';
						//htm2+='<span class="title-two">爪机换新装</span>';
						htm5+='<span class="title-three-img">';
						htm5+='<img _src="'+v['image']+'" src="../App_Themes/img/210.png">';
						htm5+='</span>';
						htm5+='</li>';
					
					});
					$('.two-lst3').empty().append(htm5);
					$('.two-lst3>li').click(function(){
						var data=$(this).attr('ids');
						var type=$(this).attr('type');
						//var data='100019';
						locationwhere(type,data);
					});
					//优选
					var lst8=res['datas'][8]['home3'];
					$('#youx').text(lst8['title']);
					var _lst8=res['datas'][8]['home3']['item'];
					var htm6='';
					$(_lst8).each(function(k,v){
						htm6+='<li ids="'+v['data']+'" style="background-image:none; height:auto;text-align: center;"><img src="'+v['image']+'" width="100%"/><span style="height:auto; display:block;text-align: center;">'+v['title']+'</span></li>';
					});
					//$('.youxuan').empty().append(htm6);
					$('.youxuan>li').click(function(){
						var data=$(this).attr('ids');
						window.location.href='shophome.html?store_id='+data;
					});
					
					//点击更多
					$('.two-title').click(function(){
						var keyword= $(this).children('a').eq(0).text();
						window.location.href='goodslist.html?keyword='+keyword;
					});
					
					reScroll();
					loadImg();
					
				}
			}
		}, function(error) {
			getajax.loadhide();
			getajax.showmsg('加载失败');
		});
	}
	
	//轮播
	function runimg() {
		var index = 0,
			maxlen = $('.runimg li').length,
			time = 5000,
			width = 100,
			runtime = 500;
		_timeInterval();

		function _timeInterval() {
			tm = setInterval(function() {
				if (index < maxlen - 1) {
					index += 1;
				} else {
					index = 0;
				}
				_mover();
			}, time);
		}

		touchs._right(".runimg", function() {
			window.clearInterval(tm);
			if (index == maxlen - 1) {
				index = 0;
			} else {
				index += 1;
			}
			_mover();
			_timeInterval();

		});
		touchs._left(".runimg", function() {
			window.clearInterval(tm);
			if (index == 0) {
				index = maxlen - 1;
			} else {
				index -= 1;
			}
			_mover();
			_timeInterval();

		});

		function _mover() {
			$(".runindex>a").removeClass("this");
			$(".runindex>a").eq(index).addClass("this");
			$(".runimg>ul").animate({
				'margin-left': -index * width + "%"
			}, runtime);
		}
	}
	
	
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	/**
	 * 初始化iScroll控件
	 */
	function loaded() {
		$(pullDownEl).css('visibility', 'visible');
		pullDownEl = document.getElementById('pullDown');
		pullDownOffset = pullDownEl.offsetHeight;
		myScroll = new iScroll('iScrollshopindex', {
			useTransition: true,
			vScrollbar: false,
			topOffset: pullDownOffset,
			onRefresh: function() {
				if (pullDownEl.className.match('loading')) {
					$(pullDownEl).css('display', 'block');
					pullDownEl.className = '';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
				}
			},
			onScrollMove: function(event) {
				loadImg();
				event.stopPropagation();
				if (this.y > 5 && !pullDownEl.className.match('flip')) {
					$(pullDownEl).css('display', 'block');
					pullDownEl.className = 'flip';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
					this.minScrollY = 0;
				} else if (this.y < 5 && pullDownEl.className.match('flip')) {
					$(pullDownEl).css('display', 'block');
					pullDownEl.className = '';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
					this.minScrollY = -pullDownOffset;
				}
			},
			onScrollEnd: function() {
				loadImg();
				if (pullDownEl.className.match('flip')) {
					pullDownEl.className = 'loading';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '更新中...';
					isload = true;
					getindex(); // Execute custom function (ajax call?)
					setTimeout(function() {
						myScroll.refresh();
						$(pullDownEl).css('display', 'none');
					}, 2000);
				}
			}
		});
	}
	var bInitScorll=0;
	function reScroll() {
		if (bInitScorll === 0) {
			loadScroll = setTimeout(function() {
				loaded();
			}, 300)
		} else {
			loadScrollRefresh = setTimeout(function() {
				myScroll.refresh();
			}, 300);
		}
	}

	function start(idx) {
		reScroll(idx);
		getajax.loadshow();
	    getindex();
		
	}

	return {
		start: start
	};
})();
window.shopindex.start();
