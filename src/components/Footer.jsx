const socials = [
  { label: 'X', href: 'https://x.com/pradeep_9477' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pradeepvarma99/' },
  { label: 'Instagram', href: 'https://www.instagram.com/pradeep.helium/' },
];

export default function Footer() {
  return (
    <footer className="px-6 lg:px-8 pb-8">
      <div className="max-w-[1200px] mx-auto">
        <hr className="brutal-divider mb-12" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div>
            <span className="font-heading text-[24px] font-bold tracking-[-0.03em] text-[#0a0a0a]">
              SeekerLabs<span className="text-[#DDFC6B]">.</span>
            </span>
            <p className="text-[13px] text-neutral-500 mt-2 leading-[1.6]">
              A combined alliance of CircuitSeekers,<br />
              ProgramBee &amp; DreamonFX Studios. Est. 2021.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <a href="https://circuitseekers.seekerlab.in" target="_blank" rel="noopener noreferrer" className="text-[12px] font-bold tracking-[0.04em] px-3 py-1.5 border-[2px] border-[#0a0a0a] hover:bg-[#4FC3F7] transition-colors">
                Circuit<span style={{ color: '#4FC3F7' }}>Seekers</span>
              </a>
              <a href="https://programbee.seekerlab.in" target="_blank" rel="noopener noreferrer" className="text-[12px] font-bold tracking-[0.04em] px-3 py-1.5 border-[2px] border-[#0a0a0a] hover:bg-[#FFB74D] transition-colors">
                Program<span style={{ color: '#FFB74D' }}>Bee</span>
              </a>
              <a href="https://dreamonstudios.seekerlab.in" target="_blank" rel="noopener noreferrer" className="text-[12px] font-bold tracking-[0.04em] px-3 py-1.5 border-[2px] border-[#0a0a0a] hover:bg-[#EF5350] transition-colors">
                Dreamon<span style={{ color: '#EF5350' }}>FX</span>
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-link text-[13px] font-bold text-[#0a0a0a] uppercase tracking-[0.06em]"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-10 pt-6 border-t-[2.5px] border-[#0a0a0a]">
          <p className="text-[12px] text-neutral-400 font-medium tracking-[0.02em]">
            &copy; {new Date().getFullYear()} SeekerLabs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
