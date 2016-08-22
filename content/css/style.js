var s = document.createElement('style'),
    r = document.querySelectorAll('input[type=range]'),
    len = r.length;

document.body.appendChild(s);

var getTrackStyleStr = function(el, val, prefs) {
  var str = '', len = prefs.length;

  for(var i = 0; i < len; i++) {
    str += '.js .fill:nth-child(' + el.dataset.idx + ')::-' + prefs[i] + '-track{background-size:' + val + '}'
  }
  return str;
};

var getTipStyleStr = function(el, val) {
  var str = '.js input[type=range]:nth-of-type(' + el.dataset.idx + ') /deep/ #thumb:before{content:"' +
        ((el.dataset.p)?el.dataset.p:'') + val +
        ((el.dataset.s)?el.dataset.s:'') + '"}';

  if(val == 0) {
    str = str.replace(/\s000/g, '');
  }

  return str;
};

var getValStr = function(el, p, i) {
  var min = el.min || 0,
      perc = (el.max) ? ~~(100*(p - min)/(el.max - min)) : p,
      val = perc + '% 100%';

  return val;
};

for(var i = 0; i < len; i++) {
  r[i].addEventListener('input', function() {
    var track_prefs = ['webkit-slider-runnable', 'moz-range'];

    if(this.classList.contains('fill')) {
      if(this.dataset.prev != '') {
        s.textContent.replace(
          getTrackStyleStr(
            this,
            getValStr(this, this.dataset.prev),
            track_prefs),
          '');
      }
      s.textContent += getTrackStyleStr(this, getValStr(this, this.value), track_prefs);

      this.dataset.prev = this.value;
    }

    if(this.dataset.prev != '') {
      s.textContent.replace(getTipStyleStr(this, this.dataset.prev), '');
    }
    s.textContent += getTipStyleStr(this, this.value);
  }, false);
}
