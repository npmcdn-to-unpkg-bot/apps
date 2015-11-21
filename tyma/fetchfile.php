<?php
$downloadUrl = $_POST['url'];
$request = new Google_Http_Request($downloadUrl, 'GET', null, null);
$httpRequest = $service->getClient()->getAuth()->authenticatedRequest($request);
if ($httpRequest->getResponseHttpCode() == 200) {
  return $httpRequest->getResponseBody();
} else {
  // An error occurred.
  return null;
}
?>
