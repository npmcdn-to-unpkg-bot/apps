<?php
	include('../../apis/tmdb/TMDb.php');
			   
	$tmdb = new TMDb('8b4db9235ddff7aa057ccbdae2f7eded',TMDb::XML); //change 'API-key' with yours   
	
	//Title to search for
	$query = $_GET['query'];
	
	if(empty($query)) {
		$query = "batman";
		// echo 'no results found.';
		exit;
	}
	//Search Movie with default return format		
	$xml_result_movies = new SimpleXMLElement($tmdb->searchMovie($query));  //ordnet der variable ein XML-Objekt zu auf dass wie folgt ausgegeben werden kann		
	//Search Person with default return format
	$xml_result_person = new SimpleXMLElement($tmdb->searchPerson($query));  //ordnet der variable ein XML-Objekt zu auf dass wie folgt ausgegeben werden kann	
	echo '
		<h1>
			<span>You searched for <i>'.$query.'</i></span><br>
			Movies - '.count($xml_result_movies->movies->movie).' results
		</h1>
		<ul id="result_movie">';		
			for($i = 0; $i < count($xml_result_movies->movies->movie); $i++) {				
				echo '
					<li>
						<a href="'.$xml_result_movies->movies->movie[$i]->url.'">
						<img src="grafiken/overlay.png" class="img-overlay">
						<div id="thumbnail-box">
							<img src="';
								$img = $xml_result_movies->movies->movie[$i]->images->image[2];
								if(is_object($img)) {
									echo $xml_result_movies->movies->movie[$i]->images->image[2]->attributes()->url;
								} else {
									echo 'http://cf2.themoviedb.org/assets/2cedc4385eebe/images/no-profile-w92.jpg';
								}
				echo		'"></div>
							<div id="movie_short_info">
							<span>'.$xml_result_movies->movies->movie[$i]->name.'</span><br>
							<span>'.$xml_result_movies->movies->movie[$i]->rating.' | '.$xml_result_movies->movies->movie[$i]->released.'</span>
							</div>
						</a>
					</li>';
			}
	echo'
			<div style="clear: both;"></div>
		</ul>
		<h1>
			People - '.count($xml_result_person->people->person).' results
		</h1>
		<ul id="result_person">';		
			for($i = 0; $i < count($xml_result_person->people->person); $i++) {				
				echo '
					<li>
						<a href="'.$xml_result_person->people->person[$i]->url.'">
							<img src="';
								$img = $xml_result_person->people->person[$i]->images->image[2];
								if(is_object($img)) {
									echo $xml_result_person->people->person[$i]->images->image[2]->attributes()->url;
								} else {
									echo 'http://cf2.themoviedb.org/assets/2cedc4385eebe/images/no-profile-w92.jpg';
								}
				echo		'">
							<div id="personname">'.
							$xml_result_person->people->person[$i]->name.'
							</div>
						</a>						
					</li>';				
			}
	echo'
			<div style="clear: both;"></div>
		</ul>';
?>