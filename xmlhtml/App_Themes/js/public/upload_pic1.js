window.uploads1=(function() {
	var temp = {};
	var _key=getajax.getsessionStorage('_key');
		// 事件绑定

	function uploadimg1(ids,type) {
		temp.imgid = ids;
		pictureSourceStatus=type;
		if(type==1){//拍照
			getajax.showmsg('type1');
			EditImgPz().then(uploadPicture).then(deletePictureFromCache);
		}else{//相册
			getajax.showmsg('type2');
			fromCamera().then(uploadPicture).then(deletePictureFromCache);
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
	function fromCamera() {
		getajax.showmsg('fromCamera');
		var deferred = when.defer();
		var pictureSource = navigator.camera.PictureSourceType;
		var source = pictureSource.PHOTOLIBRARY;
		var destinationType = navigator.camera.DestinationType;
		navigator.camera.getPicture(function(imageData) {
			deferred.resolve(imageData);
		},null, {
			quality: 50,
			destinationType: destinationType.FILE_URI,
			sourceType: source
		});
		return deferred.promise;
	}

	// 打开摄像头拍照
	function EditImgPz() {
		getajax.showmsg('EditImgPz');
		var deferred = when.defer();
		navigator.camera.getPicture(function(imageData) {
			deferred.resolve(imageData);
		},null, {
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

//	var count=3;//共有三张图片上传
//	var tcount=1;//当前上传的图片
	
	// 上传图片到服务器
	function uploadPicture(imageURI) {
		getajax.showmsg('上传图片到服务器');
		var deferred = when.defer(),
		newDate = new Date(),
		options = new FileUploadOptions(),
		imgName = pictureSourceStatus === 1 ? imageURI.substring(imageURI.lastIndexOf("/") + 1) : newDate.getTime() + ".jpg";
		options.fileKey = "pic";
		options.fileName = imgName;
		options.mimeType = "image/jpeg";
		options.chunkedMode = false;
		var ft = new FileTransfer();
		ft.onprogress = showUploadingProgress;
		//getajax.MyAlert(imageURI);
		navigator.notification.progressStart("", "当前上传进度");
//		$('#hide>img').attr('src',imageURI);
//		var _width=$('#hide>img').width();
//		var _height=$('#hide>img').height();
//		getajax.MyAlert(_width);
//		getajax.MyAlert(_height);
//		getajax.MyAlert(_width>_height);
//		if(_width>_height){
//			$('#'+temp.imgid).css('height','100%');
//		}else{
//			$('#'+temp.imgid).css('width','100%');
//		}
		// 上传回调
		//var url = getAjax.sus+'User/Photo?u_id=' + u_id;
		var url="http://xlm.nullsw.com/mobile/index.php?act=member_index&op=upload_head&key="+_key;
		ft.upload(imageURI, encodeURI(url), function(r) {
			
			var tmpimg = new Image();
			tmpimg.src = imageURI;
			tmpimg.onload=function(){
				var tw = tmpimg.width;
				var th = tmpimg.height;
				//getajax.MyAlert(tw);
				//getajax.MyAlert(th);
				//getajax.MyAlert(tw > th);
				if(tw > th){
					$('#'+temp.imgid).css('height','100%');
				}else{
					$('#'+temp.imgid).css('width','100%');
				}
			};
			
			$('#'+temp.imgid).attr("src", imageURI);
			//getajax.MyAlert(JSON.stringify(r));
			deferred.resolve(imageURI);
			navigator.notification.progressStop();
		},null, options);
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
		window.resolveLocalFileSystemURI(fileURI, function(fileEntry) {
			fileEntry.remove();
		}, null);
	}
	/*// 显示上传进度
    function showUploadingProgress( progressEvt ){
    	
      var a= Math.round( ( progressEvt.loaded / progressEvt.total ) * 100);
      $("#back").text(a);
    }*/
	function start(){
		
	}
	return{
		start:start,
		uploadimg1:uploadimg1
	};
})();
window.uploads1.start();
