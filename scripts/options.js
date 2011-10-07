window.document.addEventListener('DOMContentLoaded', loadSettings, false);

var settings = widget.preferences;

function loadSettings() {
  for(var i = 0; i < settings.length; i++) {
    var key = widget.preferences.key(i);

    document.getElementById('show').innerHTML += key;
    document.getElementById('show').innerHTML += '|';
  }
}
