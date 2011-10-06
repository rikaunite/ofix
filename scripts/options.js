var settings;

opera.extension.addEventListener('message',
function(event) {
  if(event.data == 'Show Me Yourself!'){
    event.source.postMessage('I need all settings!');
  } else if(event.data.name == 'Here is your settings!'){
    settings = event.data.content;
  }
},
false);

var twitter = {
  enabled: 1,
  rewriteVendorPrefix: 1,
  noFixedPosition: 1,
  addDefaultFontFamily: {
    enabled: 1,
    normal: 'Arial',
    monospace: 'Consolas'
  },
  removeBadFonts: {
    enabled: 1,
    fonts: [ '宋体', '黑体', 'Helvetica Neue', 'Helvetica' ]
  },
  fixCSSInScripts: 1,
  removeLangProperty: 1
};

var defValue = {
  enabled: 1,
  rewriteVendorPrefix: 1,
  noFixedPosition: 0,
  addDefaultFontFamily: {
    enabled: 0,
    normal: '',
    monospace: ''
  },
  removeBadFonts: {
    enabled: 0,
    fonts: []
  },
  fixCSSInScripts: 0,
  removeLangProperty: 0
};

function save() {
widget.preferences.setItem('twitter.com', JSON.stringify(twitter));
widget.preferences.setItem('default', JSON.stringify(defValue));
}

function load() {
opera.postError(widget.preferences.getItem('twitter.com'));
opera.postError(widget.preferences.getItem('default'));
}
