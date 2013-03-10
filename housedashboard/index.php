<!DOCTYPE html>

<html lang="de" xml:lang="de" <!--manifest="manifest.appcache"-->
  
  <head>	     
        <title>Dashboard</title>       
		<meta charset="ISO-8859-1" />
		<!-- CSS -->
		<link rel="stylesheet" media="all" type="text/css" href="http://www.thebluneproject.de/apps/normalize.css" />
        <link rel="stylesheet" media="all" type="text/css" href="http://www.thebluneproject.de/apps/housedashboard/style.css" />			
		<!--Dropbox-->
		<script src="//cdnjs.cloudflare.com/ajax/libs/dropbox.js/0.5.0/dropbox.min.js"></script>
		<!-- Javascript -->
		<script src="http://code.jquery.com/jquery-1.7.2.min.js"></script>		
		<script type="text/javascript" src="script.js"></script>	
		<!-- Jquery UI -->
		<script type="text/javascript" src="http://www.thebluneproject.de/jquery-ui-1.8.23.custom/js/jquery-ui-1.8.23.custom.min.js"></script>		
		<script src="http://www.thebluneproject.de/jquery ui touch punch/jquery.ui.touch-punch.min.js"></script>
		<!-- Meta -->
		<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;">		
	</head>    
    <body>	
    	<div id="header">	
			<form id="alertform">				
				<input type="text" id="taskname" name="taskname" placeholder="What do you want me to keep track of?" />				
				<label for="taskperiod">Recurring:</label>
				<select id="taskperiod">
					<option value="daily">Every Day</option>
					<option selected="" value="weekly">Every Week</option>
					<option value="monthly">Every Month</option>
					<option value="3monthly">Every 3 Months</option>
					<option value="6monthly">Every 6 Months</option>
					<option value="yearly">Every Year</option>
				</select>
				<label for="taskalert">Alert me:</label>
				<input type="text" id="taskalert" name="taskalert" placeholder="0" />	
				<label for="taskalert">Days before due.</label>
				<button onclick="save()">Save</button>
			</form>
		</div>
		<div id="content">
			<div id="title">
				<div class="name">
					Task
				</div>
				<div class="duedate">
					Due on 
				</div>
				<div class="recurring">
					Recurring
				</div>
			</div>
			<!-- <div id="1">..... -->
		</div>	
    </body>
	
</html>