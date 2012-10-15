///////////////////////////////////////////////////////////
//if IE
///////////////////////////////////////////////////////////
//neuschreiben der document.getElementById nur für den IE
document.getElementById=function(str){
str=new String(str);
var allEls=document.getElementsByTagName("*"),l=allEls.length;
for(var i=0;i<l;i++)if(allEls[i].id==str || allEls[i].getAttribute("id")==str)return allEls[i];
return null;
}
//neuschreiben der document.getElementsByName nur für den IE
document.getElementsByName=function(str){
str=new String(str);
var myMatches=new Array();
var allEls=document.getElementsByTagName("*"),l=allEls.length;
for(var i=0;i<l;i++)if(allEls[i].name==str || allEls[i].getAttribute("name")==str)myMatches[myMatches.length]=allEls[i];
return myMatches;
}
///////////////////////////////////////////////////////////
//	 Funktionen
///////////////////////////////////////////////////////////
//Funktion wird onresize getriggert, arrangiert also immer die quadrate optimal.
function resetAlign () {
	//testzeile gibt screenbreite aus
	//$("#Header").html(window.innerWidth);
	//header anpassen
	$("#Header").css('width', window.innerWidth-104);
	
	//Überprüft bestimme Größenparameter
	//hier: ob screenbreite größer 1000px
	if (window.innerWidth >= 1000) {
	
		//festlegung der "tilegröße" auf die im stylesheet notierten Werte
		$('li').each(function() {
			$(this).removeClass("smalltile");
			$(this).addClass("largetile");
		});		
		//Tiles per stylesheet angabe berechnen und festlegen.
		$('li').each(function() {
			var newMargin = ((window.innerWidth - 1000) / 10);	
			$(this).css('margin-left',newMargin);
			$(this).css('margin-right',newMargin);		
		});		
	
	}	else {
	
		//festlegung der "tilegröße" auf 100px
		$('li').each(function() {
			$(this).removeClass("largetile");
			$(this).addClass("smalltile");
		});	
		//Margin der "li"-objekte in Abhängigkeit von der Fensterbreite berechnen und festlegen
		$('li').each(function() {
			var newMargin = ((window.innerWidth - 500) / 10);	
			$(this).css('margin-left',newMargin);
			$(this).css('margin-right',newMargin);		
		});		
	}
}

var showError = function(error) {
		if (window.console) {  // Skip the "if" in node.js code.
			console.error(error);
		}

		switch (error.status) {
			case 401:
				// If you're using dropbox.js, the only cause behind this error is that
				// the user token expired.
				// Get the user through the authentication flow again.
				alert("error 401: token expired");			
				break;				
			case 404:
				// The file or folder you tried to access is not in the user's Dropbox.
				// Handling this error is specific to your application.
				break;

			case 507:
				// The user is over their Dropbox quota.
				// Tell them their Dropbox is full. Refreshing the page won't help.
				break;

			case 503:
				// Too many API requests. Tell the user to try again later.
				// Long-term, optimize your code to use fewer API calls.
				break;

			case 400:  
				// Bad input parameter
			case 403:  
				// Bad OAuth request.
			case 405:  
				// Request method not expected
			default:
				// Caused by a bug in dropbox.js, in your application, or in Dropbox.
				// Tell the user an error occurred, ask them to refresh the page.
		}
	};
//	
//Dropbox
//
setDropbox = function() {
	stringToStore = 'dropbox';	
	localStorage.setItem('Storage',stringToStore);	
	alert("Dropbox as setting saved");
	$(location).attr('href','http://apps.thebluneproject.de/');
}
	