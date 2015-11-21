function loadData(callback) {
	$.getJSON( "/data/budget.json", function( data ) {
		// var amount = data.startAmount;
		// budget.setCurrentStartAmount(amount);
		data.deposits = data.deposits.reverse();
		$.each(data.deposits, function() {
			budget.addDeposit(this.name,this.startAmount);
		});
		data.transactions = data.transactions.reverse();
		$.each(data.transactions, function() {
			budget.addTransaction(this.name,this.type,this.deposit,this.amount,this.itemlist,this.date);
		});
		//Data should always be n order on the server --> this line is only for testing.Remove it later.
		// console.log('reordering on display');
		repositionTransactions();
		$.each(data.recurringTransactions, function() {
			budget.addRecurringTransaction(this.name,this.type,this.deposit,this.amount,this.date);
		});
		console.log("addingHistory0");
		$.each(data.history, function() {
			console.log("addingHistory");
			budget.log(this.action,this.store,this.date);
		});
		//console.log(JSON.stringify(budget));
		callback();
	});
}

function saveData(callback) {
	displayUpload();
	$.post('/apps/budget/savejson.php', {json: JSON.stringify(budget)});
	callback();
}
function processInput(callback) {
	var name = $("input[type='text']").val();
	var type = $(".checkboxlabel:visible").attr('for');
	var repeat = $("input#repeat").val();
	var amount = $("input[name='amount']").val();
	amount = amount.replace(",", ".");
	amount = parseFloat(amount);
	console.log(amount);
	amount = amount.toFixed(2);
	console.log(amount);
	amount = parseFloat(amount);
	if(!$.isNumeric(amount)){
		return;
	}
	var date = $("input[name='date']").val();
	if(!date){
		date = new Date();
	}
	if(name === 'Wallet' || name === 'wallet') {
		if(type == 'expense') {
			budget.addToDeposit('Wallet',amount);
			budget.subtractFromDeposit('Bank',amount);
		} else {
			budget.addToDeposit('Bank',amount);
			budget.subtractFromDeposit('Wallet',amount);
		}
	}
	console.log('processed');
	callback(name,type,repeat,amount,date);
}
function addTransaction(name,type,deposit,repeat,amount,date) {
	console.log('name is'+name);
	if(repeat === 'off') {
		console.log(amount);
		budget.addTransaction(name,type,deposit,amount,date);
	} else {
		budget.addRecurringTransaction(name,type,deposit,amount,date);
	}
	//console.log("data is: "+JSON.stringify(budget));
	saveData(displayDash);
}
