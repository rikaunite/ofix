(function() {

var setting = null;

doFix();

opera.extension.addEventListener('message',
function(event) {
  if(event.data == 'Give popup your hostname!') {
    event.ports[0].postMessage({
      name: 'Here is your hostname!',
      content: window.location.hostname
    });
  }
},
false);

function doFix() {
  window.opera.addEventListener('BeforeCSS', fixCSS, false);
  window.opera.addEventListener('BeforeScript', fixCSS, false);
  window.document.addEventListener('DOMContentLoaded', fixDOM, false);
}

function fixCSS(event) {
  getSetting();

  if(setting.enabled == 1) {
    var content = null;

    if(event.type == 'BeforeCSS') {
      content = event.cssText;
    } else if(event.type == 'BeforeScript' && setting.fixCSSInScripts == 1) {
      content = event.element.text;
    } else {
      return;
    }

    if(setting.rewriteVendorPrefix == 1) {
      content = content.replace(/-(moz|ms|webkit|o)-(border-radius|border-top-right-radius|border-bottom-right-radius|border-bottom-left-radius|border-top-left-radius|box-shadow|text-overflow)/gi, '$2')
                       .replace(/-(moz|ms|webkit)-(animation|animation-name|animation-duration|animation-timing-function|animation-iteration-count|animation-direction|animation-play-state|animation-delay|animation-fill-mode|keyframes|border-image|linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient|object-fit|object-position|tab-size|table-baseline|transform|transform-origin|transition|transition-property|transition-duration|transition-timing-function|transition-delay)/gi, '-o-$2');
    }

    if(setting.noFixedPosition == 1) {
      content = content.replace(/(position[^;}]*)fixed/gi, '$1absolute')
                       .replace(/(background[^;}]*)fixed/gi, '$1scroll');
    }

    if(setting.removeBadFonts.enabled == 1) {
      if(setting.removeBadFonts.fonts.length != 0) {
        var pattern = new RegExp('(' + setting.removeBadFonts.fonts + ')', 'gi');
        content = content.replace(pattern, 'Arial')
      }
    }

    if(event.type == 'BeforeCSS') {
      event.cssText = content;
    } else {
      event.element.text = content;
    }
  }
}

function fixDOM() {
  getSetting();

  if(setting.enabled == 1) {
    if(setting.noFixedPosition == 1) {
      var oAll = document.all;

      for(i = 0; i < oAll.length; i++) {
        var oElement = oAll[i];
        var oCurrentStyle = oElement.currentStyle;
        var oStyle = oElement.style;

        if(oElement.hasAttribute("style")){
          if(oCurrentStyle.position === 'fixed') {
            oStyle.setProperty('position', 'absolute', 'important');
          }
          if(oCurrentStyle.backgroundAttachment === 'fixed') {
            oStyle.setProperty('background-attachment', 'scroll', 'important');
          }
        }
      }
    }

    if(setting.removeLangProperty == 1) {
      if(document.all[0].hasAttribute("lang")){
        document.all[0].removeAttribute("lang")
      }
      if(document.body.hasAttribute("lang")){
        document.body.removeAttribute("lang")
      }
    }

    if(setting.addDefaultFontFamily.enabled == 1) {
      var normal = '';
      var monospace = '';
      var addCSS = null;
      var addStyle = null;

      if(setting.addDefaultFontFamily.normal.length != 0){
        normal = setting.addDefaultFontFamily.normal + ', ';
      }
      if(setting.addDefaultFontFamily.monospace.length != 0){
        monospace = setting.addDefaultFontFamily.monospace + ', ';
      }

      addCSS = document.createTextNode('button, input, keygen, select { font-family: ' + normal + 'sans-serif; } code, kbd, pre, samp, textarea { font-family: ' + monospace + 'monospace; }')
      addStyle = document.createElement('style');
      addStyle.setAttribute('type', 'text/css')
      addStyle.appendChild(addCSS);
      document.head.insertBefore(addStyle, document.head.firstChild);
    }
  }
}

function getSetting(){
  if(setting == null) {
    for(var i = 0; i < widget.preferences.length; i++) {
      var key = widget.preferences.key(i);
      var hostname = window.location.hostname;
      var index = hostname.indexOf(key);

      if(index + key.length == hostname.length && hostname[index - 1] == '.') {
        setting = JSON.parse(widget.preferences.getItem(key));
      } else if (hostname == key) {
        setting = JSON.parse(widget.preferences.getItem(hostname));
        return;
      } else {
        if(setting == null) {
          setting = JSON.parse(widget.preferences.getItem('default'));
        }
      }
    }
  }
}

})();
