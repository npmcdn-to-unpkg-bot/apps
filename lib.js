///////////////////////////////////////////////////////////
//		"Library"
///////////////////////////////////////////////////////////
//		Auslesen der apps.xml
$(document).ready(function(){	

	//erstellen der globalen variablen, in der alle Apps gespeichert werden
	appArray = [];
	
	//öffnen der XML Datei
	$.get("apps.xml",{},function(xml){
	
		//Für jede "app" wird Funktion aufgerufen		
		$('app',xml).each(function() {
		
			//Appobjekt anhand der einzelnen attribute erstellen
			var id = $(this).attr("id");
			var name = $(this).find("name").text();
			var url = $(this).find("url").text();
			var iconurl = $(this).find("iconurl").text();
			var description = $(this).find("description").text();
			
			app = new App(name,id,url,iconurl,description);	
			
			//einfügen in appArray-Liste für späteren gebrauch
			appArray.push(app);	
			
			//Listenobject in variablespeichern
			var myList = $('ul#liblist');
			
			//hinzufügen eines "<li>"-tags, dessen inhalt bekommt die attribute der jeweiligen app
			//nötig: Überprüfung ob App bereits hinzugefügt ist, damit keine Doppler entstehen können. 
			//abrufen der gespeicherten Appliste
			var storedString = localStorage.getItem('Apps');
			if(storedString) {
				var Apps = storedString.split("&&");				
				for(i = 0; i < Apps.length; i++) {	
					//jeweils aus String wieder ein "app-Object" machen
					var app = JSON.parse(Apps[i]);			
					if(app.name === name) {
						var owned = true;					
					}					
				};	
				if(owned) {
					myList.append($('<li/>').html('<a href="#" class="owned"><section id="icon" style="background: url('+iconurl+') no-repeat; background-size: 100px; background-position: center;"></section><h2>'+name+'</h2></a>'));
				} else {
					myList.append($('<li/>').html('<a href="#" onclick="addApp('+id+')"><section id="icon" style="background: url('+iconurl+') no-repeat; background-size: 100px; background-position: center;"></section><h2>'+name+'</h2></a>'));
				}
			} else {
				myList.append($('<li/>').html('<a href="#" onclick="addApp('+id+')"><section id="icon" style="background: url('+iconurl+') no-repeat; background-size: 100px; background-position: center;"></section><h2>'+name+'</h2></a>'));
			}
		});
		myList.append($('<div style="clear: both"></div>'));		
	});
	
});

function addApp (id) {	

	//App anhand Id auswählen
	var app = appArray[id-1];
	
	//abrufen der gespeicherten Appliste und hinzufügen der app
	var storedString = localStorage.getItem('Apps');
	if(storedString) {
		var stringToStore = storedString+'&&'+JSON.stringify(app);
	} else {
		var stringToStore = JSON.stringify(app);
	}
	
	//Speichern
	localStorage.setItem('Apps',stringToStore);
	$(location).attr('href','http://apps.thebluneproject.de/');
}
	