function Budget(startAmount,transactions,recurringTransactions) {
	this.startAmount = startAmount;
	this.transactions = transactions;
	this.recurringTransactions = recurringTransactions;
  
	this.setCurrentStartAmount = function(amount) {
		this.startAmount = amount;	 
	};
	this.getCurrentStartAmount = function() {
		return this.startAmount;	 
	};
	this.addTransaction = function(name, type, amount, itemlist, date) {
		var trans = new Transaction(name, type, amount, itemlist, date);
		this.transactions.unshift(trans);
		//this.transactions.push(trans);		
	} 
	this.editTransaction = function(id,name,amount,itemlist,date) {
		this.transactions[id].name = name;
		this.transactions[id].amount = amount;
		this.transactions[id].itemlist = itemlist;
		if(date){
			this.transactions[id].date = new Date(date);;
		} else {
			alert("error date is missing");
		}
	}
	this.getTransactions = function() {
		return transactions;	 
	}
	this.addRecurringTransaction = function(name, type, amount, itemlist, date) {
		var trans = new recurringTransaction(name, type, amount, itemlist, date);
		this.recurringTransactions.unshift(trans);
		//this.transactions.push(trans);
	}
	this.getRecurringTransactions = function() {
		return recurringTransactions;	 
	}
}
	function Transaction(name, type, amount, itemlist, date) {
		this.name = name;
		this.type = type;
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
	}
	function recurringTransaction(name, type, amount, itemlist, date) {
		this.name = name;
		this.type = type;
		this.amount = amount;
		this.itemlist = itemlist;
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
		this.getItemlist = function() {
			return this.itemlist;
		}
		this.getDate = function() {		
			return this.date;
		}
		this.getType = function() {
			return this.type;
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