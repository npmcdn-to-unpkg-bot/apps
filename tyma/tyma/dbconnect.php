<?php
$dbname="DB964414";

$dbhost="rdbms.strato.de";

$dbuser="U964414";

$dbpass="pepsi47";

$connect = mysqli_connect($dbhost,$dbuser,$dbpass);

mysqli_select_db($connect,$dbname);

echo mysql_error();
?>