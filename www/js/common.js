var common = (function(){

	var props = {};


	function init() {
		bindEvent();
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
		"loadPage": loadPage,
		"props": props
	};

})();