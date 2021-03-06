// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '762864484291.apps.googleusercontent.com';

var SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': true
    }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
  var welcome = document.getElementById('welcome');
  if (authResult && !authResult.error) {
    // Hide auth UI, then load client library.
    welcome.style.display = 'none';
    loadDriveApi();
  } else {
    // Show auth UI, allowing the user to initiate authorization by
    // clicking authorize button.
    welcome.style.display = 'inline';
  }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
  gapi.auth.authorize(
    {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
    handleAuthResult);
  return false;
}

/**
 * Load Drive API client library.
 */
function loadDriveApi() {
  gapi.client.load('drive', 'v2', getFile);
}

/**
 * Print files.
 */
function getFile() {
  //ID = 1aqP_MbXYS1xrWrZFEC607vNl57VmbSaKWIcofmB_RWY
  //Does not work due to CORS restriction/Firewall/etc.....google api is not doable....
  var request = gapi.client.drive.files.get({
    'fileId': '1aqP_MbXYS1xrWrZFEC607vNl57VmbSaKWIcofmB_RWY'
  });
  request.execute(function(resp) {
    download_url = resp.exportLinks['text/csv'];
    console.log(download_url);   
    var accessToken = gapi.auth.getToken().access_token;
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      xhr.open('GET', download_url);
      xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
      xhr.onload = function() {
        var responseText = xhr.responseText;
        console.log(responseText);
      };
      xhr.onerror = function() {
        console.log('Error:'+xhr.statusText);
      };
      xhr.send();
    } else {
      console.log('CORS not supported');
    }
  });
}

/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('output');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}
