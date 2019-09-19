const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Block colors
const colors = ['#c0c0c0', '#ffce51', '#a67fb9', '#e67326', '#00abbd', '#aac02c', '#ef4957', '#ff75f2'];

// Checks if an element is in a matrix
const inMatrix = (query, matrix) => {
  let res = -1;
  matrix.forEach((el, i) => { if (el.includes(query)) res = i; });
  return res;
};

// Gets and parses description for classes
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

// Gets start and end times for events
const getDT = (time, matrix) => {
  let i = inMatrix(`dt${ time }`, matrix);
  return i > -1 ? new Date(matrix[i][3]) : null;
};

// Gets location for events
const getLocation = matrix => {
  let i = inMatrix('location', matrix);
  return i > -1 ? matrix[i][3] : 'N/A';
};

// Gets and parses summary for events
const getSummary = matrix => {
  let i = inMatrix('summary', matrix);
  return i > -1 ? matrix[i][3].split(' - ') : ['N/A', 'N/A', 'N/A'];
};

// Gets differnece in days
const diff = (d1, d2) => Math.floor((Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate()) - Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate()) ) / (1000 * 60 * 60 * 24));

// Gets difference in minutes
const mDiff = (d1, d2) => Math.abs(Math.round((d1.getTime() - d2.getTime()) / 1000 / 60));

// Adds regular schedule classes
const addClasses = (cl, i) => {
  let el;
  switch (`${ cl.dtstart.getHours() }:${ cl.dtstart.getMinutes() }`) {
    case '8:0':
      el = document.getElementById(`${ i }-0`);
      el.style.background = colors[cl.description.block[1] === 'X' ? 0 : cl.description.block[0]];
      el.innerHTML = `
        <span class="coursename">${ cl.summary[0] }</span>
        <br>
        <span class="subtitle">${ cl.description.room }${ cl.summary[1] !== undefined ? ` - ${ cl.summary[1] }` : '' }</span>
      `;
      if (cl.dtend.getMinutes() === 15) {
        document.getElementById(`${ i }-1`).style.display = 'none';
        el.setAttribute('rowspan', 2);
      }
      break;
    case '9:20':
      el = document.getElementById(`${ i }-2`);
      el.style.background = colors[0];
      el.innerHTML = `${ cl.summary[0] }<span class="subtitle"> - ${ cl.description.room }</span>`;
      break;
    case '9:45':
      el = document.getElementById(`${ i }-4`);
      el.style.background = colors[cl.description.block[1] === 'X' ? 0 : cl.description.block[0]];
      el.innerHTML = `
        <span class="coursename">${ cl.summary[0] }</span>
        <br>
        <span class="subtitle">${ cl.description.room }${ cl.summary[1] !== undefined ? ` - ${ cl.summary[1] }` : '' }</span>
      `;
      break;
    case '10:35':
      el = document.getElementById(`${ i }-5`);
      el.style.background = colors[cl.description.block[1] === 'X' ? 0 : cl.description.block[0]];
      el.innerHTML = `
        <span class="coursename">${ cl.summary[0] }</span>
        <br>
        <span class="subtitle">${ cl.description.room }${ cl.summary[1] !== undefined ? ` - ${ cl.summary[1] }` : '' }</span>
      `;
      if (cl.dtend.getMinutes() === 50) {
        document.getElementById(`${ i }-6`).style.display = 'none';
        el.setAttribute('rowspan', 2);
      }
      break;
    case '11:20':
      el = document.getElementById(`${ i }-6`);
      el.style.background = colors[0];
      el.innerHTML = `
        <span class="coursename">${ cl.summary[0] }</span>
        <br>
        <span class="subtitle">${ cl.description.room }${ cl.summary[1] !== undefined ? ` - ${ cl.summary[1] }` : '' }</span>
      `;
    	break;
    case '13:10':
      el = document.getElementById(`${ i }-9`);
      el.style.background = colors[cl.description.block[1] === 'X' ? 0 : cl.description.block[0]];
      el.innerHTML = `
        <span class="coursename">${ cl.summary[0] }</span>
        <br>
        <span class="subtitle">${ cl.description.room }${ cl.summary[1] !== undefined ? ` - ${ cl.summary[1] }` : '' }</span>
      `;
      if (cl.dtend.getMinutes() === 25) {
        document.getElementById(`${ i }-10`).style.display = 'none';
        el.setAttribute('rowspan', 2);
      }
      break;
    case '13:40':
      el = document.getElementById(`${ i }-10`);
      el.style.background = colors[cl.description.block[1] === 'X' ? 0 : cl.description.block[0]];
      el.innerHTML = `
        <span class="coursename">${ cl.summary[0] }</span>
        <br>
        <span class="subtitle">${ cl.description.room }${ cl.summary[1] !== undefined ? ` - ${ cl.summary[1] }` : '' }</span>
      `;
      break;
    case '14:30':
      el = document.getElementById(`${ i }-11`);
      el.style.background = colors[cl.description.block[1] === 'X' ? 0 : cl.description.block[0]];
      el.innerHTML = `
        <span class="coursename">${ cl.summary[0] }</span>
        <br>
        <span class="subtitle">${ cl.description.room }${ cl.summary[1] !== undefined ? ` - ${ cl.summary[1] }` : '' }</span>
      `;
      break;
  }
  // TODO: Simplify switch
};

