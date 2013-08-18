///////////////////////////////////////////////////////////
//		"App"
///////////////////////////////////////////////////////////
//Laden der Apps
$('document').ready(function() {
	//erstellen der globalen variablen, in der die hinzugefügten Apps gespeichert werden
	appArray = [];
	//aufrufen der ungeordneten Appliste
	var storedString = localStorage.getItem('Apps');
	//Listenobject in variablespeichern
	myList = $('ul#applist');
	//Überprüfen ob Apps schon gespeichert wurden
	if(storedString === null) {
		myList.append('<li><a id="addnewapp" href="http://apps.thebluneproject.de/lib.php" title="Add an App"><section id="icon" style="background: url(http://www.thebluneproject.de/apps/resources/plus.svg) no-repeat; background-size: 100px; background-position: center;"></section><h2>Add an App</h2></a></li>');
	} else {
		//Array aus Appliste speichern
		var Apps = storedString.split("&&");		
		//
		//
		//string to object
		// JSON.parse()
		//
		//object to string
		// JSON.stringify()
		//
		//
		for(i = 0; i < Apps.length; i++) {			
			//jeweils aus String wieder ein "app-Object" machen
			var app = JSON.parse(Apps[i]);
			//und dem globalen array hinzufügen
			appArray.push(app);
			//einfügen eines "<li>"-tags, dessen inhalt bekommt die attribute der jeweiligen App
			myList.append($('<li id="'+app.id+'" class="app"></li>').html('<a href="'+app.url+'"><section id="icon" style="background: url('+app.iconurl+') no-repeat; background-size: 100px; background-position: center;"></section><h2>'+app.name+'</h2></a>'));		
		};	
		myList.append('<li><a id="addapp" href="http://apps.thebluneproject.de/lib.php" title="Add an App"><section id="icon" style="background: url(http://www.thebluneproject.de/apps/resources/plus.svg) no-repeat; background-size: 100px; background-position: center;"></section><h2>Add an App</h2></a></li>');
	}
});

//
// Jquery UI sortable plugin + droppable + jquery touch punch
//

$(document).ready(function() {
    $("#applist").sortable({ 		
		//Mauszeiger
		cursor: 'move', 
		//zwei optionen 'clone','original' (started bei drag)
		helper: 'original',
		//nur li darf gedragt werden
		items: 'li.app',
		//abspielen einer einfügeanimation
		revert: true,
		//opacity des gedragten objekts
		opacity: 0.25,
		//Klasse des Platzhalters
		placeholder: 'placeholder',
		//fenster scrollt bei annäherung an seitenrand
		scroll: false,
		//beschränkt die Möglichkeit zu sortieren auf ein bestimmtes html element
		handle: 'section',
		//start event ruft funktion auf
		start: function() {
			resetAlign();			
		},
		//event, das bei neuanordnung der dom triggert
		update: function() {
			//gibt array mit ids der Apps in neuer Reihenfolge an
			var result = myList.sortable('toArray');
			//Anzahl der Apps
			var resultlength = result.length;	
			//Sortieralgorythmus
			//variable i dient dem Lauf con result
			for(i = 0; i < resultlength; i++) {
				//während j innerhlab durchläuft und testet ob die id des aktuellen objekts mit der des gesuchten übereinstimmt
				for(j = 0; j < resultlength; j++) {					
					var app = appArray[j];
					//wenn ja, wird dieses Objekt neu in einer liste gespeichert, oder der bereits bestehenden hinzugefügt.
					if(app.id === result[i]) {						
						if(stringToStore) {
							stringToStore += '&&'+JSON.stringify(app);
						} else {
							var stringToStore = JSON.stringify(app);
						}
					}
				}				
			}			
			localStorage.setItem('Apps',stringToStore);			
		}
	});
	
	//verhindert textauswahl der appp-bezeichnungen
	$("#applist").disableSelection();
	
	//droppable trash zum löschen von apps aus dem cache
	$("#trash").droppable({
		//when the draggable overlaps the droppable it is stated as "over" the droppable
		tolerance: "touch",
		//droppable receives class on hover of a draggable
		hoverClass: "onhover", 
		//triggers on drag of a draggable
		activate: function() { 
			$("#trash").addClass("ondrag");
		},
		//triggers when a draggable stops dragging
		deactivate: function() { 
			$("#trash").removeClass('ondrag');
		},
		//on drop of a draggable: delete app from homescreen
		drop: function( event, ui ) {
			//get the id of the app
			var id = ui.draggable.attr('id');
			//aufrufen der ungeordneten Appliste
			var storedString = localStorage.getItem('Apps');
			//Array aus Appliste
			var Apps = storedString.split("&&");
			//durchlaufen des app-string-arrays
			for(i = 0; i < Apps.length; i++) {					
				//jeweils aus String mithilfe der laufvariable i wieder ein "app-Object" machen
				var app = JSON.parse(Apps[i]);
				//überprüfen, ob id mit zu löschender App übereinstimmt(in dem Fall steht i für die Position der app in der Liste
				if(app.id === id) {					
					//durchlaufen einer schleife um die richtigen strings aus dem array wieder zusammenzufügen
					for(l = 0; l < Apps.length; l++) {						
						//überprüfen, ob laufvariable l an dem punkt ist, an dem sich der zu löschende String befindet
						if(i !== l) {
							//überprüfen, ob die variable newstring schon benutzt wurde
							var newString;
							if(newString) {
								newString += "&&"+Apps[l];
							} else {
								newString = Apps[l];								
							}					
						}
					};					
				}
			
			};
			//speichern der neuen appliste
			localStorage.setItem('Apps', newString);
			ui.draggable.css("display","none");			
		}
	});
 });

$('document').ready(function() {
	ConnectToCloud();
	userName();
});


//
// Cloudspeicher
//
/*
$('document').ready(function() {
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
						// alert(userName);
					});	  
				});		
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

});
*/