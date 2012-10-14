<!DOCTYPE html>

<html lang="de" xml:lang="de">
	
	<head>
		<meta charset="ISO-8859-1" />
		<meta name="viewport" content="initial-scale=1.0, width=device-width">
		
		<title>Willkommen zu meinen Apps!</title>
		
		<!-- CSS -->
		<link rel="stylesheet" media="all" type="text/css" href="style.css" />		
		<!-- Javascript -->
		<script src="http://code.jquery.com/jquery-1.7.2.min.js"></script>	
		<script type="text/javascript" src="welcome.js"></script>
		<script type="text/javascript" src="storage.js"></script>
		<script type="text/javascript" src="functions.js"></script>
		<!--Dropbox-->
		<script src="//cdnjs.cloudflare.com/ajax/libs/dropbox.js/0.5.0/dropbox.min.js"></script>
	</head>
	<body>
		<h1>Wilkommen zu meinen Apps!</h1>
		<h2>Meine Apps zeichnen sich dadurch aus, dass alle von dir eingegebenen Daten zentral in leicht weiterzuverwendendem Maschinencode auf einem Cloudspeicher niedergelegt werden. Dies soll Querverweise zwischen Datensets erleichtern, die Anwendungsmöglichkeit und Nutzbarkeit der Daten beschleunigen und natürlich ihrem Datenschutz dienen, da diese Daten auf keinem Server gespeichert werden. Zum Nutzen meiner Apps bedarf es also nur ein paar klicks. Wählen sie ihren cloudprovider, authorisieren sie die app und sie sind startbereit!</h2>
		<a href="#" id="dropbox" onclick="setDropbox()" title="Dropbox">Dropbox</a>
		<a href="#" id="gooogledrive" onclick="setDrive()" title="Google Drive">Google Drive</a>
		<a href="#" id="skydrive" onclick="setSkydrive()" title="Skydrive">Skydrive</a>
	</body>
</html>