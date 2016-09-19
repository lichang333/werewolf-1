var player = (function(){


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
			$.ajax("/players", {
				method: "post",
				data: JSON.stringify(playerInfo)
			}).then(function(result){
				alert("添加成功");
			}, function(){
				alert("error");
			})

		});

		// 返回按钮
		$(".player button.back").on("click", function(e){
			e.preventDefault();
			common.loadPage("player_list");
		});
	}

	return {
		init: init
	}

})();
