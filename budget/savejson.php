<?php
	$json = $_POST['json'];
	define('ROOT', $_SERVER['DOCUMENT_ROOT']);
	$budgetfile = fopen(ROOT."/data/budget.json", "w") or die("Unable to open file!");
	fwrite($budgetfile, $json);
?>
