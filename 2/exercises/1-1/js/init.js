(function(w){
	var sw = document.body.clientWidth,
		sh = document.body.clientHeight,
		breakpoint = 650,
		mobile = true;
		
	$(document).ready(function() {
		checkMobile();
		setNav();
	});
		
	$(w).resize(function(){
		sw = document.body.clientWidth;
		sh = document.body.clientHeight;
		checkMobile();
	});
	
	function checkMobile() {
		mobile = (sw > breakpoint) ? false : true;
		if (!mobile) { // not mobile
			$('.aux header a').addClass('disabled').addClass('open');
			$('[role="tabpanel"],#nav,#search').show(); // full navigation
		} else { // hide 
			if(!$('#nav-anchors a').hasClass('active')) {
				$('#nav,#search').hide();
			}
		}
	}
	
	// toggle navigation for small screens
	function setNav() {
		var $anchorLinks = $('#nav-anchors').find('a');
		$anchorLinks.click(function(e){
			e.preventDefault();
			var $this = $(this),
				thisHref = $this.attr('href');
			$('.reveal').hide();
			if($this.hasClass('active')) {
				$this.removeClass('active');
				$(thisHref).hide();
			} else {
				$anchorLinks.removeClass('active');
				$this.addClass('active');
				$(thisHref).show();
			}
		});
	}
	
})(this);