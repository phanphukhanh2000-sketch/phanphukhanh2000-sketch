// Không cần sửa file này. Đọc cấu hình từ config.js và áp dụng cho mọi trang.
(function () {
  var S = window.SITE || {}, B = S.background || {}, H = S.hero || {}, d = document, r = d.documentElement;
  var url = function (u) { return 'url("' + String(u).replace(/["\\\n\r]/g, '') + '")'; };
  var hex = /^#[0-9a-f]{6}$/i;
  if (hex.test(S.color || '')) {
    r.style.setProperty('--pri', S.color);
    r.style.setProperty('--pri2', hex.test(S.color2 || '') ? S.color2 : S.color);
    r.style.setProperty('--soft', 'color-mix(in srgb,' + S.color + ' 14%,transparent)');
  }
  var css = '';
  if (B.image) {
    var o = Math.min(1, Math.max(0, B.overlay == null ? 0.85 : +B.overlay || 0)) * 100;
    var c = 'color-mix(in srgb,var(--bg) ' + o + '%,transparent)';
    css += 'body{background:transparent!important}body::before{content:"";position:fixed;inset:0;z-index:-1;background:linear-gradient(' + c + ',' + c + '),' + url(B.image) + ' center/cover no-repeat}';
  }
  var pos = /^[a-z0-9% .-]{1,30}$/i.test(H.position || '') ? H.position : 'center';
  if (H.image) css += '.hero{background:linear-gradient(135deg,rgba(20,60,170,.78),rgba(47,107,255,.3)),' + url(H.image) + ' ' + pos + '/cover!important}';
  if ((H.layout || 'split') === 'split') {
    var h = Math.min(400, Math.max(100, +H.height || 170)), sh = 'text-shadow:0 2px 8px rgba(0,0,0,.4);';
    css += '.hero{display:flex;justify-content:space-between;align-items:center;gap:16px;min-height:' + h + 'px}' +
      '.hero h1{flex:0 1 34%;text-align:left;margin:0;position:relative;' + sh + '}' +
      '.hero p{flex:0 1 30%;text-align:right;margin:0;position:relative;' + sh + '}' +
      '@media(max-width:600px){.hero{flex-direction:column;align-items:stretch;justify-content:space-between;min-height:' + (h + 50) + 'px}.hero h1,.hero p{flex:none;max-width:75%}.hero p{align-self:flex-end}}';
  }
  if (css) { var st = d.createElement('style'); st.textContent = css; d.head.appendChild(st); }
  d.addEventListener('DOMContentLoaded', function () {
    var t = d.querySelector('[data-site=title]'), s = d.querySelector('[data-site=subtitle]');
    if (t && S.title) { t.textContent = S.title; d.title = S.title; }
    if (s && S.subtitle) s.textContent = S.subtitle;
  });
})();
