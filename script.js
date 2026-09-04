/* ============================================================
   Beren — hareketler
   1) Arka planda düşen yapraklar
   2) Kaydırdıkça beliren bölümler
   3) Sorunun cevabı + kalp yağmuru
   ============================================================ */

const azHareket = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

/* ── 2) Kaydırdıkça belirme ──────────────────────────────── */
(function belirme() {
  const ogeler = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    ogeler.forEach(o => o.classList.add('visible'));
    return;
  }
  const gozlemci = new IntersectionObserver((girisler) => {
    girisler.forEach(giris => {
      if (giris.isIntersecting) {
        giris.target.classList.add('visible');
        gozlemci.unobserve(giris.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  ogeler.forEach(o => gozlemci.observe(o));
})();

/* ── 3) Soru ─────────────────────────────────────────────── */
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
      evet.style.transform = `scale(${1 + (sayac + 1) * 0.09})`;
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
    hayir.hidden = true;
    kalpYagmuru();
  });

  function kalpYagmuru() {
    if (azHareket) return;
    const kalpler = ['🤍', '🌹', '💌', '✨', '🩷'];
    for (let i = 0; i < 46; i++) {
      const el = document.createElement('span');
      el.textContent = kalpler[Math.floor(Math.random() * kalpler.length)];
      el.setAttribute('aria-hidden', 'true');
      const sure = 2.6 + Math.random() * 2.4;
      Object.assign(el.style, {
        position: 'fixed',
        left: Math.random() * 100 + 'vw',
        top: '-6vh',
        fontSize: 12 + Math.random() * 22 + 'px',
        pointerEvents: 'none',
        zIndex: '99',
        opacity: '0',
        animation: `dus ${sure}s linear ${Math.random() * 1.2}s forwards`
      });
      document.body.appendChild(el);
      setTimeout(() => el.remove(), (sure + 2) * 1000);
    }
  }

  // Kalp yağmurunun animasyonunu bir kez tanımla.
  const stil = document.createElement('style');
  stil.textContent = `@keyframes dus {
    0%   { opacity: 0; transform: translateY(0) rotate(0deg); }
    10%  { opacity: 1; }
    100% { opacity: 0; transform: translateY(112vh) rotate(340deg); }
  }`;
  document.head.appendChild(stil);
})();
