var battle = (function(){

	function init(){

		initPlayList();

		bindEvent();
	}

	function initPlayList(){
		getPlayerListData(function(players){
			$(".battle .roleSelectContainer .players").each(function(_, playerDiv){
				$(playerDiv).playerList({
					"players": players
				})
			});
		});
	}

	function getPlayerListData(callback){
		var playerList = common.props.players;
		callback(playerList);
	}



	function bindEvent(){
		// 保存按钮
		$("#battleSaveBtn").on("click", function(){

			var selectInfo = $(".battle .roleSelectContainer .role").map(function(_, roleDiv){
				var roleName = $(roleDiv).attr("class").replace(" role", "");
				var players = $(roleDiv).find(".players .selected").map(function(_, selectedPlayer){
					return $(selectedPlayer).attr("data-name");
				});
				return {
					"role": roleName,
					"names": players.get()
				}
			});

			var victory = $(".victory label.active").attr("data-name");

			var info = {
				victory: victory,
				infos: selectInfo.get()
			}

			common.majax("/battles", {
				method: "post",
				data: JSON.stringify(info)
			}).then(function() {
				alert("登陆成功");
			}, function(){
				alert("error");
			});
		});

		// 返回按钮
		$(".battle button.back").on("click", function(){
			common.loadPage("battle_list");
		});
	}

	return {
		init: init
	}
})();