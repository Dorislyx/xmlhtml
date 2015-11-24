

window.updatePwd=(function(){
	var server='',
		//uname=getajax.getsessionStorage('uname'),
		_key=getajax.getsessionStorage('_key'),
		params={};
	//点击修改密码
	$('#login-btn1').click(function(){
		
		//var uname=$('#uname').val();
		var oldpwd=$('#oldpwd').val();
		var newpwd1=$('#newpwd1').val();
		var newpwd2=$('#newpwd2').val();
		var _pwd=/^[a-z0-9_-]{6,18}$/;
//		if(uname==''){
//			getajax.loadhide();
//			getajax.showmsg('账号不能为空');
//		}else if(oldpwd==''){
		if(oldpwd==''){
			//getajax.loadhide();
			getajax.showmsg('旧密码不能为空');
		}else if(!_pwd.test(oldpwd)){
			getajax.showmsg('密码为6-18位数字或字母');
		}else if(newpwd1==''){
			//getajax.loadhide();
			getajax.showmsg('新密码不能为空');
		}else if(!_pwd.test(newpwd1)){
			getajax.showmsg('密码为6-18位数字或字母');
		}else if(oldpwd==newpwd1){
			getajax.showmsg('新密码不能与旧密码相同');
		}else if(!_pwd.test(newpwd2)){
			getajax.showmsg('密码为6-18位数字或字母');
		}else if(newpwd2==''){
			//getajax.loadhide();
			getajax.showmsg('再次输入不能为空');
		}else{
			getajax.loadshow();
			server='index.php';
			params={
				'act':'member_index',
				'op':'change_password',
				'key':_key,
				//'account':uname,
				'old_pwd':oldpwd,
				'new_pwd':newpwd1,
				'cfm_pwd':newpwd2
			}
			getajax.getAction(server,params,function(res){
				console.log('修改密码',res);
				if(res['code']==200){
					if(res['datas']==1){
						getajax.loadhide();
						getajax.showmsg('修改密码成功');
						window.location.href='userindex.html';
					}else{
						getajax.loadhide();
						getajax.showmsg(res['datas']['error']);	
					}
				}
			},function(error){
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
		myScroll = new iScroll('iScrollupdatePwd', {
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
		bInitScorll=0;
		reScroll(index);
	}
	
	return{
		start:start
	}
})();
window.updatePwd.start();