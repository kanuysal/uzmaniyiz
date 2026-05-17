const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

// =============================================
// PAGE-SPECIFIC CONTENT CONFIGS
// =============================================
const pageConfigs = {
  'index.html': {
    title: 'UZMANIYIZ.COM | Web Tasarım ve Dijital Strateji',
    description: 'Kreatif ve profesyonel web tasarım stüdyosu. Markanızın dijital dünyadaki varlığını en estetik ve etkileyici biçimde inşa ediyoruz.',
    ogTitle: 'UZMANIYIZ.COM | Web Tasarım ve Dijital Strateji',
    manifesto: `<h1 class="text-title-mission">Hakkımızda</h1><p class="text-body"><strong>UZMANIYIZ.COM: Kreatif ve Profesyonel Web Tasarım Stüdyosu<br/>‍</strong><br/>Dijital dünya her geçen gün daha karmaşık ve rekabetçi hale geliyor. Markalar artık sadece bir web sitesine değil, güçlü bir dijital kimliğe ihtiyaç duyuyor.<br/><br/>Uzmaniyiz.com olarak; yaratıcılığı teknolojiyle buluşturuyor, markaların dijital varlığını en etkili biçimde inşa ediyoruz. Tasarım odaklı yaklaşımımız ve güçlü geliştirme altyapımızla her projeye özgün ve stratejik bir bakış açısı getiriyoruz.<br/><br/><strong>Hizmet Alanlarımız<br/><br/></strong>Her marka farklıdır. Biz de her projeye özel çözümler sunuyoruz:<br/>- Site Tasarımı: Marka kimliğinizi yansıtan, dönüşüm odaklı web siteleri<br/>- Tanıtım ve Tasarım: Hedef kitlenize ulaşan etkili tanıtım materyalleri<br/>- Ürün Siteleri: Ürünlerinizi en iyi şekilde sergileyen e-ticaret çözümleri<br/><br/>Üretici ve sanayici markalar için özel dijital dönüşüm çözümleri sunuyoruz.<br/><br/>Entegre hizmet yaklaşımımız; tasarım, geliştirme ve stratejinin kesiştiği noktada güçlü dijital deneyimler yaratıyor. <br/><br/><strong>Misyonumuz, markanızın dijital dünyadaki varlığını en estetik ve etkileyici biçimde inşa etmektir.</strong></p>`,
  },
  'site-tasarimi.html': {
    title: 'Site Tasarımı | UZMANIYIZ.COM',
    description: 'Markanızın dijital kimliğini yansıtan, kullanıcı dostu ve dönüşüm odaklı profesyonel web sitesi tasarımı. Kurumsal kimliğinizi dijital dünyada en iyi şekilde temsil ediyoruz.',
    ogTitle: 'Site Tasarımı | UZMANIYIZ.COM',
    manifesto: `<h1 class="text-title-mission">Hakkımızda</h1><p class="text-body"><strong>UZMANIYIZ.COM: Kreatif ve Profesyonel Web Tasarım Stüdyosu<br/>‍</strong><br/>Dijital dünyada ilk izlenim her şeydir. Markanızın online varlığı, potansiyel müşterilerinizin sizinle ilgili ilk edindiği izlenimdir.<br/><br/>Uzmaniyiz.com olarak; estetik tasarımı işlevsellikle birleştiriyor, her markanın kendine özgü kimliğini dijital ortama taşıyoruz. Kullanıcı deneyimini ön planda tutan tasarımlarımız, ziyaretçileri müşteriye dönüştürür.<br/><br/><strong>Site Tasarımı Sürecimiz<br/><br/></strong>Her web sitesi projesinde takip ettiğimiz sistematik yaklaşım:<br/>- Keşif ve Strateji: Markanızı, hedef kitlenizi ve hedeflerinizi anlıyoruz<br/>- Tasarım ve Prototip: Markanıza özel benzersiz tasarım konseptleri geliştiriyoruz<br/>- Geliştirme: Modern teknolojilerle hızlı ve güvenli web siteleri inşa ediyoruz<br/><br/>Mobil uyumlu, SEO dostu ve yüksek performanslı web siteleri tasarlıyoruz.<br/><br/>Her projede detaylara verdiğimiz özen ve kusursuzluk anlayışı, sizi rakiplerinizden ayıran fark yaratır. <br/><br/><strong>Markanızın dijital yüzünü birlikte tasarlayalım.</strong></p>`,
  },
  'tanitim-ve-tasarim.html': {
    title: 'Tanıtım ve Tasarım | UZMANIYIZ.COM',
    description: 'Hedef kitlenize ulaşan etkili tanıtım materyalleri ve grafik tasarım hizmetleri. Logo, kurumsal kimlik, broşür ve dijital içerik tasarımı.',
    ogTitle: 'Tanıtım ve Tasarım | UZMANIYIZ.COM',
    manifesto: `<h1 class="text-title-mission">Hakkımızda</h1><p class="text-body"><strong>UZMANIYIZ.COM: Kreatif ve Profesyonel Web Tasarım Stüdyosu<br/>‍</strong><br/>Güçlü bir marka kimliği, sizi rakiplerinizden ayıran en önemli faktördür. Doğru tasarım dili, markanızın mesajını hedef kitlenize etkili biçimde iletir.<br/><br/>Uzmaniyiz.com olarak; markaların kimliklerini görsel dilde en güçlü şekilde ifade etmelerine yardımcı oluyoruz. Logo tasarımından kurumsal kimliğe, broşürden dijital içeriklere kadar geniş bir yelpazede tasarım hizmeti sunuyoruz.<br/><br/><strong>Tanıtım ve Tasarım Hizmetlerimiz<br/><br/></strong>Markanızın her noktasında tutarlı ve güçlü bir görsel kimlik için:<br/>- Logo ve Kurumsal Kimlik: Markanızın ruhunu yansıtan özgün tasarımlar<br/>- Baskı ve Yayın Materyalleri: Broşür, katalog, kartvizit ve daha fazlası<br/>- Dijital İçerik Tasarımı: Sosyal medya, banner ve web grafikleri<br/><br/>Hedef kitlenizde kalıcı iz bırakan tanıtım materyalleri hazırlıyoruz.<br/><br/>Yaratıcı sürecimizde her detay düşünülmüş, her renk seçilmiş ve her tipografi titizlikle belirlenmiştir. <br/><br/><strong>Markanızı rakiplerinizden ayıracak güçlü bir kimlik oluşturalım.</strong></p>`,
  },
  'urun-siteleri.html': {
    title: 'Ürün Siteleri | UZMANIYIZ.COM',
    description: 'Ürünlerinizi en iyi şekilde sergileyen e-ticaret ve ürün tanıtım siteleri. Yüksek dönüşüm oranları ile online satışlarınızı artırın.',
    ogTitle: 'Ürün Siteleri | UZMANIYIZ.COM',
    manifesto: `<h1 class="text-title-mission">Hakkımızda</h1><p class="text-body"><strong>UZMANIYIZ.COM: Kreatif ve Profesyonel Web Tasarım Stüdyosu<br/>‍</strong><br/>Online satış dünyasında fark yaratmak için etkileyici bir ürün sitesine ihtiyacınız var. Ürününüzün değerini doğru aktaran bir site, satışlarınızı katlamaya yetecektir.<br/><br/>Uzmaniyiz.com olarak; ürünlerinizi en iyi şekilde sergileyen, kullanıcı dostu arayüzler tasarlıyor ve geliştiriyoruz. E-ticaret entegrasyonundan ürün katalog sitelerine kadar kapsamlı çözümler sunuyoruz.<br/><br/><strong>Ürün Sitesi Hizmetlerimiz<br/><br/></strong>Ürününüzü öne çıkaracak dijital çözümler:<br/>- E-Ticaret Siteleri: Güvenli ödeme altyapısıyla online mağaza kurulumu<br/>- Ürün Tanıtım Siteleri: Ürününüzü öne çıkaran etkileyici landing page tasarımları<br/>- Katalog Siteleri: Tüm ürün yelpazenizi organize eden profesyonel kataloglar<br/><br/>SEO optimizasyonu ve dönüşüm odaklı tasarım anlayışıyla satışlarınızı artırıyoruz.<br/><br/>Her ürün sitesi, potansiyel müşterinizle ilk dijital buluşma noktanızdır. Bu buluşmayı satışa dönüştürmek için tasarımdan içeriğe her detayı özenle düzenliyoruz. <br/><br/><strong>Ürünlerinizi dijital dünyada öne çıkaralım.</strong></p>`,
  },
  'uretici-ve-sanayi.html': {
    title: 'Üretici ve Sanayi | UZMANIYIZ.COM',
    description: 'Üretici ve sanayi kuruluşları için özel web tasarım ve dijital dönüşüm çözümleri. B2B sektörünüze özel profesyonel dijital kimlik.',
    ogTitle: 'Üretici ve Sanayi | UZMANIYIZ.COM',
    manifesto: `<h1 class="text-title-mission">Hakkımızda</h1><p class="text-body"><strong>UZMANIYIZ.COM: Kreatif ve Profesyonel Web Tasarım Stüdyosu<br/>‍</strong><br/>Sanayi ve üretim sektörü; güvenilirlik, kalite ve uzmanlık üzerine kuruludur. Dijital dünyadaki varlığınız da bu değerleri yansıtmalıdır.<br/><br/>Uzmaniyiz.com olarak; üretici ve sanayi kuruluşlarının dijital dönüşüm süreçlerinde güvenilir bir partner oluyoruz. Sektörün dinamiklerini anlayan bir ekip olarak, B2B iletişimde etkili dijital çözümler sunuyoruz.<br/><br/><strong>Sanayi Sektörüne Özel Hizmetlerimiz<br/><br/></strong>Üretim ve sanayi firmalarına yönelik dijital çözümlerimiz:<br/>- Kurumsal Web Siteleri: Sektörünüzün güvenilirliğini yansıtan profesyonel siteler<br/>- Ürün ve Hizmet Katalogları: Teknik ürünlerinizi etkili biçimde sunan dijital kataloglar<br/>- B2B Portallar: İş ortakları ve müşterileriniz için özel erişim sistemleri<br/><br/>Sanayi firmaları için teknik uzmanlık gerektiren projelerde deneyimli ekibimizle yanınızdayız.<br/><br/>Üretimden dijitale taşıdığınız her adımda, sizinle birlikte yürüyoruz. Markanızın teknik gücünü dijital dünyada görünür kılıyoruz. <br/><br/><strong>Sanayi güçünüzü dijital dünyada öne çıkaralım.</strong></p>`,
  },
  'join-us.html': {
    title: 'İletişim | UZMANIYIZ.COM',
    description: 'Projenizi hayata geçirmek için bizimle iletişime geçin. Web tasarım, grafik tasarım ve dijital strateji hizmetlerimiz hakkında bilgi alın.',
    ogTitle: 'İletişim | UZMANIYIZ.COM',
    manifesto: null, // Keep as is for join-us
  }
};

