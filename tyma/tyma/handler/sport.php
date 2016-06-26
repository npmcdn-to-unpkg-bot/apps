<?php
	$activity = 'Sport';
	$date = new DateTime();
// echo $date->format('F d, Y \a\t h:iA'); 
	$jsonstring = '{"date":"'.$date->format('c').'","activity":"'.$activity.'"}';
// echo $jsonstring;
	define('ROOT', $_SERVER['DOCUMENT_ROOT']);
	$oldjson = file_get_contents(ROOT."/data/tyma.json");
// 	var_dump($oldjson);
	$tempArray = json_decode($oldjson);
// 	var_dump($tempArray);
	array_push($tempArray, json_decode($jsonstring));
	$newjson = json_encode($tempArray);
// 	var_dump($newjson);
	define('ROOT', $_SERVER['DOCUMENT_ROOT']);
	$budgetfile = fopen(ROOT."/data/tyma.json", "w") or die("Unable to open file!");
	fwrite($budgetfile, $newjson);
?>