<?php
header ('Content-type: text/html; charset=iso-8859-1');
$mode = $_GET['mode'].'.php';
		
if ($mode == '.php')
	{$mode = 'search.php';}
?>
<!DOCTYPE html>
<html lang="de" xml:lang="de">
	<head>
		<title>Movies</title>
		
		<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;">
		
		<link rel="stylesheet" href="movies.css">
		<link rel="stylesheet" href="general.css">
	</head>
	<body >
		<header>
		<div id="vorhang"></div>
		<nav>
			<a href="http://movies.thebluneproject.de/?mode=library" id="library">
				<!--<img src="http://thebluneproject.de/aufbau/pictograms/book.svg">-->
				<span>Library</span>
			</a>
			<a href="http://movies.thebluneproject.de/?mode=watchlist" id="watchlist">
				<!--<img src="http://thebluneproject.de/aufbau/pictograms/clipboard.svg">-->
				<span>Watchlist</span>
			</a>
			<a href="http://movies.thebluneproject.de/?mode=history" id="history">
				<!--<img src="http://thebluneproject.de/aufbau/pictograms/checkbox.svg">-->
				<span>History</span>				
			</a>
		</nav>
			<form id="search" action="http://movies.thebluneproject.de/?mode=search" method="get">
				<input type="text" id="query" name="query" placeholder="Movies & Persons">
				<input type="submit" id="submit">	
			</form>
			<div style="clear: both;"></div>		
		<div id="header-info">
		 <h3>Our recommendation: <u>The Dark Knight Rises</u></h3>
		</div>
			<!-- 
			<div class="notifications">
				<?php		
					// if (empty($_SESSION['alert']))
								// {
									// echo '<p style="color: green; ">'.$_SESSION['note'].'</p>';
									// unset ($_SESSION['note']);
								// }
							// else
								// {
									// echo '<p style="color: red;">'.$_SESSION['alert'].'</p>';
									// unset ($_SESSION['alert']);
								// }
				?>
			</div>
			-->
			<div style="clear: both;"></div>
		</header>
		<section id="mode">
			<?php include($mode); ?>
		</section>
	</body>
</html>