Object.entries(pageConfigs).forEach(([filename, config]) => {
  const htmlPath = path.join(WORKSPACE, filename);
  if (!fs.existsSync(htmlPath)) return;
  let content = fs.readFileSync(htmlPath, 'utf8');
  
  // 1. Fix title tag
  content = content.replace(/<title>.*?<\/title>/gi, `<title>${config.title}</title>`);
  
  // 2. Fix meta description
  content = content.replace(/<meta content="[^"]*" name="description"\/>/gi, 
    `<meta content="${config.description}" name="description"/>`);
  
  // 3. Fix og:title - clean up any malformed ones with pipe
  content = content.replace(/<meta content="[^"]*" property="og:title"\/>/gi,
    `<meta content="${config.ogTitle}" property="og:title"/>`);
  
  // 4. Fix twitter:title
  content = content.replace(/<meta content="[^"]*" property="twitter:title"\/>/gi,
    `<meta content="${config.ogTitle}" property="twitter:title"/>`);
  
  // 5. Fix og:description and twitter:description
  content = content.replace(/<meta content="[^"]*" property="og:description"\/>/gi,
    `<meta content="${config.description}" property="og:description"/>`);
  content = content.replace(/<meta content="[^"]*" property="twitter:description"\/>/gi,
    `<meta content="${config.description}" property="twitter:description"/>`);
  
  // 6. Fix lang attribute
  content = content.replace(/lang="en"/gi, 'lang="tr"');
  
  // 7. Fix manifesto section if provided
  if (config.manifesto) {
    const manifestoRegex = /<h1 class="text-title-mission">[\s\S]*?<\/p>/;
    content = content.replace(manifestoRegex, config.manifesto);
  }
  
  // 8. Fix remaining English nav text "About Us" -> "Hakkımızda"  
  content = content.replace(/>About Us</gi, '>Hakkımızda<');
  content = content.replace(/>About us</gi, '>Hakkımızda<');
  
  // 9. Fix "Close" in manifesto close button
  content = content.replace(/<div class="text-navigation">Close<\/div>/gi, 
    '<div class="text-navigation">Kapat</div>');
  
  // 10. Fix Terms & Conditions, Privacy Policy, Cookies
  content = content.replace(/>Terms &amp; Conditions</gi, '>Kullanım Koşulları<');
  content = content.replace(/>Privacy Policy</gi, '>Gizlilik Politikası<');
  content = content.replace(/>Cookies</gi, '>Çerezler<');
  content = content.replace(/>Site by OFF\+BRAND\.</gi, '>Tasarım: OFF+BRAND.<');
  
  // 11. Fix SKETCH MODE button
  content = content.replace(/>SKETCH MODE</gi, '>KALEMİ AÇ<');
  
  // 12. Fix any malformed og:title with | pipe
  content = content.replace(/content="[^"]*"\|content="[^"]*" property="og:title"/gi,
    `content="${config.ogTitle}" property="og:title"`);
  content = content.replace(/content="[^"]*"\|content="[^"]*" property="twitter:title"/gi,
    `content="${config.ogTitle}" property="twitter:title"`);
    
  fs.writeFileSync(htmlPath, content, 'utf8');
  console.log(`✓ Fully localized: ${filename}`);
});
