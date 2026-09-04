/* ============================================================
   Beren — hareketler
   1) Düşen yapraklar            5) Sayaçlar
   2) Kaydırdıkça beliren içerik 6) Zaman çizelgesi dolumu
   3) Yazılan yazı + zarf        7) Kartlarda 3B eğim
   4) İlerleme çubuğu + paralaks 8) Kalpler ve son soru
   ============================================================ */

const azHareket = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const dokunmatik = window.matchMedia('(hover: none)').matches;

/* ── 1) Düşen yapraklar ──────────────────────────────────── */
(function yapraklar() {
  const canvas = document.getElementById('petals');
  if (!canvas || azHareket) return;

  const ctx = canvas.getContext('2d');
  let w, h, dpr, taneler = [];

  function boyutla() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const adet = Math.round(Math.min(46, Math.max(16, w / 26)));
    taneler = Array.from({ length: adet }, () => yeniTane(true));
  }

  function yeniTane(ilk) {
    return {
      x: Math.random() * w,
      y: ilk ? Math.random() * h : -20,
      r: 4 + Math.random() * 7,
      hiz: 0.25 + Math.random() * 0.75,
      salinim: 0.4 + Math.random() * 1.1,
      faz: Math.random() * Math.PI * 2,
      aci: Math.random() * Math.PI,
      donme: (Math.random() - 0.5) * 0.02,
      alfa: 0.18 + Math.random() * 0.4
    };
  }

  function yaprakCiz(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.aci);
    ctx.globalAlpha = p.alfa;
    ctx.fillStyle = '#e78ba6';
    ctx.beginPath();
    ctx.moveTo(0, -p.r);
    ctx.bezierCurveTo(p.r, -p.r * 0.5, p.r * 0.7, p.r * 0.8, 0, p.r);
    ctx.bezierCurveTo(-p.r * 0.7, p.r * 0.8, -p.r, -p.r * 0.5, 0, -p.r);
    ctx.fill();
    ctx.restore();
  }

  function kare() {
    ctx.clearRect(0, 0, w, h);
    for (const p of taneler) {
      p.faz += 0.012;
      p.y += p.hiz;
      p.x += Math.sin(p.faz) * p.salinim;
      p.aci += p.donme;
      if (p.y - p.r > h) Object.assign(p, yeniTane(false));
      yaprakCiz(p);
    }
    requestAnimationFrame(kare);
  }

  boyutla();
  window.addEventListener('resize', boyutla);
  requestAnimationFrame(kare);
})();

/* ── 2) Başlıkları kelimelere böl ────────────────────────── */
(function bol() {
  document.querySelectorAll('[data-split]').forEach(baslik => {
    const kelimeler = baslik.textContent.trim().split(/\s+/);
    baslik.textContent = '';
    kelimeler.forEach((k, i) => {
      const s = document.createElement('span');
      s.className = 'word';
      s.textContent = k;
      s.style.transitionDelay = (i * 0.07) + 's';
      baslik.append(s, document.createTextNode(' '));
    });
  });
})();

