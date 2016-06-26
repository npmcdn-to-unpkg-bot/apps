<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);

include_once("dbconnect.php");	

$data = array();

$abfrage = "SELECT * FROM Timetracking";
$ergebnis = mysqli_query($connect,$abfrage);	


while($row = mysqli_fetch_assoc($ergebnis))
		{   
    $data[] =  $row;
		}
echo json_encode($data);
?>