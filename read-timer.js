const words = document.querySelector('article').innerText.split(' ');
const minutes = Math.ceil(words.length / 225); // the average reading speed is 225 WPM (words per minute)
const timeSpan = document.querySelector('#timer');
timeSpan.innerText = `${minutes} minute${minutes > 1 ? 's' : ''} de lecture`;