const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const colors = ['#c0c0c0', '#ffce51', '#a67fb9', '#e67326', '#00abbd', '#aac02c', '#ef4957', '#ff75f2'];

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
  return i > -1 ? new Date(matrix[i][3]) : null;
};

const getLocation = matrix => {
  let i = inMatrix('location', matrix);
  return i > -1 ? matrix[i][3] : 'N/A';
};

const getSummary = matrix => {
  let i = inMatrix('summary', matrix);
  return i > -1 ? matrix[i][3].split(' - ') : ['N/A', 'N/A', 'N/A'];
};

const diff = (d1, d2) => Math.floor((Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate()) - Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate()) ) / (1000 * 60 * 60 * 24));

const mDiff = (d1, d2) => Math.abs(Math.round((d1.getTime() - d2.getTime()) / 1000 / 60));

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

const addSpecialClasses = cl => {
  let html = '';
  cl.forEach((c, i) => {
    let hourStart = c.dtstart.getHours() > 12 ? c.dtstart.getHours() - 12 : c.dtstart.getHours();
    let hourEnd = c.dtend.getHours() > 12 ? c.dtend.getHours() - 12 : c.dtend.getHours();
    let minStart = c.dtstart.getMinutes() < 10 ? `0${ c.dtstart.getMinutes() }` : c.dtstart.getMinutes();
    let minEnd = c.dtend.getMinutes() < 10 ? `0${ c.dtend.getMinutes() }` : c.dtend.getMinutes();
    if (cl[i - 1] !== undefined) {
      if (mDiff(cl[i - 1].dtend, c.dtstart) > 5) {
        let midStart = new Date(cl[i - 1].dtend.setMinutes(cl[i - 1].dtend.getMinutes() + 5));
        let midEnd = new Date(c.dtstart.setMinutes(c.dtstart.getMinutes() - 5));
        let hourStart1 = midStart.getHours() > 12 ? midStart.getHours() - 12 : midStart.getHours();
        let hourEnd1 = midEnd.getHours() > 12 ? midEnd.getHours() - 12 : midEnd.getHours();
        let minStart1 = midStart.getMinutes() < 10 ? `0${ midStart.getMinutes() }` : midStart.getMinutes();
        let minEnd1 = midEnd.getMinutes() < 10 ? `0${ midEnd.getMinutes() }` : midEnd.getMinutes();
        html += `
          <tr>
            <td class="times mins${ mDiff(midStart, midEnd) }">${ hourStart1 }:${ minStart1 }-${ hourEnd1 }:${ minEnd1 }</td>
            <td class="period mins${ mDiff(midStart, midEnd) }">
              <span class="coursename">Free</span>
            </td>
          </tr>
        `;
      }
    }
    html += `
      <tr>
        <td class="times mins${ mDiff(c.dtstart, c.dtend) }">${ hourStart }:${ minStart }-${ hourEnd }:${ minEnd }</td>
        <td class="period mins${ mDiff(c.dtstart, c.dtend) }" style="background: ${ colors[c.description.block[1] === 'X' ? 0 : c.description.block[0]] };">
          <span class="coursename">${ c.summary[0] }</span>
          <br>
          <span class="subtitle">${ c.description.room }${ c.summary[1] !== undefined ? ` - ${ c.summary[1] }` : '' }</span>
        </td>
      </tr>
    `;
  });
  return html;
};

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
      day.firstChild.innerText = `${ day.innerText } ${ months[days[i].getMonth()] } ${ days[i].getDate() }${ letters[i] }`;
    });
    classes.forEach((day, i) => {
      day.forEach(cl => addClasses(cl, i));
    });
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
                    ${ addSpecialClasses(classes[i]) }
                  </tbody>
                </table>
              `;
            } else {
              el.style.display = 'none';
            }
          });
        });
      }
    });
    document.getElementById('schedule').style.display = 'block';
    document.getElementById('forwards').addEventListener('click', () => location.search = `${ location.search }&date=${ days[0].setDate(days[0].getDate() + 7) }`);
    document.getElementById('backwards').addEventListener('click', () => location.search = `${ location.search }&date=${ days[0].setDate(days[0].getDate() - 7) }`);
  } catch {
    document.getElementById('login').style.display = '';
    M.AutoInit();
    M.Modal.getInstance(document.getElementById('login')).open();
    document.getElementsByClassName('submit-url')[0].addEventListener('click', () => location.search = `?schedules=${ document.getElementById('schedules').value }&student=${ document.getElementById('student').value }`);
  }
});
