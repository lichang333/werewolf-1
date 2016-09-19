(function() {


var ThumbnailUploader = function(baseDom, options) {

	this.baseDom = baseDom;
	options = $.extend(ThumbnailUploader.defaults, options);
	this.uploader = null;
	this.canvas = null;

	this.postCreate(options);
	this.startup(options);
	this.baseDom.data("thumbnailUploader", this);
}


ThumbnailUploader.prototype = {

	constructor: ThumbnailUploader,

	postCreate: function(options) {
		this.baseDom.wrap("<div class='thumbnailUploaderContainer'></div>");
		var container = this.baseDom.closest("div");

		// create canvas
		var thumbnailWidth = options.thumbnailWidth;
		var thumbnailHeight = options.thumbnailHeight;
		var c = document.createElement("canvas");
		c.width = thumbnailWidth;
		c.height = thumbnailHeight;
		c.style.display = 'none';
		this.canvas = $(c).appendTo(container);

		if (common.props.device) {
		} else {
			// browser的时候，需要input type=file来上传文件
			this.baseDom.hide();
			this.uploader = $("<input type=\"file\" class='.file'/>").appendTo(container);
		}

	},

	startup: function() {
		// bind event
		if (common.props.device) {
			this.androidUploaderInit();
		} else {
			this.browserUploaderInit();
		}
	},

	androidUploaderInit: function(){
		navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
		    destinationType: Camera.DestinationType.FILE_URI });

		function onSuccess(imageURI) {
		    canvasOut(imageURI);
		}

		function onFail(message) {
		    // alert('Failed because: ' + message);
		}
	},

	browserUploaderInit: function(){
		var fileUploader = this.uploader;
		fileUploader.on("change", $.proxy(function() {
			file = fileUploader[0].files[0];

			var fr = new FileReader();
			$(fr).on("load", $.proxy(function(e) {
				var dataURL = e.target.result;
				this.canvasOut(dataURL);
			}, this));
			fr.readAsDataURL(file);
		}, this));
	},

	canvasOut: function(dataURL) {
		var c = this.canvas[0];
		var context = c.getContext("2d");
		var canvasWidth = c.width;
		var canvasHeight = c.height;
		var img = new Image();
		img.src = dataURL;
		$(img).on("load", $.proxy(function() {
			// calc width, height
			var w = img.width;
			var h = img.height;
			wh = this.calcWidthHeight(w, h, canvasWidth, canvasHeight);

			// draw picture to canvas and get image dataURL
			context.drawImage(img, 0, 0, wh.w, wh.h);
			var canvasImg = c.toDataURL("image/png");

			// create preview image
			var preViewImg = new Image();
			preViewImg.src = canvasImg;
			$(preViewImg).insertAfter(this.canvas);
		}, this));
	},


	calcWidthHeight: function(w, h, maxWidth, maxHeight) {
		var wZoomRate = 1;
		var hZoomRate = 1;
		if (w > maxWidth) {
			wZoomRate = maxWidth / w;
		}
		if (h > maxHeight) {
			hZoomRate = maxHeight / h;
		}

		var rate = wZoomRate < hZoomRate ? wZoomRate : hZoomRate;
		return {
			"w": parseInt(w * rate, 10),
			"h": parseInt(h * rate, 10)
		}
	},

	apis: {
		getDataURL: function(){
			return this.canvas[0].toDataURL().toString();
		}
	}

}

ThumbnailUploader.defaults = {

}

$.fn.thumbnailUploader = function(options) {
	if (typeof options === "string") {
		
		// 调用api
		var allArgs = Array.prototype.slice.call(arguments);
		var apiMethodName = allArgs.shift();
		var args = allArgs;
		var comp = this.data("thumbnailUploader");
		return ThumbnailUploader.prototype.apis[apiMethodName].apply(comp,args);
	} else if (this.data("thumbnailUploader")) {

		// 已经初始化了，什么都不做
	} else {
		
		// 初始化组件
		new ThumbnailUploader(this, options);
	}
}


})();