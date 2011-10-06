(function() {

if(!widget.preferences.getItem('default')) {
widget.preferences.setItem('default', JSON.stringify({
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
}));
}

var button = opera.contexts.toolbar.createItem({
    disabled: false,
    title: 'ofix',
    icon: 'images/icon_button.png',
    popup: {
      href: 'popup.html',
      height: 225,
      width: 180
    }
});

opera.contexts.toolbar.addItem(button);

opera.extension.addEventListener('connect',
function(event) {
  event.source.postMessage('Show me yourself!');
},
false);

opera.extension.addEventListener('message',
function(event) {
  if(event.data == 'I need the hostname!') {
    var currentTab = opera.extension.tabs.getFocused();
    if(currentTab) {
      currentTab.postMessage('Give popup your hostname!', [event.source]);
    } else {
      event.source.postMessage('Nothing here!');
    }
  } else if(event.data.name == 'I need all settings!') {
    event.source.postMessage({
      name: 'Here is your settings!',
      content: JSON.stringify(widget.preferences)
    });
  }
},
false);

})();
