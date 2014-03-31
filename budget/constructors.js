function Budget(currentStatus,transactions,recurringTransactions) {
  this.currentStatus = currentStatus;
  this.transactions = transactions;
  this.recurringTransactions = recurringTransactions;

  
  this.setCurrentStatus = function(currentStatus) {
	this.currentStatus  = currentStatus;	 
  };
  
  this.getCurrentStatus = function() {
	return this.currentStatus;	 
  };
  
  this.addToCurrentStatus = function(amount) {	
	this.currentStatus += amount;	 
  };
  
  this.subtractFromCurrentStatus = function(amount) {
	this.currentStatus -= amount;	 
  };
  this.addTransaction = function(name, type, amount, date, turnus) {
    var trans = new Transaction(name, type, amount, date, turnus);
	this.transactions.unshift(trans);
	//this.transactions.push(trans);
	if(type == 'expense') {
		this.subtractFromCurrentStatus(amount);
	} else {
		this.addToCurrentStatus(amount);
	}
  }  
  this.getTransactions = function() {
	return transactions;	 
  }
  this.addRecurringTransaction = function(name, type, amount, date) {
    var trans = new recurringTransaction(name, type, amount, date);
	this.recurringTransactions.unshift(trans);
	//this.transactions.push(trans);
  }
  this.getRecurringTransactions = function() {
	return recurringTransactions;	 
  }
}
  function Transaction(name, type, amount, date) {
	this.name = name;
	this.type = type;
	this.amount = amount;
	if(date){
		this.date = date;
	} else {
		this.date = new Date();
	}	
	this.getName = function() {
		return this.name;
	}
	this.getAmount = function() {
		return this.amount;
	}
	this.getDate = function() {
		return this.date;
	}	
	this.getType = function() {
		return this.type;
	}	
  }
  function recurringTransaction(name, type, amount, date) {
	this.name = name;
	this.type = type;
	this.amount = amount;	
	if(date) {
		this.date = date;
	} else { 
		this.date = new Date();
	}	
	this.getName = function() {
		return this.name;
	}
	this.getAmount = function() {
		return this.amount;
	}
	this.getDate = function() {
		return this.date;
	}
	this.getType = function() {
		return this.type;
	}	
  }

