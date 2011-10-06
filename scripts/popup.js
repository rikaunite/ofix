opera.extension.addEventListener('message',
function(event) {
  if(event.data == 'Show me yourself!'){
    event.source.postMessage('I need the hostname!');
  } else if(event.data.name == 'Here is your hostname!'){
    document.getElementById('show').innerHTML = event.data.content;
  }
},
false);

function openPreferences() {
window.open('options.html')
}
