import { useState, useEffect } from 'react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Vision', href: '#vision' },
  { label: 'Alliance', href: '#alliance' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="absolute top-0 left-0 right-0 z-50 bg-transparent"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 h-[72px] flex items-center justify-between">
        <a
          href="#"
          className="font-heading text-[20px] font-bold tracking-[-0.03em] text-[#0a0a0a]"
        >
          SeekerLabs<span className="text-[#DDFC6B]">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="brutal-link text-[13px] font-semibold text-[#0a0a0a] uppercase tracking-[0.06em]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden font-heading text-[14px] font-bold text-[#0a0a0a] uppercase tracking-[0.06em]"
        >
          {mobileOpen ? '✕ Close' : '☰ Menu'}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden mobile-menu-enter bg-[#F2F0E6]/95 backdrop-blur-lg border-t border-[#0a0a0a]/10 px-6 py-8 flex flex-col gap-6">
          {links.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-heading text-[18px] font-bold text-[#0a0a0a] uppercase tracking-[0.02em]"
              style={{
                animation: `menu-slide-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.06}s both`,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
