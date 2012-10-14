//
//Storage Error Handling
//
	storage = localStorage.getItem('Storage');
	
	var showError = function(error) {
		if (window.console) {  // Skip the "if" in node.js code.
			console.error(error);
		}

		switch (error.status) {
			case 401:
				// If you're using dropbox.js, the only cause behind this error is that
				// the user token expired.
				// Get the user through the authentication flow again.
					switch (storage) {
					case 'dropbox':
						alert("error 401: token expired");
						// var client = new Dropbox.Client({
							// key: "hm4c58qp6rpysot", secret: "w7cdx6o8p2hyubj"
						// });
						// client.authDriver(new Dropbox.Drivers.Redirect());
						// client.authenticate(function(error, client) {
							// if (error) {
								// return showError(error);  // Something went wrong.
							// }		
						// });
						// localStorage.removeItem('dropbox_auth');						
						break;
					case 'googledrive':
						alert('googledrive chosen');
						break;
					case 'skydrive':
						alert('skydrive chosen');
						break;
					default:
						break;
				}					
				break;
				
			case 404:
				// The file or folder you tried to access is not in the user's Dropbox.
				// Handling this error is specific to your application.
				break;

			case 507:
				// The user is over their Dropbox quota.
				// Tell them their Dropbox is full. Refreshing the page won't help.
				break;

			case 503:
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