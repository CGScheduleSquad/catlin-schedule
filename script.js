const inMatrix = (query, matrix) => {
  let res = -1;
  matrix.forEach((el, i) => { if (el.includes(query)) res = i; });
  return res;
};

const getDescription = matrix => {
  let i = inMatrix('description', matrix);
  let description = [];
  if (i > -1) {
    let raw = matrix[i][3];
    description = raw.split('; ').map(b => {
      let kv = b.split(': ');
      if (kv.length > 2) {
        for (let i = 2; i < kv.length; i++) kv[1] += `: ${ kv[i] }`;
      }
      return { [kv[0]]: kv[1] };
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

window.addEventListener('load', () => {
  M.AutoInit();
  try {
    let raw = document.getElementsByClassName('ical')[0].innerText.trim();
    document.getElementsByClassName('ical')[0].innerText = '';

    let ical = ICAL.parse(raw);
    let events = ical[2];
    events.forEach(a => {
      if (a[1].length === 8) {
        let description = getDescription(a[1]);
        let dtstart = getDT('start', a[1]);
        let dtend = getDT('end', a[1]);
        let location = getLocation(a[1]);
        let summary = getSummary(a[1]);
      }
    });
  } catch {
    M.Modal.getInstance(document.getElementById('login')).open();
    document.getElementsByClassName('submit-url')[0].addEventListener('click', () => {
      location.search = `?url=${ document.getElementById('url').value }`;
    });
  }
});
