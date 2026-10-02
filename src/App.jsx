import { useEffect, useRef, useState } from "react";
import { Collapse, ConfigProvider, Drawer, Modal } from "antd";
import trTR from "antd/es/locale/tr_TR";
import {
  ArrowDownOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
  CloseOutlined,
  CompassOutlined,
  EyeOutlined,
  MenuOutlined,
  MinusOutlined,
  PlusOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { siteContent as content } from "./content";
import { GlowingButton } from "./components/ui/glowing-button";
import ContactSection from "./components/ContactSection";

const links = [
  { id: "hakkimizda", label: "Hakkımızda", glowColor: '#b79258' },
  { id: "hizmetlerimiz", label: "Hizmetlerimiz", glowColor: '#a47b65' },
  { id: "ekibimiz", label: "Ekibimiz", glowColor: '#9b5360' },
];

function DiagonalArrow() {
  return (
    <ArrowRightOutlined aria-hidden style={{ transform: "rotate(-45deg)" }} />
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeSection, setActiveSection] = useState("");
  const principleRef = useRef(null);
  const [principlesVisible, setPrinciplesVisible] = useState(false);
  const servicesRef = useRef(null);
  const [visibleServices, setVisibleServices] = useState(() => new Set());

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = Number(entry.target.dataset.serviceStep);
        setVisibleServices((previous) => new Set([...previous, index]));
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.35, rootMargin: '0px 0px -8% 0px' });
    servicesRef.current?.querySelectorAll('[data-service-step]').forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPrinciplesVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.35 });
    if (principleRef.current) observer.observe(principleRef.current);
    return () => observer.disconnect();
  }, []);

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
        <span className="header-details" aria-hidden="true" />
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
            <GlowingButton
              key={link.id}
              href={`#${link.id}`}
              glowColor={link.glowColor}
              aria-current={activeSection === link.id ? "location" : undefined}
            >
              {link.label}
            </GlowingButton>
          ))}
        </nav>
        <div className="header-actions">
          <GlowingButton className="header-contact" href="#iletisim" variant="solid" glowColor="#c6a478" aria-current={activeSection === 'iletisim' ? 'location' : undefined}>
            İletişime geçin <DiagonalArrow />
          </GlowingButton>
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
              <GlowingButton
                key={link.id}
                href={`#${link.id}`}
                glowColor={link.glowColor || '#c6a478'}
                variant={link.id === 'iletisim' ? 'solid' : 'soft'}
                aria-current={activeSection === link.id ? 'location' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                <span>0{index + 1}</span>
                {link.label}
                <DiagonalArrow />
              </GlowingButton>
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
                src="/images/about-desk.jpg"
                alt="Doğal ışık alan ahşap çalışma masasında defter ve dolma kalem"
                width="1400"
                height="2100"
                loading="lazy"
              />
            </div>
            <span className="image-caption">DİKKATLE DİNLER. ÖZENLE ÇALIŞIRIZ.</span>
          </div>
          <div className="about-copy">
            <p className="eyebrow">01 — HAKKIMIZDA</p>
            <h2 id="about-title">
              Önce sizi anlar,
              <br />
              <em>sonra yol çizeriz.</em>
            </h2>
            <p className="body-copy">{content.about}</p>
            <ol ref={principleRef} className={`about-timeline${principlesVisible ? ' is-visible' : ''}`} aria-label="Çalışma yaklaşımımız">
              <li className="about-principle">
                <span className="principle-track" aria-hidden="true"><span /></span>
                <span className="principle-number" aria-hidden="true">01</span>
                <div>
                  <h3>Her dosyaya aynı özen.</h3>
                  <p>Detayları önemser, süreci birlikte takip ederiz.</p>
                </div>
              </li>
              <li className="about-principle">
                <span className="principle-number" aria-hidden="true">02</span>
                <div>
                  <h3>Her adımda açık iletişim.</h3>
                  <p>Hukuku anlaşılır kılar, sizi haberdar ederiz.</p>
                </div>
              </li>
            </ol>
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
              <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" focusable="false">
                <path d="M60 17v84M38 103h44M48 97h24M22 38l38-9 38 9" />
                <circle cx="60" cy="15" r="4" />
                <path d="M8 73l14-35 14 35M84 73l14-35 14 35" />
                <path d="M8 73h28a14 14 0 0 1-28 0ZM84 73h28a14 14 0 0 1-28 0Z" fill="currentColor" fillOpacity="0.07" />
              </svg>
            </span>
          </div>
          <div className="services-timeline" ref={servicesRef}>
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
              className: visibleServices.has(index) ? 'service-reached' : '',
              label: (
                <span className="service-heading" data-service-step={index}>
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
          </div>
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

        <ContactSection />
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
