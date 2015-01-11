$('document').ready(function() {
	traffic = new Traffic([]);	
	loadData(displayDash);
	
	//Plugin Config
	$("#my-menu").mmenu({
        // options		
		onClick: {
			close: true
		},
		footer: {
            add: true,
            content: "(c) 2014"
        },
		"header": {
            "title": '<img id="Menulogo" src="/apps/budget/resources/budget.svg"/>',
            "add": true,
            "update": true
        },
		dragOpen: {
            open: true
        }
    }, {
        // configuration
		
    });	
});
function loadData(callback) {	
	$.getJSON( "/data/traffic.json", function( data ) {	
		data.messungen = data.messungen.reverse();		
		$.each(data.messungen, function() {			
			traffic.addMessung(this.ort,this.anfang,this.ende);				
		});
	});	
	callback();
}
function saveData(callback) {		
	$.post('/apps/traffic/savejson.php', {json: JSON.stringify(traffic)});
	callback();	
}
function displayDash(){	
	$('#main').html('<div class="row clearfix"><div id="menu" class="column"><img id="menuimage" class="svg" onclick="$(&quot;#my-menu&quot;).trigger(&quot;open.mm&quot;);" src="resources/menu.svg" /></div></div>');
}
function displayForm(){
	$('#main').html('<div class="row clearfix"><div id="menu" class="column"><img id="menuimage" class="svg" onclick="$(&quot;#my-menu&quot;).trigger(&quot;open.mm&quot;);" src="resources/menu.svg" /></div></div><div class="row clearfix"><div class="column full"><form id="messform" class="bordercontainer"><select id="orte" name="orte"><option>Ponte-IKV</option><option>Audimax-Gießerei</option><option>Audimax-Bank</option><option>Gießerei-Mensa</option></select><label onclick="insertDate(&quot;anfang&quot;)">Anfangszeit:</label><input type="text" id="anfang" name="anfang" placeholder="Anfangszeit" autocomplete="off" required readonly><label onclick="insertDate(&quot;ende&quot;)">Endzeit:</label><input type="text" id="ende" name="ende" placeholder="endzeit" autocomplete="off" required readonly><button onlick="send()" type="button">done</button></form></div></div></div>');
}
function insertDate(target){
	currentDate = new Date();
	if(target == 'anfang') {
		$("#anfang").val(currentDate);
	} else {
		$("#ende").val(currentDate);
	}
}
function send() {
	console.log("clicked send");
	var ort = $("#orte").val();
	var anfang = $("#anfang").val();
	var ende = $("#ende").val();
	traffic.addMessung(ort,anfang,ende);
	console.log(traffic);
	saveData(displayDash);
}
function Traffic(messungen){
	this.messungen = messungen;
	
	this.getMessungen = function() {
		return messungen;
	}
	this.addMessung = function(ort,anfang,ende) {
		var messung = new Messung(ort,anfang,ende);
		this.messungen.unshift(messung);
	}
	
}
function Messung(ort,anfang,ende) {
	this.ort = ort;
	this.anfang = anfang;
	this.ende = ende;
	
	this.getOrt = function() {
		return this.ort;
	}
	this.getAnfang = function() {
		return this.anfang;
	}
	this.getEnde = function() {
		return this.ende;
	}
}