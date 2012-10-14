function adjust () {
	//kleinauflösende Anzeiggeräte ausschließen
	if(window.innerWidth >= 500) {		
			//setzen der Breite
			$('#paperworkcontent').css('width',window.innerWidth);
			//setzen der Höhe
			folderheight = window.innerHeight;			
			$('#paperworkcontent').css('height',window.innerHeight);
			//
			//Dasselbe nun für paperwork aber reduziert um jeweils 20
			//
			$('.paper').css('width',window.innerWidth-20);
			$('.paper').css('height',window.innerHeight-20);		
	}
}