$(document).ready(function() {
	setTimeout(function(){
			var n = noty({
			text : '<strong>Welcome!</strong><br>Tap the screen to continue...',
			type : 'alert',
			layout : 'topLeft',
			closeWith: ['hover']		
		}); 
	},2000);
});