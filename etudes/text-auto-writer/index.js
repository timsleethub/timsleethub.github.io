const logoTitle = 'Timur Chernikov.';
let index = 0;

function textAutoWriter() {
  document.getElementById('logo__title').innerText = logoTitle.slice(0, index);
  index++;

}

const interval = setInterval(textAutoWriter, 100);

clearInterval(interval);
