// ==UserScript==
// @author rikaunite
// @description ofix - Convernt CSS vendor prefixes to "-o-" and "fixed" element to "absolute"...
// ==/UserScript==

(function() {

var FIX_VENDOR_PREFIX = 1;
var FIX_FIXED_POSITION = 1;
var FIX_DEAFULT_FONT_FAMILY = 1;
var REMOVE_KNOWN_BAD_FONTS = 1;
var REMOVE_LANG_PROPERTY = 1;

main();

function main() {
  window.opera.addEventListener('BeforeCSS', fixCSS, false);
  document.addEventListener('DOMContentLoaded', fixDOM, false);
}

function fixCSS(userJSEvent) {
  var css = userJSEvent.cssText;

  if(FIX_VENDOR_PREFIX == 1) {
    css = css.replace(/-(moz|ms|webkit|o)-(border|box-shadow|text-overflow)/gi,'$2')
             .replace(/-(moz|ms|webkit)-(linear-gradient|radial-gradient|transform|transition)/gi,'-o-$2');
  }
  if(FIX_FIXED_POSITION == 1) {
    css = css.replace(/(position[^;}]*)fixed/gi,'$1absolute')
             .replace(/(background[^;}]*)fixed/gi,'$1scroll');
  }
  if(REMOVE_KNOWN_BAD_FONTS == 1) {
    css = css.replace(/(宋体|黑体|Helvetica Neue|Helvetica)/gi,'Arial')
  }
  userJSEvent.cssText = css;
}

function fixDOM() {
  var oAll = document.all,
      oElement = null,
      oCurrentStyle = null,
      oStyle = null,
      nCSS = null,
      nStyle = null;

  for(i = 0; i < oAll.length; i++) {
    oElement = oAll[i];
    oCurrentStyle = oElement.currentStyle;
    oStyle = oElement.style;
    if(FIX_FIXED_POSITION == 1) {
      if(oElement.hasAttribute("style")){
        if(oCurrentStyle.position === 'fixed') {
          oStyle.setProperty('position', 'absolute', null);
        }
        if(oCurrentStyle.backgroundAttachment === 'fixed') {
          oStyle.setProperty('background-attachment', 'scroll', null);
        }
      }
    }
    if(REMOVE_LANG_PROPERTY == 1) {
      if(oElement.hasAttribute("lang")){
        oElement.removeAttribute("lang")
      }
    }
  }

  if(FIX_DEAFULT_FONT_FAMILY == 1) {
    nCSS = document.createTextNode('button, input, keygen, select { font-family: Arial, sans-serif; } code, kbd, pre, samp, textarea { font-family: Consolas, monospace; }')
    nStyle = document.createElement('style');
    nStyle.setAttribute('type', 'text/css')
    nStyle.appendChild(nCSS);
    document.head.insertBefore(nStyle, document.head.firstChild);
  }
}

})();
