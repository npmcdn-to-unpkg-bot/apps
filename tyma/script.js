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
  var request = gapi.client.drive.files.get({
    'fileId': '1aqP_MbXYS1xrWrZFEC607vNl57VmbSaKWIcofmB_RWY'
  });
  request.execute(function(resp) {
    download_url = resp.exportLinks['text/csv'];
    $.post('fetchfile.php', {url: download_url}, function() {
      console.log("waiting for php script url:"+download_url);
    })
    .done(function( data ) {
      alert( "Data Loaded: " + data );
    });
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
