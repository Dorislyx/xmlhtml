window.addressList = (function() {
	var server = '',
		htm = '',
		params = {};

	var freight_hash = getajax.getsessionStorage('freight_hash');
	$('.cread-address').click(function() {
		window.location.href='creadaddress.html';
	});

	/*$('.adress-lst>li').click(function() {
		$(this).addClass('this').siblings().removeClass('this');
		window.location.href='creadaddress.html';
	})*/


	//获取地址列表
	function getaddresslst() {
		var _key = getajax.getsessionStorage('_key');
		server = 'index.php';
		params = {
			'act': 'member_address',
			'op': 'address_list',
			'key': _key
		}
		getajax.postAction(server, params, function(res) {
			console.log('获取地址列表', res);
			if (res['code'] == 200) {
				if(!res['datas']['error']){
					getajax.loadhide();
				var lst = res['datas']['address_list'];
				htm = '';
				$(lst).each(function(k, v) {
					if (v['is_default'] == 1) {
						htm += '<li class="this" staus="' + v['is_default'] + '" name="' + v['address_id'] + '" id="'+v['true_name']+'" ids="'+v['mob_phone']+'" area="'+v['area_info']+'" addr="'+v['address']+'" cid="'+v['city_id']+'" aid="'+v['area_id']+'">';
					} else {
						htm += '<li staus="' + v['is_default'] + '" name="' + v['address_id'] + '" id="'+v['true_name']+'" ids="'+v['mob_phone']+'" area="'+v['area_info']+'" addr="'+v['address']+'" cid="'+v['city_id']+'" aid="'+v['area_id']+'">';
					}
					htm += '<div>';
					htm += '<span><a>' + v['true_name'] + '</a><a>' + v['mob_phone'] + '</a></span>';
					htm += '<span>' + v['area_info'] + v['address'] + '</span>';
					htm += '</div>';
					htm += '</li>';
				});
				$('.adress-lst').append(htm);
				$('.adress-lst>li').click(function() {
					var name=getajax.getQueryString('name');
					if(name){
						var aid = $(this).attr('aid');
						var cid = $(this).attr('cid');
						var name=$(this).attr('name');
						var id=$(this).attr('id');
						var ids=$(this).attr('ids');
						var arear=$(this).attr('area');
						var addr=$(this).attr('addr');
						var opt={};
						opt['name']=name;
						opt['id']=id;
						opt['ids']=ids;
						opt['arear']=arear;
						opt['addr']=addr;
						opt['aid']=aid;
						opt['cid']=cid;
						getajax.setsessionStorage('opt',opt);
						
						server = 'index.php';
						params = {
							'act':'member_buy',
							'op':'change_address',
							'key':_key,
							'freight_hash':freight_hash,
							'city_id':cid,
							'area_id':aid
						}
						getajax.getAction(server,params,function(res){
							console.log('更换地址',res);
							if(res['code']==200){
								if(!res['datas']['error']){
									getajax.loadhide();
									//getajax.showmsg('更换地址成功');
									setTimeout(function(){
										history.back();
									},500);
									var offpay_hash = res['datas']['offpay_hash'];
									var offpay_hash_batch = res['datas']['offpay_hash_batch'];
									getajax.setsessionStorage('offpay_hash',offpay_hash);
									getajax.setsessionStorage('offpay_hash_batch',offpay_hash_batch);
									//getajax.setsessionStorage('allow_offpay',allow_offpay);
									//getajax.setsessionStorage('allow_offpay_batch',allow_offpay_batch);
								}else{
									getajax.loadhide();
									//getajax.showmsg(res['datas']['error']);
								}
							}
						},function(error){
							getajax.loadhide();
						});
						
					}else{
						var address_id = $(this).attr('name');
						window.location.href='creadaddress.html?id='+address_id;
					}
					
				});
				}else{
					getajax.loadhide();
					getajax.showmsg(res['datas']['error']);
				}
			}
		}, function(error) {
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
		myScroll = new iScroll('iScrolladdressList', {
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
		getajax.loadshow();
		getaddresslst();
		reScroll(index);
		$('.adress-lst').empty();
	}

	return {
		start: start
	}
})();
window.addressList.start();