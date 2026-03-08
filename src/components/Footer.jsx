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
              Program Bees &amp; DemonFX Studios. Est. 2021.
            </p>
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

      {/* Sacred closing */}
      <div className="mt-16 pb-10 text-center">
        <p className="font-heading text-[20px] md:text-[28px] font-bold tracking-[-0.02em] text-[#0a0a0a]">
          Namma Parvathi Pathiye Hara Hara Mahadeva
        </p>
        <div className="mt-8 max-w-[600px] mx-auto px-6">
          <p className="text-[12px] md:text-[13px] leading-[2.2] text-neutral-400 italic tracking-[0.02em]">
            Yogeshwaraya Mahadevaya<br />
            Shivaya Dhimahi<br />
            Shankaraya Sarvadevaya<br />
            Shivaya Dhimahi<br /><br />
            Vandeham Shambhum Umapathim<br />
            Sura Gurum Vandeham Shambhum Umapathim<br /><br />
            Bhasmanga Ragaya Maheshwaraya<br />
            Shivaya Dhimahi<br />
            Vashishta Naradaadi Vandyaya<br />
            Shivaya Dhimahi<br /><br />
            Vandeham Shambhum Umapathim<br />
            Sura Gurum Vandeham Shambhum Umapathim
          </p>
        </div>
      </div>
    </footer>
  );
}
