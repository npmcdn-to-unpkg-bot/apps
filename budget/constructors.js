function Budget(currentBudget,repetitiveExpenses, repetitiveRevenues, singularExpenses, singularRevenues) {
  this.currentBudget = currentBudget;
  this.repetitiveExpenses = repetitiveExpenses;
  this.repetitiveRevenues = repetitiveRevenues;
  this.singularExpenses = singularExpenses;
  this.singularRevenues = singularRevenues;
  
  this.setCurrentBudget = function(currentBudget) {
	return this.currentBudget  = currentBudget;	 
  };
  
  this.getCurrentBudget = function() {
	return this.currentBudget;	 
  };
  
  this.addToCurrentBudget = function(amount) {
	this.currentBudget += amount;	 
  };
  
  this.subtractFromCurrentBudget = function(amount) {
	this.currentBudget -= amount;	 
  };
  
  this.addRepetitiveExpense = function(name, amountPerMonth) {
	var repExp = new RepetitiveExpense(name, amountPerMonth);
	this.repetitiveExpenses.push(repExp);
	this.subtractFromCurrentBudget(amountPerMonth);
  };
  this.getRepetitiveExpenses = function() {
	var ExpenseArray = [[],[]];
	for (i=0;i<this.repetitiveExpenses.length; i++) {
		ExpenseArray[i].push(this.repetitiveExpenses[i]);		
	}
	return ExpenseArray;	 
  };
  
  this.addRepetitiveRevenue = function(name, amountPerMonth) {
	var repRev = new RepetitiveRevenue(name, amountPerMonth);
	this.repetitiveRevenues.push(repRev);
	this.addToCurrentBudget(amountPerMonth);
  };
  this.getRepetitiveRevenue = function() {
	return this.repetitiveRevenues.name;	 
  };
  
  this.addSingularExpense = function(name, amount) {
	var SinExp = new SingularExpense(name, amount);
	this.singularExpenses.push(SinExp);
	this.subtractFromCurrentBudget(amount);
  };
  this.getSingularExpenses = function() {
	return this.singularExpenses;	 
  };
  
  this.addSingularRevenue = function(name, amount) {
	var SinExp = new SingularRevenue(name, amount);
	this.singularRevenues.push(SinExp);
	this.addToCurrentBudget(amount);
  };
  this.getSingularRevenues = function() {
	return this.singularRevenues;	 
  };
}

function RepetitiveExpense(name, amountPerMonth) {
	this.name = name;
	this.amountPerMonth = amountPerMonth;
	this.date = new Date();
	
	this.getName = function() {
		return this.name;
	}
}

function RepetitiveRevenue(name, amountPerMonth) {
	this.name = name;
	this.amountPerMonth = amountPerMonth;
	this.date = new Date();
	
	this.getName = function() {
		return this.name;
	}
}

function SingularExpense(name, amount) {
	this.name = name;
	this.amount = amount;
	this.date = new Date();
	
	this.getName = function() {
		return this.name;
	}
}

function SingularRevenue(name, amount) {
	this.name = name;
	this.amount = amount;
	this.date = new Date();
	
	this.getName = function() {
		return this.name;
	}
}