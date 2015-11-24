window.myaccount = (function() {
	var _tlst = {
			'nickname': '<span class="input"><input type="text" id="_nickname" placeholder="请输入你的昵称" /></span><span id="btn-nickname">确定</span>',
			'sex': '<span name="1">男</span><span name="2">女</span><span name="3">保密</span><span id="btn-sex">确定</span>',
			'birthday': '<span class="input"><input id="_birthdayStr" type="date" placeholder="请输入你的出生日期" /></span><span id="btn-birthday">确定</span>',
			'hobby': '<span class="input"><input type="text" id="_hobbies" placeholder="请输入你的兴趣" /></span><span id="btn-hobby">确定</span>',
			'truename': '<span class="input"><input id="_realname" type="text" placeholder="请输入你的真实姓名" /></span><span id="btn-truename">确定</span>',
			'mobile': '<span class="input"><input type="text" id="_mobile" placeholder="请输入手机号码" /></span><span class="input"><input style="width:60%;"type="text" id="_mobile_text"/><span id="code_mobile">获取验证码</span></span><span id="btn-mobile">确定</span>',
			'email': '<span class="input"><input type="text" id="_email" placeholder="请输入你的邮箱" /></span><span class="input"><input style="width:60%;"type="text" id="verify_text" /><span id="code_email">获取验证码</span></span><span id="btn-email">确定</span>',
			'idcard': '<span class="input"><input type="text" id="_idcard" placeholder="请输入你的身份证号码" /></span><span id="btn-idcard">确定</span>',
			'marriage': '<span name="01">未婚</span><span name="02">已婚</span><span name="03">保密</span><span id="btn-marriage">确定</span>',
			'education': '<span class="input"><input type="text" id="_education" placeholder="请输入" /></span><span id="btn-education">确定</span>',
			'income': '<span class="input"><input type="text" id="_income" placeholder="请输入" /></span><span id="btn-income">确定</span>',
			'job': '<span class="input"><input type="text" id="_industry" placeholder="请输入你的行业" /></span><span id="btn-job">确定</span>',
			'regions': '<span class="input"><input type="text" id="_regions" placeholder="请输入你所在的地区" /></span><span id="btn-regions">确定</span>',
			'address': '<span class="input"><input type="text" id="_street" placeholder="请输入你所在的街道" /></span><span id="btn-address">确定</span>'
		},
		servers = '',
		params = {},
		_citys = {},
		_hobbies = [],
		isclick = false,
		_txt = '', //点击选择的内容
		pro = {}, //用户信息
		_code = 60,
		_code1 = 60,
		htm = '';
	//验证手机号是否存在
	function alreadyExists (){
		var newphonenumber = $('#_mobile').val();
		var _newphonenumber = /^1\d{10}$/;
			if (!newphonenumber) {
			getajax.showmsg('手机号码不能为空');
			$('.code_mobile').one('click',function() {
				alreadyExists();
			});
		} else if (_newphonenumber.test(newphonenumber) != true) {
			getajax.showmsg('请输入正确的手机号');
			$('.code_mobile').one('click',function() {
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
						//更新手机号
						var mobile_num = $('#mobile').text();
						setInterval(countimeMobile, 1000);
						server = 'index.php';
						params = {
							'act': 'login',
							'op': 'send_verify_code',
							'type': 'mobile',
							'account': mobile_num
						};
						getajax.getAction(server, params, function(res) {
							console.log('获取更新手机号验证码', res);
							if (res['code'] == 200) {
								if (res['datas'] == 1) {
									getajax.showmsg('验证码已成功发送至您的手机');
								} else {
									getajax.showmsg(res['datas']['error']);
								}
							}
						}, function(error) {});
					} else {
						getajax.loadhide();
						getajax.showmsg('您所注册的手机号已存在');
						$('.code_mobile').one('click',function() {
							alreadyExists();
						});
					}
				}
			}, function(error) {
				getajax.loadhide();
			});
		}
		
	};
	var _isclick = false;
	$('ul[name=uads]>li').click(function() { //点击选项操作对应的选项
		if (_isclick) {
			_isclick = false;
		}
		_isclick = true;

		$('.hidecontext').css('height', '222px');
		var nm = $(this).attr("name");
		setTimeout(function() {
			$('.hides').fadeIn(300);
		}, 200);
		$(".hidecontext").empty().append(_tlst[nm]);
		if (nm == 'mobile') { //获取更新手机号验证码
			$('#code_mobile').click(function() {
				if (isclick === false) {
					isclick = true;
					setTimeout(function(){
						isclick = false;

					}, 500);
				} else {
					return false;
				}
				alreadyExists();
			});
		}
		if (nm == 'email') { //获取更新邮箱验证码
			$('#code_email').click(function() {
				if (isclick === false) {
					isclick = true;
					setTimeout(function() {
						isclick = false;

					}, 500);
				} else {
					return false;
				}

				var uname = $('#_email').val();
				console.log(uname)
				if(uname==''){
					getajax.showmsg('邮箱不能为空');
				}else{
					setInterval(countimeEmail, 1000);
					server = 'index.php';
					params = {
						'act': 'login',
						'op': 'send_verify_code',
						'type': 'email',
						'account': uname
					};
					getajax.getAction(server, params, function(res) {
						console.log('获取更新邮箱验证码', res);
						if (res['code'] == 200) {
							if (res['datas'] == 1) {
								getajax.showmsg('验证码已成功发送至您的邮箱');
								
							} else {
								getajax.showmsg(res['datas']['error']);
							}
						}
					}, function(error) {});
				}
			});
		}

		setTimeout(function() {
			$("span[id!=btn-" + nm + "]").click(function() {

				_txt = $(this).attr("name");
			});

			getajax._click("#btn-" + nm, function() {

				if (nm == 'mobile') {
					var newmobile = $('#_mobile').val();
					var newmobile_code = $('#_mobile_text').val();
					var _newmobile = /^1\d{10}$/;

					if (newmobile == '') {
						getajax.showmsg('手机号码不能为空');
					} else if (!_newmobile.test(newmobile)) {
						getajax.showmsg('请输入正确的手机号码');
					} else if (newmobile_code == '') {
						getajax.showmsg('验证码不能为空');
					} else {
						$('.hides').fadeOut(100);
						getupdateuser(nm);
					}

					//return false;

				} else if (nm == 'email') {
					var newemail = $('#_email').val();
					var newemail_code = $('#verify_text').val();
					var _newemail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

					if (newemail == '') {
						getajax.showmsg('邮箱号码不能为空');
					} else if (!_newemail.test(newemail)) {
						getajax.showmsg('请输入正确的邮箱号码');
					} else if (newemail_code == '') {
						getajax.showmsg('验证码不能为空');
					} else {
						$('.hides').fadeOut(100);
						getupdateuser(nm);
					}

					//return false;
				} else {
					$('.hides').fadeOut(100);
					getupdateuser(nm);
				}

			});
		}, 500);
	});
	$('.hidedetils').click(function() {
		if (isclick === false) {
			isclick = true;
			setTimeout(function() {
				isclick = false;
			}, 500);
			$('.hides').fadeOut(100);
		}
	});
	//email倒计时
	function countimeEmail() {
			if (_code < 61 && _code >= 1) {
				_code -= 1;
				$("#code_email").text('' + _code + '秒');
				if (_code == 0) {
					$("#code_email").text('重新获取');
				}
			}
		}
		//mobile倒计时

	function countimeMobile() {
			if (_code1 < 61 && _code1 >= 1) {
				_code1 -= 1;
				$("#code_mobile").text('' + _code1 + '秒');
				if (_code1 == 0) {
					$("#code_mobile").text('重新获取');
				}
			}
		}
		//获取用户信息【_val是city信息】

	function myaccountlist(_val) {
		var _key = getajax.getsessionStorage('_key');
		server = 'index.php';
		params = {
			'act': 'member_index',
			'op': 'information',
			'key': _key
		}
		getajax.getAction(server, params, function(res) {
			console.log('获取用户信息', res);
			if (res['code'] == 200) {
				if(!res['datas']['error']){
					getajax.loadhide();
					var lst = res['datas'];
				pro = lst;
				
				$('#nickname').text(lst['member_nickname']); //昵称
				$('#sex').text(lst['member_sex'] == 1 ? "男" : (lst['member_sex'] == 2 ? "女" : "保密")); //性别
				$('#birthday').text(lst['member_birthday']); //生日
				$('#hobby').text(lst['member_hobby']); //爱好
				$('#truename').text(lst['member_truename']); //真实姓名
				$('#mobile').text(lst['member_mobile']); //手机号
				$('#email').text(lst['member_email']); //邮箱
				if(lst['member_idcard']==null){
					$('#idcard').text(''); //身份证号
				}else{
					$('#idcard').text(lst['member_idcard']); //身份证号
				}
				//$('#idcard').text(lst['member_idcard']); //身份证号
				$('#marriage').text(lst['member_marriage'] == '01' ? "未婚" : (lst['member_marriage'] == '02' ? "已婚" : "保密")); //婚姻状况
				$('#education').text(lst['member_education']); //教育程度
				$('#income').text(lst['member_income']); //月收入
				$('#job').text(lst['member_job']); //所在行业
				$('#regions').text(lst['member_areainfo']); //地区
				$('#address').text(lst['member_address']); //街道地址
				if (_val != undefined) {
					getupdateuser('regions', _val);
				}
				}else{
					getajax.loadhide();
				}
			}
		}, function(error) {
			getajax.loadhide();
		});

	}

	//修改用户信息
	function getupdateuser(ids, _val) {
		htm = '';
		var _key = getajax.getsessionStorage('_key');
		getajax.loadshow();
		server = 'index.php';
		params = {
			'act': 'member_index',
			'op': 'update',
			'key': _key
		};
		var a = $("#btn-" + ids).prevAll();
		var b = $(a).find("input").val();
		if (ids == 'mobile') { //更新手机号
			b = $('#_mobile').val();
			var _mobile_code = $('#_mobile_text').val();
			params['op'] = 'update_mobile';
			params['member_mobile'] = b;
			params['verify_code'] = _mobile_code;
		}
		if (ids == 'email') { //更新邮箱
			b = $('#_email').val();
			var verifyval = $('#verify_text').val();
			params['op'] = 'update_email';
			params['member_email'] = b;
			params['verify_code'] = verifyval;
		}
		if (b != undefined) {
			params['member_' + ids] = b;
		} else if (_txt != '') {
			params['member_' + ids] = _txt;
		}
		var _cty = '';
		if (ids == 'regions') {

			params['member_provinceid'] = _val[0].cid;
			params['member_cityid'] = _val[1].cid;
			if (_val[2] != undefined) {
				params['member_areaid'] = _val[2].cid;
			} else {
				params['member_areaid'] = '';
			}

			$(_val).each(function(k, v) {
				_cty += v['cname'] + ' ';
			});
			params['member_areainfo'] = _cty;
		}
		if (true) {
			getajax.getAction(servers, params, function(res) {
				console.log('修改用户信息', res);
				if (res['code'] == 200) {
					if (!res['datas']['error']) {
						getajax.loadhide();
						getajax.showmsg("修改成功");
						htm = '';
						if (ids == "sex") {
							htm = '男';
							if (_txt == 2) {
								htm = '女';
							}
							if (_txt == 3) {
								htm = '保密';
							}
						} else if (ids == 'marriage') {
							htm = '未婚';
							if (_txt == '02') {
								htm = '已婚';
							} else if (_txt == '03') {
								htm = '保密';
							}
						} else if (ids === 'regions') {
							htm = _cty;
							getajax.removesessionStorage('cityobj');
						} else {
							htm = b;
						}
						$("#" + ids).text(htm);
					} else {
						getajax.loadhide();
						getajax.showmsg(res['datas']['error']);
					}

				} else {
					getajax.loadhide();
					getajax.showmsg("修改失败");
				}
			}, function(error) {});
		}
	}


	var IstotalPage = false;
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有


	function loaded(index) {
		myScroll = new iScroll('iScrollmyaccount', {
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
		bInitScorll = 0;
		reScroll(index);
		getajax.loadshow();
		var cityobj = getajax.getsessionStorage('cityobj');
		console.log(cityobj);
		if (cityobj != '') {
			_citys = cityobj;
			console.log(cityobj);
			pro['regions'] = _citys['Province_id'] + "," + _citys['city_id'] + "," + _citys['Aera_id'];
			pro['regions_txt'] = _citys['Province_name'] + "," + _citys['city_name'] + "," + _citys['Aera_name'];
			$("#regions").text(pro['regions_txt']).attr("ids", pro['regions']);
			myaccountlist(cityobj);
		} else {
			
			myaccountlist();
		}
	}

	return {
		start: start
	}
})();
window.myaccount.start();