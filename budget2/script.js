function messen() {
	$("#messwert").remove();
	$("body").prepend("<div id='messwert'>height: "+window.innerHeight+"px width: "+window.innerWidth+"px</div>");
}
function expandform() {
	$("#addpaym").css('width','100%');
	$("#addpaym").css('height','100%');
}