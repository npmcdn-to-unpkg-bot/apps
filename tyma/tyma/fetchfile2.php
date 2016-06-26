<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);

session_start();

require_once 'google-api-php-client-1.1.7/src/Google/autoload.php';
$client_id = '762864484291.apps.googleusercontent.com';
$client_secret = 'wS2mO66oW0fisJS5pxSPC4hG';
$redirect_uri = 'http://thebluneproject.de/apps/tyma/fetchfile.php';
$client = new Google_Client();

$client->setClientId($client_id);
$client->setClientSecret($client_secret);
$client->setRedirectUri($redirect_uri);
$client->addScope("https://www.googleapis.com/auth/drive.readonly");

/************************************************
  When we create the service here, we pass the
  client to it. The client then queries the service
  for the required scopes, and uses that when
  generating the authentication URL later.
 ************************************************/
// $service = new Google_Service_Urlshortener($client);

/************************************************
  If we're logging out we just need to clear our
  local access token in this case
 ************************************************/
// if (isset($_REQUEST['logout'])) {
//   unset($_SESSION['access_token']);
// }

/************************************************
  If we have a code back from the OAuth 2.0 flow,
  we need to exchange that with the authenticate()
  function. We store the resultant access token
  bundle in the session, and redirect to ourself.
 ************************************************/
if (isset($_GET['code'])) {
//   echo 'got code';
  $client->authenticate($_GET['code']);
  $_SESSION['access_token'] = $client->getAccessToken();
  $redirect = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'];
  header('Location: ' . filter_var($redirect, FILTER_SANITIZE_URL));
}

/************************************************
  If we have an access token, we can make
  requests, else we generate an authentication URL.
 ************************************************/
if (isset($_SESSION['access_token']) && $_SESSION['access_token']) {
//   echo 'got access token';
  $client->setAccessToken($_SESSION['access_token']);
} else {
//   echo'no access token, generated url';
  $authUrl = $client->createAuthUrl();
  header('Location: ' . filter_var($authUrl, FILTER_SANITIZE_URL));
}
if($client->isAccessTokenExpired()) {
    // Don't think this is required for Analytics API V3
    //$_googleClient->refreshToken($_analytics->dbRefreshToken($_agencyId));
//     echo 'Access Token Expired, requested new token'; // Debug
    $authUrl = $client->createAuthUrl();
    header('Location: ' . filter_var($authUrl, FILTER_SANITIZE_URL));
}
/************************************************
  If we're signed in and have a request to shorten
  a URL, then we create a new URL object, set the
  unshortened URL, and call the 'insert' method on
  the 'url' resource. Note that we re-store the
  access_token bundle, just in case anything
  changed during the request - the main thing that
  might happen here is the access token itself is
  refreshed if the application has offline access.
  
  Javascript Pendant:
  
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
 ************************************************/
if ($client->getAccessToken()) {
  echo 'ready to fire!';
  $fileId = '1aqP_MbXYS1xrWrZFEC607vNl57VmbSaKWIcofmB_RWY'; 
  $drive_service = new Google_Service_Drive($client); 
  echo' download!';
//   var_dump($drive_service);
//   $content = $drive_service->files->export($fileId, 'text/csv');
//   $content = $drive_service->files->export($fileId, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', array(
//   'alt' => 'media' ));
  $content = $drive_service->files->get($fileId, array( 'alt' => 'csv' ));
  echo'done.';
//   $files_list = $drive_service->files->listFiles(array())->getItems();
  var_dump($content);
//    echo'!!!';
//   print_r($content);
//   print_r($content);
//   var_dump(get_class($content)); //Google_Service_Drive_DriveFile
//   var_dump(get_class_methods($content));
//   print $content->{toSimpleObject()};
//   echo $content;
//   var_export($content);
  $_SESSION['access_token'] = $client->getAccessToken();
}
if (strpos($client_id, "googleusercontent") == false) {
  echo missingClientSecretsWarning();
  exit;
}

// ini_set('display_errors', 'On');
// error_reporting(E_ALL | E_STRICT);

// $downloadUrl = $_POST['url'];
// $request = new Google_Http_Request($downloadUrl, 'GET', null, null);
// $httpRequest = $service->getClient()->getAuth()->authenticatedRequest($request);
// if ($httpRequest->getResponseHttpCode() == 200) {
//   return $httpRequest->getResponseBody();
// } else {
//   // An error occurred.
//   return null;
// }
?>