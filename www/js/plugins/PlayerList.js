(function($){


var PlayerList = function(divDom, options){
	this.baseDom = divDom;
	this.baseDom.addClass("player_list_comp");
	this.options = options;

	this.postCreate();
	this.startup();
	this.bindEvents();

}

PlayerList.prototype = {
	
	constructor: PlayerList,

	postCreate: function() {
		var players = this.options.players;
		var _baseDom = this.baseDom;
		var _this = this;
		players.forEach(function(playerItem){

			// 创建dom
			var playerItemDiv = $('<div class="playerItem"></div>')
				.attr("data-name", playerItem.name)
				.append($('<img src="" alt="" />').attr("src",playerItem.thumbnail))
				.appendTo(_baseDom);

			// 点击事件
			playerItemDiv.on("click", function(e){
				var playerName = $(this).attr("data-name");
				playerItemDiv.toggleClass("selected");
				if(playerItemDiv.hasClass("selected")){
					$(".battle .roleSelectContainer .players").trigger("player-hide", [_this, playerName]);
				} else {
					$(".battle .roleSelectContainer .players").trigger("player-show", [_this, playerName]);
				}
			});
		})
	},
	
	startup: function(){

	},

	bindEvents: function(){
		var baseDom = this.baseDom;
		var _this = this;
		baseDom.on("player-hide", function(e, _event_this, playerName){
			if(_event_this === _this){
				return;
			}
			var dom = baseDom.find("[data-name=" + playerName + "]");
			dom.removeClass("selected");
			dom.hide();
		});

		baseDom.on("player-show", function(e, _event_this, playerName){
			if(_event_this === _this){
				return;
			}
			var dom = baseDom.find("[data-name=" + playerName + "]");
			dom.removeClass("selected");
			dom.show();
		});
	},

	apis: {
		hide: function(name){
			this.baseDom.find("[data-name=" + name + "]").hide();
		},

		show: function(name){
			this.baseDom.find("[data-name=" + name + "]").show();
		}
	}
}

$.fn.playerList = function(options){
	if (typeof options === "string") {
		
		// 调用api
		var allArgs = Array.prototype.slice.call(arguments);
		var apiMethodName = allArgs.shift();
		var args = allArgs;
		var comp = this.eq(0).data("playerList");
		return PlayerList.prototype.apis[apiMethodName].apply(comp,args);
	} else if (this.eq(0).data("playerList")) {

		// 已经初始化了，什么都不做
	} else {
		
		// 初始化组件
		new PlayerList(this, options);
	}
}

})(window.jQuery);