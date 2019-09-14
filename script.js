const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const inMatrix = (query, matrix) => {
  let res = -1;
  matrix.forEach((el, i) => { if (el.includes(query)) res = i; });
  return res;
};

const getDescription = matrix => {
  let i = inMatrix('description', matrix);
  let description = {};
  if (i > -1) {
    let raw = matrix[i][3];
    raw.split('; ').forEach(a => {
      let kv = a.split(': ');
      if (kv.length > 2) for (let i = 2; i < kv.length; i++) kv[1] += `: ${ kv[i] }`;
      description[kv[0].toLowerCase()] = kv[1];
    });
  }
  return description;
};

const getDT = (time, matrix) => {
  let i = inMatrix(`dt${ time }`, matrix);
  return i > -1 ? new Date(matrix[i][3]) : [];
};

const getLocation = matrix => {
  let i = inMatrix('location', matrix);
  return i > -1 ? matrix[i][3] : 'N/A';
};

const getSummary = matrix => {
  let i = inMatrix('summary', matrix);
  return i > -1 ? matrix[i][3].split(' - ') : ['N/A', 'N/A', 'N/A'];
};

const parse = ev => {
  let start = new Date(ev.dtstart);
  let end = new Date(ev.dtend);
};

window.addEventListener('load', () => {
  try {
    let raw = document.getElementsByClassName('ical')[0].innerText.trim();
    document.getElementsByClassName('ical')[0].innerText = '';

    let ical = ICAL.parse(raw);
    let events = ical[2];
    events.filter(a => a[1].length === 8).forEach(a => {
      let description = getDescription(a[1]);
      let dtstart = getDT('start', a[1]);
      let dtend = getDT('end', a[1]);
      let location = getLocation(a[1]);
      let summary = getSummary(a[1]);
      parse({ description, dtstart, dtend, location, summary });
    });
    document.getElementById('schedule').style.display = 'block';

    let today = new Date();
    let monday = new Date();
    monday.setDate(today.getDay() === 0 ? today.getDate() + 1 : today.getDate() - (today.getDay() - 1));
    Array.from(document.getElementsByClassName('daylabel')).forEach((day, i) => {
      day.firstChild.innerText = `${ day.innerText } ${ months[monday.getMonth()] } ${ monday.getDate() + i }` // TODO: month changes during the week
    });
    // loadSchedule();
  } catch {
    document.getElementById('login').style.display = '';
    M.AutoInit();
    M.Modal.getInstance(document.getElementById('login')).open();
    document.getElementsByClassName('submit-url')[0].addEventListener('click', () => {
      location.search = `?url=${ document.getElementById('url').value }`;
    });
  }
});

