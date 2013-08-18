///////////////////////////////////////////////////////////
//		"App"
///////////////////////////////////////////////////////////
//Laden der Apps
$('document').ready(function() {
//
// Load and inset the stored applist into the dom
//
	//erstellen der globalen variablen, in der die hinzugef�gten Apps gespeichert werden
	appArray = [];
	//aufrufen der ungeordneten Appliste
	var storedString = localStorage.getItem('Apps');
	//Listenobject in variablespeichern
	myList = $('ul#applist');
	//�berpr�fen ob Apps schon gespeichert wurden
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
			//und dem globalen array hinzuf�gen
			appArray.push(app);
			//einf�gen eines "<li>"-tags, dessen inhalt bekommt die attribute der jeweiligen App
			myList.append($('<li id="'+app.id+'" class="app"></li>').html('<a href="'+app.url+'"><section id="icon" style="background: url('+app.iconurl+') no-repeat; background-size: 100px; background-position: center;"></section><h2>'+app.name+'</h2></a>'));		
		};	
		myList.append('<li><a id="addapp" href="http://apps.thebluneproject.de/lib.php" title="Add an App"><section id="icon" style="background: url(http://www.thebluneproject.de/apps/resources/plus.svg) no-repeat; background-size: 100px; background-position: center;"></section><h2>Add an App</h2></a></li>');
	}


//
// Jquery UI sortable plugin + droppable + jquery touch punch
//


    $("#applist").sortable({ 		
		//Mauszeiger
		cursor: 'move', 
		//zwei optionen 'clone','original' (started bei drag)
		helper: 'original',
		//nur li darf gedragt werden
		items: 'li.app',
		//abspielen einer einf�geanimation
		revert: true,
		//opacity des gedragten objekts
		opacity: 0.25,
		//Klasse des Platzhalters
		placeholder: 'placeholder',
		//fenster scrollt bei ann�herung an seitenrand
		scroll: false,
		//beschr�nkt die M�glichkeit zu sortieren auf ein bestimmtes html element
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
				//w�hrend j innerhlab durchl�uft und testet ob die id des aktuellen objekts mit der des gesuchten �bereinstimmt
				for(j = 0; j < resultlength; j++) {					
					var app = appArray[j];
					//wenn ja, wird dieses Objekt neu in einer liste gespeichert, oder der bereits bestehenden hinzugef�gt.
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
	
	//droppable trash zum l�schen von apps aus dem cache
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
				//�berpr�fen, ob id mit zu l�schender App �bereinstimmt(in dem Fall steht i f�r die Position der app in der Liste
				if(app.id === id) {					
					//durchlaufen einer schleife um die richtigen strings aus dem array wieder zusammenzuf�gen
					for(l = 0; l < Apps.length; l++) {						
						//�berpr�fen, ob laufvariable l an dem punkt ist, an dem sich der zu l�schende String befindet
						if(i !== l) {
							//�berpr�fen, ob die variable newstring schon benutzt wurde
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


