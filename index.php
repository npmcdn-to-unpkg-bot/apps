<!DOCTYPE html>

<html lang="de" xml:lang="de" <!--manifest="manifest.appcache"-->
  
  <head>	     
        <title>Apps</title>       
		<meta charset="ISO-8859-1" />
		<!-- CSS -->
        <link rel="stylesheet" media="all" type="text/css" href="http://www.thebluneproject.de/apps/style.css" />			
		<!--Dropbox-->
		<script src="//cdnjs.cloudflare.com/ajax/libs/dropbox.js/0.5.0/dropbox.min.js"></script>
		<!-- Javascript -->
		<script src="http://code.jquery.com/jquery-1.7.2.min.js"></script>	
		<script type="text/javascript" src="storage.js"></script>	
		<script type="text/javascript" src="script.js"></script>
		<script type="text/javascript" src="structure.js"></script>
		<script type="text/javascript" src="functions.js"></script>			
		<!-- Jquery UI -->
		<script type="text/javascript" src="http://www.thebluneproject.de/jquery-ui-1.8.23.custom/js/jquery-ui-1.8.23.custom.min.js"></script>		
		<script src="http://www.thebluneproject.de/jquery ui touch punch/jquery.ui.touch-punch.min.js"></script>
		<!-- Meta -->
		<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;">		
	</head>    
    <body onload="resetAlign()" onresize="resetAlign()">		
		<header id="Header" name="alignMe">
			Apps
			<section id="appoptions">
				<div id="trash">
				</div>
				<div style="clear: both"></div>
			</section>
			<div style="clear: both"></div>
		</header>	
		<ul id="applist">		
			<div style="clear: both"></div>
		</ul>	
		<div style="clear: both"></div>
    </body>
	
</html>