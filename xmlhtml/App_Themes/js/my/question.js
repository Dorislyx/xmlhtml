window.myquestion=(function(){
	var server = '',
		htm = '',
		hasmore=false,//表示是否存在下一页
		oid = getajax.getQueryString('id'),
		ctid='',
		params = {};
	
		
	//获取咨询类型	
	function getzxlx(){
		server ='index.php';
		params ={
			'act':'goods',
			'op':'get_consult_type'
			};
			getajax.getAction(server,params,function(res){
			console.log('获取咨询类型',res);
			if(res['code']==200){
				if(!res['datas']['error']){
				getajax.loadhide();
				 hasmore = res['hasmore'];
				 var zxlx= res['datas'];
				 
				$('.question_tab').text(zxlx[1]['ct_name']);
				$('.question_tab').attr('id',zxlx[1]['ct_id']);
				ctid=zxlx[1]['ct_id'];
				 htm+='<li id="'+zxlx[2]['ct_id']+'">'+zxlx[2]['ct_name']+'</li>';
				 htm+='<li id="'+zxlx[3]['ct_id']+'">'+zxlx[3]['ct_name']+'</li>';
				 htm+='<li id="'+zxlx[4]['ct_id']+'">'+zxlx[4]['ct_name']+'</li>';
					 
				$('.question_type>div ul').empty().append(htm);
				$('.question_tab').click(function(){
						$(this).parent().find('ul').toggleClass('show');
				});
				//点击咨询类型并交换内容和ct_id 
				$('.question_type ul>li').click(function(){
					var id=$(this).attr('id');
					var id1=$('.question_tab').attr('id');
					var val=$(this).text();
					var val1=$('.question_tab').text();
					$('.question_tab').text(val);
					$(this).text(val1);
					$(this).attr('id',id1);
					$('.question_tab').attr('id',id);
					ctid=$('.question_tab').attr('id');	//获取当前所选中咨询类型的ct_id
					$('.question_type>div ul').removeClass('show');
				});
				//提交咨询内容
				$('.question_btn').click(function(){
					if($('.zxnr').val()==""){
						getajax.showmsg('请输入咨询内容');
					}else{
						getajax.loadshow();
						getmyquestion();
					}
				});
				}
			}
		},function(error){});
	}
	
	//发表咨询	
	function getmyquestion(){
			var _key = getajax.getsessionStorage('_key');
			var con=$('.zxnr').val();
			server ='index.php';
			params ={
				'act':'member_index',
				'op':'save_consult',
				'goods_id':oid,
				'consult_type_id':ctid,//在此接收所获取的ct_id
				'goods_content':con,
				'key':_key
			};
			getajax.postAction(server,params,function(res){
				console.log('获取发表咨询',res);
				if(res['code']==200){
					if(res['datas']==1){
						getajax.loadhide();
						getajax.showmsg('发表咨询成功',res);
						setTimeout(function(){
							history.back();
						},500);
					}else{
						getajax.loadhide();
						getajax.showmsg(res['datas']['error']);
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
		myScroll = new iScroll('iScrollquestion', {
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
		getajax.loadshow();
		bInitScorll=0;
		reScroll(index);
		getzxlx();
		
		
	}
	
	return{
		start:start
	}
})();
window.myquestion.start();