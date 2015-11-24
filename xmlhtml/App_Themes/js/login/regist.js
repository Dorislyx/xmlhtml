window.regist = (function() {
	var server = '',
		_code = 60,
		show=true,
		params = {};
		
		
	//是否显示邀请码
	function ifinvitecodeshow(){
		server='index.php';
		params={
			'act':'login',
			'op':'is_invite_register'
		}
		getajax.getAction(server,params,function(res){
			console.log('是否显示邀请码',res);
			if(res['code']==200){
				if(res['datas']==0){
					$('#invitecode').css('display','none');
					show=false;
				}else if(res['datas']==1){
					$('#invitecode').css('display','block');
					show=true;
				}else{
					getajax.showmsg(res['datas']['error']);
				}
			}
		},function(error){});
	}
	//同意商城注册
	$('#islogin').click(function() {
		$(this).toggleClass('tyoks').toggleClass('tyok');
	});
	$('#islogin b').click(function(e){
		window.location.href='regagreement.html';
		e.stopPropagation();
	});
	//点击获取验证码
	$('.ldcode').one('click',function() {
		alreadyExists();
	});
	//验证手机号是否存在
	function alreadyExists (){
		var newphonenumber = $('#phonenumber').val();
		var _newphonenumber = /^1\d{10}$/;
			if (!newphonenumber) {
			getajax.showmsg('手机号码不能为空');
			$('.ldcode').one('click',function() {
				alreadyExists();
			});
		} else if (_newphonenumber.test(newphonenumber) != true) {
			getajax.showmsg('请输入正确的手机号');
			$('.ldcode').one('click',function() {
				alreadyExists();
			});
		} else{
			server = 'index.php';
			params = {
				'act': 'login',
				'op': 'check_mobile',
				'mobile': newphonenumber
			}
			getajax.getAction(server, params, function(res) {
				console.log('验证手机号是否存在', res);
				if (res['code'] == 200) {
					if (res['datas'] == 1) {
						getajax.loadhide();
						getcode(newphonenumber);
					} else {
						getajax.loadhide();
						getajax.showmsg('您所注册的手机号已存在');
						$('.ldcode').one('click',function() {
							alreadyExists();
						});
					}
				}
			}, function(error) {
				getajax.loadhide();
			});
		}
		
	};
	function getcode(num){
		/*var phonenumber = $('#phonenumber').val();
		var _phonenumber = /^1\d{10}$/;
		if (!phonenumber) {
			getajax.showmsg('手机号码不能为空');
			$('.ldcode').one('click',function() {
				getcode();
			});
		} else if (_phonenumber.test(phonenumber) != true) {
			getajax.showmsg('请输入正确的手机号');
			$('.ldcode').one('click',function() {
				getcode();
			});
		} else {*/
			setInterval(countime,1000);
			server = 'index.php';
			params = {
				'act': 'login',
				'op': 'send_sms',
				'mobile': num
			}
			getajax.getAction(server, params, function(res) {
				console.log('获取短息验证码', res);
				if (res['code'] == 200) {
					if (res['datas'] == 1) {
						getajax.loadhide();
						getajax.showmsg('验证码已成功发送至您的手机');
					} else {
						getajax.showmsg(res['datas']['error']);
					}
				}
			}, function(error) {});
		/*}*/
	}
	
	//倒计时
	function countime() {
		if (_code < 61 && _code >=1){
			_code -= 1;
			$('.ldcode').text('' + _code + '秒');
			if (_code == 0) {
				$('.ldcode').text('重新获取');
				$('.ldcode').click();
				$('.ldcode').one('click',function() {
					_code=60;
					getcode();
				});
				
			}
		}
	}
	//点击注册
	$('#reg-btn').click(function() {
		
		var askcode = $('#askcode').val();
		var uname = $('#uname').val();
		//var email = $('#email').val();
		//var _email = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		var upwd = $('#upwd').val();
		var _upwd=/^[a-z0-9_-]{6,18}$/;
		var upwds = $('#upwds').val();
		var phonenumber = $('#phonenumber').val();
		var code = $('#code').val();
		var _phonenumber = /^1\d{10}$/;
		var tyoks = $('#islogin').attr('class');
		console.log(tyoks);
		if (uname == '') {
			getajax.showmsg('账号不能为空');
		} else if (upwd == '') {
			getajax.showmsg('密码不能为空');
		}else if(!_upwd.test(upwd)){
			getajax.showmsg('密码为6-18位数字或字母');
		} else if (upwds == '') {
			getajax.showmsg('请输入确认密码');
		}else if(!_upwd.test(upwds)){
			getajax.showmsg('密码为6-18位数字或字母');
		} else if (phonenumber == '') {
			getajax.showmsg('手机号码不能为空');
		} else if (_phonenumber.test(phonenumber) != true) {
			getajax.showmsg('请输入正确的手机号');
		} else if (code == '') {
			getajax.showmsg('请输入验证码');
		}else if (tyoks!= 'tyoks') {
			getajax.showmsg('请同意商城注册协议');
		} else {
			getajax.loadshow();
			if(show){
				if(askcode==''){
					getajax.showmsg('邀请码不能为空');
				}else{
					
					//验证邀请码
					server = 'index.php';
					params = {
						'act': 'login',
						'op': 'check_invite_code',
						'invite_code': askcode
					}
					getajax.getAction(server, params, function(res) {
						console.log('验证邀请码', res);
						if (res['code'] == 200) {
							if (res['datas'] == 1) {
								getajax.loadhide();
								register(uname,upwd,upwds, phonenumber, code, askcode);
							} else {
								getajax.loadhide();
								getajax.showmsg(res['datas']['error']);
							}
						}
					}, function(error) {});
				}
				
			}else{
				register(uname,upwd,upwds,phonenumber,code,askcode);
			}
			

		}

	});

	//注册
	function register(uname,upwd,upwds,phone,code,askcode) {
		server = 'index.php';
		params = {
			'act': 'login',
			'op': 'register',
			'username': uname,
			'password': upwd,
			'password_confirm': upwds,
			//'email': email,
			'mobile': phone,
			'mobile_code': code,
			'invite_code': askcode,
			'client': 'android'
		}
		getajax.postAction(server, params, function(res) {
			console.log('注册', res);
			if (res['code'] == 200) {
				if (!res['datas']['error']) {
					getajax.loadhide();
					getajax.showmsg('注册成功！');
					setTimeout(function() {
						window.location.href = '../login/login.html';
					}, 500);
				}else{
					getajax.loadhide();
					getajax.showmsg(res['datas']['error']);
				}
			}
		}, function(error) {
			getajax.loadhide();
		});
	};

	var IstotalPage = false;
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有


	function loaded(index) {
		myScroll = new iScroll('iScrollregist', {
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
		ifinvitecodeshow();
		bInitScorll = 0;
		reScroll(index);
	}

	return {
		start: start
	};
})();
window.regist.start();