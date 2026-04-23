import React, { useState, useEffect, useRef } from 'react';

// Custom SVG Instagram icon
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const GrainOverlay = () => <div className="grain" />;

const sections = [
  {
    id: 'intro',
    image: '/pictures/bridge-to-home.jpg',
    type: 'hero-empty', // Just the image
  },
  {
    id: 'hero-text',
    image: '/pictures/bridge-to-home.jpg', // Same image, but we will make it feel continuous
    type: 'hero-text',
  },
  {
    id: 'story',
    image: '/pictures/creek-with-hammock.jpg',
    type: 'story',
    label: 'Origin',
    title: 'Of Ammini\n& Resilience',
    body: 'Tucked away in a corner of Coorg, Amni is a sanctuary of quiet resilience. What you see today — the waterfalls, the fruit trees, the dark creek — was once considered too remote, too harsh. Our grandparents stayed. They built it stone by stone, season by season. And slowly, the land softened.',
  },
  {
    id: 'vibe',
    image: '/pictures/chairs-table-sunlit-in-nature.jpg',
    type: 'pullquote',
    quote: 'Not curated luxury, but nature, unfiltered and generous.',
  },
  {
    id: 'accommodation',
    image: '/pictures/hall-sunlit-couch-four-chairs-center-table.jpg',
    type: 'feature',
    label: 'The Cottage',
    title: 'A Private\nDwelling',
    body: 'Two well-appointed rooms sleeping up to five. Your private verandahs offer uninterrupted views of the 100-acre estate. A stone fireplace at the centre of the living room. No televisions — ensuring you truly disconnect from the world.',
    align: 'right',
  },
  {
    id: 'fireplace',
    image: '/pictures/fireplace-with-chairs.jpg',
    type: 'feature',
    label: 'Evenings',
    title: 'Amber Hours',
    body: 'When the forest dims and the mist rolls in, the fireplace becomes the heart of the cottage. The ornate chairs, the soft crackle, the silence beyond — a rare peace that defines the Amni experience.',
    align: 'left',
  },
  {
    id: 'dining',
    image: '/pictures/dining-open-window-sunlit.jpg',
    type: 'feature',
    label: 'Dining',
    title: 'Homestyle,\nCoorg Flavour',
    body: 'All meals are served at our home, just a two-minute walk from the cottage. Simple, wholesome cuisine using locally sourced ingredients. Traditional Coorg flavours meet the warmth of a shared table.',
    align: 'right',
  },
  {
    id: 'details',
    image: '/pictures/fountain-creek-water.jpg',
    type: 'grid',
    label: 'The Details',
    title: 'Bespoke\nSanctuary',
    items: [
      { label: 'Exclusivity', value: 'One group at a time' },
      { label: 'Estate', value: '100+ Acres of Nature' },
      { label: 'Breakfast', value: 'Artisanal Coorg Style' },
      { label: 'Wildlife', value: '50+ Species of Birds' },
      { label: 'Trails', value: 'Mapped Private Paths' },
      { label: 'Peace', value: 'Total Digital Detox' }
    ]
  },
  {
    id: 'bonfire',
    image: '/pictures/bonfire-lawn-chairs-couch.jpg',
    type: 'feature',
    label: 'Nights',
    title: 'Fire &\nSilence',
    body: 'Under a sky uninterrupted by city light, a bonfire circles warmth through the cool Coorg air. There is no agenda. Just the fire, the night, and the absolute privacy of your surroundings.',
    align: 'left',
  },
  {
    id: 'contact',
    image: '/pictures/creek-with-hammock.jpg',
    type: 'contact',
  },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollTop / window.innerHeight);
      setCurrent(idx);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (i) => {
    containerRef.current?.scrollTo({ top: i * window.innerHeight, behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', background: '#0c0b09', fontFamily: "'Outfit', sans-serif" }}>
      <GrainOverlay />
      
      {/* ── Fixed Nav ───────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: 'clamp(20px, 4vw, 40px)',
        background: menuOpen ? 'rgba(12,11,9,0.98)' : 'transparent',
        transition: 'background 0.6s ease',
      }}>
        <button 
          onClick={() => scrollTo(0)} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <img src="/logo-hills.svg" alt="Amni" style={{ height: 'clamp(28px, 4vw, 36px)', filter: 'invert(1)', opacity: 0.9 }} />
        </button>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f5f0e8', padding: '4px 8px' }}
        >
          {menuOpen
            ? <span style={{ fontSize: 11, letterSpacing: '0.25em', color: '#a09080' }}>CLOSE</span>
            : <span style={{ fontSize: 11, letterSpacing: '0.25em' }}>MENU</span>
          }
        </button>
      </nav>

      {/* ── Invitation Pill (Floating CTA) ──────────────── */}
      <div style={{
        position: 'fixed', bottom: 'clamp(24px, 5vw, 40px)', left: '50%', transform: 'translateX(-50%)',
        zIndex: 50, transition: 'opacity 0.8s ease, transform 0.8s ease',
        opacity: current === sections.length - 1 || current === 0 || current === 1 ? 0 : 1,
        pointerEvents: current === sections.length - 1 || current === 0 || current === 1 ? 'none' : 'all',
      }}>
        <button 
          onClick={() => scrollTo(sections.length - 1)}
          style={{
            background: 'rgba(245, 240, 232, 0.08)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(245, 240, 232, 0.15)',
            color: '#f5f0e8',
            padding: '12px 24px',
            borderRadius: '100px',
            fontSize: 10,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.4s ease',
            whiteSpace: 'nowrap'
          }}
        >
          Request an Invitation
        </button>
      </div>

      {/* ── Fullscreen Menu Overlay ───────────────────── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 99,
        background: '#0c0b09',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'all' : 'none',
        transition: 'opacity 0.5s ease',
        gap: '4px',
      }}>
        {['Arrive', 'Story', 'The Vibe', 'The Cottage', 'Amber Hours', 'Dining', 'Sanctuary', 'Fire', 'Enquire'].map((label, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i === 0 ? 0 : i + 1)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(24px, 5vw, 40px)',
              fontStyle: 'normal',
              color: '#5c5245',
              transition: 'all 0.4s ease',
              padding: '8px 0',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#c8b89a';
              e.currentTarget.style.fontStyle = 'italic';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#5c5245';
              e.currentTarget.style.fontStyle = 'normal';
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Shared Sticky Image for Hero ─────────────── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1,
        opacity: current <= 1 ? 1 : 0,
        pointerEvents: 'none',
        transition: 'opacity 1s ease',
      }}>
        <img src="/pictures/bridge-to-home.jpg" alt="" style={{ 
          width: '100%', height: '100%', objectFit: 'cover',
          transform: `scale(${1 + (current * 0.05)})`,
          transition: 'transform 3s cubic-bezier(0.16, 1, 0.3, 1)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to top, rgba(12,11,9,${0.6 + (current * 0.3)}) 0%, transparent 80%)`,
          transition: 'background 1s ease',
        }} />
      </div>

      {/* ── Scroll Container ─────────────────────────── */}
      <div
        ref={containerRef}
        style={{
          height: '100vh', width: '100vw', overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          position: 'relative', zIndex: 2,
        }}
        className="hide-scrollbar"
      >
        {sections.map((sec, i) => (
          <SlideSection key={sec.id} sec={sec} isActive={current === i} onScrollNext={() => scrollTo(i + 1)} />
        ))}
      </div>
    </div>
  );
}

function SlideSection({ sec, isActive, onScrollNext }) {
  // If it's the hero parts, we handle the image separately via the fixed container
  const isHeroPart = sec.type === 'hero-empty' || sec.type === 'hero-text';

  return (
    <section style={{
      height: '100vh', width: '100%',
      scrollSnapAlign: 'start', scrollSnapStop: 'always',
      position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center',
    }}>
      {/* Background Image (only for non-hero parts) */}
      {!isHeroPart && (
        <div style={{
          position: 'absolute', inset: 0,
          transform: isActive ? 'scale(1)' : 'scale(1.05)',
          transition: 'transform 3s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 1
        }}>
          <img src={sec.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(12,11,9,0.4)',
          }} />
        </div>
      )}

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px, 8vw, 60px)',
        opacity: isActive ? 1 : 0,
        transform: isActive ? 'translateY(0)' : 'translateY(60px)',
        transition: 'opacity 1.5s ease 0.3s, transform 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
      }}>
        
        {sec.type === 'hero-text' && (
          <div style={{ textAlign: 'left', marginTop: '10vh' }}>
            <p style={{ fontSize: 9, letterSpacing: '0.4em', color: '#c8b89a', marginBottom: 20 }}>COORG, KARNATAKA</p>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(44px, 10vw, 130px)',
              fontWeight: 400, lineHeight: 0.85, color: '#f5f0e8', margin: 0
            }}>
              Sanctuary<br />
              <em style={{ fontStyle: 'italic', color: '#c8b89a' }}>Shaped by Time</em>
            </h1>
            <p style={{ fontSize: 14, color: '#a09080', letterSpacing: '0.1em', marginTop: 32, maxWidth: 300 }}>
              Held by nature, defined by silence.
            </p>
          </div>
        )}

        {(sec.type === 'story' || sec.type === 'feature') && (
          <div style={{ 
            maxWidth: 540, 
            marginLeft: sec.align === 'right' ? 'auto' : 0,
            textAlign: sec.align === 'right' ? 'right' : 'left'
          }}>
            <p style={{ fontSize: 9, letterSpacing: '0.5em', color: '#c8b89a', marginBottom: 20, textTransform: 'uppercase' }}>{sec.label}</p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(32px, 5.5vw, 76px)',
              fontWeight: 400, lineHeight: 1, color: '#f5f0e8', margin: '0 0 28px 0',
              whiteSpace: 'pre-line'
            }}>{sec.title}</h2>
            <p style={{ fontSize: 'clamp(14px, 1.5vw, 17px)', lineHeight: 1.8, color: '#b8a898', fontWeight: 300 }}>{sec.body}</p>
          </div>
        )}

        {sec.type === 'pullquote' && (
          <div style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
            <blockquote style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(22px, 3.5vw, 52px)',
              fontWeight: 400, fontStyle: 'italic', color: '#e8dece', lineHeight: 1.4
            }}>
              "{sec.quote}"
            </blockquote>
          </div>
        )}

        {sec.type === 'grid' && (
          <div style={{ maxWidth: 900 }}>
            <p style={{ fontSize: 9, letterSpacing: '0.5em', color: '#c8b89a', marginBottom: 20, textTransform: 'uppercase' }}>{sec.label}</p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(32px, 5.5vw, 76px)',
              fontWeight: 400, lineHeight: 1, color: '#f5f0e8', margin: '0 0 48px 0',
              whiteSpace: 'pre-line'
            }}>{sec.title}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(24px, 4vw, 48px) clamp(30px, 6vw, 80px)' }}>
              {sec.items.map((item, idx) => (
                <div key={idx}>
                  <p style={{ fontSize: 9, letterSpacing: '0.2em', color: '#a09080', marginBottom: 6, textTransform: 'uppercase' }}>{item.label}</p>
                  <p style={{ fontSize: 'clamp(14px, 1.2vw, 16px)', color: '#c8b89a', fontWeight: 300 }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {sec.type === 'contact' && (
          <div style={{ textAlign: 'left', width: '100%' }}>
            <p style={{ fontSize: 9, letterSpacing: '0.5em', color: '#c8b89a', marginBottom: 20 }}>ENQUIRE</p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(40px, 8vw, 100px)',
              fontWeight: 400, lineHeight: 0.9, color: '#f5f0e8', margin: '0 0 40px 0'
            }}>Return to<br /><em style={{ fontStyle: 'italic', color: '#c8b89a' }}>the Rhythm</em></h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', marginBottom: 60 }}>
              <ContactLink label="Email" value="amni.coorg@gmail.com" />
              <ContactLink label="Phone" value="+91 854 758 6562" />
              <ContactLink label="Instagram" value="@amni.coorg" />
            </div>
            
            <div style={{ 
              display: 'flex', 
              flexDirection: 'row',
              justifyContent: 'space-between', 
              alignItems: 'center',
              borderTop: '1px solid rgba(255,255,255,0.08)', 
              paddingTop: 32,
              marginTop: 20
            }}>
              <img src="/logo-full.svg" alt="Amni" style={{ height: 24, filter: 'invert(1)', opacity: 0.2 }} />
              <p style={{ fontSize: 9, letterSpacing: '0.3em', color: '#5a4e44', margin: 0 }}>© {new Date().getFullYear()} AMNI, COORG</p>
            </div>
          </div>
        )}
      </div>

      {/* Down Arrow for First Slide only */}
      {sec.type === 'hero-empty' && (
        <div 
          onClick={onScrollNext}
          style={{ 
            position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', 
            cursor: 'pointer', zIndex: 20, opacity: 0.5 
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f5f0e8" strokeWidth="1">
            <polyline points="7 13 12 18 17 13"></polyline>
            <polyline points="7 6 12 11 17 6"></polyline>
          </svg>
        </div>
      )}
    </section>
  );
}

function ContactLink({ label, value }) {
  return (
    <div>
      <p style={{ fontSize: 9, letterSpacing: '0.3em', color: '#c8b89a', marginBottom: 8, textTransform: 'uppercase' }}>{label}</p>
      <p style={{ fontSize: 'clamp(14px, 1.5vw, 17px)', color: '#f5f0e8', fontWeight: 300 }}>{value}</p>
    </div>
  );
}
