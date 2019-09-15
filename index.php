<!DOCTYPE html>
<html lang="">
<head>
  <title>CGS Schedule</title>
  <meta http-equiv="cache-control" content="max-age=0">
  <meta http-equiv="cache-control" content="no-cache">
  <meta http-equiv="expires" content="-1">
  <meta http-equiv="expires" content="Tue, 01 Jan 1980 11:00:00 GMT">
  <meta http-equiv="pragma" content="no-cache">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <link rel="shortcut icon" href="https://inside.catlin.edu/scripts/sched/favicon.ico">
  <?php
    $str = '<link rel=stylesheet href=https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css>';
    echo isset($_GET['url']) ? '' : $str;
  ?>
  <link rel="stylesheet" href="style.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/ical.js/1.3.0/ical.min.js"></script>
  <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
  <script src="script.js"></script>
</head>
<body>
  <pre class="ical">
    <?php echo file_get_contents(str_replace('webcal', 'http', $_GET['url'])); ?>
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
  <div id="schedule">
    <table class="controls">
      <tbody>
        <tr>
          <td class="controls arrows">
            <a><img src="https://inside.catlin.edu/scripts/sched/left48.png"></a>
          </td>
          <td class="controls links">
            <a href="https://portals.veracross.com/catlin/student/student/daily-schedule">Today</a>
          </td>
          <td id="this-week" class="controls links">
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
            <td class="daylabel"><b>Mon</b></td>
            <td class="daylabel"><b>Tue</b></td>
            <td class="daylabel"><b>Wed</b></td>
            <td class="daylabel"><b>Thu</b></td>
            <td class="daylabel"><b>Fri</b></td>
          </tr>
          <tr class="mins45">
            <td class="times mins45">8:00-8:45</td>
            <td rowspan="1" class="period mins45 0" id="0-0">Free</td>
            <td rowspan="1" class="period mins45 1" id="1-0">Free</td>
            <td rowspan="1" class="period mins45 2" id="2-0">Free</td>
            <td rowspan="1" class="period mins45 3" id="3-0">Free</td>
            <td rowspan="1" class="period mins45 4" id="4-0">Free</td>
          </tr>
          <tr class="mins25">
            <td class="times mins25">8:45-9:15</td>
            <td rowspan="1" class="period mins25 0" id="0-1">Free<span class="subtitle"> - Early Flex</span></td>
            <td rowspan="1" class="period mins25 1" id="1-1">Free<span class="subtitle"> - Early Flex</span></td>
            <td rowspan="1" class="period mins25 2" id="2-1">Free<span class="subtitle"> - Early Flex</span></td>
            <td rowspan="1" class="period mins25 3" id="3-1">Free<span class="subtitle"> - Early Flex</span></td>
            <td rowspan="1" class="period mins25 4" id="4-1">Free<span class="subtitle"> - Early Flex</span></td>
          </tr>
          <tr class="mins10">
            <td class="times mins10">9:20-9:30</td>
            <td rowspan="1" class="period mins10 0" id="0-2">Break</td>
            <td rowspan="1" class="period mins10 1" id="1-2">Break</td>
            <td rowspan="1" class="period mins10 2" id="2-2">Break</td>
            <td rowspan="1" class="period mins10 3" id="3-2">Break</td>
            <td rowspan="1" class="period mins10 4" id="4-2">Break</td>
          </tr>
          <tr class="mins10">
            <td class="times mins10">9:30-9:40</td>
            <td rowspan="1" class="period mins10 0" id="0-3">Break</td>
            <td rowspan="1" class="period mins10 1" id="1-3">Break</td>
            <td rowspan="1" class="period mins10 2" id="2-3">Break</td>
            <td rowspan="1" class="period mins10 3" id="3-3">Break</td>
            <td rowspan="1" class="period mins10 4" id="4-3">Break</td>
          </tr>
          <tr class="mins45">
            <td class="times mins45">9:45-10:30</td>
            <td rowspan="1" class="period mins45 0" id="0-4">Free</td>
            <td rowspan="1" class="period mins45 1" id="1-4">Free</td>
            <td rowspan="1" class="period mins45 2" id="2-4">Free</td>
            <td rowspan="1" class="period mins45 3" id="3-4">Free</td>
            <td rowspan="1" class="period mins45 4" id="4-4">Free</td>
          </tr>
          <tr class="mins45">
            <td class="times mins45">10:35-11:20</td>
            <td rowspan="1" class="period mins45 0" id="0-5">Free</td>
            <td rowspan="1" class="period mins45 1" id="1-5">Free</td>
            <td rowspan="1" class="period mins45 2" id="2-5">Free</td>
            <td rowspan="1" class="period mins45 3" id="3-5">Free</td>
            <td rowspan="1" class="period mins45 4" id="4-5">Free</td>
          </tr>
          <tr class="mins25">
            <td class="times mins25">11:20-11:50</td>
            <td rowspan="1" class="period mins25 0" id="0-6">Free<span class="subtitle"> - AM Flex</span></td>
            <td rowspan="1" class="period mins25 1" id="1-6">Free<span class="subtitle"> - AM Flex</span></td>
            <td rowspan="1" class="period mins25 2" id="2-6">Free<span class="subtitle"> - AM Flex</span></td>
            <td rowspan="1" class="period mins25 3" id="3-6">Free<span class="subtitle"> - AM Flex</span></td>
            <td rowspan="1" class="period mins25 4" id="4-6">Free<span class="subtitle"> - AM Flex</span></td>
          </tr>
          <tr class="mins35">
            <td class="times mins35">11:55-12:30</td>
            <td rowspan="1" class="period mins35 0" id="0-7">Co-Curric</td>
            <td rowspan="1" class="period mins35 1" id="1-7">Co-Curric</td>
            <td rowspan="1" class="period mins35 2" id="2-7">Co-Curric</td>
            <td rowspan="1" class="period mins35 3" id="3-7">Co-Curric</td>
            <td rowspan="1" class="period mins35 4" id="4-7">Co-Curric</td>
          </tr>
          <tr class="mins35">
            <td class="times mins35">12:30-1:05</td>
            <td rowspan="1" class="period mins35 0" id="0-8">Lunch</td>
            <td rowspan="1" class="period mins35 1" id="1-8">Lunch</td>
            <td rowspan="1" class="period mins35 2" id="2-8">Lunch</td>
            <td rowspan="1" class="period mins35 3" id="3-8">Lunch</td>
            <td rowspan="1" class="period mins35 4" id="4-8">Lunch</td>
          </tr>
          <tr class="mins25">
            <td class="times mins25">1:10-1:40</td>
            <td rowspan="1" class="period mins25 0" id="0-9">Free<span class="subtitle"> - PM Flex</span></td>
            <td rowspan="1" class="period mins25 1" id="1-9">Free<span class="subtitle"> - PM Flex</span></td>
            <td rowspan="1" class="period mins25 2" id="2-9">Free<span class="subtitle"> - PM Flex</span></td>
            <td rowspan="1" class="period mins25 3" id="3-9">Free<span class="subtitle"> - PM Flex</span></td>
            <td rowspan="1" class="period mins25 4" id="4-9">Free<span class="subtitle"> - PM Flex</span></td>
          </tr>
          <tr class="mins45">
            <td class="times mins45">1:40-2:25</td>
            <td rowspan="1" class="period mins45 0" id="0-10">Free</td>
            <td rowspan="1" class="period mins45 1" id="1-10">Free</td>
            <td rowspan="1" class="period mins45 2" id="2-10">Free</td>
            <td rowspan="1" class="period mins45 3" id="3-10">Free</td>
            <td rowspan="1" class="period mins45 4" id="4-10">Free</td>
          </tr>
          <tr class="mins45">
            <td class="times mins45">2:30-3:15</td>
            <td rowspan="1" class="period mins45 0" id="0-11">Free</td>
            <td rowspan="1" class="period mins45 1" id="1-11">Free</td>
            <td rowspan="1" class="period mins45 2" id="2-11">Free</td>
            <td rowspan="1" class="period mins45 3" id="3-11">Free</td>
            <td rowspan="1" class="period mins45 4" id="4-11">Free</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</body>
