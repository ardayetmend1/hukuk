# Arlas Legal

React ve Ant Design ile hazırlanmış, Türkçe tek sayfa hukuk bürosu tanıtım sitesi. React uygulaması Vite/Vinext üzerinde çalışır.

## Çalıştırma

Node.js 22.13 veya üzeri gerekir.

```sh
npm install
npm run dev
```

Yerel adres: http://localhost:3000

```sh
npm run build
npm start
```

## İçerikleri değiştirme

Tüm hizmetler, ekip profilleri, ana başlıklar ve iletişim bilgileri `app/site-content.ts` dosyasında. Gerçek bilgiler geldiğinde buradan düzenleyin.

- `team` içindeki isim, unvan ve kısa özgeçmişleri güncelleyin. `image` alanına `/images/isim.jpg` biçiminde fotoğraf yolu eklenebilir; fotoğraf yokken zarif baş harfler gösterilir.
- Gerçek ekip bilgileri girildiğinde `teamIsSample` değerini `false` yapın.
- `contact` içindeki `email`, `phone`, `address`, `mapUrl` ve `hours` alanlarını doldurun. E-posta ve telefon bağlantıları otomatik etkinleşir. Şu an bir iletişim formu veya mesaj gönderme servisi bulunmaz.
- Örnek içerikler tamamlandıktan sonra `app/layout.tsx` içindeki `robots` ayarını yayına uygun değiştirin. Başlangıç sürümü `noindex` olarak hazırlanmıştır.
- Renkler ve duyarlı tasarım: `app/globals.css`. Sayfa ve etkileşimler: `app/page.tsx`.

## Görseller

- `public/images/architecture.jpg`: geniş hero mimari görseli.
- `public/images/architecture-detail.jpg`: hakkımızda mimari görseli.
- `public/images/arlas-logo.svg`: sohbette paylaşılan logonun SVG uyarlaması; orijinal raster dosyanın birebir kopyası değildir. Orijinal logo dosyası geldiğinde değiştirilebilir.
- `public/favicon.svg`: markanın simgesinden uyarlanan favicon.
- `public/og.png`: Arlas Legal için üretilmiş sosyal paylaşım görseli.
- Yazı tipleri `public/fonts/` altında yerel olarak sunulur; ziyaret sırasında Google Fonts bağlantısı gerekmez.

Görsel kaynakları ve üretim istemi `ASSETS.md` içinde kayıtlıdır.
