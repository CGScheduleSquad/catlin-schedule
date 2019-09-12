window.addEventListener('load', () => {
  M.AutoInit();
  try {
    let raw = document.getElementsByClassName('ical')[0].innerText.trim();
    document.getElementsByClassName('ical')[0].innerText = '';

    let ical = ICAL.parse(raw);
    let events = ical[2];
    events.forEach(a => {
      console.log(a[1]);
    });
  } catch {
    M.Modal.getInstance(document.getElementById('login')).open();
    document.getElementsByClassName('submit-url')[0].addEventListener('click', () => {
      location.search = `?url=${ document.getElementById('url').value }`;
    });
  }
});
