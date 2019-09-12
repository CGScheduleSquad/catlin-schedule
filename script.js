window.addEventListener('load', () => {
  let raw = document.getElementsByClassName('ical')[0].innerText.trim();
  document.getElementsByClassName('ical')[0].innerText = '';
  
  let ical = ICAL.parse(ical)
});
