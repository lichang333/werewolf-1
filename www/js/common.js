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

	return {
		"init": init,
		"props": props
	};

})();