/* ── 3) Kaydırdıkça belirme ──────────────────────────────── */
(function belirme() {
  const ogeler = document.querySelectorAll('.reveal, .tl-item, .ask-card, .promises li');
  if (!('IntersectionObserver' in window)) {
    ogeler.forEach(o => o.classList.add('visible'));
    return;
  }
  const gozlemci = new IntersectionObserver((girisler) => {
    girisler.forEach(giris => {
      if (!giris.isIntersecting) return;
      giris.target.classList.add('visible');
      gozlemci.unobserve(giris.target);
      if (giris.target.dataset.count !== undefined) sayacBaslat(giris.target);
      if (giris.target.id === 'sayac') return;
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  ogeler.forEach(o => gozlemci.observe(o));

  // sayaç kutuları ayrı gözlemlensin
  document.querySelectorAll('[data-count]').forEach(o => gozlemci.observe(o));
})();

/* ── 4) Açılıştaki yazılan cümleler ──────────────────────── */
(function yazi() {
  document.querySelectorAll('.typed').forEach(el => {
    const metin = el.dataset.typed || '';
    const gecikme = Number(el.dataset.typedDelay || 900);
    if (azHareket) { el.textContent = metin; el.classList.add('done'); return; }
    el.textContent = '';
    setTimeout(() => yaz(el, metin, 34), gecikme);
  });
})();

function yaz(el, metin, hiz, bitince) {
  let i = 0;
  (function adim() {
    el.textContent = metin.slice(0, ++i);
    if (i < metin.length) {
      setTimeout(adim, hiz + Math.random() * 40);
    } else {
      el.classList.add('done');
      if (bitince) bitince();
    }
  })();
}

/* ── 5) Zarf ─────────────────────────────────────────────── */
(function zarf() {
  const zarf = document.getElementById('envelope');
  const mektup = document.getElementById('letter');
  if (!zarf || !mektup) return;

  mektup.hidden = true;           // JS varsa mektup zarfın içinde başlar
  let acildi = false;

  zarf.addEventListener('click', () => {
    if (acildi) return;
    acildi = true;
    zarf.classList.add('open');
    zarf.setAttribute('aria-expanded', 'true');

    setTimeout(() => {
      zarf.classList.add('gone');
      mektup.hidden = false;
      mektup.classList.add('unfold');

      const selam = mektup.querySelector('[data-typewriter]');
      if (selam) {
        const metin = selam.dataset.typewriter;
        if (azHareket) selam.textContent = metin;
        else setTimeout(() => yaz(selam, metin, 60), 500);
      }
      kalpPatlat(zarf.getBoundingClientRect(), 12);
      // boş yer bırakmasın diye kaybolduktan sonra tamamen kaldır
      setTimeout(() => { zarf.style.display = 'none'; }, azHareket ? 0 : 650);
    }, azHareket ? 0 : 760);
  });
})();

/* ── 6) İlerleme çubuğu, paralaks, çizelge dolumu ────────── */
(function kaydirma() {
  const cubuk = document.getElementById('progressBar');
  const hero = document.getElementById('heroInner');
  const cizelge = document.getElementById('timeline');
  const dolgu = document.getElementById('tlFill');
  let bekliyor = false;

  function guncelle() {
    bekliyor = false;
    const y = window.scrollY;
    const enFazla = document.documentElement.scrollHeight - window.innerHeight;

    if (cubuk) cubuk.style.width = (enFazla > 0 ? (y / enFazla) * 100 : 0) + '%';

    if (hero && !azHareket && y < window.innerHeight * 1.2) {
      hero.style.transform = 'translateY(' + y * 0.28 + 'px)';
      hero.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.75)));
    }

    if (cizelge && dolgu) {
      const kutu = cizelge.getBoundingClientRect();
      const orta = window.innerHeight * 0.62;
      const oran = Math.min(1, Math.max(0, (orta - kutu.top) / kutu.height));
      dolgu.style.height = (oran * (kutu.height - 16)) + 'px';
    }
  }

  window.addEventListener('scroll', () => {
    if (!bekliyor) { bekliyor = true; requestAnimationFrame(guncelle); }
  }, { passive: true });
  window.addEventListener('resize', guncelle);
  guncelle();
})();

/* ── 7) Sayaçlar ─────────────────────────────────────────── */
function sayacBaslat(el) {
  const bolum = el.closest('[data-since]');
  const baslangic = new Date((bolum && bolum.dataset.since) || '2024-06-24T17:00');
  const gecenMs = Math.max(0, Date.now() - baslangic.getTime());

  // saat de belli olduğu için gün/saat/dakika tek tek, tam hesaplanıyor
  const hedefler = {
    days:    Math.floor(gecenMs / 86400000),
    hours:   Math.floor(gecenMs / 3600000),
    minutes: Math.floor(gecenMs / 60000)
  };
  const hedef = hedefler[el.dataset.count] ?? 0;

  if (azHareket) { el.textContent = hedef.toLocaleString('tr-TR'); return; }

  const sure = 1800;
  const t0 = performance.now();
  (function adim(t) {
    const p = Math.min(1, (t - t0) / sure);
    const e = 1 - Math.pow(1 - p, 4);              // yumuşak yavaşlama
    el.textContent = Math.round(hedef * e).toLocaleString('tr-TR');
    if (p < 1) requestAnimationFrame(adim);
  })(t0);
}

/* ── 8) Kartlarda 3B eğim + parlama ──────────────────────── */
(function egim() {
  if (azHareket || dokunmatik) return;
  document.querySelectorAll('.tilt').forEach(kart => {
    kart.addEventListener('pointermove', e => {
      const k = kart.getBoundingClientRect();
      const x = (e.clientX - k.left) / k.width;
      const y = (e.clientY - k.top) / k.height;
      kart.style.setProperty('--mx', x * 100 + '%');
      kart.style.setProperty('--my', y * 100 + '%');
      kart.style.transform =
        `perspective(700px) rotateY(${(x - .5) * 10}deg) rotateX(${(.5 - y) * 10}deg) translateY(-6px)`;
    });
    kart.addEventListener('pointerleave', () => { kart.style.transform = ''; });
  });
})();

/* ── 9) İmleç ışığı + mıknatıs düğme ─────────────────────── */
(function imlec() {
  if (azHareket || dokunmatik) return;

  const isik = document.getElementById('cursorGlow');
  let hx = 0, hy = 0, ix = 0, iy = 0, acik = false;

  window.addEventListener('pointermove', e => {
    hx = e.clientX; hy = e.clientY;
    if (!acik && isik) { isik.classList.add('on'); acik = true; }

    document.querySelectorAll('.magnetic').forEach(d => {
      const k = d.getBoundingClientRect();
      const dx = e.clientX - (k.left + k.width / 2);
      const dy = e.clientY - (k.top + k.height / 2);
      const uzaklik = Math.hypot(dx, dy);
      if (uzaklik < 140 && !d.disabled) {
        d.style.transform = `translate(${dx * 0.22}px, ${dy * 0.22}px) scale(1.05)`;
      } else {
        d.style.transform = '';
      }
    });
  }, { passive: true });

  (function takip() {
    ix += (hx - ix) * 0.12;
    iy += (hy - iy) * 0.12;
    if (isik) isik.style.transform = `translate(${ix}px, ${iy}px)`;
    requestAnimationFrame(takip);
  })();
})();

/* ── 10) Tıklayınca kalp ─────────────────────────────────── */
function kalpPatlat(kutu, adet) {
  if (azHareket) return;
  const simgeler = ['🤍', '🌹', '💗', '✨'];
  const cx = kutu.left + kutu.width / 2;
  const cy = kutu.top + kutu.height / 2;

  for (let i = 0; i < adet; i++) {
    const el = document.createElement('span');
    el.textContent = simgeler[Math.floor(Math.random() * simgeler.length)];
    el.className = 'spark';
    const aci = Math.random() * Math.PI * 2;
    const guc = 40 + Math.random() * 90;
    Object.assign(el.style, {
      position: 'fixed',
      left: cx + 'px',
      top: cy + 'px',
      fontSize: 10 + Math.random() * 16 + 'px',
      pointerEvents: 'none',
      zIndex: '99',
      transition: 'transform .9s cubic-bezier(.22,1,.36,1), opacity .9s ease'
    });
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.style.transform =
        `translate(${Math.cos(aci) * guc}px, ${Math.sin(aci) * guc - 30}px) scale(.6) rotate(${aci}rad)`;
      el.style.opacity = '0';
    });
    setTimeout(() => el.remove(), 1000);
  }
}

