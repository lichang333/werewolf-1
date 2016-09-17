var player_list = (function(){


	function init(){
		bindEvent();
	}

	function bindEvent(){
		// 头像选择
		$("#avatar").on("click", function(){
			navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
			    destinationType: Camera.DestinationType.FILE_URI });

			function onSuccess(imageURI) {
			    var image = $("#avatar_img").get(0);
			    image.src = imageURI;
			}

			function onFail(message) {
			    alert('Failed because: ' + message);
			}
		});

		// 登陆按钮
		var $addBtn = $("#player_add");
		$addBtn.on("click", function(e){
			e.preventDefault();
			alert("功能开发中");
		});

		// 删除按钮
		var $deletBtn = $("#player_delete");
		$deletBtn.on("click", function(e){
			e.preventDefault();

			if(confirm("确定要删除么?")){
				console.log("删除");
			}else {
				console.log("取消删除");
			}
		});
	}

	return {
		init: init
	}

})();
