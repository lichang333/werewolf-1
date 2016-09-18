var player_list = (function(){


	function init(){
		bindEvent();
	}

	function bindEvent(){
		// 头像选择
		$("#avatar").thumbnailUploader({
			thumbnailWidth: 100,
			thumbnailHeight: 100
		});

		// 登陆按钮
		var $addBtn = $("#player_add");
		$addBtn.on("click", function(e){
			e.preventDefault();
			
			var playerInfo = {
				"thumbnail": $("#avatar").thumbnailUploader("getDataURL"),
				"name": $("#pName").val(),
				"nick": $("#nick").val(),
				"self_introduce": $("#self_introduce").val()
			}
			alert(JSON.stringify(playerInfo));
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
