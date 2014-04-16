////////////////////////////
//Storage Error Handling
////////////////////////////	
var showError = function(error) {
	if (window.console) {  // Skip the "if" in node.js code.
		console.error(error);
	}

	switch (error.status) {
		case 401:
			// If you're using dropbox.js, the only cause behind this error is that
			// the user token expired.
			// Get the user through the authentication flow again.					
			console.log("error 401: token expired. You need to authenticate again.");
			localStorage.removeItem('dropbox_authstatus');
			break;
				
		case 404:			
			client.writeFile("Me/Budget.json", '{"currentStatus":0,"transactions":[],"recurringTransactions":[]}', function(error, stat) {
				if (error) {
					return showError(error);  // Something went wrong.
				}	
				ConnectToCloud();
			});			
			// The file or folder you tried to access is not in the user's Dropbox.
			// Handling this error is specific to your application.
			break;

		case 507:
			console.log("Your Dropbox is full. Please free some space and come back to this app");
			// The user is over their Dropbox quota.
			// Tell them their Dropbox is full. Refreshing the page won't help.
			break;

		case 503:
			console.log("The App is currently overloaded, pls try again later.");
			// Too many API requests. Tell the user to try again later.
			// Long-term, optimize your code to use fewer API calls.
			break;

		case 400:  
			// Bad input parameter
		case 403:  
			// Bad OAuth request.
		case 405:  
			// Request method not expected
		default:
			// Caused by a bug in dropbox.js, in your application, or in Dropbox.
			// Tell the user an error occurred, ask them to refresh the page.
	}
};
////////////////////////////
//Storage functions
////////////////////////////
ConnectToCloud = function () {
// aus lokalem Speicher laden
storage = localStorage.getItem('Storage');
// überprüfen ob überhaupt eine Voreinstellung vorhanden ist.
if(storage) {
	
	//-->debug
	// console.log("storage vorhanden:"+storage);	
	switch (storage) {
		case 'dropbox':			
			dropbox_authStatus = localStorage.getItem('dropbox_authstatus');
			// console.log("authstatus: "+dropbox_authStatus);
			
			var client = new Dropbox.Client({
					key: "hm4c58qp6rpysot", secret: "w7cdx6o8p2hyubj"
			});
			
			if(!dropbox_authStatus) {				
				localStorage.setItem('dropbox_authstatus','initialized');	
				//initialization				
				console.log("initialized");
				//preset driver to the dropbox page
				client.authDriver(new Dropbox.Drivers.Redirect({rememberUser: true}));
				//authentication
				client.authenticate(function(error, client) {
					if (error) {
						return showError(error);  // Something went wrong.
					}
				});
			} else if (dropbox_authStatus === 'initialized') {
				localStorage.setItem('dropbox_authstatus','finalized');	
				//continuation				
				console.log("continued");
				//preset driver to the dropbox page
				client.authDriver(new Dropbox.Drivers.Redirect({rememberUser: true}));
				//authentication
				client.authenticate(function(error, client) {
					if (error) {
						return showError(error);  // Something went wrong.
					}
					client.getUserInfo(function(error, userInfo) {
						if (error) {
							return showError(error);  // Something went wrong.
						}
						
						console.log("hello: "+userInfo.name);
						//Speichern der verwendeten Cloudspeicher Option
						localStorage.setItem('dropbox_auth', JSON.stringify(client.credentials()));
						console.log("credentials saved:"+JSON.stringify(client.credentials()));
						
					});	
					client.readdir("/", function(error, entries) {
						if (error) {
							return showError(error);  // Something went wrong.
						}						
						$.each(entries, function() {
							if(this == "Me") {	
								console.log('"Me" found ');
								client.readdir("Me", function(error, entries) {
									if (error) {
										return showError(error);  // Something went wrong.
									}																	
								});									
							}														
						});						
					});					
					loadData(displayData);
				});		
			} else {				
				client = new Dropbox.Client(JSON.parse(localStorage.getItem('dropbox_auth')));
				client.authenticate(function(error, client) {
					if (error) {
						return showError(error);  // Something went wrong.
					}					
					client.readdir("/", function(error, entries) {
						if (error) {
							return showError(error);  // Something went wrong.
						}						
						$.each(entries, function() {
							if(this == "Me") {								
								client.readdir("Me", function(error, entries) {
									if (error) {
										return showError(error);  // Something went wrong.
									}																		
								});									
							}														
						});						
					});					
					loadData(displayData);
				});				
			}						
		break;
		case 'googledrive':
		break;
		case 'skydrive':
		break;
	}
	
} else {
	$(location).attr('href','http://apps.thebluneproject.de/welcome.html?origin=budget');
}
}								
function getInfo() {
	console.log((localStorage.getItem('dropbox_auth')));
	client = new Dropbox.Client(JSON.parse(localStorage.getItem('dropbox_auth')));	
	// client.authDriver(new Dropbox.Drivers.Redirect());
	client.authenticate(function(error, client) {
		if (error) {   
			return showError(error);
		}
		client.getUserInfo(function(error, userInfo) {
			if (error) {
				return showError(error);  // Something went wrong.
			}

			var userName = userInfo.name;
			$("#infocontainer").html(userName);
		});	  
	});		
}
function loadData(callback) {	
	client = new Dropbox.Client(JSON.parse(localStorage.getItem('dropbox_auth')));	
	// client.authDriver(new Dropbox.Drivers.Redirect());
	client.authenticate(function(error, client) {
		if (error) {   
			return showError(error);
		}
		client.readFile("Me/Budget.json", function(error, data) {
			if (error) {
				return showError(error);  // Something went wrong.
			}			
			//JSON.parse needed?!?
			data = JSON.parse(data);
			var amount = data.currentStatus.amount;	
			budget.setCurrentStatusAmount(amount);	
			var deposits = [];			
			$.each(data.currentStatus.deposits, function() {				
				budget.addDeposit(this.name,this.amount);	
			});			
			data.transactions = data.transactions.reverse();
			$.each(data.transactions, function() {			
				budget.addTransaction(this.name,this.type,this.amount,this.date);				
			});	
			$.each(data.recurringTransactions, function() {			
				budget.addRecurringTransaction(this.name,this.type,this.amount,this.date);				
			});		
			//console.log(JSON.stringify(budget));
			callback();
		});		
	});	
}
function saveData(callback) {
	client = new Dropbox.Client(JSON.parse(localStorage.getItem('dropbox_auth')));	
	// client.authDriver(new Dropbox.Drivers.Redirect());
	client.authenticate(function(error, client) {
		if (error) {   
			return showError(error);
		}
		client.writeFile("Me/Budget.json", JSON.stringify(budget), function(error, stat) {
			if (error) {
				return showError(error);  // Something went wrong.
			}
			
			console.log("saved");
			callback();
		});			
	});
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
function addTransaction(name,type,repeat,amount,date) {	
	console.log('name is'+name);
	if(repeat === 'off') {
		console.log(amount);
		budget.addTransaction(name,type,amount,date);
	} else { 
		budget.addRecurringTransaction(name,type,amount,date);
	}	
	//console.log("data is: "+JSON.stringify(budget));
	saveData(displayData);
}