# Beren 🤍

Beren için hazırlanmış, tek sayfalık bir özür & barışma sitesi.
Tamamen statik: kurulum yok, bağımlılık yok. `index.html` dosyasını çift tıklaman yeterli.

## Dosyalar

| Dosya        | Ne işe yarar                                              |
|--------------|-----------------------------------------------------------|
| `index.html` | Tüm metinler burada (mektup, anılar, sözler)              |
| `styles.css` | Renkler, yazı tipleri, düzen                              |
| `script.js`  | Düşen yapraklar, kaydırma animasyonu, sondaki soru        |

## Nasıl kişiselleştirilir

1. **Mektubu kendi cümlelerinle yaz.** `index.html` içinde
   `👇 BURAYI KENDİ CÜMLELERİNLE DEĞİŞTİR` yorumunun arasındaki üç paragrafı değiştir.
   En önemli kısım burası — hazır metin samimi durmaz.
2. **Anıları gerçek anılarla doldur.** Yine `index.html` içinde
   `👇 KENDİ ANILARINIZLA DOLDUR` yorumları arasındaki `<li>` bloklarını düzenle.
   İstediğin kadar blok ekleyebilir veya silebilirsin.
3. **Özür kartlarını** kendi durumuna göre yaz (`<section id="ozur">`).
4. **Renkleri değiştir:** `styles.css` en üstteki `:root` bloğunda
   `--rose`, `--gold`, `--bg` değerleriyle oynaman yeterli.

## Yayına alma

Ücretsiz seçenekler:

- **GitHub Pages** — depo ayarları → Pages → branch olarak bu dalı seç.
- **Netlify Drop** — klasörü https://app.netlify.com/drop adresine sürükle.
- **Vercel** — `vercel` komutu veya arayüzden içe aktar.

Sonra çıkan linki gönderirsin.

## Küçük bir not

Bu site güzel bir jest ama tek başına bir garanti değil — asıl fark, içindeki
sözlerin arkasında durmakla ortaya çıkar. Metni gerçekten kendi cümlelerinle
yazarsan çok daha iyi karşılık bulur.
