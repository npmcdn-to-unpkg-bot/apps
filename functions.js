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
////////////////////////////
//Storage 
////////////////////////////
//	
//Dropbox
//
setDropbox = function() {
	stringToStore = 'dropbox';	
	localStorage.setItem('Storage',stringToStore);	
	alert("Dropbox as setting saved");
	$(location).attr('href','http://apps.thebluneproject.de/connectToCs.html');
}
ConnectToCloud = function () {
// aus lokalem Speicher laden
storage = localStorage.getItem('Storage');
// überprüfen ob überhaupt eine Voreinstellung vorhanden ist.
if(storage) {
	
	//-->debug
	// alert("storage vorhanden:"+storage);	
	switch (storage) {
		case 'dropbox':			
			dropbox_authStatus = localStorage.getItem('dropbox_authstatus');
			// alert("authstatus: "+dropbox_authStatus);
			
			if(!dropbox_authStatus) {				
				localStorage.setItem('dropbox_authstatus','initialized');	
				//initialization
				var client = new Dropbox.Client({
					key: "hm4c58qp6rpysot", secret: "w7cdx6o8p2hyubj"
				});
				alert("initialized");
				//preset driver to the dropbox page
				client.authDriver(new Dropbox.Drivers.Redirect({rememberUser: true}));
				//authentication
				client.authenticate(function(error, client) {
					if (error) {
						return showError(error);  // Something went wrong.
					}
				});
			} else if (dropbox_authStatus === 'initialized') {
				localStorage.setItem('dropbox_authstatus','finalized');	
				//continuation
				var client = new Dropbox.Client({
					key: "hm4c58qp6rpysot", secret: "w7cdx6o8p2hyubj"
				});
				alert("continued");
				//preset driver to the dropbox page
				client.authDriver(new Dropbox.Drivers.Redirect({rememberUser: true}));
				//authentication
				client.authenticate(function(error, client) {
					if (error) {
						return showError(error);  // Something went wrong.
					}
					client.getUserInfo(function(error, userInfo) {
						if (error) {
							return showError(error);  // Something went wrong.
						}

						alert("hello: "+userInfo.name);
						//Speichern der verwendeten Cloudspeicher Option
						localStorage.setItem('dropbox_auth', JSON.stringify(client.credentials()));
						alert("credentials saved:"+JSON.stringify(client.credentials()));
						
					});
				});		
			} else {				
				/*
				// alert((localStorage.getItem('dropbox_auth')));
				client = new Dropbox.Client(JSON.parse(localStorage.getItem('dropbox_auth')));	
				// client.authDriver(new Dropbox.Drivers.Redirect());
				client.authenticate(function(error, client) {
					if (error) {   
						return showError(error);
					}
					client.getUserInfo(function(error, userInfo) {
						if (error) {
							return showError(error);  // Something went wrong.
						}

						userName = userInfo.name;
						alert(userName);
					});	  
				});	
				*/				
			}						
		break;
		case 'googledrive':
		break;
		case 'skydrive':
		break;
	}
	
} else {
	$(location).attr('href','http://apps.thebluneproject.de/welcome.html');
}
}

////////////////////////////
//Storage Error Handling
////////////////////////////	
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
			$(this).removeClass("tinytile");
			$(this).addClass("largetile");
		});		
		//Tiles per stylesheet angabe berechnen und festlegen.
		$('li').each(function() {
			var newMargin = ((window.innerWidth - 1000) / 10);	
			$(this).css('margin-left',newMargin);
			$(this).css('margin-right',newMargin);		
		});		
	
	}	else if(window.innerWidth >= 500 && window.innerWidth>window.innerHeight) {
	
		//festlegung der "tilegröße" auf 100px
		$('li').each(function() {
			$(this).removeClass("largetile");
			$(this).removeClass("tinytile");
			$(this).addClass("smalltile");
		});	
		//Margin der "li"-objekte in Abhängigkeit von der Fensterbreite berechnen und festlegen
		$('li').each(function() {
			var newMargin = ((window.innerWidth - 500) / 10);	
			$(this).css('margin-left',newMargin);
			$(this).css('margin-right',newMargin);		
		});		
	} else {
		//festlegung der "tilegröße" auf 100px
		$('li').each(function() {
			$(this).removeClass("largetile");
			$(this).removeClass("smalltile");
			$(this).addClass("tinytile");
		});	
		//Margin der "li"-objekte in Abhängigkeit von der Fensterbreite berechnen und festlegen
		$('li').each(function() {
			var newMargin = ((window.innerWidth - 300) / 6);	
			$(this).css('margin-left',newMargin);
			$(this).css('margin-right',newMargin);
			$(this).css('margin-top',10);		
		});		
	}
}

function trimScreen () {	
	$("#cloudlink").css('height', window.innerHeight-51);
	$("#cloudlink").css('width', window.innerWidth-51);
	
	$("#cloud").css('height', (window.innerHeight-51)/3);	
	$("#notification").css('height', ((window.innerHeight-51)*2)/3);
	
	cloudWidth = $("#cloud").width();
	
	if(window.innerWidth > cloudWidth+51) {
		$("#cloud").css('width', cloudWidth);
		$("#cloud").css('margin', '25px auto 0 auto');
	} else {
		$("#cloud").css('width', '100%');
		$("#cloud").css('margin', '25px 0 0 0');		
	}
}
function messen() {
	$("#messwert").remove();
	$("#cloudlink").before("<div id='messwert'>height: "+window.innerHeight+"px width: "+window.innerWidth+"px</div>");
}
function userName() {
	storage = localStorage.getItem('Storage');
	if(storage) {
	
		//-->debug
		// alert("storage vorhanden:"+storage);	
		switch (storage) {
			case 'dropbox':
				dropbox_authStatus = localStorage.getItem('dropbox_authstatus');
				if(dropbox_authStatus === 'finalized') {
					client = new Dropbox.Client(JSON.parse(localStorage.getItem('dropbox_auth')));	
					// client.authDriver(new Dropbox.Drivers.Redirect());
					client.authenticate(function(error, client) {
						if (error) {   
							return showError(error);
						}
						client.getUserInfo(function(error, userInfo) {
							if (error) {
								return showError(error);  // Something went wrong.
							}

							userName = userInfo.name;
							alert(userName);
						});	  
					});	
				} else {
					$(location).attr('href','http://apps.thebluneproject.de/connectToCs.html');
				}
			break;
			case 'googledrive':
			break;
			case 'skydrive':
			break;
		}
	}	
}
