<!DOCTYPE html>

<html lang="de" xml:lang="de" <!--manifest="manifest.appcache"-->
  
  <head> 	
        <meta charset="ISO-8859-1" />
		<meta name="viewport" content="initial-scale=1.0, width=device-width">       
        <title>The Library</title>
        
        <!-- CSS -->
        <link rel="stylesheet" media="all" type="text/css" href="style.css" />		
		
		<!-- Javascript -->
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
		<script type="text/javascript" src="lib.js"></script>
		<script type="text/javascript" src="structure.js"></script>
		<script type="text/javascript" src="functions.js"></script>	

		<!-- Meta -->
		<meta content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" name="viewport">
    </head>    
    <body  onload="resetAlign()" onresize="resetAlign()">		
		<header id="Header" name="alignMe">
			Library
		</header>
		<ul id="liblist">				
		</ul>
    </body>
	
</html>