$('document').ready(function() {

	//var Zeit = new Date();
	//alert(Zeit);

	//öffnen der XML Datei
	$.get("tasks.xml",{},function(xml){
	
		//Für jede "task" wird Funktion aufgerufen		
		$('task',xml).each(function() {
		
			//Auslesen der parameter dieser tasks
			var id = $(this).attr("id");
			var name = $(this).find("name").text();
			var date = new Date(""+$(this).find("date").text()+"");
			var recurring = $(this).find("recurring").text();
			
			var due = recurring;
			switch (due) {
				case "daily":
					var changingdate = date;
			    	var day = date.getDate();
			    	changingdate.setDate(day+1);
			    	due = changingdate;
				break;

				case "weekly":
			    	var changingdate = date;
			    	var day = date.getDate();
			    	changingdate.setDate(day+7);
			    	due = changingdate;
			    break;

			  	case "monthly":
			  		var realdate = date;
			    	var month = date.getMonth();
			    	realdate.setMonth(month+1);
			    	due = realdate;
			    break;

			    case "3monthly":
			    	var realdate = date;
			    	var month = date.getMonth();
			    	realdate.setMonth(month+3);
			    	due = realdate;
			    break;	

			    case "6monthly":
			    	var realdate = date;
			    	var month = date.getMonth();
			    	realdate.setMonth(month+6);
			    	due = realdate;
			    break;

			    case "yearly":
			    	var realdate = date;
			    	var year = date.getFullYear();
			    	realdate.setFullYear(year+1);
			    	due = realdate;
			    break;
			}
			
			var alerton = $(this).find("alert").text();
			
				var changingdate = date;
			    var day = date.getDate();
			    changingdate.setDate(day-alerton);
			    var alerton = changingdate;

			contentdiv = $('div#content');

			contentdiv.append($('<li id='+id+'/>').html('<div class="name">'+name+'</div><div class="duedate">'+due+'</div><div class="recurring">'+recurring+'</div>'));
			
		});			
	});

});