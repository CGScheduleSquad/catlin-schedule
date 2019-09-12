<html>
	<head>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
		<link rel="stylesheet" href="style.css">
		<script src="https://cdnjs.cloudflare.com/ajax/libs/ical.js/1.3.0/ical.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
		<script src="script.js"></script>
		<title>CGS Schedule</title>
	</head>
	<body>
		<div class="ical">
			<?php echo file_get_contents('https://api.veracross.com/catlin/subscribe/BE79FB23-3D0E-41D3-9F55-C3C7D9DE4AB3.ics'); ?>
		</div>
	</body>
</html>
