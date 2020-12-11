const myDesc = 'Hello, my name is Tim and im learning to code!';
let index = 0;

function textAutoWriter() {
  document.getElementById('desc').innerText = myDesc.slice(0, index);
  index++;
}


// while(index < logoTitle.length) {

// }
let textWriter = setInterval(textAutoWriter, 55);

textWriter();

clearInterval(textWriter);