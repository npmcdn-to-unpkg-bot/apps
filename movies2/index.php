<!DOCTYPE html>

<html lang="de" xml:lang="de">
	
	<head>
		<meta charset="ISO-8859-1" />
		<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;">
		
		<title>Movies</title>
		<!--Dropbox-->
		<script src="//cdnjs.cloudflare.com/ajax/libs/dropbox.js/0.5.0/dropbox.min.js"></script>
		<!-- Javascript -->
		<script src="http://code.jquery.com/jquery-1.7.2.min.js"></script>				
		<script type="text/javascript" src="script.js"></script>
		<!-- Jquery UI -->
		<script type="text/javascript" src="http://www.thebluneproject.de/jquery-ui-1.8.23.custom/js/jquery-ui-1.8.23.custom.min.js"></script>		
		<script src="http://www.thebluneproject.de/jquery%20ui%20touch%20punch/jquery.ui.touch-punch.min.js"></script>
		<script src="http://www.thebluneproject.de/jquery-ui-extensions/autocomplete/jquery.ui.autocomplete.html.js"></script>
		<!-- CSS -->
		<link rel="stylesheet" media="all" type="text/css" href="style.css" />		
	</head>
	<body onload="align()" onresize="align()">
		<header id="searchheader">
			<form id="searchform"  onsubmit="search()">
				<input type="search" name="search" id="search" placeholder="Search for Movies, Artists and Regissseurs">			
			</form>
		</header>
		<section id="content">
		</section>
		<footer id="menu">
			<section id="checkin">
			</section>
			<section id="bottombar">
			</section>
		</footer>
	</body>
</html>