// // TODO: Get rid of html snippets
//
// const colorDict = {
//   0: '#C0C0C0',
//   1: '#FFCE51',
//   2: '#A67FB9',
//   3: '#E67326',
//   4: '#00ABBD',
//   5: '#AAC02C',
//   6: '#EF4957',
//   7: '#FF75F2',
//   'free': 'white'
// };
//
// const normalTimes = [
//   new Date(0, 0, 0, 8, 0),
//   new Date(0, 0, 0, 8, 45),
//   new Date(0, 0, 0, 9, 20),
//   new Date(0, 0, 0, 9, 30),
//   new Date(0, 0, 0, 9, 45),
//   new Date(0, 0, 0, 10, 35),
//   new Date(0, 0, 0, 11, 20),
//   new Date(0, 0, 0, 11, 55),
//   new Date(0, 0, 0, 12, 30),
//   new Date(0, 0, 0, 13, 10),
//   new Date(0, 0, 0, 13, 40),
//   new Date(0, 0, 0, 14, 30)
// ];
//
// let userName = '';
// let schoolEndTime = new Date(0, 0, 0, 15, 15);
// let normalAllTimes = normalTimes.concat([schoolEndTime]);
//
// function loadSchedule() {
//   // noinspection JSUnresolvedFunction
//
//   // get the date from the search parameters, if there isn't a date, use the current date
//   const date = new URL(window.location.href).searchParams.get("date");
//   const seedDate = date !== null ? new Date(date) : new Date();
//
//   // get the the monday previous to the seed date
//   const thisMonday = getLastFriday(seedDate);
//   thisMonday.setDate(thisMonday.getDate() + 3);
//
//   // get the previous and next monday for the arrows TODO: Dont modify the dates inside getDatesForWeek so this order doesn't matter
//   const previousMonday = new Date(thisMonday);
//   const nextMonday = new Date(thisMonday);
//   previousMonday.setDate(thisMonday.getDate() - 7);
//   nextMonday.setDate(thisMonday.getDate() + 7);
//
//   // load the schedule table
//   $('table').hide();
//   Promise.all(getDatesForWeek(new Date(thisMonday)).map(httpRequestScheduleForDate)).then(res => {
//     res.forEach(appendDay);
//     $('.mainlabel b').text(userName);
//     $('table').show();
//   });
//
//   // left/right arrows
//   let navigationArrows = $('td.arrows a');
//   navigationArrows.first().prop('href', '?date=' + dateToVeracrossDate(previousMonday) + "&url=" + new URL(window.location.href).searchParams.get("url"));
//   navigationArrows.last().prop('href', '?date=' + dateToVeracrossDate(nextMonday) + "&url=" + new URL(window.location.href).searchParams.get("url"));
//
//   // this week
//   $('#this-week a').prop('href', "?url=" + new URL(window.location.href).searchParams.get("url"));
//
//   // return to portal link
//   $('td.controls.links a').last().prop('href', 'https://portals.veracross.com/catlin/student/student/daily-schedule?date=' + dateToVeracrossDate(seedDate));
// }
//
// function getDatesForWeek(mondayDate) { // [2019-9-16, 2019-9-17, etc...]
//   let dates = [];
//   for (let i = 0; i < 5; i++) {
//     dates.push(new Date(mondayDate));
//     mondayDate.setDate(mondayDate.getDate() + 1);
//   }
//   return dates;
// }
//
// function httpRequestScheduleForDate(date) { // http request to veracross for the schedule blocks
//   return new Promise(function (resolve) {
//
//
//     let arr = allEvents.filter(event => {
//       return compareDates(event.date, date)
//     });
//     let letter = "A";
//     // if (userName === '') { // if the username hasn't been set, get the username
//     //   userName = data.match(/full_name: "[A-z ]+(?=",)/)[0].split('"')[1];
//     // }
//     resolve({date, letter, blocks: arr});
//   });
// }
//
// //
// // function httpRequestScheduleForDate(dateString) { // http request to veracross for the schedule blocks
// //   return new Promise(function (resolve) {
// //     $.get(`https://portals.veracross.com/catlin/student/student/daily-schedule?date=${ dateString }`, data => {
// //       let arr = [];
// //       $(data).find('.schedule .schedule-item').each((index, value) => { // find all the blocks and get the time, title, and subtitle
// //         let timeString = $(value).find('.item-time').text().replace('NOW', '').trim();
// //         let startTime = parseVeracrossTime(timeString);
// //         let title = $(value).find('.item-main-description').text().trim();
// //         let subtitle = $(value).find('.item-subtitle').text().trim();
// //         arr.push({startTime, title, subtitle, rowSpan: 1});
// //       });
// //       let splitDate = dateString.split('-'); // get the current date
// //       let date = new Date(splitDate[0], splitDate[1] - 1, splitDate[2]);
// //       let letter = $(data).find('.rotation-day-header').text().trim().slice(-1);
// //       if (userName === '') { // if the username hasn't been set, get the username
// //         userName = data.match(/full_name: "[A-z ]+(?=",)/)[0].split('"')[1];
// //       }
// //       resolve({date, letter, blocks: arr});
// //     }).fail(() => window.location.href = "https://portals.veracross.com/catlin"); // user was not logged in, redirect them to login page
// //   });
// // }
//
// function appendDay(daySchedule) {
//   let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//   let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//
//   // append the header with a link to the veracross page
//   $('table.sched.main > tbody > tr:nth-child(1)').append(`
//   <td class="daylabel">
//     <a href="https://portals.veracross.com/catlin/student/student/daily-schedule?date=${ dateToVeracrossDate(daySchedule.date) }">
//     <b>
//       ${ days[daySchedule.date.getDay()] } ${ months[daySchedule.date.getMonth()] } ${ daySchedule.date.getDate() + (!daySchedule.letter ? '' : ` (${ daySchedule.letter })`) }
//     </b>
//     </a>
//   </td>
//   `);
//   if (isEmptyDay(daySchedule)) { // append the day blocks
//     appendBlankSchedule('No Events', colorDict.free);
//   } else if (isNormalDay(daySchedule)) {
//     appendRegularSchedule(applyCustomBlockRules(filterBlocks(daySchedule)));
//   } else {
//     appendInlineSchedule(applyCustomBlockRules(filterBlocks(daySchedule)));
//   }
// }
//
// function filterBlocks(daySchedule) { // removes blocks not between 12 and 3 and duplicates
//   daySchedule.blocks = daySchedule.blocks.filter(block => {
//     let startHours = block.startTime.getHours();
//     if (startHours < 8 || startHours >= 12 + 3) return false;
//     return !daySchedule.blocks.some((otherBlock) => { // keep longer description one (TODO: show conflict)
//       let sameTime = block.startTime.getTime() === otherBlock.startTime.getTime();
//       return sameTime && (block.title.length < otherBlock.title.length || block.subtitle.length < otherBlock.subtitle.length);
//     });
//   });
//   return daySchedule;
// }
//
// //<editor-fold desc="Schedule appenders">
// function appendBlankSchedule(text, bgcolor, link = '') {
//   return $('table.sched.main > tbody > tr:nth-child(2)').append(`<td rowspan="12" class="specialday" style="background: ${ bgcolor };"><a ${ (link === '' ? '' : `href=${ link }`) } class="coursename">${ text }</a></td>`);
// }
//
// function appendRegularSchedule(daySchedule) {
//   daySchedule = prepRegularSchedule(daySchedule);
//   daySchedule.blocks.forEach(block => {
//     let normalTimeIndex = 1;
//     normalTimes.some(time => {
//       normalTimeIndex++;
//       return block.startTime.getHours() === time.getHours() && block.startTime.getMinutes() === time.getMinutes();
//     });
//     let smallBlock = block.title === block.subtitle || block.subtitle === '' || block.title === 'US C&C';
//     let blockNumMatchAttempt = block.subtitle.match(/Block \d(?! Flex)/);
//     let bgcolor = blockNumMatchAttempt !== null ? colorDict[parseInt(blockNumMatchAttempt[0].slice(-1))] : block.free || block.subtitle.match(/Break/) != null || block.subtitle.match(/Lunch/) != null ? colorDict.free : colorDict[0];
//     if (!block.free) {
//       block.title = block.title.split(' - ')[0];
//       block.subtitle = block.subtitle.split(' • ').slice(-2).reverse().join(' - ').replace('US ', 'Blk ').replace(' Long', '');
//     }
//     $(`table.sched.main > tbody > tr:nth-child(${ normalTimeIndex })`).append(`<td rowspan="${ block.rowSpan }" class="period mins${ block.mins }" style="background: ${ bgcolor };"><span class="coursename">${ block.title }</span>${ (smallBlock ? '' : '<br>') }<span class="subtitle">${ (smallBlock ? '' : block.subtitle) }</span><br></td>`);
//   });
// }
//
// function compareDates(first, second) {
//   return first.getFullYear() === second.getFullYear() &&
//     first.getMonth() === second.getMonth() &&
//     first.getDate() === second.getDate();
// }
//
// function compareTimes(first, second) {
//   return first.getHours() === second.getHours() &&
//     first.getMinutes() === second.getMinutes();
// }
//
//
// function prepRegularSchedule(daySchedule) {
//   let newBlocks = [];
//   normalTimes.forEach(time => { // for each normal start time, push null to newBlocks if no blocks begin at the start time and push the block into newBlocks if it begins at the start time
//     let blockWithTime = daySchedule.blocks.find(block => compareTimes(block.startTime, time));
//     newBlocks.push(blockWithTime === undefined ? null : blockWithTime);
//   });
//
//   for (let i = 0; i < newBlocks.length; i++) { // Replace empty blocks with free blocks and extend long blocks into the next period
//     if (newBlocks[i] === null) {
//       let title = 'Free';
//       switch (i) {
//         case 6:
//           title = 'Free<span class="subtitle"> - AM Flex</span>';
//           break;
//         case 7:
//           title = 'Co-Curric';
//           break;
//         case 9:
//           title = 'Free<span class="subtitle"> - PM Flex</span>';
//           break;
//       }
//       newBlocks[i] = {'startTime': normalTimes[i], 'title': title, 'subtitle': '', 'rowSpan': 1, 'free': true};
//     }
//     if (i < newBlocks.length - 1 && (newBlocks[i].subtitle.match(/\dL/) != null || newBlocks[i].free || newBlocks[i].title === 'Assembly') && newBlocks[i + 1] == null) {
//       newBlocks[i].rowSpan++;
//       newBlocks[i + 1] = 'remove';
//       i++;
//     }
//   }
//   newBlocks = newBlocks.filter(block => block !== 'remove');
//
//   let timeIndex = 0;
//   newBlocks.forEach(block => { // calculate the duration of the block from the number of rows (time blocks) it spans
//     block.mins = Math.min(Math.max(new Date(normalAllTimes[timeIndex + block.rowSpan].getTime() - normalAllTimes[timeIndex].getTime()).getTime() / 1000 / 60, 5), 90);
//     timeIndex = timeIndex + block.rowSpan;
//   });
//
//   daySchedule.blocks = newBlocks;
//   return daySchedule;
// }
//
// function appendInlineSchedule(daySchedule) {
//   $('table.sched.main > tbody > tr:nth-child(2)').append(`<td rowspan="12" class="specialday" style="border-top-style: solid; border-right-style: solid; border-bottom: 0px; border-left-style: solid;"><table class="sched week special"><tbody>`);
//
//   if (daySchedule.blocks[0].startTime.getTime() !== normalTimes[0].getTime()) {
//     daySchedule.blocks.unshift({'startTime': normalTimes[0], 'title': 'Free', 'subtitle': '', 'rowSpan': 1, 'lateStart':true});
//   }
//
//   daySchedule.blocks.forEach((block, index) => {
//     block.endTime = index === daySchedule.blocks.length - 1 ? schoolEndTime : daySchedule.blocks[index + 1].startTime;
//     block.mins = Math.min(Math.max(new Date(block.endTime.getTime() - block.startTime.getTime()).getTime() / 1000 / 60, 5), 90);
//   });
//
//   daySchedule.blocks.forEach(block => {
//     let minsClass = `mins${ block.mins }`;
//
//     if (block.lateStart) {
//       $('.special tbody').last().append(`<tr class="${ minsClass }"><td colspan="2" class="period ${ minsClass } specialperiod" style="background: ${ colorDict.free };"><span class="coursename">${ block.title }</span><br></td></tr>`);
//       return;
//     }
//
//     let timeRange = `${ format12HourTime(block.startTime) }-${ format12HourTime(block.endTime) }`;
//
//     // start duplicate
//     let smallBlock = block.title === block.subtitle || block.subtitle === '' || block.title === 'US C&C';
//     let blockNumMatchAttempt = block.subtitle.match(/Block \d(?! Flex)/);
//     let bgcolor = blockNumMatchAttempt !== null ? colorDict[parseInt(blockNumMatchAttempt[0].slice(-1))] : block.free || block.subtitle.match(/Break/) != null || block.subtitle.match(/Lunch/) != null ? colorDict.free : colorDict[0];
//     if (!block.free) {
//       block.title = block.title.split(' - ')[0];
//       block.subtitle = block.subtitle.split(' • ').slice(-2).reverse().join(' - ').replace('US ', 'Blk ').replace(' Long', '');
//     }
//     // end duplicate
//
//     $('.special tbody').last().append(`<tr class="${ minsClass }"><td class="times ${ minsClass }">${ timeRange }</td><td rowspan="1" class="period ${ minsClass } specialperiod" style="background: ${ bgcolor };"><span class="coursename">${ block.title }</span>${ (smallBlock ? '' : '<br>') }<span class="subtitle">${ (smallBlock ? '' : block.subtitle) }</span><br></td></tr>`);
//   });
// }
// //</editor-fold>
//
// //<editor-fold desc="Custom rules">
// const roboticsManagers = ['Tristan Peng', 'Liam Wang', 'Dylan Smith', 'Avery Pritchard', 'Kristin Cohrs', 'Zachary Robinson', 'Tiffany Toh', 'Eric Wang', 'Mick Leungpathomaram', 'Annika Holliday', 'Audrey Daniels', 'Jeffrey Burt']; // TODO: temporary
// function applyCustomBlockRules(daySchedule) {
//   if (roboticsManagers.includes(userName)) {
//     daySchedule.blocks.forEach(block => {
//       if (block.title === 'Co-Curric' && daySchedule.letter === 'B') {
//         block.title = 'Robotics Meeting';
//         block.subtitle = 'Gerlinger';
//         block.free = false;
//       } else if (block.title === 'Co-Curric' && daySchedule.letter === 'F') {
//         block.title = 'Robotics Manager\'s Meeting';
//         block.subtitle = 'Lib 4';
//         block.free = false;
//       }
//     });
//   }
//   return daySchedule;
// }
// //</editor-fold>
//
// //<editor-fold desc="Schedule conditions">
// function isNormalDay(daySchedule) {
//   return daySchedule.blocks.every(block => {
//     let startHours = block.startTime.getHours();
//     let startMinutes = block.startTime.getMinutes();
//     if (startHours < 8 || startHours >= 12 + 3) return true;
//     return normalTimes.some(time => startHours === time.getHours() && startMinutes === time.getMinutes());
//   });
// }
//
// function isEmptyDay(daySchedule) {
//   return daySchedule.blocks.length === 0;
// }
//
// //</editor-fold>
//
// //<editor-fold desc="Static date utilities">
// function parseVeracrossTime(timeString) {
//   let isPm = false;
//   if (timeString.includes('am')) {
//     timeString = timeString.replace(' am', '');
//   }
//   if (timeString.includes('pm')) {
//     timeString = timeString.replace(' pm', '');
//     isPm = true;
//   }
//   let splitString = timeString.split(':');
//   return new Date(0, 0, 0, parseInt(splitString[0]) + (isPm && parseInt(splitString[0]) !== 12 ? 12 : 0), parseInt(splitString[1]));
// }
//
// function dateToVeracrossDate(date) {
//   return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
// }
//
// function format12HourTime(date) {
//   return ((date.getHours() - 1) % 12 + 1) + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
// }
//
// function getLastFriday(date) {
//   let d = new Date(date);
//   let day = d.getDay();
//   let diff = (day <= 5) ? (7 - 5 + day) : (day - 5);
//
//   d.setDate(d.getDate() - diff);
//   d.setHours(0);
//   d.setMinutes(0);
//   d.setSeconds(0);
//
//   return d;
// }
// //</editor-fold>
