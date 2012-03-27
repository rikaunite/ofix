var settings = widget.preferences;
var setting = null;
var hostname = null;

window.document.addEventListener('DOMContentLoaded', initialize, false);

function initialize() {
  for(var i = 0; i < settings.length; i++) {
    var key = widget.preferences.key(i);
    var site = document.createTextNode(key);
    var option = document.createElement('option');

    if(key == 'default') {
      option.setAttribute('selected', 'selected');
      loadSetting(key);
    }

    option.appendChild(site);
    option.addEventListener('click', loadSetting, false);
    option.addEventListener('dblclick', deleteSetting, false);
    document.getElementById('sites').appendChild(option);
  }
}

function loadSetting(event) {
  if(event == 'default'){
    setting = JSON.parse(settings.getItem('default'));
    hostname = 'default';
  } else {
    setting = JSON.parse(settings.getItem(event.target.innerHTML));
    hostname = event.target.innerHTML;
  }

  if(setting.enabled != 1) {
    var elements = document.querySelectorAll('.preferences');

    for(var i = 0; i < elements.length; i++) {
      var element = elements[i];

      element.style.setProperty('color', '#666');
    }
  }

  document.getElementById('enabled').checked = (setting.enabled == 1);
  document.getElementById('rewrite_vendor_prefix').checked = (setting.rewriteVendorPrefix == 1);
  document.getElementById('no_fixed_position').checked = (setting.noFixedPosition == 1);
  document.getElementById('add_default_font_family').checked = (setting.addDefaultFontFamily.enabled == 1);
  document.getElementById('mormal_font').value = setting.addDefaultFontFamily.normal;
  document.getElementById('monospace_font').value = setting.addDefaultFontFamily.monospace;
  document.getElementById('remove_bad_fonts').checked = (setting.removeBadFonts.enabled == 1);
  document.getElementById('bad_font_list').value = setting.removeBadFonts.fonts;
  document.getElementById('fix_css_in_scripts').checked = (setting.fixCSSInScripts == 1);
  document.getElementById('remove_lang_property').checked = (setting.removeLangProperty == 1);
}

function saveSetting() {
  if(setting != null) {
    setting.enabled = (document.getElementById('enabled').checked) ? 1 : 0;
    setting.rewriteVendorPrefix = (document.getElementById('rewrite_vendor_prefix').checked) ? 1 : 0;
    setting.noFixedPosition = (document.getElementById('no_fixed_position').checked) ? 1 : 0;
    setting.addDefaultFontFamily.enabled = (document.getElementById('add_default_font_family').checked) ? 1 : 0;
    setting.addDefaultFontFamily.normal = document.getElementById('mormal_font').value;
    setting.addDefaultFontFamily.monospace = document.getElementById('monospace_font').value;
    setting.removeBadFonts.enabled = (document.getElementById('remove_bad_fonts').checked) ? 1 : 0;
    setting.removeBadFonts.fonts = document.getElementById('bad_font_list').value;
    setting.fixCSSInScripts = (document.getElementById('fix_css_in_scripts').checked) ? 1 : 0;
    setting.removeLangProperty = (document.getElementById('remove_lang_property').checked) ? 1 : 0;
    widget.preferences.setItem(hostname, JSON.stringify(setting));
  }

  if(setting.enabled == 1) {
    var elements = document.querySelectorAll('.preferences');

    for(var i = 0; i < elements.length; i++) {
      var element = elements[i];

      element.style.setProperty('color', '#1e3853');
    }
  } else {
    var elements = document.querySelectorAll('.preferences');

    for(var i = 0; i < elements.length; i++) {
      var element = elements[i];

      element.style.setProperty('color', '#666');
    }
  }
}

function deleteSetting(event){
  if(hostname == 'default') {
    alert('You can not delete default setting.');
  } else if(confirm('Delete ' + hostname + ' ?')) {
    widget.preferences.removeItem(hostname);
    document.getElementById('sites').removeChild(event.target);
    loadSetting('default')
  }
}
