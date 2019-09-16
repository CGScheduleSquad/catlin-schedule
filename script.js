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

const diff = (d1, d2) => Math.floor((Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate()) - Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate()) ) / (1000 * 60 * 60 * 24));

const addClasses = (cl, i) => {
  let el;
  switch (`${ cl.dtstart.getHours() }:${ cl.dtstart.getMinutes() }`) {
    case '8:0':
      el = document.getElementById(`${ i }-0`);
      el.style.background = colors[cl.description.block[0]];
      el.innerHTML = `
        <span class="coursename">${ cl.summary[0] }</span>
        <br>
        <span class="subtitle">${ cl.description.room } - ${ cl.summary[1] }</span>
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
      el.style.background = colors[cl.description.block[0]];
      el.innerHTML = `
        <span class="coursename">${ cl.summary[0] }</span>
        <br>
        <span class="subtitle">${ cl.description.room } - ${ cl.summary[1] }</span>
      `;
      break;
    case '10:35':
      el = document.getElementById(`${ i }-5`);
      el.style.background = colors[cl.description.block[0]];
      el.innerHTML = `
        <span class="coursename">${ cl.summary[0] }</span>
        <br>
        <span class="subtitle">${ cl.description.room } - ${ cl.summary[1] }</span>
      `;
      if (cl.dtend.getMinutes() === 50) {
        document.getElementById(`${ i }-6`).style.display = 'none';
        el.setAttribute('rowspan', 2);
      }
      break;
    case '13:10':
      el = document.getElementById(`${ i }-9`);
      el.style.background = colors[cl.description.block[0]];
      el.innerHTML = `
        <span class="coursename">${ cl.summary[0] }</span>
        <br>
        <span class="subtitle">${ cl.description.room } - ${ cl.summary[1] }</span>
      `;
      document.getElementById(`${ i }-10`).style.display = 'none';
      el.setAttribute('rowspan', 2);
      break;
    case '13:40':
      el = document.getElementById(`${ i }-10`);
      el.style.background = colors[cl.description.block[0]];
      el.innerHTML = `
        <span class="coursename">${ cl.summary[0] }</span>
        <br>
        <span class="subtitle">${ cl.description.room } - ${ cl.summary[1] }</span>
      `;
      break;
    case '14:30':
      el = document.getElementById(`${ i }-11`);
      el.style.background = colors[cl.description.block[0]];
      el.innerHTML = `
        <span class="coursename">${ cl.summary[0] }</span>
        <br>
        <span class="subtitle">${ cl.description.room } - ${ cl.summary[1] }</span>
      `;
      break;
  }
  // TODO: Simplify switch
};

window.addEventListener('load', () => {
  try {
    let today = new Date();
    let days = [];
    let letters = [];
    let classes = [[], [], [], [], []];
    for (let i = 1 - today.getDay(); i < 7 - today.getDay(); i++) {
      let temp = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
      temp.setDate(today.getDate() + i);
      days.push(temp);
    }
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
    document.getElementById('schedule').style.display = 'block';
  } catch {
    document.getElementById('login').style.display = '';
    M.AutoInit();
    M.Modal.getInstance(document.getElementById('login')).open();
    document.getElementsByClassName('submit-url')[0].addEventListener('click', () => {
      location.search = `?url=${ document.getElementById('url').value }`;
    });
  }
});
