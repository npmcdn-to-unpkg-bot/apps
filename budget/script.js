$('document').ready(function() {
	var budget = new Budget(600,[],[],[],[]);	
	budget.setCurrentBudget(200.01);
	
	$("div#budget").html(budget.getCurrentBudget()+"€");
	
	
	budget.addSingularRevenue('Geschenk', 20);	
});