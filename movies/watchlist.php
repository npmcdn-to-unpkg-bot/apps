<script language="javascript">
	localStorage.setItem("key", "hi");    					//speichert einen wert unter key ab.
	// document.write (localStorage.getItem("key"));			//gibt den wert in das dokument aus.
	
	//Formular um daten direk im local storage abzuspeichern.
	// <form onsubmit="daten_speichern(); return false">
    // <input type="text" name="vorname" />
    // </form>
	
	//Spricht folgende Funktion an, parameter veränderbar.
    function daten_speichern() {
    localStorage.setItem("vorname", document.forms[0]["name"].value);
    }
	// Löschen eines einzelnen Wertes
	// localStorage.removeItem("key");
	
	// Löschen des gesamten lokalen speichers.
    // localStorage.clear();
</script>
<?php
			include('../../apis/tmdb/TMDb.php');
			   
			$tmdb = new TMDb('8b4db9235ddff7aa057ccbdae2f7eded',TMDb::XML); //change 'API-key' with yours   
			?>	
			<?php
				//Title to search for
				$title = 'Orphan';
				
				//Search Movie with default return format		
				$xml_movies_result = new SimpleXMLElement($tmdb->searchMovie($title));  //ordnet der variable ein XML-Objekt zu auf dass wie folgt zugegruffen werden kann
				$name = $xml_movies_result->movies->movie[1]->name;						// Zugriffsstruktur orientiert sich an aufbau des dokumentes sie TMDB api referenz.
				echo $name.'<br>';
				
				echo count($xml_movies_result->movies->movie).' results';
				// if (empty($name)) {
					// echo 'leer.<br>';
				// } else {
					// echo $name.'<br>';
				// }
					
				// print_r($xml_movies_result);
?>	