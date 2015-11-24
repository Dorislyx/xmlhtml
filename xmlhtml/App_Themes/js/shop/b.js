
window.b=(function(){
	var server = '',
		  bids = getajax.getQueryString('id'),
	   isclick = false,
	   	   htm1='',
	   	   type=1,
		params = {};
	var _key = getajax.getsessionStorage('_key');

		//商品介绍评价之间切换
		$('#detalst>li').click(function() {
		if (isclick == false) {
			isclick = true;
			setTimeout(function() {
				isclick = false;
			}, 500);
			$('#detalst>li').removeClass("this");
			$(this).addClass('this');
			var ids = $(this).attr('name');
			$('.showdetils>li').fadeOut(100);
			$("#" + ids).fadeIn(100);
			reScroll();
		}

	});
	
	//评论之间切换
	$('#pllst>span').click(function(){
		$(this).addClass('this').siblings().removeClass('this');
	});
	$('#pllst>span').eq(0).click(function(){
		getajax.loadshow();
		type='';
		getappriselst(type);
	});
	$('#pllst>span').eq(1).click(function(){
		getajax.loadshow();
		type=1;
		getappriselst(type);
	});
	$('#pllst>span').eq(2).click(function(){
		getajax.loadshow();
		type=2;
		getappriselst(type);
	});
	$('#pllst>span').eq(3).click(function(){
		getajax.loadshow();
		type=3;
		getappriselst(type);
	});
	
	
	//获取商品的属性
	function getproattr(){
		var goods_attr = getajax.getsessionStorage('goods_attr');
		goods_attr=getarrlst(goods_attr);
		htm1='';
		for(var i in goods_attr){
			htm1+='<tr>';
			htm1+='<td style="margin: auto;">'+goods_attr[i]['value']+'</td>';
			htm1+='<td style="margin: auto;">'+goods_attr[i]['key']+'</td>';
			htm1+='</tr>';
		};
		$('.two-detils>tbody').empty().append(htm1);
	}
	
	function getarrlst(obj){
		var lst=[];//定义一个空集合
		for (var i in obj) {
			var _lst=[];
			for (var j in obj[i]) {
			var _key=obj[i][j];
			_lst.push(_key);
			}
			//console.log(_lst);
			lst.push({'key':_lst[0],'value':_lst[1]});
		}
		return lst;
	}

	//获取商品介绍
	function getshopintro(){
		server ='index.php';

		params = {
			'act':'goods',
			'op':'mobile_goods_body',
			'goods_id':bids
		};
		getajax.getAction(server,params,function(res){
			console.log('获取商品介绍',res);
			if(res['code']==200){
				if(!res['datas']['error']){
					getajax.loadhide();
					$('#one-detils').empty().append(res['datas']['goods_body']);
					$('#iScrollb div').find('img').width('100%').css('display','block');;
					$('._left>img').width('14%');
					$('#iScrollb div').find('table').removeAttr('width').css({'padding':'0px'});
					$('#iScrollb div').find('table').removeAttr('width').css({'padding':'auto','padding-left':'auto','margin':'auto'});
					$('#iScrollb div').find('td').removeAttr('width').css({'padding':'auto','padding-left':'auto','margin':'auto'});
					$('#iScrollb div').css('margin','auto').css('width','100%');
					$('.hlg_groupon>div').css('width','95%');
				}
			}
		},function(error){
			getajax.loadhide();
		});
	}
	
	//获取评价列表
	function getappriselst(type){
		server='index.php';
		params={
			'act':'goods',
			'op':'comments_list',
			'goods_id':bids,
			'type':type
		}
		getajax.getAction(server,params,function(res){
			console.log('获取评价列表',res);
			if(res['code']==200){
				if(!res['datas']['error']){
					getajax.loadhide();
					var allcomments=res['datas'];
					$('#allelv>a').eq(1).text(allcomments['all']);
					$('#goodelv>a').eq(1).text(allcomments['good']);
					$('#normalelv>a').eq(1).text(allcomments['normal']);
					$('#badelv>a').eq(1).text(allcomments['bad']);
					var comments_list=res['datas']['comments_list'];
					var htm2='';
					$(comments_list).each(function(k,v){
						htm2+='<li>';
						htm2+='<div>';
						htm2+='<span class="_left">';
						var geval_scores=v['geval_scores'];
						for(var i=0;i<geval_scores;i++){
							htm2+='<img src="../App_Themes/img/star.png">';
						}
						htm2+='</span>';
						htm2+='<span class="_right">'+v['geval_frommembername']+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+getajax.getTime(v['geval_addtime'],'-',false)+' </span>';
						htm2+='</div>';
						htm2+='<div class="pl-txt">'+v['geval_content']+'</div>';
						htm2+='</li>';
					});
					$('#CommentList').empty().append(htm2);
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
		myScroll = new iScroll('iScrollb', {
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

	function start(index,ids) {
		getajax.loadshow();
		bInitScorll=0;
		getshopintro(index,ids);
		getproattr();
		getappriselst();
		reScroll(index);
	}
	
	return{
		start:start
	}
})();
window.b.start();