// Add classes on late start days
const addLateClasses = (cl, day) => cl.forEach(c => {
  let el;
  switch (`${ c.dtstart.getHours() }:${ c.dtstart.getMinutes() }`) {
    case '9:0':
      el = document.getElementById(`late-0`);
      el.style.background = colors[c.description.block[1] === 'X' ? 0 : c.description.block[0]];
      el.innerHTML = `
        <span class="coursename">${ c.summary[0] }</span>
        <br>
        <span class="subtitle">${ c.description.room }${ c.summary[1] !== undefined ? ` - ${ c.summary[1] }` : '' }</span>
      `;
      if (c.dtend.getMinutes() === 10) {
        document.getElementById(`late-1`).style.display = 'none';
        el.setAttribute('rowspan', 2);
      }
      break;
    case '10:30':
      el = document.getElementById(`late-3`);
      el.style.background = colors[c.description.block[1] === 'X' ? 0 : c.description.block[0]];
      el.innerHTML = `
        <span class="coursename">${ c.summary[0] }</span>
        <br>
        <span class="subtitle">${ c.description.room }${ c.summary[1] !== undefined ? ` - ${ c.summary[1] }` : '' }</span>
      `;
      break;
    case '11:20':
      el = document.getElementById(`late-4`);
      el.style.background = colors[c.description.block[1] === 'X' ? 0 : c.description.block[0]];
      el.innerHTML = `
        <span class="coursename">${ c.summary[0] }</span>
        <br>
        <span class="subtitle">${ c.description.room }${ c.summary[1] !== undefined ? ` - ${ c.summary[1] }` : '' }</span>
      `;
      if (c.dtend.getMinutes() === 30) {
        document.getElementById(`late-5`).style.display = 'none';
        el.setAttribute('rowspan', 2);
      }
      break;
    case '13:15':
      el = document.getElementById(`late-7`);
      el.style.background = colors[c.description.block[1] === 'X' ? 0 : c.description.block[0]];
      el.innerHTML = `
        <span class="coursename">${ c.summary[0] }</span>
        <br>
        <span class="subtitle">${ c.description.room }${ c.summary[1] !== undefined ? ` - ${ c.summary[1] }` : '' }</span>
      `;
      if (c.dtend.getMinutes() === 30) {
        document.getElementById(`late-8`).style.display = 'none';
        el.setAttribute('rowspan', 2);
      }
      break;
    case '13:40':
      el = document.getElementById(`late-8`);
      el.style.background = colors[c.description.block[1] === 'X' ? 0 : c.description.block[0]];
      el.innerHTML = `
        <span class="coursename">${ c.summary[0] }</span>
        <br>
        <span class="subtitle">${ c.description.room }${ c.summary[1] !== undefined ? ` - ${ c.summary[1] }` : '' }</span>
      `;
      break;
    case '14:30':
      el = document.getElementById(`late-9`);
      el.style.background = colors[c.description.block[1] === 'X' ? 0 : c.description.block[0]];
      el.innerHTML = `
        <span class="coursename">${ c.summary[0] }</span>
        <br>
        <span class="subtitle">${ c.description.room }${ c.summary[1] !== undefined ? ` - ${ c.summary[1] }` : '' }</span>
      `;
      break;
  }
  // TODO: Simplify switch
  if (day === 'C' || day === 'G') {
    let assembly = document.getElementById('late-5');
    assembly.innerText = 'Assembly';
    assembly.style.background = colors[0];
  }
});

