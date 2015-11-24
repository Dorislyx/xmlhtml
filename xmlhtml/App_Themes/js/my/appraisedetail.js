

window.appraisedetail=(function(){
	var server = '',
	    cla = '',
	    opt={},
		hasmore=false,//表示是否存在下一页
		oid=getajax.getQueryString('id'),
		htm='',
		n=0,
		goods=[],
		val='',
		_score_des=getajax.getsessionStorage('myscore_des'),
		_score_ser=getajax.getsessionStorage('myscore_ser'),
		_score_del=getajax.getsessionStorage('myscore_del'),
		goodslst=getajax.getsessionStorage('goodslst'),
		params = {};
		var _key = getajax.getsessionStorage('_key');
		
		console.log(goodslst);
		//获取商品介绍
		function getgoodsinfo(){
			for(var i in goodslst){
				htm+='<div class="'+i+'">';
				htm+='<div class="appraise_store">';
				htm+='<img src="'+goodslst[i]['goods_image']+'" alt="" width="60" height="60" style="border:0;">';
				htm+='<div>';
				htm+='<p><a>'+goodslst[i]['goods_name']+'</a></p>';
				htm+='</div>';
				htm+='</div>';
				htm+='<div class="project_lst">';
				htm+='<div class="project_decoration">';
				htm+='<span>';
				htm+='<img class="pimg" src="../App_Themes/img/add1.png">';
				htm+='</span>';
				htm+='</div>';
				htm+='</div>';
				htm+='<div class="appraise">';
				htm+='<span>评价 ：</span>';
				htm+='<ul>';
				htm+='<li></li>';
				htm+='<li></li>';
				htm+='<li></li>';
				htm+='<li></li>';
				htm+='<li></li>';
				htm+='</ul>';
				htm+='</div>';
				htm+='<textarea class="appraise_words" placeholder="说点什么吧"></textarea>';
				htm+='</div>';
			}
			$('.goodslst').empty().append(htm);
			
			//添加星星
		$('.appraise>ul>li').click(function(){
			//$('.appraise>ul>li').removeClass('current');
			$(this).parent().children('li').removeClass('current');
			$(this).prevAll('li').addClass('current');
			$(this).addClass('current');
			$(this).addClass('that');
//			n=$(this).index()+1;
//			console.log(n)
		});
		
		//点击添加照片或拍照
 	$('.project_decoration>span').click(function(){
 		cla=$(this).parent().parent().parent().attr('class');
 		console.log(cla);
 		$('span').removeClass('this');
        $('.ulhide').fadeIn(500);
 	});	
	$('.ulhide>li').click(function(){
		$('.ulhide').fadeOut(500);
	});
	//拍照
	$('.takep').click(function(){
		var spans=$('.'+cla+' .project_decoration>span').length;
		console.log(spans);
		$('.ulhide').fadeOut(500);
		$(this).addClass('this');
		
		window.uploads.uploadimg(cla+spans,cla,1);
		
	});
	//相册
	$('.pics').click(function(){
		var spans=$('.'+cla+' .project_decoration>span').length;
		
		$('.ulhide').fadeOut(500);
		$(this).addClass('this');
		
		
		window.uploads.uploadimg(cla+spans,cla,2);
	});	
	
	//提交评价
	$('#appraise_btn').click(function(){
		
			/*var back_url='../order/allorders.html';
					var _server='http://xlm.nullsw.com/mobile/index.php?act=member_evaluate&op=upload_pic&key='+_key+'&order_id='+oid+'&g
					 window.uploads._upimg(oid,back_url,_server);
						
		return false;*/
		
		
		
		
		
		var _that = $('.that').length;
		var shoppro=$('.appraise_store').length;
		console.log(_that);
		if(_that==0){
			getajax.showmsg('请对商品进行评价');
		}else if(_that>0&&_that<shoppro){
			getajax.showmsg('请对所有商品进行评价');
		}else{
			for(var i in goodslst){
				var goodss={};
				var goodsmess={};
				var goodsid='';
				goodsid = $('.'+i).attr('class');
				var score = $('.'+i).find('.that').index()+1;
				var _comment = $('.'+i).find('.appraise_words').val();
				goodsmess['score']=score;
				goodsmess['comment']=_comment;
				goodss[goodsid]=goodsmess;
				goods.push(goodss);
			}
			console.log(goods);
			opt=window.uploads.opt;
			//getajax.showmsg(opt);
			getappraisedetail(opt);
		}
		
		
	});
	
	
	//-----------------------goods格式---------------------------------------
		//goods  [goodsid:{score:2,comment:wer}]
		
	
//	//提交评价
//		$('#appraise_btn').click(function(){
//			if(n==0){
//				getajax.showmsg('请对商品进行评价');
//			}else{
//				getajax.loadshow();
//				val = $('.appraise_words').val();
//				$(goodlst).each(function(k,v){
//					var z={};
//					z[v['goods_id']]={'score':n,'comment':val}
//					//var z={v['goods_id']:{'score':n,'comment':val}};
//					goods.push(z);
//				});
//				getappraisedetail();
//			}
//		});	
//		console.log(goods);
		}
		
		
		
		
	//我要评价晒单接口数据
	function getappraisedetail(opt){
	

		var _key = getajax.getsessionStorage('_key');
		server ='index.php';
		params ={
			'act':'member_evaluate',
			'op':'add',
			'order_id':oid,
			'goods':goods,
			'key':_key,
			'store_desccredit':_score_des,
			'store_servicecredit':_score_ser,
			'store_deliverycredit':_score_del
			};
			
		getajax.getAction(server,params,function(res){
			console.log('我要评价',res);
			if(res['code']==200){
				if(res['datas']==1){
					getajax.loadhide();
					getajax.showmsg('晒单成功');
					console.log()
					var back_url='../order/allorders.html';
					var _server='http://xlm.nullsw.com/mobile/index.php?act=member_evaluate&op=upload_pic&key='+_key+'&order_id='+oid+'&goods_id=';
					/*for(var i in opt){
						var y='http://xlm.nullsw.com/mobile/index.php?act=member_evaluate&op=upload_pic&key='+_key+'&order_id='+oid+'&goods_id='+i;
						 window.uploads._upimg(oid,x,y,opt[i]);
					}*/
					 window.uploads._upimg(oid,back_url,_server);
						
					
				}else{
					getajax.loadhide();
					getajax.showmsg(res['datas']['error']);
				}
			}
		},function(error){});
	}	
	
 			
		
	var IstotalPage = false;
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有
	
	function loaded(index) {
		myScroll = new iScroll('iScrollappraisedetail', {
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
		
		//console.log(opt);
		getgoodsinfo();
		bInitScorll=0;
		reScroll(index);
	}
	
	return{
		start:start
	}
})();
window.appraisedetail.start();