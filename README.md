# Beren 🤍

Beren için hazırlanmış, tek sayfalık bir özür & barışma sitesi.
Tamamen statik: kurulum yok, bağımlılık yok. `index.html` dosyasını çift tıklaman yeterli.

## Dosyalar

| Dosya        | Ne işe yarar                                              |
|--------------|-----------------------------------------------------------|
| `index.html` | Tüm metinler burada (mektup, anılar, sözler)              |
| `assets/`    | Fotoğraf (`beren.jpg`) — değiştirmek için üzerine yaz     |
| `styles.css` | Renkler, yazı tipleri, düzen                              |
| `script.js`  | Tüm animasyonlar (aşağıdaki listeye bak)                  |

## Sayfadaki animasyonlar

- Polaroid fotoğraf: banyodan çıkıyormuş gibi netleşiyor, üzerinden ışık geçiyor,
  fareyle üzerine gelince düzelip 3B eğiliyor
- Açılışta harf harf beliren ve hafifçe süzülen **Beren** yazısı
- Daktilo gibi yazılan giriş cümleleri
- Arka planda yavaşça sürüklenen ışık lekeleri + düşen gül yaprakları
- Sayfanın üstünde okuma ilerleme çubuğu
- Aşağı kaydırınca açılış bölümünde paralaks kayma
- **Tıklanınca açılan zarf** → mektup katlanarak açılıyor, "Sevgili Beren," daktiloyla yazılıyor
- Kelime kelime beliren bölüm başlıkları
- Kayan yazı şeridi
- Fareyle üzerine gelince 3B eğilen ve parlayan özür kartları
- Görününce sıfırdan sayan gün/saat/dakika sayaçları
- Kaydırdıkça dolan anı çizelgesi + nabız gibi atan noktalar
- Çizilerek beliren söz tikleri
- Kendi kendine çizilen ve atan kalp
- İmleci takip eden ışık ve imlece yaklaşan "Evet" düğmesi
- Sayfada herhangi bir yere tıklayınca uçuşan kalpler
- "Peki, bir kahve" düğmesinde kalp yağmuru
- `prefers-reduced-motion` açıksa hepsi kapanır (baş dönmesi yapmasın diye)

## Nasıl kişiselleştirilir

1. **Mektubu kendi cümlelerinle yaz.** `index.html` içinde
   `👇 BURAYI KENDİ CÜMLELERİNLE DEĞİŞTİR` yorumunun arasındaki üç paragrafı değiştir.
   En önemli kısım burası — hazır metin samimi durmaz.
2. **Anıları gerçek anılarla doldur.** Yine `index.html` içinde
   `👇 KENDİ ANILARINIZLA DOLDUR` yorumları arasındaki `<li>` bloklarını düzenle.
   İstediğin kadar blok ekleyebilir veya silebilirsin.
3. **Özür kartlarını** kendi durumuna göre yaz (`<section id="ozur">`).
4. **Sayaç tarihi:** `index.html` içinde `<section ... id="sayac" data-since="2026-06-24T17:00">`
   satırındaki tarih/saat tanıştığınız an. Yılı değiştirmen yeterli.
5. **Renkleri değiştir:** `styles.css` en üstteki `:root` bloğunda
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
