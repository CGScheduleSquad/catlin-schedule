<html>
<head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
	<link rel="stylesheet" href="style.css">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/ical.js/1.3.0/ical.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
	<script src="script.js"></script>
	<link rel="shortcut icon" href="https://inside.catlin.edu/scripts/sched/favicon.ico">
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
			<div class="input-field">
				<input placeholder="Paste subscription URL here" id="url" type="text" name="url">
				<label for="url">Subscription URL</label>
			</div>
		</div>
		<div class="modal-footer">
			<button class="modal-close waves-effect waves-green btn-flat submit-url">Submit</button>
		</div>
	</div>
	<table class="controls">
		<tbody>
			<tr>
				<td class="controls arrows">
					<a><img src="https://inside.catlin.edu/scripts/sched/left48.png"></a>
				</td>
				<td class="controls links">
					<a href="https://portals.veracross.com/catlin/student/student/daily-schedule">Today</a>
				</td>
				<td class="controls links">
					<a href="?">This Week</a>
				</td>
				<td class="controls links">
					<a>Return To Portal</a>
				</td>
				<td class="controls arrows">
					<a><img src="https://inside.catlin.edu/scripts/sched/right48.png"></a>
				</td>
			</tr>
		</tbody>
	</table>
	<hr class="controls">
	<div id="schedarea">
		<table class="sched week main">
			<tbody>
				<tr>
					<td class="mainlabel"><b></b></td>
				</tr>
				<tr class="mins45">
					<td class="times mins45">8:00-8:45</td>
				</tr>
				<tr class="mins25">
					<td class="times mins25">8:45-9:15</td>
				</tr>
				<tr class="mins10">
					<td class="times mins10">9:20-9:30</td>
				</tr>
				<tr class="mins10">
					<td class="times mins10">9:30-9:40</td>
				</tr>
				<tr class="mins45">
					<td class="times mins45">9:45-10:30</td>
				</tr>
				<tr class="mins45">
					<td class="times mins45">10:35-11:20</td>
				</tr>
				<tr class="mins25">
					<td class="times mins25">11:20-11:50</td>
				</tr>
				<tr class="mins35">
					<td class="times mins35">11:55-12:30</td>
				</tr>
				<tr class="mins35">
					<td class="times mins35">12:30-1:05</td>
				</tr>
				<tr class="mins25">
					<td class="times mins25">1:10-1:40</td>
				</tr>
				<tr class="mins45">
					<td class="times mins45">1:40-2:25</td>
				</tr>
				<tr class="mins45">
					<td class="times mins45">2:30-3:15</td>
				</tr>
			</tbody>
		</table>
	</div>
</body>
</html>
