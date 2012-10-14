<!DOCTYPE html>

<html lang="de" xml:lang="de">
	
	<head>
		<meta charset="ISO-8859-1" />
		<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;">
		
		<title>Personal Record</title>
		
		<!-- CSS -->
        <link rel="stylesheet" media="all" type="text/css" href="http://www.thebluneproject.de/apps/personalrecord/style.css" />			
		<!--Dropbox-->
		<script src="//cdnjs.cloudflare.com/ajax/libs/dropbox.js/0.5.0/dropbox.min.js"></script>
		<!-- Javascript -->
		<script src="http://code.jquery.com/jquery-1.7.2.min.js"></script>	
		<script type="text/javascript" src="script.js"></script>
		
	</head>
	<body onload="adjust()" onresize="adjust()">
		<div id="paperwork">
			<div id="paperworkbackground">
				<div class="paper" id="still">					
				</div>
				<div class="paper" id="left">
				</div>
				<div class="paper" id="right">
				</div>	
			</div>					
			<div id="paperworkcontent">
				<form>
						<label for="firstname">First Name:</label>
						<input type="text" id="firstname" name="firstname" />
					<br>
						<label for="lastname">Last Name:</label>
						<input type="text" id="lastname" name="lastname" />			
					<br>	
						<label for="birthday">Date of Birth:</label>
						<input type="date" id="birthday" name="birthday" />
					<br>	
						<label for="gender">Gender:</label>
						<input type="text" id="gender" name="gender" />
					<br>	
						<label for="email">Email:</label>
						<input type="email" id="email" name="email" />
					<br>	
						<label for="telephone">Telephone:</label>
						<input type="tel" id="telephone" name="telephone" />
					<br>	
						<label for="homepage">Homepage:</label>
						<input type="url" id="homepage" name="homepage" />
					<br>	
						<button onclick="save()">Save</button>
				</form>
			</div>									
			<div style="clear: both"></div>
		</div>	
	</body>
</html>