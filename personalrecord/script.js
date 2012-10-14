function adjust () {
	//kleinauflˆsende Anzeigger‰te ausschlieﬂen
	if(window.innerWidth >= 500) {
		//ermitteln, ob Displaymaﬂe hochformat/querformat besitzen
		if(window.innerWidth < window.innerHeight) {
			//Wenn Bildschirm im Hochformat soll nur eine "Seite" des PersonalRecord angezeigt werden
			//ermitteln der labelbreite sowie abziehen des "px" strings
			labelwidth = Math.round(window.innerWidth/15);			
			$('#label').css('width',labelwidth);
			labelwidth = $('#label').css('width')
			labelwidthnumber = labelwidth.replace('px','');
			//berechnung der eigentlichen contentbreite durch abzug der labelbreite
			folderwidth = window.innerWidth-labelwidthnumber;
			//setzen der Breite
			$('#foldercontent').css('width',folderwidth);
			//setzen der Hˆhe
			folderheight = window.innerHeight;			
			$('#foldercontent').css('height',folderheight);
			//
			//Dasselbe nun f¸r paperwork aber reduziert um jeweils 20
			//
			$('.paper').css('width',folderwidth-20);
			$('.paper').css('height',folderheight-20);
		} else {
			//Wenn Bildschirm im Querformat sollen zwei "Seiten" des PersonalRecord angezeigt werden
			//ermitteln der labelbreite sowie abziehen des "px" strings
			labelwidth = Math.round(window.innerWidth/15);			
			$('#label').css('width',labelwidth);
			labelwidth = $('#label').css('width')
			labelwidthnumber = labelwidth.replace('px','');
			//berechnung der eigentlichen contentbreite durch abzug der labelbreite
			folderwidth = window.innerWidth-labelwidthnumber;
			//setzen der Breite minus einem sicherheitsabzug, da scrollbars entstehen kˆnnen
			$('#foldercontent').css('width',folderwidth-20);
			//setzen der Hˆhe
			folderheight = window.innerHeight;			
			$('#foldercontent').css('height',folderheight);
			//
			//Dasselbe nun f¸r paper aber reduziert um jeweils 20
			//
			$('.paper').css('width',folderwidth-20);
			$('.paper').css('height',folderheight-20);
		}
	}
}