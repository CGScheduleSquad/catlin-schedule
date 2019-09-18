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
  <link rel="apple-touch-icon" href="https://raw.githubusercontent.com/Kizjkre/catlin-schedule/veracross/apple-touch-icon.png">
  <?php
    $str = '<link rel=stylesheet href=https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css>';
    echo isset($_GET['schedules']) ? '' : $str;
  ?>
  <link rel="stylesheet" href="style.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/ical.js/1.3.0/ical.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
  <script src="script.js"></script>
</head>
<body>
  <pre class="ical" id="ical-schedules">
    <?php echo file_get_contents(str_replace('webcal', 'http', $_GET['schedules'])); ?>
  </pre>
  <pre class="ical" id="ical-student">
    <?php echo file_get_contents(str_replace('webcal', 'http', $_GET['student'])); ?>
  </pre>
  <div id="login" class="modal">
    <div class="modal-content">
      <h4>Subscription Link</h4>
      <br>
      <br>
      <div class="input-field">
        <input placeholder="Paste subscription URL here" id="schedules" type="text" name="url">
        <label for="url">Class Schedules</label>
      </div>
      <br>
      <div class="input-field">
        <input placeholder="Paste subscription URL here" id="student" type="text" name="url">
        <label for="url">Student Calendar</label>
      </div>
    </div>
    <div class="modal-footer">
      <button class="modal-close waves-effect waves-green btn-flat to-terms">Submit</button>
    </div>
  </div>
  <div id="terms" class="modal">
    <div class="modal-content">
      <h4>Terms and Conditions</h4>
      <br>
      <p>By accessing and using CGS Schedule (henceforth referred to as "the Site" or "the Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in the Service will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use the Service.</p>
      <br>
      <h5>What Personal Information We Collect</h5>
      <p>The Site does not collect any personal information. If you choose to use the Service, we ask you to provide limited personal information (i.e. calendar feeds), but we do not collect this information.</p>
      <br>
      <h5>Cookies Policy</h5>
      <p>The Site uses a standard technology called "cookies" to collect information about how our site is used. Cookies were designed to help a website operator determine that a particular user had visited the site previously and thus save and remember any preferences that may have been set. We may make use of “persistent or memory based” cookies, which remain on your computer’s hard drive until you delete them to improve user experience with the Site. Examples include our use of these cookies to pre-populate forms you complete on our website based on information you have previously provided to us and to provide access to class schedules in a timely manner. Although you have the ability to modify your browser to either accept all cookies, notify you when a cookie is sent, or reject all cookies, it may not be possible to utilize the Service if you reject cookies.</p>
      <br>
      <h5>Limitations of Liability</h5>
      <p>The Site and its components are offered for informational purposes only; the Site shall not be responsible or liable for the accuracy, usefulness or availability of any information transmitted or made available via the Site, and shall not be responsible or liable for any error or omissions in that information. The Service is not responsible for any infraction committed against Catlin Gabel School policy as dictated in the Commitment Statement as a result of misuse of the Service or errors or omissions in the information provided by the Service. The Site is also not responsible for any personal information made public as a result of the Service, including but not limited to calendar feeds for class and student schedules.</p>
			<br>
      <h5>Termination</h5>
      <p>We may terminate your access to the site, without cause or notice. All provisions of this Agreement that, by their nature, should survive termination shall survive termination.</p>
			<br>
      <h5>Notification of Changes</h5>
      <p>The Service reserves the right to change these conditions from time to time as it sees fit and your continued use of the site will signify your acceptance of any adjustment to these terms. If there are any changes to our privacy policy, we will announce that these changes have been made on our home page. If there are any changes in how we use our site customers' Personally Identifiable Information, notification by email or postal mail will be made to those affected by the change. Any changes to our privacy policy will be posted on our site 30 days prior to these changes taking place. You are therefore advised to re-read this statement on a regular basis.</p>
      <br>
      <i>CGS Schedule is not sponsored, recognized, nor endorsed by the Catlin Gabel School or its affiliates.</i>
    </div>
    <div class="modal-footer">
      <button class="modal-close waves-effect waves-green btn-flat submit-url">Accept</button>
    </div>
  </div>
  <div id="schedule">
    <table class="controls">
      <tbody>
        <tr>
          <td class="controls arrows">
            <a id="backwards"><img src="https://inside.catlin.edu/scripts/sched/left48.png"></a>
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
            <a id="forwards"><img src="https://inside.catlin.edu/scripts/sched/right48.png"></a>
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
