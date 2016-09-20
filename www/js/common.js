var common = (function(){

	var props = {
		"device": null,
		"players": null
	};


	function init() {
		initPlayers();
		bindEvent();
	}

	function initPlayers(callback){
		majax("/players", {
			method: "get"
		}).then(function(result){
			props.players = result;
			if(callback){
				callback();
			}
		}, function(e){
			alert("error");
		})
	}

	function majax(url, params){
		// var ip = "192.168.1.100";
		var ip = "192.168.196.184";
		var port = "3000";
		url = "http://" + ip + ":" + port + url;
		return $.ajax(url, params);
	}

	function bindEvent(){
		document.addEventListener("deviceready", onDeviceReady, false);
	}

	function onDeviceReady(){

		// TODO
		// 这个变量是用来判断设备的，android或者ios
		// 如果是空，代表是browser
		props.device = "android";
	}

	function loadPage(htmlName, target){
        target = target || "main";

        // load page
        var pageName = "html/" + htmlName + ".html";
        $("#" + target).load(pageName, function(){
            // add css to button group
            $("#footer button").removeClass("active");
            $("#footer button[name='" + htmlName + "']").addClass("active");

            // run page js
            window[htmlName].init.call();
        });
    }

	return {
		"init": init,
		"initPlayers": initPlayers,
		"majax": majax, 
		"loadPage": loadPage,
		"props": props
	};

})();