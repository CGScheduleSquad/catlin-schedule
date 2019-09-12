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
		<pre class="ical">
			<?php echo file_get_contents(str_replace('webcal', 'https', $_GET['url'])); ?>
		</pre>
		<div id="login" class="modal">
	    <div class="modal-content">
	      <h4>Subscription Link</h4>
				<br>
				<br>
				<form method="get">
          <input placeholder="Paste subscription URL here" id="url" type="text" name="url">
					<br>
					<button class="modal-close waves-effect waves-green btn-flat" type="submit" name="action">Submit</button>
				</form>
	    </div>
	  </div>
	</body>
</html>
