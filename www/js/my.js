var my = (function(){

_playerRateMap = null;

function init(){
	initStatisticTable();
	bindEvent();
}

function initStatisticTable(){
	getBattleInfo(function(battleInfoArr){
		var playerRateMap = getPlayerRateMap(battleInfoArr);
		_playerRateMap = playerRateMap;


		var displayList = getDisplayList();
		drawTable(displayList);
	});
}

function getBattleInfo(callback){
	common.majax("/battles", {
		method: "get"
	}).then(function(result){
		if(callback){
			callback(result)
		}
	}, function(e){
		alert("error", e);
	});
}

function getPlayerRateMap(battleInfoArr){

	var retMap = {}

	$.each(battleInfoArr, function(_, battleInfo){
		var victory = battleInfo.victory;
		var infos = battleInfo.infos;

		for(var i =0; i< infos.length; i++){
			var infoItem = infos[i];
			var role = infoItem.role;
			var names = infoItem.names;
			for(var j = 0; j < names.length; j++){
				var nameItem = names[j];

				if(!retMap[nameItem]){
					retMap[nameItem] = {}
					retMap[nameItem]["total"] = 0;
					retMap[nameItem]["total_win"] = 0;
				}

				if(!retMap[nameItem][role]){
					retMap[nameItem][role] = 0;
					retMap[nameItem][role + "_win"] = 0;
				}


				retMap[nameItem][role] += 1;
				if(isWinner(victory, role)){
					retMap[nameItem]["total_win"] += 1;
					retMap[nameItem][role + "_win"] += 1;
				}
				retMap[nameItem][role + "_rate"] = (retMap[nameItem][role + "_win"] / retMap[nameItem][role]).toFixed(2);

				retMap[nameItem]["total"] += 1;
				retMap[nameItem]["total_rate"] = (retMap[nameItem]["total_win"] / retMap[nameItem]["total"]).toFixed(2);
			}
		}
	});

	return retMap;
}

function getDisplayList(){
	var roleSelect = $(".my .roleSelect label.active").attr("data-name");
	var order = $(".my .order label.active").attr("data-order");

	// console.log(roleSelect, order);

	var displayArr = [];
	for(var key in _playerRateMap){
		var displayInfo = {};
		var rateMap = _playerRateMap[key];
		for(var roleKey in rateMap) {
			if(roleKey == roleSelect) {
				displayInfo["name"] = key;
				displayInfo["thumbnail"] = getPlayerImgByName(key);
				displayInfo["total"] = rateMap[roleKey];
				displayInfo["win"] = rateMap[roleKey+ "_win"];
				displayInfo["rate"] = rateMap[roleKey+ "_rate"];
				displayArr.push(displayInfo);
			}
		}
	}

	var orderPlus = order == "asc" ? 1 : -1;
	displayArr.sort(function(infoA, infoB){
		var rateA = infoA.rate;
		var rateB = infoB.rate;
		if(rateA == rateB){
			return 0;
		}else {
			return rateA > rateB ? (1 * orderPlus) : (-1 * orderPlus)
		}
	});

	return displayArr;
}

function drawTable(displayList){
	var $tbody = $(".my table tbody");
	$tbody.empty();
	var $tr = null;

	$.each(displayList, function(_, displayItem){
		$tr = $("<tr></tr>")
		var $playerImg = $('<img/>');
		$playerImg.attr("src", displayItem.thumbnail);
		$("<td class='player_thumbnail'></td>").append($playerImg).appendTo($tr);
		$("<td class='player_name'></td>").text(displayItem.name).appendTo($tr);
		$("<td class='total'></td>").text(displayItem.total).appendTo($tr);
		$("<td class='rate'></td>").text(displayItem.rate * 100 + "%").appendTo($tr);
		$tr.appendTo($tbody);
	});
}

function isWinner(victory, role) {
	if (victory == "werewolf") {
		if (role == "werewolf") {
			return true;
		} else {
			return false;
		}
	} else {
		if (role == "werewolf") {
			return false;
		} else {
			return true;
		}
	}
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
	$(".my .btn").on("click", function(){
		setTimeout(function(){
			var displayList = getDisplayList();
			drawTable(displayList);
		});

	});
}

return {
	init: init
}

})();