<?php 
	$json = $_POST['json']; 
	$budgetfile = fopen("/data/budget.json", "w") or die("Unable to open file!");	
	fwrite($budgetfile, $json);
?>