document.addEventListener('click', e => {
  if (e.target.closest('#envelope') || e.target.closest('#yesBtn')) return;
  kalpPatlat({ left: e.clientX, top: e.clientY, width: 0, height: 0 }, 5);
});

/* ── 11) Son soru ────────────────────────────────────────── */
(function soru() {
  const evet = document.getElementById('yesBtn');
  const hayir = document.getElementById('noBtn');
  const not = document.getElementById('askNote');
  if (!evet || !hayir || !not) return;

  // "Emin değilim" düğmesi biraz nazlanır, sonra vazgeçer.
  const nazlanmalar = [
    'Bir daha düşün 🙈',
    'Sadece bir kahve…',
    'Peki ya iki kahve?',
    'Tamam, ısrar etmiyorum.'
  ];
  let sayac = 0;

  hayir.addEventListener('click', () => {
    if (sayac < nazlanmalar.length - 1) {
      hayir.textContent = nazlanmalar[sayac];
      evet.style.fontSize = (0.95 + (sayac + 1) * 0.09) + 'rem';
      sayac++;
    } else {
      hayir.textContent = nazlanmalar[nazlanmalar.length - 1];
      hayir.disabled = true;
      hayir.style.opacity = '.45';
      hayir.style.cursor = 'default';
      not.hidden = false;
      not.textContent =
        'Anlıyorum. Yine de bunları bilmeni istedim. Kendine iyi bak, Beren.';
      sayac++;
    }
  });

  evet.addEventListener('click', () => {
    not.hidden = false;
    not.textContent = 'Bu cevabı okuduğuma inanamıyorum. Teşekkür ederim. 🤍';
    evet.textContent = 'Görüşürüz o zaman ☕';
    evet.disabled = true;
    evet.style.transform = '';
    evet.classList.remove('magnetic');
    hayir.hidden = true;
    kalpPatlat(evet.getBoundingClientRect(), 24);
    kalpYagmuru();
  });

  function kalpYagmuru() {
    if (azHareket) return;
    const kalpler = ['🤍', '🌹', '💌', '✨', '💗'];
    for (let i = 0; i < 60; i++) {
      const el = document.createElement('span');
      el.textContent = kalpler[Math.floor(Math.random() * kalpler.length)];
      el.setAttribute('aria-hidden', 'true');
      const sure = 2.6 + Math.random() * 2.6;
      Object.assign(el.style, {
        position: 'fixed',
        left: Math.random() * 100 + 'vw',
        top: '-6vh',
        fontSize: 12 + Math.random() * 24 + 'px',
        pointerEvents: 'none',
        zIndex: '99',
        opacity: '0',
        animation: `dus ${sure}s linear ${Math.random() * 1.4}s forwards`
      });
      document.body.appendChild(el);
      setTimeout(() => el.remove(), (sure + 2.5) * 1000);
    }
  }

  const stil = document.createElement('style');
  stil.textContent = `@keyframes dus {
    0%   { opacity: 0; transform: translateY(0) rotate(0deg); }
    10%  { opacity: 1; }
    100% { opacity: 0; transform: translateY(112vh) rotate(340deg); }
  }`;
  document.head.appendChild(stil);
})();
