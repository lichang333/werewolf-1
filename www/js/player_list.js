var player_list = (function(){

	function bindEvent(){
		$("#avatar").on("click", function(){
			navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
			    destinationType: Camera.DestinationType.FILE_URI });

			function onSuccess(imageURI) {
			    var image = $("#avatar_img").get(0);
			    image.src = imageURI;
			}

			function onFail(message) {
			    alert('Failed because: ' + message);
			}
		});
	}

	function init(){
		bindEvent();
	}



	return {
		init: init
	}

})();
