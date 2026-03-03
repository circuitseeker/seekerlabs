import { useState } from 'react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Vision', href: '#vision' },
  { label: 'Alliance', href: '#alliance' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fafafa]/90 backdrop-blur-sm">
      <div className="max-w-[1120px] mx-auto px-6 h-[72px] flex items-center justify-between">
        <a href="#" className="font-heading text-[17px] font-semibold tracking-tight text-black">
          SeekerLabs
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover-line text-[13px] font-medium text-neutral-400 hover:text-black transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[13px] font-medium text-neutral-400"
        >
          {mobileOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#fafafa] border-t border-neutral-200 px-6 py-6 flex flex-col gap-5">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-[15px] text-neutral-500 hover:text-black transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
