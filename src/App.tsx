import { useEffect, useState } from 'react';
import { Utensils, Flame, Pizza, Fish, Beer, ChefHat, ZoomIn } from 'lucide-react';

const galleryImages = [
  "https://i.ibb.co/5xYwwP1y/66777027-683804158753283-6270935973404606464-n.jpg",
  "https://i.ibb.co/sJmsw18N/67623536-692075457926153-3478557569956446208-n.jpg",
  "https://i.ibb.co/kVvJ2MR0/108556759-948985978901765-5576046250600206148-n.jpg"
];

const daysOfWeek = [
  { label: 'Pon', dayIndex: 1 },
  { label: 'Wt', dayIndex: 2 },
  { label: 'Śr', dayIndex: 3 },
  { label: 'Czw', dayIndex: 4 },
  { label: 'Pią', dayIndex: 5 },
  { label: 'Sob', dayIndex: 6 },
  { label: 'Nd', dayIndex: 0 },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [currentDay, setCurrentDay] = useState<number>(1);

  useEffect(() => {
    // Determine user's local day index
    setCurrentDay(new Date().getDay());
  }, []);

  useEffect(() => {
    // Scroll reveal logic
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    // Keyboard support for Lightbox navigations
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null));
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Offset scrolling slightly to account for sticky header
      const headerOffset = 72;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* 3. NAVIGATION (sticky) */}
      <header className="main-nav">
        <div className="nav-container">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="nav-brand">
            <img 
              id="brand-logo"
              src="https://i.ibb.co/mCkDkMvW/300776342-463770765800903-5956261655581081088-n.jpg" 
              alt="Na Widelcu Grill & Bar Logo" 
            />
            <div className="brand-text">
              <span className="brand-title">NA WIDELCU</span>
              <span className="brand-subtitle font-barlow">Grill & Bar</span>
            </div>
          </a>

          <nav className="nav-menu">
            <button className="nav-link font-oswald" onClick={() => scrollToSection('o-nas')}>O Nas</button>
            <button className="nav-link font-oswald" onClick={() => scrollToSection('oferta')}>Oferta</button>
            <button className="nav-link font-oswald" onClick={() => scrollToSection('godziny')}>Godziny</button>
            <button className="nav-link font-oswald" onClick={() => scrollToSection('opinie')}>Opinie</button>
            <button className="nav-link font-oswald" onClick={() => scrollToSection('kontakt')}>Kontakt</button>
          </nav>

          <span className="nav-location font-barlow">Dziwnówek</span>

          <button id="hamburger-menu-btn" className="hamburger-btn" onClick={() => setMobileMenuOpen(true)}>
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'active' : ''}`}>
        <button id="close-mobile-menu" className="close-mobile-nav" onClick={() => setMobileMenuOpen(false)}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <button className="nav-link font-oswald" onClick={() => scrollToSection('o-nas')}>O Nas</button>
        <button className="nav-link font-oswald" onClick={() => scrollToSection('oferta')}>Oferta</button>
        <button className="nav-link font-oswald" onClick={() => scrollToSection('godziny')}>Godziny</button>
        <button className="nav-link font-oswald" onClick={() => scrollToSection('opinie')}>Opinie</button>
        <button className="nav-link font-oswald" onClick={() => scrollToSection('kontakt')}>Kontakt</button>
      </div>

      {/* 4. HERO (full viewport height) */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        
        <div className="hero-content">
          <span className="section-label font-oswald">Dziwnówek · Kamieńska 14</span>
          <hr className="hero-line" />
          <h1 className="hero-h1-bar">
            NA WIDELCU<br />
            <span style={{ color: 'var(--linen)', fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}>GRILL & BAR</span>
          </h1>
          <p className="hero-tagline">
            Obiady domowe, grill, kebab i pizza w XXL porcjach. Codziennie, dla całej rodziny.
          </p>
          <div className="hero-badge font-oswald">
            PORCJE XXL
          </div>
          <div className="hero-links">
            <button 
              id="cta-menu"
              className="hero-link-orange font-oswald" 
              onClick={() => scrollToSection('oferta')}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              → Nasza oferta
            </button>
            <button 
              id="cta-map"
              className="hero-link-muted font-barlow" 
              onClick={() => scrollToSection('kontakt')}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              → Znajdź nas
            </button>
          </div>
        </div>

        <div className="hero-right-vertical font-barlow">
          SMACZNIE I DO SYTA · DZIWNÓWEK
        </div>
      </section>

      {/* 5. ABOUT SECTION */}
      <section className="section about-section" id="o-nas">
        <div className="container">
          <div className="about-grid">
            <div className="reveal">
              <span className="section-label">O NAS</span>
              <h2 className="about-title">Smacznie. Do syta. Codziennie.</h2>
              <hr className="about-line" />
              <div className="about-text font-serif">
                <p>
                  Restauracja Na Widelcu mieści się w Dziwnówku na rogu ulic Kamieńskiej i Wolności. Serwujemy obiady domowe, grilla, kebaba, pizzę i ryby z pieca — wszystko w naprawdę dużych porcjach.
                </p>
                <p>
                  Przychodź z całą rodziną — a nawet z psem. U nas każdy jest mile widziany.
                </p>
              </div>

              <div className="feature-rows">
                <div className="feature-row">
                  <span className="feature-title">Porcje XXL</span>
                  <span className="feature-desc">bo głodny gość to niezadowolony gość</span>
                </div>
                <div className="feature-row">
                  <span className="feature-title">Otwarte codziennie</span>
                  <span className="feature-desc">obiady od 12:00, grill do 23:00</span>
                </div>
                <div className="feature-row">
                  <span className="feature-title">Rodzinnie i z psem</span>
                  <span className="feature-desc">każdy jest u nas mile widziany</span>
                </div>
              </div>
            </div>

            <div className="about-img-box reveal" style={{ transitionDelay: '100ms' }}>
              <img 
                id="about-illustrator-img"
                src="https://i.ibb.co/sJmsw18N/67623536-692075457926153-3478557569956446208-n.jpg" 
                alt="Na Widelcu Grill & Bar Serwowanie dań" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. OFERTA (Menu/Offer) SECTION */}
      <section className="section oferta-section" id="oferta">
        <div className="container">
          <div className="oferta-header reveal">
            <span className="section-label">NASZA OFERTA</span>
            <h2>Co znajdziesz na widelcu</h2>
            <p className="oferta-tagline font-serif">Przepyszne jedzenie codziennie na Twoim Widelcu.</p>
          </div>

          <div className="oferta-grid">
            <div className="oferta-card reveal" style={{ transitionDelay: '0ms' }}>
              <Utensils className="card-icon" style={{ color: 'var(--orange)' }} size={32} />
              <h3 className="card-title">Obiady domowe</h3>
              <p className="card-desc">Tradycyjne polskie obiady — zupy, drugie dania, surówki. Jak u mamy.</p>
            </div>

            <div className="oferta-card reveal" style={{ transitionDelay: '60ms' }}>
              <Flame className="card-icon" style={{ color: 'var(--orange)' }} size={32} />
              <h3 className="card-title">Grill</h3>
              <p className="card-desc">Szaszłyki, żeberka, karkówka z rusztu. Prosto z żaru, prosto na talerz.</p>
            </div>

            <div className="oferta-card reveal" style={{ transitionDelay: '120ms' }}>
              <ChefHat className="card-icon" style={{ color: 'var(--orange)' }} size={32} />
              <h3 className="card-title">Kebab XXL</h3>
              <p className="card-desc">Duży, soczysty, pełen smaku. W rozmiarze, który naprawdę syci.</p>
            </div>

            <div className="oferta-card reveal" style={{ transitionDelay: '180ms' }}>
              <Pizza className="card-icon" style={{ color: 'var(--orange)' }} size={32} />
              <h3 className="card-title">Pizza</h3>
              <p className="card-desc">Chrupiące ciasto, wybór składników, wielki rozmiar — idealna na stół.</p>
            </div>

            <div className="oferta-card reveal" style={{ transitionDelay: '240ms' }}>
              <Fish className="card-icon" style={{ color: 'var(--orange)' }} size={32} />
              <h3 className="card-title">Ryby z pieca</h3>
              <p className="card-desc">Świeże ryby przygotowane w piecu — lekko i pysznie przy samym morzu.</p>
            </div>

            <div className="oferta-card reveal" style={{ transitionDelay: '300ms' }}>
              <Beer className="card-icon" style={{ color: 'var(--orange)' }} size={32} />
              <h3 className="card-title">Bar</h3>
              <p className="card-desc">Zimne napoje, piwo, drinki — do jedzenia i do relaksu. Bar czynny do 23:00.</p>
            </div>
          </div>

          {/* BELOW GRID PROMO BAR */}
          <div className="promo-bar reveal">
            <div className="promo-left">
              PORCJE XXL — BO GŁODNY GOŚĆ TO NIEZADOWOLONY GOŚĆ
            </div>
            <div className="promo-right">
              Kuchnia: 12:00–20:00 · Grill: 12:00–23:00
            </div>
          </div>
        </div>
      </section>

      {/* 7. GODZINY (Hours) SECTION */}
      <section className="section hours-section" id="godziny">
        <div className="container">
          <div className="hours-header reveal">
            <span className="section-label">KIEDY DZIAŁAMY</span>
            <h2>Włączamy palniki codziennie</h2>
          </div>

          <div className="hours-cards-container reveal">
            
            {/* CARD 1 - Kuchnia */}
            <div className="hours-card card-kuchnia" id="card-kuchnia">
              <div className="card-header font-oswald">
                <span>OBIADY DOMOWE</span>
                {daysOfWeek.some(d => d.dayIndex === currentDay) && <span className="live-indicator"></span>}
              </div>
              <div className="card-body">
                {daysOfWeek.map((day) => {
                  const isActive = day.dayIndex === currentDay;
                  return (
                    <div 
                      key={`kuchnia-${day.label}`} 
                      className={`schedule-row ${isActive ? 'active-navy' : ''}`}
                    >
                      <span className="schedule-day font-barlow">
                        {day.label} (Pon-Nd) {isActive && <span className="text-xs bg-navy text-white px-2 py-0.5 rounded ml-2 uppercase font-oswald tracking-wider">Dzisiaj</span>}
                      </span>
                      <span className="schedule-time-navy font-oswald">12:00 – 20:00</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CARD 2 - Bar & Grill */}
            <div className="hours-card card-grill" id="card-grill">
              <div className="card-header font-oswald">
                <span>BAR, GRILL & KEBAB</span>
                {daysOfWeek.some(d => d.dayIndex === currentDay) && <span className="live-indicator"></span>}
              </div>
              <div className="card-body">
                {daysOfWeek.map((day) => {
                  const isActive = day.dayIndex === currentDay;
                  return (
                    <div 
                      key={`grill-${day.label}`} 
                      className={`schedule-row ${isActive ? 'active-orange' : ''}`}
                    >
                      <span className="schedule-day font-barlow">
                        {day.label} (Pon-Nd) {isActive && <span className="text-xs bg-orange text-white px-2 py-0.5 rounded ml-2 uppercase font-oswald tracking-wider">Dzisiaj</span>}
                      </span>
                      <span className="schedule-time-orange font-oswald">12:00 – 23:00</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          <p className="hours-footer-text font-serif reveal">
            Otwarte codziennie — zapraszamy całą rodzinę.
          </p>
        </div>
      </section>

      {/* 8. OPINIE (Reviews) SECTION */}
      <section className="section reviews-section" id="opinie">
        <div className="container">
          <div className="reviews-header reveal">
            <span className="section-label">OPINIE GOŚCI</span>
            <h2>Co mówią o nas</h2>
          </div>

          <div className="reviews-grid">
            <div className="review-card reveal" style={{ transitionDelay: '0ms' }}>
              <span className="quote-mark">“</span>
              <p className="review-text font-serif">
                Pyszne szaszłyki, gorąco polecam, wyśmienite. Można usiąść przy stoliku z psem, przemiła obsługa.
              </p>
              <span className="review-stars font-oswald">★★★★★</span>
              <span className="review-author font-barlow">— Gość Na Widelcu</span>
            </div>

            <div className="review-card reveal" style={{ transitionDelay: '80ms' }}>
              <span className="quote-mark">“</span>
              <p className="review-text font-serif">
                To miejsce i jedzenie podbiło moje serce bez porównania — najlepsze w całej okolicy. Na jedzenie się czeka bardzo krótko.
              </p>
              <span className="review-stars font-oswald">★★★★★</span>
              <span className="review-author font-barlow">— Gość Na Widelcu</span>
            </div>

            <div className="review-card reveal" style={{ transitionDelay: '160ms' }}>
              <span className="quote-mark">“</span>
              <p className="review-text font-serif">
                Pyszne jedzonko, bardzo miła obsługa, czysto, schludnie. Polecam!
              </p>
              <span className="review-stars font-oswald">★★★★★</span>
              <span className="review-author font-barlow">— Gość Na Widelcu</span>
            </div>
          </div>

          <a 
            id="facebook-reviews-btn"
            href="https://www.facebook.com/NaWidelcuDziwnowek/reviews/?id=100065039499222&sk=reviews" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="reviews-more-btn font-oswald reveal"
          >
            WIĘCEJ OPINII NA FACEBOOKU →
          </a>
        </div>
      </section>

      {/* 9. GALERIA (Gallery) SECTION */}
      <section className="section gallery-section" id="galeria">
        <div className="container">
          <div className="hours-header reveal">
            <span className="section-label">GALERIA</span>
            <h2>Nasze jedzenie</h2>
          </div>

          <div className="gallery-grid">
            {galleryImages.map((src, index) => (
              <div 
                key={`gallery-tile-${index}`} 
                className="gallery-tile reveal"
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setLightboxIndex(index)}
              >
                <div className="gallery-overlay-icon">
                  <ZoomIn size={28} />
                </div>
                <img 
                  src={src} 
                  alt={`Danie Na Widelcu ${index + 1}`} 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX LAYOUT */}
      <div className={`lightbox-overlay ${lightboxIndex !== null ? 'active' : ''}`}>
        {lightboxIndex !== null && (
          <div className="lightbox-container">
            <button id="close-lightbox" className="lightbox-close" onClick={() => setLightboxIndex(null)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            
            <button 
              id="prev-lightbox"
              className="lightbox-nav lightbox-prev" 
              onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : 0))}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            
            <img 
              className="lightbox-img" 
              src={galleryImages[lightboxIndex]} 
              alt="Powiększone danie z galerii" 
            />
            
            <button 
              id="next-lightbox"
              className="lightbox-nav lightbox-next" 
              onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : 0))}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        )}
      </div>

      {/* 10. CONTACT SECTION */}
      <section className="section contact-section" id="kontakt">
        <div className="container">
          <div className="reveal">
            <span className="section-label">KONTAKT I DOJAZD</span>
            <h2>Znajdź nas w Dziwnówku</h2>
          </div>

          <div className="contact-grid">
            <div className="contact-rows reveal">
              
              <div className="contact-row">
                <span className="contact-label font-barlow">ADRES</span>
                <span className="contact-value font-oswald">Kamieńska 14, 72-420 Dziwnówek</span>
                <span className="contact-value-text font-barlow">(róg Kamieńskiej i Wolności)</span>
              </div>

              <div className="contact-row">
                <span className="contact-label font-barlow">E-MAIL</span>
                <a href="mailto:nawidelcudziwnowek@gmail.com" className="contact-value contact-value-link font-oswald">
                  nawidelcudziwnowek@gmail.com
                </a>
              </div>

              <div className="contact-row">
                <span className="contact-label font-barlow">KUCHNIA</span>
                <span className="contact-value font-oswald">12:00 – 20:00 codziennie</span>
              </div>

              <div className="contact-row">
                <span className="contact-label font-barlow">GRILL & BAR</span>
                <span className="contact-value font-oswald">12:00 – 23:00 codziennie</span>
              </div>

              <div className="contact-row">
                <span className="contact-label font-barlow">FACEBOOK</span>
                <a 
                  href="https://www.facebook.com/NaWidelcuDziwnowek" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-value contact-value-link font-oswald"
                  style={{ color: 'var(--orange)' }}
                >
                  Na Widelcu Dziwnówek →
                </a>
              </div>

              <a 
                id="facebook-reviews-action-btn"
                href="https://www.facebook.com/NaWidelcuDziwnowek/reviews/?id=100065039499222&sk=reviews" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-fb-btn font-oswald"
              >
                OPINIE NA FACEBOOKU →
              </a>

            </div>

            <div className="reveal" style={{ transitionDelay: '100ms' }}>
              <div className="map-wrapper">
                <iframe 
                  id="google-maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2343.192444755264!2d14.803094512755429!3d54.034853022870095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47aa84c7cdf16965%3A0x48bfcecd0e1c9dfc!2sKamie%C5%84ska%2014%2C%2072-420%20Dziwn%C3%B3wek!5e0!3m2!1spl!2spl!4v1782120646949!5m2!1spl!2spl" 
                  width="100%" 
                  height="360" 
                  style={{ border: 0 }}
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="footer-section">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <img 
                src="https://i.ibb.co/mCkDkMvW/300776342-463770765800903-5956261655581081088-n.jpg" 
                alt="Na Widelcu Małe Logo" 
              />
              <span className="footer-brand-title font-oswald">NA WIDELCU</span>
            </div>
            
            <div className="footer-location font-barlow">
              Grill & Bar · Dziwnówek
            </div>
            
            <div className="footer-copyright font-barlow">
              © 2026
            </div>
          </div>

          <hr className="footer-divider" />

          <div className="footer-bottom font-barlow">
            Kamieńska 14, Dziwnówek · nawidelcudziwnowek@gmail.com · Facebook
          </div>
        </div>
      </footer>
    </>
  );
}
