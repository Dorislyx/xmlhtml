window.Retrievepwd = (function() {
	var server = '',
		_code = 60,
		params = {};
	var uname = getajax.getsessionStorage('uname');
	var auth_type = getajax.getsessionStorage('auth_type');
	var member_id = getajax.getsessionStorage('member_id');

	//换账验证码
	$('#upcode').click(function() {
		upcode();
	});

	//刷新验证码
	function upcode() {
			var codes = '';
			for (var i = 0; i < 4; i++) {
				var _codes = parseInt(Math.random() * 9);
				codes += _codes;
			}
			$('#codes').text(codes);
		}
		//跳转第二步
	$('#login-btn1').click(function() {
		var uname = $('#uname').val();
		var rcode = $('#rcode').val();
		var codes = $('#codes').text();
		if (uname == '') {
			getajax.showmsg('请输入用户名');
		} else if (rcode == '') {
			getajax.showmsg('请输入验证码');
		} else if (rcode !== codes) {
			getajax.showmsg('验证码错误');
		} else {
			getajax.loadshow();
			server = 'index.php';
			params = {
				'act': 'login',
				'op': 'find_pwd_step1',
				'account': uname
			}
			getajax.getAction(server, params, function(res) {
				console.log('找回密码第一步', res);
				if (res['code'] == 200) {
					if (!res['datas']['error']) {
						getajax.loadhide();
						var auth_type = res['datas']['auth_type'];
						var member_id = res['datas']['member_id'];
						getajax.setsessionStorage('auth_type', auth_type);
						getajax.setsessionStorage('member_id', member_id);
						getajax.setsessionStorage('uname', uname);
						window.location.href = 'Retrieveped2.html';
					} else {
						getajax.loadhide();
						getajax.showmsg(res['datas']['error']);
					}
				}
			}, function(error) {});
		}

	});


	//点击获取短信验证码
	$('#getsms').click(function() {

		server = 'index.php';
		params = {
			'act': 'login',
			'op': 'find_pwd_step2_send_code',
			'type': auth_type[0]['type'],
			'member_id': member_id
		}
		getajax.getAction(server, params, function(res) {
			console.log('获取短信验证码');
			if (res['code'] == 200) {
				if (res['datas'] == 1) {
					getajax.showmsg('验证码已成功发送至您的手机');
					setInterval(countime, 800);
				} else {
					getajax.showmsg(res['datas']['error']);
				}
			}
		}, function(error) {});
	});

	//倒计时
	function countime() {
		if (_code < 61 && _code >= 1) {
			_code -= 1;
			$('#getsms').text('' + _code + '秒');
			if (_code == 0) {
				$('#getsms').text('重新获取');
			}
		}
	}

	//跳转第三步
	$('#login-btn2').click(function() {
		getajax.loadshow();
		var rcode = $('#rcode').val();
		server = 'index.php';
		params = {
			'act': 'login',
			'op': 'find_pwd_step2',
			'type': auth_type[0]['type'],
			'member_id': member_id,
			'verify_code': rcode
		}
		getajax.getAction(server, params, function(res) {
			console.log('跳转第三步', res);
			if (res['code'] == 200) {
				if (!res['datas']['error']) {
					getajax.loadhide();
					var secure_code = res['datas']['secure_code'];
					getajax.setsessionStorage('secure_code', secure_code);
					window.location.href = 'Retrieveped3.html';
				} else {
					getajax.loadhide();
					getajax.showmsg(res['datas']['error']);

				}
			}
		}, function(error) {
			getajax.loadhide();
		});
	});

	//找回密码第三步
	$('#login-btn3').click(function() {
		
		var _upwd = /^[a-z0-9_-]{6,18}$/;
		var secure_code = getajax.getsessionStorage('secure_code');
		var _password = $('#pwd1').val();
		var password_confirm = $('#pwd2').val();
		if (_password == '') {
			getajax.showmsg('密码不能为空');
		} else if (!_upwd.test(_password)) {
			getajax.showmsg('密码为6-18位数字或字母');
		} else if (password_confirm == '') {
			getajax.showmsg('再次输入不能为空');
		} else if (!_upwd.test(password_confirm)) {
			getajax.showmsg('密码为6-18位数字或字母');
		} else {
			getajax.loadshow();
			server = 'index.php';
			params = {
				'act': 'login',
				'op': 'find_pwd_step3',
				'member_id': member_id,
				'secure_code': secure_code,
				'password': _password,
				'password_confirm': password_confirm
			}
			getajax.getAction(server, params, function(res) {
				console.log('找回密码第三步', res);
				if (res['code'] == 200) {
					if (res['datas'] == 1) {
						getajax.loadhide();
						getajax.showmsg('找回密码成功');
						setTimeout(function() {
							window.location.href = 'login.html';
						}, 500);
					} else {
						getajax.loadhide();
						getajax.showmsg(res['datas']['error']);
					}
				}
			}, function(error) {
				getajax.loadhide();
			});
		}


	});
	var IstotalPage = false;
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有


	function loaded(index) {
		myScroll = new iScroll('iScrollRetrievepwd', {
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

	function start(index) {
		$('p#uname').text(uname);
		upcode();
		bInitScorll = 0;
		reScroll(index);
	}

	return {
		start: start
	};
})();
window.Retrievepwd.start();