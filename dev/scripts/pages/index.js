define(['jquery',
		'domReady!'], 
	function($){
		soundManager.setup({
		  // where to find flash audio SWFs, as needed
		  url: 'vendors/SoundManager2/swf/',
		  onready: function() {
		    // SM2 is ready to play audio!
		    var mySound = soundManager.createSound({
			  url: 'sounds/test.mp3'
			});

			mySound.play();
		  }
		});
});