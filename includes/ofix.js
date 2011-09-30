// ==UserScript==
// @author rikaunite
// @description ofix - Convernt CSS vendor prefixes to "-o-" and "fixed" element to "absolute".
// ==/UserScript==

(function() {

var FIX_VENDOR_PREFIX = 1;
var FIX_FIXED_POSITION = 1;

main();

function main() {
  window.opera.addEventListener('BeforeCSS', fixCSS, false);
  document.addEventListener('DOMContentLoaded', fixFixedPositionInline, false);
}

function fixCSS(userJSEvent) {
  css = userJSEvent.cssText;
  if(FIX_VENDOR_PREFIX == 1) {
    css = fixVendorPrefix(css);
  }
  if(FIX_FIXED_POSITION == 1) {
    css = fixFixedPosition(css);
  }
  userJSEvent.cssText = css;
}

function fixVendorPrefix(css) {
  return css.replace(/-(moz|ms|webkit|o)-(border|box-shadow|text-overflow)/gi,'$2')
            .replace(/-(moz|ms|webkit)-(linear-gradient|radial-gradient|transform|transition)/gi,'-o-$2');
}

function fixFixedPosition(css) {
  return css.replace(/(position[^;}]*)fixed/gi,'$1absolute')
            .replace(/(background[^;}]*)fixed/gi,'$1scroll');
}

function fixFixedPositionInline() {
  if(FIX_FIXED_POSITION == 1) {
    var oAll = document.all,
        oElement = null,
        oCurrentStyle = null,
        oStyle = null;
    for(i = 0; i < oAll.length; i++) {
      oElement = oAll[i];
      if(oElement.hasAttribute("style")){
        oCurrentStyle = oElement.currentStyle;
        oStyle = oElement.style;
        if(oCurrentStyle.position === 'fixed') {
          oStyle.setProperty('position', 'absolute', null);
        }
        if(oCurrentStyle.backgroundAttachment === 'fixed') {
          oStyle.setProperty('background-attachment', 'scroll', null);
        }
      }
    }
  }
}

})();
