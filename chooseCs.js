$(document).ready(function() {
	setTimeout(function(){
			var n = noty({
			text : 'Tap on a <strong>Storageservice</strong> of your choice to login',
			type : 'alert',
			layout : 'topLeft',
			closeWith: ['hover']		
		}); 
	},2000);
});
function setmargin() {
	var totalHeight = $('a').height();
	var imgHeight = $('img').height();
	var margin = (totalHeight-imgHeight)/2;
	$('img').css('margin-top',margin);
	$('img').css('margin-bottom',margin);
}
function adjustToScreen () {
	/*
	$(".cs").css('height', window.innerHeight/4);
	$(".cs").css('width', window.innerWidth);
	
	$("img").css('height', (window.innerHeight/4)-50);
	$("img").each(function() {
		imageWidth = $(this).width();
		$(this).css('width', (imageWidth));		
	});
	
	wrapperWidth = $("#wrapper").width();
	$("#wrapper").css('width', wrapperWidth);
	$("#wrapper").css('display', 'block');
	*/
}