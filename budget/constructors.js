function Budget(currentBudget,transactions) {
  this.currentBudget = currentBudget;
  this.transactions = transactions;

  
  this.setCurrentBudget = function(currentBudget) {
	this.currentBudget  = currentBudget;	 
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
  this.addTransaction = function(name, type, amount, date, turnus) {
    var trans = new Transaction(name, type, amount, date, turnus);
	this.transactions.unshift(trans);
	//this.transactions.push(trans);
	if(type == 'expense') {
		this.subtractFromCurrentBudget(amount);
	} else {
		this.addToCurrentBudget(amount);
	}
  }  
  this.getTransactions = function() {
	return transactions;	 
  }
}
  function Transaction(name, type, amount, date, turnus) {
	this.name = name;
	this.type = type;
	this.amount = amount;
	if(date){
		this.date = date;
	} else {
		this.date = new date();
	}
	this.turnus = turnus;
	
	this.getName = function() {
		return this.name;
	}
	this.getAmount = function() {
		return this.amount;
	}
	this.getDate = function() {
		return this.date;
	}
	this.getTurnus = function() {
		return this.turnus;
	}
	this.getType = function() {
		return this.type;
	}	
  }

