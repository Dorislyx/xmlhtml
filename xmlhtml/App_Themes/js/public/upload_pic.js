window.uploads = (function() {
	var temp = {};
	var opt = {};
	var tcount = 0; //当前商品下的第tcount张图片
	var pcount = 0; //总图片集合下的地pcount商品集合
	var sumtcount = 0; //当前商品下的片总张数
	var sumpcount = 0; //商品下的总个说
	var uploadimglist = []; //转换后的需要上传的图片集合
	//var _key=getajax.getsessionStorage('_key');
	//var oid=getajax.getQueryString('id');
	// 事件绑定

//参数：cla:是什么？ids:商品id,type:类型
	function uploadimg(cla,ids, type) {
		//判断商品id为ids的图片集合师傅存在
		if (opt[ids] == undefined) {
			//说明不存在，创建一个集合
			opt[ids] = [];
		}
		temp.imgid = ids;
		pictureSourceStatus = type;
		if (type == 1) { //拍照
			EditImgPz(ids);///.then(uploadPicture);
			//EditImgPz().then(uploadPicture).then(deletePictureFromCache);
			//uploadPicture.then(deletePictureFromCache);
		} else { //相册
			fromCamera(ids);//.then(uploadPicture);
			//fromCamera().then(uploadPicture).then(deletePictureFromCache);
			//uploadPicture.then(deletePictureFromCache);
		}
	}
	var pictureSource; //图片来源
	var destinationType; //返回的图片数据格式
	var pictureSourceStatus = 0; //0来自相册，1来自拍照
	document.addEventListener("deviceready", onDeviceReady, false);

	function onDeviceReady() {
		pictureSource = navigator.camera.PictureSourceType;
		destinationType = navigator.camera.DestinationType;
	}



	//相册选择上传
	function fromCamera(ids) {
		/*
		var imgs='D:\\object\\限量卖\\xlmhtml\\App_Themes\\img\\aq.png';
		opt[ids].push(imgs);
			var spans = $('.' + ids + ' .project_decoration>span').length;
			var htn = '<span><img id="' + ids + '' + spans + '" style="width:100%;" src="'+imgs+'"/></span>';

			console.log(spans);
			if (spans <= 3) {
				$('.' + ids + ' .project_decoration').prepend(htn);
			}

		
		return false;*/
		
		var deferred = when.defer();
		var pictureSource = navigator.camera.PictureSourceType;
		var source = pictureSource.PHOTOLIBRARY;
		var destinationType = navigator.camera.DestinationType;
		navigator.camera.getPicture(function(imageData) {
			opt[ids].push(imageData);//往当前的商品图片集合报存图片
			var spans = $('.' + ids + ' .project_decoration>span').length;
			var htn = '<span><img id="' + ids + '' + spans + '" style="width:100%; border:0;" src="'+imageData+'"/></span>';

			console.log(spans);
			if (spans <= 3) {
				$('.' + ids + ' .project_decoration').prepend(htn);
			}
			deferred.resolve(imageData);
		}, null, {
			quality: 50,
			destinationType: destinationType.FILE_URI,
			sourceType: source
		});
		return deferred.promise;
	}

	// 打开摄像头拍照
	function EditImgPz(ids) {
		/*var imgs='D:\\object\\限量卖\\xlmhtml\\App_Themes\\img\\aq.png';
		opt[ids].push(imgs);
			var spans = $('.' + ids + ' .project_decoration>span').length;
			var htn = '<span><img id="' + ids + '' + spans + '" style="width:100%;" src="'+imgs+'"/></span>';

			console.log(spans);
			if (spans <= 3) {
				$('.' + ids + ' .project_decoration').prepend(htn);
			}
		
		return false;*/
		
		var deferred = when.defer();
		navigator.camera.getPicture(function(imageData) {
			opt[ids].push(imageData);
			var spans = $('.' + ids + ' .project_decoration>span').length;
			var htn = '<span><img id="' + ids + '' + spans + '" style="width:100%;" src="'+imageData+'"/></span>';

			console.log(spans);
			if (spans <= 3) {
				$('.' + ids + ' .project_decoration').prepend(htn);
			}
			deferred.resolve(imageData);
		}, null, {
			quality: 50,
			destinationType: navigator.camera.DestinationType.FILE_URI,
			sourceType: Camera.PictureSourceType.CAMERA,
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: true
		});
		return deferred.promise;
	}


	var tcount = 0; //当前上传的图片
	var imglst = []; //收藏图片的集合
	var count = imglst.length; //共有三张图片上传
	// 上传图片到服务器
	function uploadPicture(imageURI) {}

	function _upimg(oid, back_url, _server) {
		/*opt = {
			'1001':['a1.png','b1.png','c1.png'],
			'1002':['a2.png','b2.png','c2.png'],
			'1003':['a3.png','b3.png','c3.png'],
			'1004':['a4.png','b4.png','c4.png']
		};*/
		temp.url = back_url; //回调url
		temp._server = _server;
		for (var i in opt) {
			uploadimglist.push({
				'key': i,
				'value': opt[i]
			});
		}
		if (uploadimglist.length == 0) {
			//没有提交晒图
			window.location.href = temp.url;
		} else {
			//有提交晒图
			sumpcount = uploadimglist.length;
			imglistsum();
		}
	}

	function imglistsum() {
		var thisimglist = uploadimglist[pcount]; //当前第pcount商品下的图片集合
		var timgcount = thisimglist.value;
		temp.server = temp._server + thisimglist.key; //当前商品的id
		sumtcount = timgcount.length;
		upimg(timgcount[tcount], timgcount);
	}

	function upimg(_url) {
		
		/*if (tcount < sumtcount && pcount < sumpcount) {
				tcount += 1;
				imglistsum();
				//upimg(timgcount[tcount]);//.then(deletePictureFromCache);
			} else if (tcount >= sumtcount && pcount < sumpcount-1) {
				pcount += 1; //当前评论的商品往下推一个
				tcount = 0; //当前商品的图片设置成地一个
				imglistsum();
			} else if (pcount >= sumpcount-1 ) {
				setTimeout(function() {
					window.location.href = temp.url;
				}, 500);
			}
		
		return false;*/
		
		var deferred = when.defer(),
			newDate = new Date(),
			imgName = pictureSourceStatus === 1 ? _url.substring(_url.lastIndexOf("/") + 1) : newDate.getTime() + ".jpg";
		var options = new FileUploadOptions();
		options.fileKey = "pic";
		options.fileName = imgName;
		options.mimeType = "image/jpeg";
		options.chunkedMode = false;
		var ft = new FileTransfer();
		ft.onprogress = showUploadingProgress;
		navigator.notification.progressStart("", '当前上传进度:' + (tcount + 1) + '/' + sumtcount);
		//--------------------------------------------------119---------------------------------------
		// 上传回调
		//var url = getAjax.sus+'User/Photo?u_id=' + u_id;
		ft.upload(_url, encodeURI(temp.server), function(r) {
			
			deferred.resolve(_url);
			navigator.notification.progressStop();
			alert(JSON.stringify(r));
			//alert(tcount);
			//alert(imglst.length);
			if (tcount < sumtcount && pcount <= sumpcount) {
				tcount += 1;
				imglistsum();
				//upimg(timgcount[tcount]);//.then(deletePictureFromCache);
			} else if (tcount >= sumtcount && pcount < sumpcount-1) {
				pcount += 1; //当前评论的商品往下推一个
				tcount = 0; //当前商品的图片设置成地一个
				imglistsum();
			} else if (pcount >= sumpcount-1 ) {
				setTimeout(function() {
					window.location.href = temp.url;
				}, 500);
			}
			//alert(tcount);
			//alert(imglst.length);
			//alert(tcount==imglst.length-1);
			//alert(temp.url);
			/*if (tcount == z.length - 1) {
				navigator.notification.progressStop();
				setTimeout(function() {
					window.location.href = temp.url;
				}, 500);
			}*/
		}, null, options);
		return deferred.promise;
	}

	// 显示上传进度
	function showUploadingProgress(progressEvt) {
		if (progressEvt.lengthComputable) {
			navigator.notification.progressValue(Math.round((progressEvt.loaded / progressEvt.total) * 100));
		}
	}

	// 从缓存中删除图片
	function deletePictureFromCache(imageURI) {
			var zz = imglst[tcount];
			window.resolveLocalFileSystemURI(fileURI, function(zz) {
				fileEntry.remove();
			}, null);
		}
		/*// 显示上传进度
    function showUploadingProgress( progressEvt ){
    	
      var a= Math.round( ( progressEvt.loaded / progressEvt.total ) * 100);
      $("#back").text(a);
    }*/

	function start() {

	}
	return {
		start: start,
		uploadimg: uploadimg,
		_upimg: _upimg,
		opt: opt
	};
})();
window.uploads.start();