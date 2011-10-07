var hostname = null;
var setting = null;

opera.extension.addEventListener('message',
function(event) {
  if(event.data == 'Show me yourself!'){
    event.source.postMessage('I need the hostname!');
  } else if(event.data.name == 'Here is your hostname!'){
    hostname = event.data.content;
    setting = JSON.parse(widget.preferences.getItem(hostname));
    if(setting == null) {
      setting = JSON.parse(widget.preferences.getItem('default'));
    }
    loadSetting();
  }
},
false);

function loadSetting() {
  if(setting.enabled == 1) {
  var elements = document.querySelectorAll('#preferences div input, #preferences div label');

    for(var i = 0; i < elements.length; i++) {
      var element = elements[i];

      element.style.setProperty('border-color', 'black');
      element.style.setProperty('color', 'black');
    }
  }

  document.getElementById('enabled').checked = (setting.enabled == 1);
  document.getElementById('rewrite_vendor_prefix').checked = (setting.rewriteVendorPrefix == 1);
  document.getElementById('no_fixed_position').checked = (setting.noFixedPosition == 1);
  document.getElementById('add_default_font_family').checked = (setting.addDefaultFontFamily.enabled == 1);
  document.getElementById('remove_bad_fonts').checked = (setting.removeBadFonts.enabled == 1);
  document.getElementById('fix_css_in_scripts').checked = (setting.fixCSSInScripts == 1);
  document.getElementById('remove_lang_property').checked = (setting.removeLangProperty == 1);
}

function saveSetting() {
  if(setting != null) {
    setting.enabled = (document.getElementById('enabled').checked) ? 1 : 0;
    setting.rewriteVendorPrefix = (document.getElementById('rewrite_vendor_prefix').checked) ? 1 : 0;
    setting.noFixedPosition = (document.getElementById('no_fixed_position').checked) ? 1 : 0;
    setting.addDefaultFontFamily.enabled = (document.getElementById('add_default_font_family').checked) ? 1 : 0;
    setting.removeBadFonts.enabled = (document.getElementById('remove_bad_fonts').checked) ? 1 : 0;
    setting.fixCSSInScripts = (document.getElementById('fix_css_in_scripts').checked) ? 1 : 0;
    setting.removeLangProperty = (document.getElementById('remove_lang_property').checked) ? 1 : 0;
    widget.preferences.setItem(hostname, JSON.stringify(setting));

    if(setting.enabled == 1) {
      var elements = document.querySelectorAll('#preferences div input, #preferences div label');

      for(var i = 0; i < elements.length; i++) {
        var element = elements[i];

        element.style.setProperty('border-color', 'black');
        element.style.setProperty('color', 'black');
      }
    } else {
      var elements = document.querySelectorAll('#preferences div input, #preferences div label');

      for(var i = 0; i < elements.length; i++) {
        var element = elements[i];

        element.style.setProperty('border-color', '#666');
        element.style.setProperty('color', '#666');
      }
    }
  }
}
