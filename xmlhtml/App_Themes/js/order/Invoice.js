window.invoice = (function() {
	var servers = '',
		params = {},
		htm = '';
	var n = 0;
	var _key = getajax.getsessionStorage('_key');
	
	//发票类型
	$(".teos>a").click(function() {
			$(".teos>a").removeClass("this");
			$(this).addClass("this");
			n = $(this).attr("name");
			if (n == 1) {
				$("#invoice-three").fadeIn(100);
				$("#inv-types").css("display", "none");
				getajax.loadshow();
				getinviceContent();
			} else if (n == 2) {
				$("#invoice-three").fadeIn(100);
				$("#inv-types").css("display", "block");
				$("#invname").replaceWith('<input id="invname" type="text" />'); //发票抬头;//发票抬头
				getajax.loadshow();
				getinviceContent();
			} else {
				$("#invoice-three").fadeOut(100);
			}
			reScroll();
		});
	//点击确定
	$('#btn-invoice').click(function(){
			if(n == 1){
				var oText=$("#invname").val();
				if(oText==""){
					getajax.showmsg('单位名称不能为空');
				}else{
					getajax.loadshow();
					_getInvoice();
				}
			}else if(n == 2){
					var oText1 = $('#invname').val();
					var oText2 = $('#reg-address').val();
					var oText3 = $('#reg-phone').val();
					var oText4 = $('#sbnumber').val();
					var oText5 = $('#depositbank').val();
					var oText6 = $('#banknumber').val();
					if(oText1==""){
						getajax.showmsg('单位名称不能为空');
					}else if(oText2==""){
						getajax.showmsg('注册地址不能为空');
					}else if(oText3==""){
						getajax.showmsg('注册电话不能为空');
					}else if(oText4==""){
						getajax.showmsg('纳税人识别号不能为空');
					}else if(oText5==""){
						getajax.showmsg('开户银行不能为空');
					}else if(oText6==""){
						getajax.showmsg('银行账户不能为空');
					}else{
						var re = /^1\d{10}$/;
						if(!re.test(oText3)){
							getajax.showmsg('注册电话格式不正确');
						}else{
							getajax.loadshow();
							getInvoice();
						}
					}
			}else{
				window.location.href='../my/myinvoice.html';
			}
		});
	//普通发票添加
	function _getInvoice(){
		var inv_title  = $('#invname').val();
		var invContent=$('.this').text();
		server ='index.php';
		params ={
			'act':'member_invoice',
			'op':'invoice_add',
			'inv_state':n,
			'key':_key,
			'inv_title':inv_title,
			'inv_content':invContent
		};
		getajax.getAction(server,params,function(res){
			console.log('获取添加普通发票列表',res);
			if(res['code']==200){
				if(!res['datas']['error']){
					getajax.loadhide();
					getajax.showmsg('添加发票信息成功');
					setTimeout(function(){
						history.back();
					},500);
				}
			}
		},function(error){
			getajax.loadhide();
		});
	}
	//获取添加发票列表
	function getInvoice(){
		var name = $('#invname').val();
		var regAddress = $('#reg-address').val();
		var regPhone = $('#reg-phone').val();
		var sbnumber = $('#sbnumber').val();
		var depositbank= $('#depositbank').val();
		var banknumber= $('#banknumber').val();
		var invContent=$('.this').text();
		server ='index.php';
		params ={
			'act':'member_invoice',
			'op':'invoice_add',
			'inv_state':n,
			'key':_key,
			'inv_company':name,
			'inv_reg_addr':regAddress,
			'inv_reg_phone':regPhone,
			'inv_code':sbnumber,
			'inv_reg_bname':depositbank,
			'inv_reg_baccount':banknumber,
			'inv_content':invContent
		};
		getajax.getAction(server,params,function(res){
			console.log('获取添加增值发票列表',res);
			if(res['code']==200){
				if(!res['datas']['error']){
					getajax.loadhide();
					getajax.showmsg('添加发票信息成功');
					setTimeout(function(){
						history.back();
					},500);
				}
			}
		},function(error){
			getajax.loadhide();
		});
	}
	function getinviceContent(){
		//var _key = getajax.getsessionStorage('_key');
		server ='index.php';
		params ={
			'act':'member_invoice',
			'op':'invoice_content_list',
			'key':_key
		};
		getajax.getAction(server,params,function(res){
			console.log('获取发票内容列表',res);
			if(res['code']==200){
				if(!res['datas']['error']){
					getajax.loadhide();
					hasmore = res['hasmore'];
					var lst = res['datas']['invoice_content_list'];
					htm ='';
					$(lst).each(function(k,v){
						if(k==0){
							htm+='<a class="this"><i></i>'+lst[k]+'</a>';
						}else{
							htm+='<a><i></i>'+lst[k]+'</a>';
						}
						
					});
					$("#seos").empty().append(htm);
					//发票当前内容选中
					$('#seos a').click(function(){
						$(this).addClass('this').siblings().removeClass('this');
					});
				}
				
			}
		},function(error){
			getajax.loadhide();
		});
	}
	
	var IstotalPage = false;
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有
	function loaded(idx) {
		myScroll = new iScroll('iScrollInvoice', {
			useTransition: true,
			vScrollbar: false,
			topOffset: pullDownOffset,
			onRefresh: function() {},
			onScrollMove: function() {},
			onScrollEnd: function() {}
		});
	}

	var loadScroll = null;
	var loadScrollRefresh = null;

	function reScroll(idx) {
			if (bInitScorll === 0) {
				loadScroll = setTimeout(function() {
					loaded(idx);
					bInitScorll = 1;
				}, 300)
			} else {
				loadScrollRefresh = setTimeout(function() {
					myScroll.refresh();
				}, 300);
			}
		}
	
	function start(idx) {
		bInitScorll=0;
		reScroll(idx);
		 
	}
	return {
		start: start
	};
})();
window.invoice.start();