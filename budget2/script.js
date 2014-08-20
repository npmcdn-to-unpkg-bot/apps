function messen() {
	$("#messwert").remove();
	$("body").prepend("<div id='messwert'>height: "+window.innerHeight+"px width: "+window.innerWidth+"px</div>");
}
function expandform() {
	var width = $("#addpaym").css('width');	
	var windowWidth = $('body').innerWidth();
	//Subtracting div padding manuall!! Has to be change when padding is altered.
	windowWidth -= 32;
	windowWidth = windowWidth+'px';
	console.log(width);
	console.log(windowWidth);
	if(width !== windowWidth) {	
		$("#addpaym").css('width','100%');
		$("#addpaym").css('height','100%');
		$("#addpaym").css('background','white content-box');
		$("#addimage").css('transform','rotate(45deg)');
		$("#addimage").css('float','right');		
	} else {
		$("#addpaym").css('width','68px');
		$("#addpaym").css('height','68px');
		$("#addpaym").css('background','#F5F5F5 content-box');
		$("#addimage").css('transform','none');
		$("#addimage").css('float','left');
	}
}
