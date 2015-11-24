window.city = (function() {
	var servers = '',
		params = {},
		_key = '',
		_k=0,//表示当前的层几
		cityobj=[],
		_oldcid = '-1', //表示上一个城市id
		cid = '';


			$('span[name=back_city]').click(function() {
				var _pid = $('.city-names').eq(0).attr('pid');
				if (_pid === '-1') {
					var cname='';
					_k=-1;
					getajax._back();
					//index._back();//关闭界面
				} else if(_pid===''){
					cid = _pid;//返回一级城市
					_k=0;
					_oldcid = -1;
					getcitylist();
				}else{//返回二级城市
					cid = _pid;
					_oldcid = '';
					_k=1;
					getcitylist();
				}

			});
		//获取城市列表

	function getcitylist() {
		servers = 'index.php';
		params = {
			'act': 'member_address',
			'op': 'area_list',
			'key': _key,
			'area_id': cid
		};
		getajax.getAction(servers, params, function(res) {
			console.log('获取城市列表', res);
			getajax.loadhide();
			var lst = res['datas']['area_list'];
			if(lst.length==0){
				cityobj.push({'cname':'','cid':cid});
				_backcity();
				history.back();
				return false;
			}
			$(lst).each(function(k, v) {
				if (v['area_name'] == '重庆') {
					v.py = 'C';
				} else {
					var _py = codefans_net_CC2PY(v['area_name']).substring(0, 1);
					v.py = _py;
				}

			})
			var obj=new emptyobj();
			$(lst).each(function(k, v) {
				obj[v.py].push(v);
			});
			console.log(obj);
			var htm = '';
			for (i in obj) {
				if (obj[i].length === 0) {
					continue;
				}
				htm += '<span class="desc">' + i + '</span>';
				for (j in obj[i]) {
					htm += '<span class="city-names" pid="' + _oldcid + '" ids="' + obj[i][j]['area_id'] + '"><a>' + obj[i][j]['area_name'] + '</a></span>';
				}
			}
			$('.city-list').empty();
			$('.city-list').append(htm);
			$('.city-names').click(function() {
				_oldcid = cid;
				cid = $(this).attr('ids');
				var cname=$(this).text();
				cityobj.push({'cname':cname,'cid':cid});
				if(_k==2){
					
					_backcity();
					history.back();
					return false;
				}
				_k+=1;
				console.log(_k);
				getcitylist();
			});
		}, function(error) {
			getajax.loadhide();
		});
	}
	
	function _backcity(){
		getajax.setsessionStorage('cityobj',cityobj);
	}

	function emptyobj() {
		var obj = {
			'A': [],
			'B': [],
			'C': [],
			'D': [],
			'E': [],
			'F': [],
			'G': [],
			'H': [],
			'I': [],
			'J': [],
			'K': [],
			'L': [],
			'M': [],
			'N': [],
			'O': [],
			'P': [],
			'Q': [],
			'R': [],
			'S': [],
			'T': [],
			'U': [],
			'V': [],
			'W': [],
			'X': [],
			'Y': [],
			'Z': []
		}
		return obj;
	}

	var IstotalPage = false;
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var bInitScorll = 0; //iscroll是否被初始化 0：未，1：有


	function loaded(index) {
		myScroll = new iScroll('iScrollcity' , {
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
		cityobj=[];
		cid='';
		_oldcid='-1';
		_k=0;
		_key = getajax.getsessionStorage('_key');
		bInitScorll = 0;
		getcitylist();
		reScroll(index);
	}

	return {
		start: start
	}
})();
window.city.start();