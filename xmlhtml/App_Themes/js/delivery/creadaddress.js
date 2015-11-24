window.creadaddress = (function() {
	var server = '',
		citylst = [], //城市列表
		defaul = 0, //是否是默认地址
		eid = getajax.getQueryString('id'), //城市id
		params = {};
	var sel = $('.sel').attr('class');

	$('.set-dft').click(function() {
		$('.sel').toggleClass('this');
	});
	var _mobile = /^1\d{10}$/;

	//跳转至城市页面选择城市
	$('.place').click(function() {
		var obj = {};
		obj['user'] = $('#user').val();
		obj['mobile'] = $('#mobile').val();
		obj['tel'] = $('#tel').val();
		obj['detailaddress'] = $('#detailaddress').val();
		getajax.setsessionStorage('addressobj', obj);
		window.location.href = '../shop/city.html';
	});
	//编辑地址
	function editaddress() {
			var _class = $('.sel').attr('class');
			if (_class === 'sel') {
				defaul = 0;
			} else {
				defaul = 1;
			}
			var tname = $('#user').val();
			var mobile = $('#mobile').val();
			var detailaddress = $('#detailaddress').val();
			var place_id = $('.place').attr('cids').split(' ');
			var arainfo = $('.place').text();
			var tel = $('#tel').val();

			if (!tname) {
				getajax.showmsg('姓名不能为空');
			} else if (!mobile) {
				getajax.showmsg('手机号码不能为空');
			} else if (_mobile.test(mobile) == false) {
				getajax.showmsg('请输入正确的手机号');
			} else if (!detailaddress) {
				getajax.showmsg('请输入详细地址');
			} else if (!tel) {
				getajax.showmsg('请输入电话号码');
			} else if (place_id.length == 0) {
				getajax.showmsg('请选择地区');
			} else {
				var _key = getajax.getsessionStorage('_key');
				server = 'index.php';
				params = {
					'act': 'member_address',
					'op': 'address_edit',
					'key': _key,
					'address_id': eid,
					'true_name': tname,
					'area_id': place_id[2],
					'city_id': place_id[1],
					'area_info': arainfo,
					'address': detailaddress,
					'tel_phone': tel,
					'mob_phone': mobile,
					'is_default': defaul
				}
				getajax.getAction(server, params, function(res) {
					console.log('编辑地址', res);
					if (!res['datas']['error']) {
						getajax.loadhide();
						getajax.showmsg('修改地址成功');
						getajax.removesessionStorage('opt');
						getajax.removesessionStorage('addressobj');
						getajax.removesessionStorage('cityobj');
						setTimeout(function() {
							history.back();
						}, 500);
					}
				}, function(error) {
					getajax.loadhide();
				});
			}
		}
		//删除地址

	function deladdress() {
		var _key = getajax.getsessionStorage('_key');
		server = 'index.php';
		params = {
			'act': 'member_address',
			'op': 'address_del',
			'key': _key,
			'address_id': eid
		}
		getajax.getAction(server, params, function(res) {
			if (res['code'] == 200) {
				if (!res['datas']['error']) {
					getajax.loadhide();
					getajax.showmsg('删除地址成功');
					getajax.removesessionStorage('addressobj');
					getajax.removesessionStorage('cityobj');
					getajax.removesessionStorage('opt');
					setTimeout(function() {
						history.back();
					}, 500);
				}
			}
		}, function(error) {
			getajax.loadhide();
		});
	}


	//添加地址
	function addaddlst() {
		var tname = $('#user').val();
		var mobile = $('#mobile').val();
		var detailaddress = $('#detailaddress').val();
		var _place_id = $('.place').attr('cids');
		if(_place_id==undefined){
			getajax.showmsg('请选择地址');
			return false;
		}else{
			var place_id = _place_id.split(' ');
		}
		
		var arainfo = $('.place').text();
		var tel = $('#tel').val();
		if (!tname) {
			getajax.showmsg('姓名不能为空');
		} else if (!mobile) {
			getajax.showmsg('手机号码不能为空');
		} else if (_mobile.test(mobile) == false) {
			getajax.showmsg('请输入正确的手机号');
		} else if (!detailaddress) {
			getajax.showmsg('请输入详细地址');
		} else if (!tel) {
			getajax.showmsg('请输入电话号码');
		} else if (place_id.length == 0) {
			getajax.showmsg('请选择地区');
		} else {
			var _class = $('.sel').attr('class');
			if (_class === 'sel') {
				defaul = 0;
			} else {
				defaul = 1;
			}
			var _key = getajax.getsessionStorage('_key');
			server = 'index.php';
			params = {
				'act': 'member_address',
				'op': 'address_add',
				'key': _key,
				'true_name': tname,
				'city_id': place_id[1],
				'area_id': place_id[2],
				'area_info': arainfo,
				'address': detailaddress,
				'tel_phone': tel,
				'mob_phone': mobile,
				'is_default': defaul
			}
			getajax.getAction(server, params, function(res) {
				console.log('添加地址', res);
				if (res['code'] == 200) {
					if (!res['datas']['error']) {
						getajax.loadhide();
						getajax.showmsg('添加地址成功');
						getajax.removesessionStorage('cityobj');
						getajax.removesessionStorage('addressobj');
						setTimeout(function() {
							history.back();
						}, 500);
					}
				}
			}, function(error) {
				getajax.loadhide();
			});
		}
	}

	//编辑时获取地址的详情
	function getaddressdet() {
		getajax.loadshow();
		var _key = getajax.getsessionStorage('_key');
		server = 'index.php';
		params = {
			'act': 'member_address',
			'op': 'address_info',
			'key': _key,
			'address_id': eid
		}
		getajax.getAction(server, params, function(res) {
			console.log('获取地址详细', res);
			if (res['code'] == 200) {
				if (!res['datas']['error']) {
					getajax.loadhide();
					var _ads=res['datas'];
					var _adinfo=_ads['address_info'];
					$('#user').val(_adinfo['true_name']);
					$('#mobile').val(_adinfo['mob_phone']);
					$('#tel').val(_adinfo['tel_phone']);
					$('.place').text(_adinfo['area_info']);
					$('.place').attr('cids',_adinfo['address_id']+' '+_adinfo['city_id']+' '+_adinfo['area_id']);
					$('#detailaddress').val(_adinfo['address']);
					setcity();
				}
			}
		}, function(error) {
			getajax.loadhide();
		});
	}

	//是否放弃编辑
	$('.left').click(function(){
		//getajax.MyAlert('是否放弃编辑？',function(res){
			
		getajax.removesessionStorage('addressobj');
		getajax.removesessionStorage('cityobj');
		getajax.removesessionStorage('_addressobj');
		getajax._back();
			
	});
	
	var IstotalPage = false;
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有


	function loaded(index) {
		myScroll = new iScroll('iScrollcreadaddress', {
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

	//设置选择的城市
	function setcity() {
		var _cnm = '';
		var _cid = '';
		if(citylst.length<=0){
			return false;
		}
		$(citylst).each(function(k, v) {
			_cnm += v['cname'] + ' ';
			_cid += v['cid'] + ' ';
		});
		$('.place').text(_cnm).attr('cids', _cid);
	}

	function apdads(obj) {
		$('#user').val(obj['user']);
		$('#mobile').val(obj['mobile']);
		$('#tel').val(obj['tel']);
		$('#detailaddress').val(obj['detailaddress']);
	}

	function start() {
		
		reScroll();
		//获取保存的城市
		var _citylst = getajax.getsessionStorage('cityobj');
		//获取当前保存的地址信息
		var _addressobj = getajax.getsessionStorage('addressobj');
		if (_addressobj != '') {
			//地址信息存在，说明是从选择城市跳转回来
			apdads(_addressobj);
		}
		if (_citylst != '') {
			citylst = _citylst;
			setcity();
		}
		if (eid != '' && eid != null && eid != undefined) {
			$('#ctersd').text('编辑收货地址');
			$('#del-address').css('display', 'block');
			getaddressdet();
			$('#del-address').click(function() {
				deladdress();
			});
			$('#save-address').click(function() {
				editaddress();

			});
		} else {
			$('#save-address').click(function() {
				addaddlst();
			});
		}
	}

	return {
		start: start,
		setcity: setcity
	}

})();
window.creadaddress.start();