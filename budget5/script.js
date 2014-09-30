function messen() {
	$("#messwert").remove();
	$("body").prepend("<div id='messwert'>height: "+window.innerHeight+"px width: "+window.innerWidth+"px</div>");
}
function newtrans() {
	var status = $("#newtrans").css('display');
	if(status === 'none') {	
		$("#newtrans").css('display','block');
		$("#main").css('display','none');
	} else {
		$("#newtrans").css('display','none');
		$("#main").css('display','block');
	}
}
