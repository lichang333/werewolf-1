var battle_list = (function(){

function init(){
	initBattleList();
	bindEvent();
}

function initBattleList(){
	common.majax("/battles", {
		methods: "get"
	}).then(function(result){
		drawBattleTable(result);
	}, function(e){
		alert("error", e);
	});
}

function drawBattleTable(battles){
	battles.forEach(function(battleItem){
		var $tr = $("<tr></tr>");

		// createtime
		$("<td class='createtime'></td>").text(battleItem.createtime.substr(0,10)).appendTo($tr);

		// winner
		var victory = battleItem.victory == "werewolf" ? "狼人" : "好人";
		$("<td class='victory'></td>").text(victory).appendTo($tr);

		// players
		var $td = $("<td class='players'></td>");
		for(var i = 0;i< battleItem.infos.length; i++){
			var info = battleItem.infos[i];

			for (var j = 0;j< info.names.length; j++){
				var playerName = info.names[j];
				var base64ImgData = getPlayerImgByName(playerName);
				$('<img src="" alt="" />').attr("src", base64ImgData).appendTo($td);
			}
		}
		$td.appendTo($tr);

		// delete button
		var $button = $("<button class='glyphicon glyphicon-remove noBackground' data-id='" + battleItem._id +"'></button>");
		$("<td class='deleteBtn'></td>").append($button).appendTo($tr);

		$tr.appendTo($(".battle_list table tbody"));
	});
}

function getPlayerImgByName(pName){
	var retData = "";
	var players = common.props.players;
	for(var i =0;i< players.length; i++){
		var p = players[i];
		if(p.name == pName){
			retData = p.thumbnail;
			break;
		}
	}
	return retData;

}

function bindEvent(){
	// new button
	$("#newBattleBtn").on("click",function(){
		common.loadPage("battle");
	});

	// 删除按钮
	$(".battle_list table").on("click", "button", function(e){
		e.preventDefault();
		var $button = $(this);
		var battleId = $button.attr("data-id");

		if(confirm("确定要删除么 ？")){
			doDelete(battleId, function(){
				$button.closest("tr").remove();
			});
		}else{
		}

	});
}

function doDelete(battleId, callback){
	common.majax("/battles", {
		method: "delete",
		data: {
			battleId: battleId
		}
	}).then(function(){
		if(callback){
			callback();
		}
	}, function(e){
		alert(e.statusText);
	})
}

return {
	"init":init
}

})();