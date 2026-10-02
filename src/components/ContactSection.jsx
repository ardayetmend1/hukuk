import { useState } from 'react';
import { Alert, Form, Input, Select } from 'antd';
import { ArrowUpOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { siteContent } from '../content';

const mapUrl = 'https://www.google.com/maps/search/?api=1&query=Istanbul%2C%20Turkey';
const mapEmbed = 'https://maps.google.com/maps?q=Istanbul%2C%20Turkey&z=11&hl=tr&output=embed';

export default function ContactSection() {
  const [notice, setNotice] = useState('');
  const canSend = Boolean(siteContent.contact.email);

  function handleFinish(values) {
    if (!canSend) {
      setNotice('Form doğrulandı. Gönderim henüz etkin olmadığı için bilgileriniz iletilmedi.');
      return;
    }
    const body = [
      `Ad soyad: ${values.name.trim()}`,
      `Telefon: ${values.phone.trim()}`,
      `E-posta: ${values.email.trim()}`,
      `Konu: ${values.subject}`,
      '', values.message.trim(),
    ].join('\n');
    window.location.href = `mailto:${siteContent.contact.email}?subject=${encodeURIComponent(`Danışmanlık talebi — ${values.subject}`)}&body=${encodeURIComponent(body)}`;
    setNotice('Talebiniz henüz gönderilmedi. Açılan e-posta taslağını kendi e-posta uygulamanızdan gönderebilirsiniz.');
  }

  return (
    <section id="iletisim" className="section contact-section" aria-labelledby="contact-title">
      <div className="contact-intro">
        <p className="eyebrow">04 — İLETİŞİM</p>
        <h2 id="contact-title">Bir görüşmeyle<br /><em>başlayalım.</em></h2>
        <p className="body-copy">Sizi dinlemek, birlikte bir yol çizmenin<br />ilk adımı.</p>

        <div className="contact-map">
          <div className="contact-map-heading">
            <div><EnvironmentOutlined aria-hidden /><span><strong>İstanbul, Türkiye</strong><small>Şehir konumu</small></span></div>
            <a href={mapUrl} target="_blank" rel="noopener noreferrer" aria-label="İstanbul konumunu Google Maps üzerinde aç">Google Maps <span aria-hidden>↗</span></a>
          </div>
          <iframe title="Google Maps — İstanbul şehir konumu" src={mapEmbed} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
        </div>
      </div>

      <div className="consultation-panel">
        <p className="eyebrow">DANIŞMANLIK TALEBİ</p>
        <h3>Hemen danışmanlık alın.</h3>
        <p className="consultation-description">Size nasıl yardımcı olabiliriz? Kısaca anlatın.</p>
        <Form name="consultation" layout="vertical" onFinish={handleFinish} onValuesChange={() => setNotice('')} requiredMark={false} className="consultation-form" scrollToFirstError={{ behavior: 'smooth', block: 'center', focus: true }}>
          <div className="consultation-fields">
            <Form.Item name="name" label="Adınız soyadınız" rules={[{ required: true, whitespace: true, min: 2, message: 'Lütfen adınızı ve soyadınızı yazın.' }]}>
              <Input placeholder="Adınız Soyadınız" autoComplete="name" maxLength={100} />
            </Form.Item>
            <Form.Item name="phone" label="Telefon numaranız" rules={[{ validator: (_, value) => {
              const digits = (value || '').replace(/\D/g, '');
              return /^\+?[\d\s().-]+$/.test(value || '') && digits.length >= 10 && digits.length <= 15
                ? Promise.resolve()
                : Promise.reject(new Error('Lütfen geçerli bir telefon numarası yazın.'));
            } }]}>
              <Input type="tel" inputMode="tel" placeholder="05XX XXX XX XX" autoComplete="tel" maxLength={25} />
            </Form.Item>
            <Form.Item name="email" label="E-posta adresiniz" rules={[{ required: true, message: 'Lütfen e-posta adresinizi yazın.' }, { type: 'email', message: 'Lütfen geçerli bir e-posta adresi yazın.' }]}>
              <Input type="email" placeholder="ornek@eposta.com" autoComplete="email" maxLength={254} />
            </Form.Item>
            <Form.Item name="subject" label="Danışmanlık konusu" rules={[{ required: true, message: 'Lütfen bir konu seçin.' }]}>
              <Select placeholder="Konu seçiniz" options={[...siteContent.services.map(({ title }) => ({ value: title, label: title })), { value: 'Diğer', label: 'Diğer' }]} />
            </Form.Item>
          </div>
          <Form.Item name="message" label="Size nasıl yardımcı olabiliriz?" rules={[{ required: true, whitespace: true, min: 10, message: 'Lütfen en az 10 karakterlik kısa bir mesaj yazın.' }]}>
            <Input.TextArea placeholder="Danışmak istediğiniz konudan kısaca bahsedin…" rows={4} maxLength={1500} showCount />
          </Form.Item>
          <button type="submit" className="consultation-submit">Danışmanlık talebi oluştur <ArrowUpOutlined aria-hidden style={{ transform: 'rotate(45deg)' }} /></button>
          <p className="consultation-note">{canSend ? 'Talebiniz e-posta uygulamanızda taslak olarak hazırlanır.' : 'Önizleme formu · Gönderim henüz etkin değil.'}</p>
          {notice && <div role="status" aria-live="polite" className="consultation-notice"><Alert type="info" showIcon title={notice} /></div>}
        </Form>
      </div>
    </section>
  );
}
