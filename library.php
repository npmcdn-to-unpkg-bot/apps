<?php
//$xml_apps = simplexml_load_file('apps.xml');
?>
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
    <body  onload="resetAlign2()" onresize="resetAlign2()">		
		<header id="Header" name="alignMe">
			Library
		</header>
		<ul id="liblist">
			<?php
				// for($i = 0; $i < count($xml_apps->app); $i++) {		
					// echo '<li class="largetile '.$xml_apps->app[$i]->name.'">
							// <a href="" onclick="Addapp('.$xml_apps->app[$i]->name.')">
								// <section id="icon" style="background: url('.$xml_apps->app[$i]->iconurl.') no-repeat; background-size: 100px; background-position: center;">
								// </section>
								// <h2>'.$xml_apps->app[$i]->name.'</h2>
							// </a>
						// </li>';
				// }
			?>			
		</ul>
    </body>
	
</html>