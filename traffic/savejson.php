<?php 
	$json = $_POST['json']; 
	define('ROOT', $_SERVER['DOCUMENT_ROOT']);
	$trafficfile = fopen(ROOT."/data/traffic.json", "w") or die("Unable to open file!");	
	fwrite($trafficfile, $json);
?>