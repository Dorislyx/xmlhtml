
window.myinvoice=(function(){
	var server = '',
		_key='',
		htm = '',
		hasmore=false,//表示是否存在下一页
		params = {};
	$('.invoice-head').click(function() {
		window.location.href='../order/Invoice.html';
	});
//	$('#myinvlist>li').click(function(){
//		$('#myinvlist>li').removeClass('selected').addClass('selected');
//	});
//	
	//获取发票列表
	function getvoice(){
		var _key = getajax.getsessionStorage('_key');
		server ='index.php';
		params ={
			'act':'member_invoice',
			'op':'invoice_list',
			'key':_key
		};
		getajax.getAction(server,params,function(res){
			console.log('获取发票列表',res);
			if(res['code']==200){
				if(!res['datas']['error']){
				getajax.loadhide();
				hasmore = res['hasmore'];
				var lst = res['datas']['invoice_list'];
				htm ='';
				$(lst).each(function(k,v){
					if(k==0){
					htm+='<li id="no"><span></span>不需要发票</li>';	
					}
					htm+='<li id="'+v['inv_id']+'"><span></span>'+v['inv_title']+'</li>';
					
				});
				
				//动态创建内容
				$('#myinvlist').empty().append(htm);
				
				//点击发票抬头当前发票被选中
				$('#myinvlist>li').click(function(){
					$(this).addClass('selected').siblings().removeClass('selected');
				});
				
				//点击确定如果有发票抬头被选中就返回上一级页面
				$('.sure').click(function(){
						var selected=$('.selected');
						if(selected){
							var ids=$('.selected').attr('id');
							if(ids=='no'){
								getajax.removesessionStorage('myinvlist');
							}
							//循环发票列表数据
							$(lst).each(function(k,v){
								//判断当前选择的发票星星是否与发票列表信息相对应
								if(v['inv_id']==ids){
									//保存当前完整的发票信息
									getajax.setsessionStorage('myinvlist',v);
								}
							});
						
							history.back();
						}else{
							getajax.showmsg('请选择发票类型');
						}
				});
				
				//删除发票
				$(".del").click(function(){
					getajax.loadshow();
					var id=$(".selected").attr("id");
					server = 'index.php';
					params = {
						'act':'member_invoice',
						'op':'invoice_del',
						'inv_id':id,
						'key':_key
					}
					getajax.getAction(server,params,function(res){
						console.log('删除',res);
						if(res['datas']==1){
							getajax.loadhide();
							getajax.showmsg('删除成功');
							$('#myinvlist').empty();
							getvoice();
						}else{
							getajax.loadhide();
							getajax.showmsg('请选择发票类型');
						}
					},function(error){
						getajax.loadhide();
					});
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


	function loaded(index) {
		myScroll = new iScroll('iScrollmyinvoice', {
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

	function start(index){
		getajax.loadshow();
		bInitScorll = 0;
		reScroll(index);
		getvoice();
	}
	return{
		start:start
	}
})();
window.myinvoice.start();	