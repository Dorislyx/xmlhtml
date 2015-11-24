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
		var source = pictureSource.PHOTOLIBRARY;
		navigator.camera.getPicture(function(imageData) {
			uploadPicture(imageData);
		}, function(message) {
			if (source == pictureSource.CAMERA)
				getAjax.MyAlert('加载照相机出错!' + message);
			else
				getAjax.MyAlert('加载相册出错!' + message);
		}, {
			quality: 50,
			destinationType: destinationType.FILE_URI,
			sourceType: source
		});
	}

	// 打开摄像头拍照
	function EditImgPz() {
		navigator.camera.getPicture(function(imageData) {
			uploadPicture(imageData);
		}, function(message) {
			getAjax.MyAlert(message);
		}, {
			quality: 50,
			destinationType: navigator.camera.DestinationType.FILE_URI,
			sourceType: Camera.PictureSourceType.CAMERA,
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: true
		});
	}

	// 上传图片到服务器
	function uploadPicture(imageURI) {
		var newDate = new Date(),
			options = new FileUploadOptions();
		var imgName = pictureSourceStatus === 1 ? imageURI.substring(imageURI.lastIndexOf("/") + 1) : newDate.getTime() + ".jpg";
		options.fileKey = "file";
		options.fileName = imgName;
		options.mimeType = "image/jpeg";
		options.chunkedMode = false;
		var ft = new FileTransfer();
		ft.onprogress = showUploadingProgress;
		// 上传回调
		/ar url = getAjax.sus+'User/Photo?u_id=' + u_id;
		var url="http://192.168.1.104:8010/Handler.ashx";
		ft.upload(imageURI, encodeURI(url), function(r) {
			$("#uimg").attr("src", imageURI);
			getAjax.MyAlert('上传成功');
		}, function(error) {
			getAjax.MyAlert('上传失败');
		}, options);
	}
