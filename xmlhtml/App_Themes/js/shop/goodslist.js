window.goodslist = (function() {
	var server = '',
		params = {},
		htm = '',
		isclick = false,
		keyword = getajax.getsessionStorage('keywordgood'),
		gc_id = getajax.getQueryString('id');
	page = 10,
		nextpage = true,
		_sortway = 2,
		_sort = '',
		id = '',
		brand = '',
		_attr = {},
		curpage = 1;

	$('.center>input').click(function() {
		window.location.href = 'search.html';
	});

	$('div').on('click', '.lst>li', function() {
		id = $(this).attr("id");
		if (isclick == false) {
			isclick = true;
			setTimeout(function() {
				isclick = false;
			}, 500);
			setTimeout(function() {
				window.location.href = '../shop/shopdetails.html?id=' + id;
			}, 300);
		}
	});


	getajax._click('#hideone', function() {
		if (isclick == false) {
			isclick = true;
			setTimeout(function() {
				isclick = false;
			}, 500);

			ulhide();
			hideindex = -1;
		}
	});

	function ulhide() {
			if (hideindex == 0) {
				$('.two').animate({
					'margin-top': -50
				}, 500, function() {
					$('.hidedetails').css('display', "none");
				});
			} else if (hideindex == 1) {
				$('.three').animate({
					'right': -100
				}, 500, function() {
					$('.hidedetails').css('display', "none");
					$("#hideone").css("top", "50").css("z-index", 991);
				});
			} else if (hideindex == 2) {
				$('.four').animate({
					'left': 100 + "%"
				}, 500, function() {
					$('.hidedetails').css('display', "none");
					$("#hideone").css("z-index", 991);
				});
			}
		}
		//清除选项


	function ulshow() {
		$('.hidedetails').css('display', "block");
	}

	//菜单栏底部 显示隐藏

	$('.control').toggle(function() {
		$(this).css('background-image', 'url(../App_Themes/img/nonos11.png)');
		$(this).prev().fadeIn(100);
	}, function() {
		$(this).css('background-image', 'url(../App_Themes/img/addd.png)');
		$(this).prev().fadeOut(100);
	});

	$("#shopindex").click(function() {
		window.location.href = '../shop/shopindex.html';
	});
	$("#stringifyindex").click(function() {
		window.location.href = '../stringify/stringifyindex.html';
	});
	$("#mycart").click(function() {
		window.location.href = '../my/mycart.html';
	});
	$("#userindex").click(function() {
		window.location.href = '../user/userindex.html';
	});

	$('.noborder').click(function() {

		$('.select').css("display", "block");
		$('.up').animate({
			left: 20 + "%"
		}, 500);


	});

	$('.select_list>li').click(function() {
		$('.select_list>li>ul').css("display", "none");

		//$(this).children('ul').toggle().siblings('span').eq(1).toggleClass('add').sibings().toggleClass('add');	
		$(this).children('ul').toggle();
		$(this).children('span').eq(1).addClass('add').siblings().removeClass('add');
	})

	getajax._click('.down', function() {

		$('.up').animate({
			left: 100 + "%"
		}, 500, function() {
			$('.select').css("display", "none");
		});
	});
	$('.select_title>li').eq(0).click(function() {


			//$('.select').css("display", "none");
			$('.up').animate({
				left: 100 + "%"
			}, 500, function() {
				$('.select').css("display", "none");
			});


		})
		

	$('.all_tab').click(function() {

		$(this).siblings('ul').toggle();

	})
	$('.all_lst>li').click(function() {

		$('.all_lst').hide();
		window.Refresh;
	})


	$("div").on('click', 'li[name=shopdetails]', function() {
		if (isclick == false) {
			isclick = true;
			setTimeout(function() {
				isclick = false;
			}, 500);

			var ids = $(this).attr('ids');
			window.location.href = 'shopdetails.html?id=' + ids;
		}

	});
	//最新
	$('.goodslist_title>ul>li').eq(0).click(function() {
		if (isclick == false) {
			isclick = true;
			setTimeout(function() {
				isclick = false;
			}, 500);

			$(this).addClass("this").siblings().removeClass("this");
			_sort = '';
			$(".lst").empty();
			getgoodslist();
		}
	});

	//销量
	$('.goodslist_title>ul>li').eq(1).click(function() {
		if (isclick == false) {
			isclick = true;
			setTimeout(function() {
				isclick = false;
			}, 500);

			$(this).addClass("this").siblings().removeClass("this");

			var sales = $(this).attr('name');
			if (sales != undefined) {
				_sort = 1;
				$(".lst").empty();
				curpage = 1;
				getgoodslist();
			}
		}
	});

	//价格
	var num = 1;
	$('.goodslist_title>ul>li').eq(2).click(function() {
		if (isclick == false) {
			isclick = true;
			setTimeout(function() {
				isclick = false;
			}, 500);

			_sort = 3;
			if (num == 1) {
				$(this).addClass('updown');
				_sortway = 2;
				num = 2
			} else if (num == 2) {
				$(this).addClass('up');
				_sortway = 1;
				num = 3;
			} else
			if (num == 3) {
				$(this).removeClass();
				num = 1
				_sortway = 2;
				_sort = 3;
			}
			$(this).addClass("this").siblings().removeClass("this");
			curpage = 1;
			$(".lst").empty();
			getgoodslist();
		}
	});

	//获取商品列表
	function getgoodslist() {
		server = 'index.php';
		params = {
			'act': 'goods',
			'op': 'goods_list',
			'key': _sort,
			'order': _sortway,
			'page': page,
			'curpage': curpage,
			'brand': brand,
			'attr': _attr
		};
		if (gc_id != '' && gc_id != null) {
			params['gc_id'] = gc_id;
		} else {
			params['keyword'] = keyword;
		}
		getajax.getAction(server, params, function(res) {
			console.log('获取商品列表', res);
			if (res['code'] == 200) {
				if (!res['datas']['error']) {
					getajax.loadhide();
					nextpage = res['hasmore'];
					var lst = res['datas']['goods_list'];
					var attribute_list = res['datas']['attribute_list'];
					var brand_list = res['datas']['brand_list'];
					if (lst.length == 0 && curpage == 1) {
						htm = '<li style="text-align: center;line-height: 40px;font-size: 1.2em;color: #888; border:0; padding-left:5px; width: 100%;">' + getajax.voidmsg('stringifymsg') + '</li>';
						$(".lst").empty().append(htm);
					}

					if (lst.length > 4) {
						$('#pullUp').css("display", "block");
					}
					htm = '';
					$(lst).each(function(k, v) {
						//控制商品名称显示两行+...
						//console.log(gname);
						var _gname = v['goods_name'].slice(0, 20) + '...';
						//console.log(_gname);
						htm += '<li name="' + v['goods_salenum'] + '" id="' + v['goods_id'] + '">';
						htm += '<img src="../App_Themes/img/360.png" _src="' + v['goods_image_url'] + '"/>';
						htm += '<div>' + _gname + '</div>';
						htm += '<div>';
						htm += '<span class="red">￥' + v['goods_price'] + '</span>';
						htm += '<span>已售' + v['goods_salenum'] + '件 </span>';
						//htm += '<span>' + v['evaluation_count'] + '评价</span>';
						htm += '</div>';
						htm += '</li>';
						
						//$('.lst>li>div').eq(0).text(_gname);
					});
					$('.lst').append(htm);
					loadImg();

					reScroll();
					getshaixuanlst(attribute_list, brand_list);
				}

			}
		}, function(error) {
			getajax.loadhide();
		});
	}

	//判断是否加载图片
	function loadImg(){
		var _width=$(window).height();
		var imgs=$('img');
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
	
	//获取筛选列表
	function getshaixuanlst(x, y) {
		var htm2 = '';
		$(y).each(function(k, v) {
			for (var i in v) {
				if (k == y.length - 1) {
					htm2 += '<li class="noboder" id="' + i + '">' + v[i] + '</li>';
				} else {
					htm2 += '<li id="' + i + '">' + v[i] + '</li>';
				}
			}
		});
		$('#brand').empty().append(htm2);
		var htm3 = '';
		$(x).each(function(k, v) {
			htm3 += '<li>';
			htm3 += '<span style="font-size:1.2em; font-weight:bold;" arrtid="' + v['attr_id'] + '">' + v['attr_name'] + '</span>';
			//htm3+='<span>全部</span>';
			htm3 += '<ul style="display: none;" class="attr">';
			htm3 += '<li id="' + v['attr_id'] + '">全部</li>';
			var attr_value_list = v['attr_value_list'];
			$(attr_value_list).each(function(k1, v1) {
				if (k1 == attr_value_list.length - 1) {
					htm3 += '<li id="' + v1['attr_value_id'] + '" class="noboder">' + v1['attr_value_name'] + '</li>';
				} else {
					htm3 += '<li id="' + v1['attr_value_id'] + '">' + v1['attr_value_name'] + '</li>';
				}

			});
			htm3 += '</ul>';
			htm3 += '</li>';
		});
		$('#replace').replaceWith(htm3);
		//点击进行筛选
		$('#brand>li').click(function() {
			$(this).toggleClass('this').siblings().removeClass('this');
			var tid = $(this).attr('id');
			brand = tid;
		});

	}
	$('.attr>li').click(function() {
		if (isclick == true) {

			setTimeout(function() {
				isclick = false;
			}, 500)
		}
		$(this).toggleClass('this').siblings().removeClass('this');
		var id = $(this).attr('id');
		var parrt = $(this).parent().prev().attr('arrtid');
		_attr[parrt] = id;
	});
	//点击筛选或确定
	$('.clear_btn').click(function() {
		$('.lst').empty();
		getgoodslist();
		$('.up').animate({
			left: 100 + "%"
		}, 500, function() {
			$('.select').css("display", "none");
		});
	});
	$('.select_title>li').eq(1).click(function() {
		$('.lst').empty();
		getgoodslist();
		$('.up').animate({
			left: 100 + "%"
		}, 500, function() {
			$('.select').css("display", "none");
		});
	});


	var IstotalPage = false;
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有


	function loaded(index) {
		pullUpEl = document.getElementById('pullUp');
		pullUpOffset = pullUpEl.offsetHeight;
		myScroll = new iScroll('iScrollgoodslist', {
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
				loadImg();
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
				loadImg();
				if (pullUpEl.className.match('flip')) {
					pullUpEl.className = 'loading';
					if (nextpage === true) {
						curpage += 1;
						getgoodslist();
						loadImg();
					} else {
						pullUpEl.querySelector('.pullUpLabel').innerHTML = '已经是最后一页';
						setTimeout(function() {
							pullUpEl.className = '';
							pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
							$(pullUpEl).css("visibility", "hidden");
						}, 1500);
					}

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
		$('.lst').empty();
		getgoodslist();
		reScroll(index);
		$('#pullUp').css("visibility", "hidden");
		$('#pullUp').css("display", "block");
	}

	return {
		start: start
	};

})();
window.goodslist.start();