<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);

include_once("dbconnect.php");	

$data = array();


$abfrage = "SELECT * FROM Timetracking";
$ergebnis = mysql_query($abfrage,$connect);	


while($row = mysql_fetch_object($ergebnis))
		{   
    $array =  array(date_parse($row->date),$row->activity);
    array_push($data,$array);
		}
// print_r($data[90][0]);

function lastentry($Y,$M,$D) {
  global $data;
  $latest = array();
   foreach ($data as &$entry) {
    if($entry[0]['year'] == $Y && $entry[0]['month'] == $M && $entry[0]['day'] == $D) {
      $latest = $entry;
      break;
    }
   }
  foreach ($data as &$entry) {
    if($entry[0]['year'] == $Y && $entry[0]['month'] == $M && $entry[0]['day'] == $D) {     
      if($entry[0]['hour'] > $latest[0]['hour']) {
        $latest = $entry;
      } elseif ($entry[0]['hour'] == $latest[0]['hour']) {
        if($entry[0]['minute'] > $latest[0]['minute']) {
          $latest = $entry;
        }
      }
    }   
  } 
  return $latest;
}

function today() {
  
  global $data;
  //Categories
  $sleep = 0;
  $work = 0;
  $free = 0;
  $sport = 0;
//   echo 'cate';
  //last entry of the day before
  $lastentry = lastentry(date("Y"),date("n"),date('d',strtotime("-1 days")));
  $category = $lastentry[1];
//   echo $category;
  $startpoint = 0;
//   echo 'start';
  
  foreach ($data as &$entry) {
    if($entry[0]['year'] == date("Y") && $entry[0]['month'] == date("n") && $entry[0]['day'] == date("d")) {
      $duration = ($entry[0]['hour']*60+$entry[0]['minute'])-$startpoint;
//       echo $duration;
      switch ($category) {
        case 'sleep':           
            $sleep +=  $duration;
            break;
        case 'work':            
            $work +=  $duration;
            break;
        case 'free':          
             $free +=  $duration;
            break;
        case 'sport':          
             $sport +=  $duration;
            break;
      }
      $category = $entry[1];
      $startpoint = ($entry[0]['hour']*60+$entry[0]['minute']);      
    } 
  }
  $duration = (date("H")*60+intval(date('i')))-$startpoint;
  switch ($category) {
    case 'sleep':           
        $sleep +=  $duration;
        break;
    case 'work':            
        $work +=  $duration;
        break;
    case 'free':          
         $free +=  $duration;
        break;
    case 'sport':          
         $sport +=  $duration;
        break;
   }
  $result = array(array('free',$free),array('sleep',$sleep),array('sport',$sport),array('work',$work));
  return $result;
//    echo $work; //minutes used for that each today
  
// Kontrollle: Summe muss aktuelle Zeit ergeben
//   $hour = (int) (($work+$sleep+$free+$sport) / 60);
//    echo 'hour: ' + $hour;
//    echo 'minute' + ($work+$sleep+$free+$sport)-($hour*60);
//   echo "Beispielfunktion.\n";
//     return $retval;
  
}
function PieToday() {
	$maday = 24*60;
	$minutes = today();
	$mactivity = $minutes[1][1];
// 	echo $mactivity;
	$degree = (90+($mactivity / $maday)*360);
	$stylestring = '<pie id="sleep" style=" background-image: linear-gradient('.$degree.'deg, transparent 50%, green 50%), linear-gradient(90deg, green 50%, transparent 50%);"></pie>';
	return $stylestring;
}
// lastentry(date("Y"),date("n"),date("d"));
// print_r(today());
?>