// Parses location.search
const getQuery = () => {
  let parsed = {};
  location.search.substring(1, location.search.length).split('&').forEach(a => {
    let [k, v] = a.split('=');
    parsed[k] = v;
  });
  return parsed;
};

let today = getQuery().date !== undefined ? new Date(parseInt(getQuery().date)) : new Date();
let days = [];

// All rendering happens here
window.addEventListener('load', () => {
  try {
    let letters = [];
    let classes = [[], [], [], [], []];
    for (let i = 1 - today.getDay(); i < 7 - today.getDay(); i++) {
      let temp = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
      temp.setDate(today.getDate() + i);
      days.push(temp);
    }
    let raw = {
      schedules: document.getElementsByClassName('ical')[0].innerText.trim(),
      student: document.getElementsByClassName('ical')[1].innerText.trim()
    };
    document.getElementsByClassName('ical')[0].innerText = '';
    document.getElementsByClassName('ical')[1].innerText = '';

    let schedules = ICAL.parse(raw.schedules);
    let student = ICAL.parse(raw.student);
    let events = {
      schedules: schedules[2],
      student: student[2]
    };
    events.student = events.student.filter(a => {
      let [dtstart, dtend, summary] = [getDT('start', a[1]), getDT('end', a[1]), getSummary(a[1])];
      return ((/\(Late Start/.test(summary[0]) && dtstart.getTime() < days[5].getTime()) || (dtend !== null && dtend.getTime() < days[5].getTime())) && dtstart.getTime() > days[0].getTime();
    }).map(a => {
      let [dtstart, dtend, location, summary] = [getDT('start', a[1]), getDT('end', a[1]), getLocation(a[1]), getSummary(a[1])[0]];
      return { dtstart, dtend, location, summary };
    });
    events.schedules.filter(a => a[1].length === 8).forEach(a => {
      let [description, dtstart, dtend, location, summary] = [getDescription(a[1]), getDT('start', a[1]), getDT('end', a[1]), getLocation(a[1]), getSummary(a[1])];
      if (dtstart.getTime() > days[0].getTime() && dtend.getTime() < days[5].getTime()) {
        classes[diff(days[0], dtstart)].push({ description, dtstart, dtend, location, summary });
        let letter = description.day[description.day.length - 1];
        if (!letters.includes(` (${ letter })`)) {
          letters.push(` (${ letter })`);
        }
      }
    });
    Array.from(document.getElementsByClassName('daylabel')).forEach((day, i) => {
      if (letters[i] === undefined) {
        day.firstChild.innerText = `${ day.innerText } ${ months[days[i].getMonth()] } ${ days[i].getDate() }`;
        Array.from(document.getElementsByClassName(i)).forEach((el, j) => {
          if (j === 0) {
            el.setAttribute('rowspan', 12);
            el.innerText = 'No Events Planned';
          } else {
            el.style.display = 'none';
          }
        });
      } else {
        day.firstChild.innerText = `${ day.innerText } ${ months[days[i].getMonth()] } ${ days[i].getDate() }${ letters[i] }`;
        if (letters[i] === ' (C)') {
          let assembly = document.getElementById(`${ i }-6`);
          assembly.innerText = 'Assembly';
          assembly.style.background = colors[0];
          assembly.setAttribute('rowspan', 2);
          document.getElementById(`${ i }-7`).style.display = 'none';
        } else if (letters[i] === ' (G)') {
          let assembly = document.getElementById(`${ i }-7`);
          assembly.innerText = 'Community';
          assembly.style.background = colors[0];
        }
      }
    });
    classes.forEach((day, i) => day.forEach(cl => addClasses(cl, i)));
    events.student.forEach(a => {
      if (a.summary.includes('(Late Start')) {
        let late = a.summary[a.summary.length - 2];
        Array.from(document.getElementsByClassName('daylabel')).forEach((day, i) => {
          day.firstChild.innerText.includes(`(${ late })`) && Array.from(document.getElementsByClassName(i)).forEach((el, j) => {
            if (j === 0) {
              el.setAttribute('class', `specialday`);
              el.setAttribute('rowspan', 12);
              el.innerHTML = `
                <table class="sched week main">
                  <tbody>
                    <tr>
                      <td colspan="12" class="period mins60">Late Start</td>
                    </tr>
                    <tr class="mins45">
                      <td class="times mins45">9:00-9:45</td>
                      <td class="period mins45" id="late-0">Free</td>
                    </tr>
                    <tr class="mins25">
                      <td class="times mins25">9:45-10:10</td>
                      <td class="period mins45" id="late-1">Free<span class="subtitle"> - Early Flex</span></td>
                    </tr>
                    <tr class="mins20">
                      <td class="times mins20">10:10-10:30</td>
                      <td class="period mins45" id="late-2">Break</td>
                    </tr>
                    <tr class="mins45">
                      <td class="times mins45">10:30-11:15</td>
                      <td class="period mins45" id="late-3">Free</td>
                    </tr>
                    <tr class="mins45">
                      <td class="times mins45">11:20-12:05</td>
                      <td class="period mins45" id="late-4">Free</td>
                    </tr>
                    <tr class="mins25">
                      <td class="times mins25">12:05-12:30</td>
                      <td class="period mins45" id="late-5">Free<span class="subtitle"> - AM Flex</span></td>
                    </tr>
                    <tr class="mins40">
                      <td class="times mins40">12:30-1:10</td>
                      <td class="period mins45" id="late-6">Lunch</td>
                    </tr>
                    <tr class="mins25">
                      <td class="times mins25">1:15-1:40</td>
                      <td class="period mins45" id="late-7">Free<span class="subtitle"> - PM Flex</span></td>
                    </tr>
                    <tr class="mins45">
                      <td class="times mins45">1:40-2:25</td>
                      <td class="period mins45" id="late-8">Free</td>
                    </tr>
                    <tr class="mins45">
                      <td class="times mins45">2:30-3:15</td>
                      <td class="period mins45" id="late-9">Free</td>
                    </tr>
                  </tbody>
                </table>
              `;
              addLateClasses(classes[i], day.innerText.split('(')[1][0]);
            } else {
              el.style.display = 'none';
            }
          });
        });
      } else {
        let el;
        switch (`${ a.dtstart.getHours() }:${ a.dtstart.getMinutes() }`) {
          case '9:15':
            el = document.getElementById(`${ a.dtstart.getDay() - 1 }-2`);
            el.style.background = colors[0];
            el.innerHTML = a.summary; // TODO: Add location
            if (a.dtend.getMinutes() === 45) {
              document.getElementById(`${ a.dtstart.getDay() - 1 }-3`).style.display = 'none';
              el.setAttribute('rowspan', 2);
            }
            break;
          case '11:55':
            el = document.getElementById(`${ a.dtstart.getDay() - 1 }-7`);
            el.style.background = colors[0];
            el.innerHTML = `<span class="coursename">${ a.summary }</span>`; // TODO: Add location
            break;
        }
      }
    });
    document.getElementById('schedule').style.display = 'block';

    let search = getQuery();
    document.getElementById('forwards').addEventListener('click', () => {
      let monday = days[0].setDate(days[0].getDate() + 7);
      if (search.date === undefined) {
        location.search = `${ location.search }&date=${ monday }`;
      } else {
        location.search = `?schedules=${ search.schedules }&student=${ search.student }&date=${ monday }`;
      }
    });
    document.getElementById('backwards').addEventListener('click', () => {
      let monday = days[0].setDate(days[0].getDate() - 7);
      if (search.date === undefined) {
        location.search = `${ location.search }&date=${ monday }`;
      } else {
        location.search = `?schedules=${ search.schedules }&student=${ search.student }&date=${ monday }`;
      }
    });

    document.getElementById('this-week').firstElementChild.setAttribute('href', `${ location.pathname }?schedules=${ search.schedules }&student=${ search.student }`);
  } catch {
    document.getElementById('login').style.display = '';
    M.AutoInit();
    M.Modal.getInstance(document.getElementById('login')).open();
    document.getElementsByClassName('to-terms')[0].addEventListener('click', () => M.Modal.getInstance(document.getElementById('terms')).open());
    document.getElementsByClassName('submit-url')[0].addEventListener('click', () => location.search = `?schedules=${ document.getElementById('schedules').value }&student=${ document.getElementById('student').value }`);
  }
});