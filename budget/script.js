$('document').ready(function() {
	storage = localStorage.getItem('Storage');
	if(!storage) {
		window.location = "http://apps.thebluneproject.de/welcome.html?origin=budget";
	} else {	
		$( "form:first" ).submit(function( event ) {			
			event.preventDefault();			   
		});		
		budget = new Budget(0,[]);	
		ConnectToCloud();		
		//datepicker altering text after date has been choosen
		$("#date").datepicker({
			onClose: function(dateText, inst) { 				
				var currentDate = $("#date").datepicker( "getDate" );		
				$('#date').val(currentDate);
				$('#datelabel').html(displayDate(currentDate));
				reposLabel();
			}
		});			
	}
	//var budget = new Budget(600,[],[],[],[]);	
	//budget.setCurrentBudget(200.01);
	//budget.addSingularRevenue('Geschenk', 20);
	
	
	
	
	//var budget2 = new Budget(0,[]);
	//budget2.setCurrentBudget(0.00);
	//budget2.addTransaction('App-initialisation','Revenue',0,0);	
	//alert(JSON.stringify(budget2));	
});

