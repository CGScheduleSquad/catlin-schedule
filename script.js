const inMatrix = (query, matrix) => {
  let res = -1;
  matrix.forEach((el, i) => { if (el.includes(query)) res = i; });
  return res;
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
        let i = inMatrix('description', a[1]);
        let description = [];
        if (i > -1) {
          let raw = a[1][i][3];
          description = raw.split('; ').map(b => {
            let kv = b.split(': ');
            if (kv.length > 2) {
              for (let i = 2; i < kv.length; i++) kv[1] += `: ${ kv[i] }`;
            }
            return { [kv[0]]: kv[1] };
          });
        }
      }
    });
  } catch {
    M.Modal.getInstance(document.getElementById('login')).open();
    document.getElementsByClassName('submit-url')[0].addEventListener('click', () => {
      location.search = `?url=${ document.getElementById('url').value }`;
    });
  }
});
