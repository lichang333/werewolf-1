var player_list = (function(){


	function init(){

		initTable();

		bindEvent();
	}

	function initTable(){
		var players = common.props.players;
		drawTable(players);
	}

	function drawTable(players){
		var $table = $(".player_list table");
		players.forEach(function(playerItem){
			var $tr = $("<tr></tr>");

			// thumbnail
			var $img = $("<img/>");
			$img.attr("src", playerItem.thumbnail);
			$("<td class='img'></td>").append($img).appendTo($tr);;

			// name
			$("<td class='name'></td>").text(playerItem.name).appendTo($tr);

			// nick
			$("<td class='nick'></td>").text(playerItem.nick).appendTo($tr);

			// self_introduce
			// var self_introduce_html = playerItem.self_introduce;
			// $("<td class='self_introduce'></td>").text(self_introduce_html).appendTo($tr);

			// delete button
			var $button = $("<button class='glyphicon glyphicon-remove noBackground' data-name='" + playerItem.name +"'></button>");
			$("<td class='deleteBtn'></td>").append($button).appendTo($tr);


			$tr.appendTo($table);
		})
	}

	function bindEvent(){

		// 【新玩家】按钮
		$("#newPlayerBtn").on("click", function(e){
			e.preventDefault();
			common.loadPage("player");
		});


		// 删除按钮
		$(".player_list table").on("click", "button", function(e){
			e.preventDefault();
			var $button = $(this);
			var playerName = $button.attr("data-name");

			if(confirm("确定要删除么 ？")){
				doDelete(playerName, function(){
					$button.closest("tr").remove();
					common.initPlayers();
				});
			}else{
			}

		});
	}

	function doDelete(playerName, callback){
		common.majax("/players", {
			method: "delete",
			data: {
				"playerName": playerName
			}
		}).then(function(){
			callback();
		},function(e){
			alert(e.statusText);
		});

	}

	return {
		init: init
	}

})();
