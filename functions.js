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
function setDropbox() {
  localStorage.setItem('Storage','dropbox');	
  
  window.location = "/apps/budget/";
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
					$(location).attr('href','/apps/connectToCs.html');
				}
			break;
			case 'googledrive':
			break;
			case 'skydrive':
			break;
		}
	}	
}
