define(['jquery', 
		'joshua/ui/Sprite', 
		'joshua/ui/Picture', 
		'joshua/interact/smooth_mousewheel',
		'greensock/TweenMax',
		'bootstrap',
		'domReady!'], 
	function($, Sprite, Picture, SmoothMouseWheel){

	// preload pictures
	(function(){
		$('.js-picture').each(function(i, item){
			var p = new Picture(item);

			$(p).on('done', function(){})
			.on('error', function(){});
		});

		Picture.load();
	})();

	// smooth mouse wheel
	SmoothMouseWheel.enable({
		spring: .4,
        duration: 900,
        maxDetail: 40
	});
});