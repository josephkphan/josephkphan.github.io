$(document).ready(function() {
	$(window).on('beforeunload', function(){
		$(window).scrollTop(0);
	});

	$('img').on('dragstart', function(event) { event.preventDefault(); });
	
	function scrollLink(scrollPos) {
		$("html, body").animate({scrollTop: scrollPos}, 900);
	}
	$(".link0").click(function() {
		scrollLink($("#main-menu").offset().top);
	});
	
	$(".link1").click(function() {
		scrollLink($("#page-about-me").offset().top + 1);
	});
	
	$(".link2").click(function() {
		scrollLink($("#page-my-experience").offset().top + 1);
	});
	
	$(".link3").click(function() {
		scrollLink($("#page-contact-me").offset().top + 1);
	});
});
