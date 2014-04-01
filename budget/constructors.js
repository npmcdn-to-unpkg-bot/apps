function Budget(amount,deposits,transactions,recurringTransactions) {
	this.currentStatus = new currentStatus(amount,deposits);
	this.transactions = transactions;
	this.recurringTransactions = recurringTransactions;

  
	this.setCurrentStatusAmount = function(amount) {
		currStat = new currentStatus(amount, []);
		this.currentStatus  = currStat;	 
	};
  
	this.getCurrentStatusAmount = function() {
		return this.currentStatus.getAmount();	 
	};
	this.getDeposits = function () {
		return this.currentStatus.deposits;
	}
	this.addDeposit = function (name,amount) {
		var dep = new deposit(name,amount);
		this.currentStatus.deposits.push(dep);
	}
	this.addToDeposit = function (name, amount) {
		$.each(this.currentStatus.deposits, function() {
			if (this.name === name) {
				this.amount += amount;
			}
		});
	}
	this.subtractFromDeposit = function (name, amount) {
		$.each(this.currentStatus.deposits, function() {
			if (this.name === name) {
				this.amount -= amount;
			}
		});
	}
	this.subtractFromCurrentStatusAmount = function (amount) {
		this.currentStatus.amount -= amount;
		this.currentStatus.amount = this.currentStatus.amount.toFixed(2);
	}
	this.addToCurrentStatusAmount = function (amount) {
		this.currentStatus.amount += amount;
		this.currentStatus.amount = this.currentStatus.amount.toFixed(2);
	}
	this.addTransaction = function(name, type, amount, date, turnus) {
		var trans = new Transaction(name, type, amount, date, turnus);
		this.transactions.unshift(trans);
		//this.transactions.push(trans);
		if(name === 'Wallet' || name === 'wallet') {} else {
			if(type == 'expense') {
				this.subtractFromCurrentStatusAmount(amount);
			} else {
				this.addToCurrentStatusAmount(amount);
			}
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
	function currentStatus(amount, deposits){
		this.amount = amount;
		this.deposits = deposits;
	
		this.getAmount = function() {
			return this.amount;
		}
		this.getDeposits = function() {
			return this.deposits;
		}
	}
	function deposit(name, amount) {
		this.name = name;
		this.amount = amount;
		
		this.getName = function() {
			return this.name;
		}
		this.getAmount = function() {
			return this.amount;
		}
	}
	function Transaction(name, type, amount, date) {
		this.name = name;
		this.type = type;
		this.amount = amount;
		if(date){
			this.date = new Date(date);;
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
			this.date = new Date(date);
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