if ("ontouchend" in document.documentElement) {		
		
	// disabilita scroll su dispositivo mobile
	document.addEventListener('touchmove', function(event) {	
		event.stopPropagation();
		event.preventDefault();
	}, false);

}