window.addEventListener('load', () => {
  M.AutoInit();
  M.Modal.getInstance(document.getElementById('login')).open();

  let raw = document.getElementsByClassName('ical')[0].innerText.trim();
  document.getElementsByClassName('ical')[0].innerText = '';

  let ical = ICAL.parse(raw);
  console.log(ical);
});
