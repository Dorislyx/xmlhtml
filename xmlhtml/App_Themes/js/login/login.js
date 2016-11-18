window.login = (function() {
	var server = '',
		_index = 0,
		params = {};


	$('#regist').click(function() {
		window.location.href = 'regist.html';
	});
	$('#retpwd').click(function() {
		window.location.href = 'Retrievepwd.html';
	});

	$('.del-nam').click(function() {
		$('#uname').val('');
	});

	//登录
	$('.login-btn1').click(function() {
		var _uname = $('#uname').val();
		var _pwd = $('#upwd').val();
		//_pwd=faultylabs.MD5(_pwd);
		if (_uname == '' || _pwd == '') {
			getajax.MyAlert("用户名或密码不能为空");
		} else {
			getajax.loadshow();
			server = 'index.php';
			params = {
				'act': 'login',
				'username': _uname,
				'password': _pwd,
				'client': 'android'
			};
			getajax.postAction(server, params, function(res) {
				console.log('登录', res);
				if (res['code'] == 200) {
					if (res['datas']['error'] === undefined) {
						getajax.loadhide();
						getajax.showmsg('登陆成功');
						
						var _key = res['datas']['key'];
						var uname = res['datas']['username'];
						localStorage['uname']=_uname;
						localStorage['pwd']=_pwd;
						getajax.setsessionStorage('_key', _key);
						getajax.setsessionStorage('uname', uname);
						setTimeout(function() {
							window.location.href='../shop/shopindex.html'
						}, 500);
					} else {
						getajax.loadhide();
						getajax.showmsg(res['datas']['error']);
					}
				}
			}, function(error) {
				getajax.loadhide();
				getajax.MyAlert('登录错误');
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
		myScroll = new iScroll('iScrolllogin', {
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
		var username = localStorage['uname'];
		var userpwd = localStorage['pwd'];
		$('#uname').val(username);
		$('#upwd').val(userpwd);
		bInitScorll = 0;
		_index = index;
		reScroll(index);
	}

	return {
		start: start
	}
})();
window.login.start();