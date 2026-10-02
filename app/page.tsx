"use client";

import { useEffect, useState } from "react";
import { Collapse, ConfigProvider, Drawer, Modal } from "antd";
import trTR from "antd/es/locale/tr_TR";
import {
  ArrowDownOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
  CloseOutlined,
  CompassOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  MailOutlined,
  MenuOutlined,
  MinusOutlined,
  PhoneOutlined,
  PlusOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { siteContent as content } from "./site-content";

const links = [
  { id: "hakkimizda", label: "Hakkımızda" },
  { id: "hizmetlerimiz", label: "Hizmetlerimiz" },
  { id: "ekibimiz", label: "Ekibimiz" },
];

function DiagonalArrow() {
  return (
    <ArrowRightOutlined aria-hidden style={{ transform: "rotate(-45deg)" }} />
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<
    (typeof content.team)[number] | null
  >(null);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <ConfigProvider
      locale={trTR}
      theme={{
        token: {
          colorPrimary: "#591620",
          colorText: "#292924",
          colorBgElevated: "#faf9f6",
          borderRadius: 0,
          fontFamily: "Manrope, Arial, sans-serif",
        },
        components: {
          Collapse: { headerBg: "transparent", contentBg: "transparent" },
          Modal: { titleFontSize: 20 },
        },
      }}
    >
      <a className="skip-link" href="#main-content">
        İçeriğe geç
      </a>
      <header className="site-header">
        <a
          className="brand"
          href="#anasayfa"
          aria-label="Arlas Legal ana sayfa"
        >
          <img
            src="/images/arlas-logo.svg"
            alt="Arlas Legal"
            width="142"
            height="84"
          />
        </a>
        <nav aria-label="Ana menü">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={activeSection === link.id ? "location" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="header-contact" href="#iletisim">
            İletişime geçin <DiagonalArrow />
          </a>
          <button
            className="menu-toggle"
            aria-label="Menüyü aç"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <MenuOutlined />
          </button>
        </div>
      </header>

      <Drawer
        title={
          <span className="drawer-brand">
            ARLAS <small>LEGAL</small>
          </span>
        }
        placement="right"
        size={320}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        closeIcon={<CloseOutlined aria-label="Menüyü kapat" />}
      >
        <nav id="mobile-menu" className="mobile-nav" aria-label="Mobil menü">
          {[...links, { id: "iletisim", label: "İletişim" }].map(
            (link, index) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
              >
                <span>0{index + 1}</span>
                {link.label}
                <DiagonalArrow />
              </a>
            ),
          )}
        </nav>
        <p className="drawer-note">Güven. Özen. Kararlılık.</p>
      </Drawer>

      <main id="main-content">
        <section id="anasayfa" className="hero" aria-labelledby="hero-title">
          <div className="hero-image">
            <img
              src="/images/architecture.jpg"
              alt="Doğal ışığın aydınlattığı zarif taş kemerler"
              width="1920"
              height="2880"
              fetchPriority="high"
            />
          </div>
          <div className="hero-content">
            <p className="eyebrow">
              <span /> HUKUK & DANIŞMANLIK
            </p>
            <h1 id="hero-title">
              {content.hero.title}
              <br />
              <em>{content.hero.accent}</em>
            </h1>
            <p className="hero-description">
              {content.hero.description[0]}
              <br />
              {content.hero.description[1]}
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#hizmetlerimiz">
                Hizmetlerimizi keşfedin <DiagonalArrow />
              </a>
              <a className="text-link" href="#hakkimizda">
                Bizi tanıyın <ArrowRightOutlined aria-hidden />
              </a>
            </div>
          </div>
          <div className="hero-bottom">
            <a href="#hakkimizda">
              <span className="scroll-icon">
                <ArrowDownOutlined aria-hidden />
              </span>{" "}
              DAHA YAKINDAN TANIYIN
            </a>
            <span>GÜVEN. ÖZEN. KARARLILIK.</span>
          </div>
          <span className="hero-caption" aria-hidden>
            HUKUKA BÜTÜNCÜL BİR BAKIŞ
          </span>
        </section>

        <div className="principles-strip" aria-label="İlkelerimiz">
          <div>
            <SafetyCertificateOutlined aria-hidden />
            <span>Güvene dayalı ilişkiler</span>
          </div>
          <div>
            <EyeOutlined aria-hidden />
            <span>Açık ve şeffaf iletişim</span>
          </div>
          <div>
            <CompassOutlined aria-hidden />
            <span>Size özel bir yaklaşım</span>
          </div>
        </div>

        <section
          id="hakkimizda"
          className="section about-section"
          aria-labelledby="about-title"
        >
          <div className="about-visual">
            <div className="about-photo">
              <img
                src="/images/architecture-detail.jpg"
                alt="Gün ışığıyla aydınlanan sade mimari ve taş merdiven"
                width="1000"
                height="1500"
                loading="lazy"
              />
            </div>
            <div className="image-seal">
              <span>ARLAS LEGAL</span>
              <span className="seal-symbol">§</span>
              <span>GÜVENLE, BİRLİKTE.</span>
            </div>
            <span className="image-caption">SAĞLAM TEMELLER ÜZERİNE.</span>
          </div>
          <div className="about-copy">
            <p className="eyebrow">01 — HAKKIMIZDA</p>
            <h2 id="about-title">
              Önce sizi anlar,
              <br />
              <em>sonra yol çizeriz.</em>
            </h2>
            <p className="body-copy">{content.about}</p>
            <div className="about-principle">
              <span>01</span>
              <div>
                <h3>Her dosyaya aynı özen.</h3>
                <p>Detayları önemser, süreci birlikte takip ederiz.</p>
              </div>
            </div>
            <div className="about-principle">
              <span>02</span>
              <div>
                <h3>Her adımda açık iletişim.</h3>
                <p>Hukuku anlaşılır kılar, sizi haberdar ederiz.</p>
              </div>
            </div>
            <a className="text-link underlined" href="#ekibimiz">
              Ekibimizle tanışın <DiagonalArrow />
            </a>
          </div>
        </section>

        <section
          id="hizmetlerimiz"
          className="section services-section"
          aria-labelledby="services-title"
        >
          <div className="services-intro">
            <p className="eyebrow">02 — HİZMETLERİMİZ</p>
            <h2 id="services-title">
              Farklı ihtiyaçlar.
              <br />
              <em>Aynı titizlik.</em>
            </h2>
            <p className="body-copy">
              Bireysel ve kurumsal ihtiyaçlarınıza
              <br className="desktop-break" /> bütüncül bir hukuki bakış.
            </p>
            <span className="services-decoration" aria-hidden>
              §
            </span>
          </div>
          <Collapse
            className="services-list"
            accordion
            ghost
            expandIconPlacement="end"
            expandIcon={({ isActive }) =>
              isActive ? <MinusOutlined /> : <PlusOutlined />
            }
            items={content.services.map((service, index) => ({
              key: String(index),
              label: (
                <span className="service-heading">
                  <span className="service-number">0{index + 1}</span>
                  <span>
                    <strong>{service.title}</strong>
                    <small>{service.summary}</small>
                  </span>
                </span>
              ),
              children: (
                <div className="service-detail">
                  <p>{service.description}</p>
                  <a className="text-link" href="#iletisim">
                    Bu konuda görüşelim <DiagonalArrow />
                  </a>
                </div>
              ),
            }))}
          />
        </section>

        <section
          id="ekibimiz"
          className="section team-section"
          aria-labelledby="team-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">03 — EKİBİMİZ</p>
              <h2 id="team-title">
                Ortak değerler.
                <br />
                <em>Birlikte daha güçlü.</em>
              </h2>
            </div>
            <p className="body-copy">
              Her meselenin ardında bir insan,
              <br />
              her çözümün ardında bir ekip var.
            </p>
          </div>
          <div className="team-grid">
            {content.team.map((member, index) => (
              <button
                key={member.name}
                className="team-card"
                onClick={() => setSelectedMember(member)}
                aria-label={`${member.name} profilini inceleyin`}
              >
                <div className={`team-portrait portrait-${index}`}>
                  {member.image ? (
                    <img src={member.image} alt={member.name} loading="lazy" />
                  ) : (
                    <>
                      <div className="portrait-arch" aria-hidden />
                      <span className="portrait-initials" aria-hidden>
                        {member.initials}
                      </span>
                      <span className="portrait-label">ARLAS LEGAL</span>
                    </>
                  )}
                  <span className="profile-open">
                    <DiagonalArrow />
                  </span>
                </div>
                <div className="team-info">
                  <div>
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                  </div>
                  <span>{member.focus}</span>
                </div>
              </button>
            ))}
          </div>
          {content.teamIsSample && (
            <p className="sample-note">
              İsimler ve özgeçmişler temsili içeriktir.
            </p>
          )}
        </section>

        <section className="statement-section" aria-label="Yaklaşımımız">
          <span className="statement-mark" aria-hidden>
            “
          </span>
          <p>
            Güven, doğru atılan
            <br />
            <em>her adımda büyür.</em>
          </p>
          <span className="statement-signature">ARLAS LEGAL</span>
          <div className="statement-lines" aria-hidden />
        </section>

        <section
          id="iletisim"
          className="section contact-section"
          aria-labelledby="contact-title"
        >
          <div className="contact-intro">
            <p className="eyebrow">04 — İLETİŞİM</p>
            <h2 id="contact-title">
              Bir görüşmeyle
              <br />
              <em>başlayalım.</em>
            </h2>
            <p className="body-copy">
              Sizi dinlemek, birlikte bir yol çizmenin
              <br />
              ilk adımı.
            </p>
            {content.contact.email && (
              <a
                className="button primary"
                href={`mailto:${content.contact.email}`}
              >
                Bize yazın <DiagonalArrow />
              </a>
            )}
          </div>
          <div className="contact-details">
            <div className="contact-item">
              <EnvironmentOutlined aria-hidden />
              <div>
                <h3>Ofisimiz</h3>
                {content.contact.address ? (
                  content.contact.mapUrl ? (
                    <a
                      href={content.contact.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {content.contact.address} <DiagonalArrow />
                    </a>
                  ) : (
                    <p>{content.contact.address}</p>
                  )
                ) : (
                  <p>Adres bilgisi yakında burada.</p>
                )}
              </div>
            </div>
            <div className="contact-item">
              <MailOutlined aria-hidden />
              <div>
                <h3>E-posta</h3>
                {content.contact.email ? (
                  <a href={`mailto:${content.contact.email}`}>
                    {content.contact.email}
                  </a>
                ) : (
                  <p>E-posta bilgisi yakında burada.</p>
                )}
              </div>
            </div>
            <div className="contact-item">
              <PhoneOutlined aria-hidden />
              <div>
                <h3>Telefon</h3>
                {content.contact.phone ? (
                  <a
                    href={`tel:${content.contact.phone.replace(/[^+\d]/g, "")}`}
                  >
                    {content.contact.phone}
                  </a>
                ) : (
                  <p>Telefon bilgisi yakında burada.</p>
                )}
              </div>
            </div>
            <p className="contact-note">
              {content.contact.hours ||
                "Yeni ofisimizin iletişim bilgilerini çok yakında paylaşacağız."}
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <a
            className="footer-brand"
            href="#anasayfa"
            aria-label="Arlas Legal ana sayfa"
          >
            <img
              src="/images/arlas-logo.svg"
              alt="Arlas Legal"
              width="142"
              height="84"
            />
          </a>
          <p>
            Sağlam bir temel.
            <br />
            <em>Güvenli bir gelecek.</em>
          </p>
          <nav aria-label="Alt menü">
            {[...links, { id: "iletisim", label: "İletişim" }].map((link) => (
              <a key={link.id} href={`#${link.id}`}>
                {link.label}
              </a>
            ))}
          </nav>
          <a
            className="back-to-top"
            href="#anasayfa"
            aria-label="Sayfanın başına dön"
          >
            <ArrowUpOutlined />
          </a>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Arlas Legal. Tüm hakları saklıdır.
          </p>
          <p>Hukuk & Danışmanlık</p>
        </div>
      </footer>

      <Modal
        open={selectedMember !== null}
        onCancel={() => setSelectedMember(null)}
        footer={null}
        centered
        width={570}
        title={selectedMember?.name}
        closeIcon={<CloseOutlined aria-label="Profili kapat" />}
      >
        <div className="profile-modal">
          <p className="eyebrow">{selectedMember?.role}</p>
          <p className="profile-focus">{selectedMember?.focus}</p>
          <p className="body-copy">{selectedMember?.bio}</p>
          {content.teamIsSample && (
            <p className="sample-note">
              Bu profil tasarım için hazırlanmış temsili içeriktir.
            </p>
          )}
          <a
            className="button primary"
            href="#iletisim"
            onClick={() => setSelectedMember(null)}
          >
            İletişim bilgileri <DiagonalArrow />
          </a>
        </div>
      </Modal>
    </ConfigProvider>
  );
}
