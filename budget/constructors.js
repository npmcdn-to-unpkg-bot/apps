function Budget(deposits,transactions,recurringTransactions) {
	//this.startAmount = startAmount;
	this.deposits = deposits;
	this.transactions = transactions;
	this.recurringTransactions = recurringTransactions;
  
	// this.setCurrentStartAmount = function(amount,deposit) {
		// this.startAmount = amount;	 
	// };
	 
	this.addDeposit = function(name, startAmount) {
		var depo = new Deposit(name, startAmount);		
		this.deposits.unshift(depo);	 	
		//this.transactions.push(trans);		
	}
	this.getDeposits = function() {
		return deposits;	 
	}
	this.getCurrentStartAmount = function(depositname) {		
		$.each(this.deposits, function() {			
			if(this.getName() == depositname){
				startAmount = this.getStartAmount();
				return false;
			}
		});	
		return startAmount;
	};
	this.addTransaction = function(name, type, deposit, amount, itemlist, date) {
		var trans = new Transaction(name, type, deposit, amount, itemlist, date);		
		this.transactions.unshift(trans);		
		//this.transactions.push(trans);		
	}	
	this.editTransaction = function(id, name, amount, itemlist, date) {
		this.transactions[id].name = name;
		this.transactions[id].amount = amount;
		this.transactions[id].itemlist = itemlist;
		if(date){
			var date = new Date(date);
			var currentDate = new Date(this.transactions[id].date);
			if(Date.compare(date,currentDate) == 1 || Date.compare(date,currentDate) == -1) {
				console.log(date);
				console.log(currentDate);
				console.log('date differs from previous data');
				this.transactions[id].date = date;
				console.log('editingTransactions');
				repositionTransactions();
			} else {
				this.transactions[id].date = date;
			}			
		} 
	}
	this.getTransactions = function() {
		return transactions;	 
	}
	this.addRecurringTransaction = function(name, type, deposit, amount, date) {
		var trans = new recurringTransaction(name, type, deposit, amount, date);
		this.recurringTransactions.unshift(trans);
		//this.transactions.push(trans);
	}
	this.getRecurringTransactions = function() {
		return recurringTransactions;	 
	}
}
	function Deposit(name, startAmount) {
		this.name = name;
		this.startAmount = startAmount;
		
		this.getName = function() {
			return this.name;
		}
		this.getStartAmount = function() {
			return this.startAmount;
		}
	}
	function Transaction(name, type, deposit, amount, itemlist, date) {
		this.name = name;
		this.type = type;
		this.deposit = deposit;
		this.amount = amount;
		this.itemlist = itemlist;
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
		this.getAmountstring = function() {
			amount = (Math.round(this.amount * 100)/100).toFixed(2);
			return amount;
		}
		this.getItemlist = function() {
			return this.itemlist;
		}
		this.getDate = function() {
			return this.date;
		}	
		this.getType = function() {
			return this.type;
		}	
		this.getDeposit = function() {
			return this.deposit;
		}
	}
	function recurringTransaction(name, type,deposit, amount, date) {
		this.name = name;
		this.type = type;
		this.amount = amount;		
		this.deposit = deposit;
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
		this.getAmountstring = function() {
			amount = (Math.round(this.amount * 100)/100).toFixed(2);
			return amount;
		}		
		this.getDate = function() {		
			return this.date;
		}
		this.getType = function() {
			return this.type;
		}	
		this.getDeposit = function() {
			return this.deposit;
		}
	} 
	function Item(quantity,name,number) {
		this.quantity = quantity;
		this.name = name;
		this.number = number;
		this.getName = function() {
			return this.name;
		}
		this.getQuantity = function() {
			return this.quantity;
		}
		this.getNumber = function() {
			return this.number;
		}
	}