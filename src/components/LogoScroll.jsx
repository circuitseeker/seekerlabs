import { useReveal, useStaggerReveal } from '../hooks/useReveal';

const companies = [
  'TCS', 'Infosys', 'Wipro', 'HCL Tech', 'Tech Mahindra',
  'Cognizant', 'Capgemini', 'Mphasis', 'L&T Infotech', 'Mindtree',
  'Zoho', 'Freshworks', 'Razorpay', 'Swiggy', 'Zerodha',
  'PhonePe', 'CRED', 'Postman', 'Ola', 'Meesho',
  'Prime Focus', 'Technicolor', 'DNEG', 'MPC', 'Framestore',
  'Tau Films', 'Phantom FX', 'Red Chillies VFX', 'BOT VFX', 'Assemblage',
];

const universities = [
  'LPU', 'Pearl Academy', 'VIT Vellore', 'SRM Chennai',
  'IIIT Hyderabad', 'Manipal University', 'Amity University',
  'Christ University', 'Symbiosis', 'Chandigarh University',
];

const stats = [
  { number: '120+', label: 'Websites & Apps Shipped' },
  { number: '50+', label: 'ML Models Deployed' },
  { number: '160+', label: 'Hardware Projects' },
  { number: '90+', label: 'VFX & Editing Projects' },
  { number: '45+', label: 'Startups Launched' },
  { number: '430+', label: 'Happy Clients' },
];

function MarqueeSet({ items }) {
  return (
    <div className="flex items-center shrink-0">
      {items.map((name, i) => (
        <div key={`${name}-${i}`} className="flex-shrink-0 mx-6 md:mx-10">
          <span className="font-heading text-[16px] md:text-[20px] font-bold text-[#0a0a0a]/15 whitespace-nowrap tracking-[-0.02em] select-none">
            {name}
          </span>
        </div>
      ))}
    </div>
  );
}

function Marquee({ items, speed = 25, direction = 'left' }) {
  return (
    <div className="overflow-hidden">
      <div
        className="flex"
        style={{ animation: `scroll-${direction} ${speed}s linear infinite` }}
      >
        <MarqueeSet items={items} />
        <MarqueeSet items={items} />
      </div>
    </div>
  );
}

export default function LogoScroll() {
  const headRef = useReveal();
  const statsRef = useStaggerReveal(0.08);

  return (
    <section className="py-20 md:py-28 px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <hr className="brutal-divider mb-14" />

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="brutal-card p-6 md:p-8 text-center stagger-child">
              <p className="font-heading text-[36px] md:text-[48px] font-bold text-[#0a0a0a] tracking-[-0.04em] leading-none">
                {stat.number}
              </p>
              <p className="mt-2 text-[12px] md:text-[13px] font-bold text-neutral-400 uppercase tracking-[0.08em]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Heading */}
        <div ref={headRef} className="reveal text-center mb-12">
          <p className="text-[13px] font-bold text-neutral-400 uppercase tracking-[0.14em]">
            Trusted by professionals from
          </p>
          <p className="mt-3 text-[20px] md:text-[26px] font-heading font-bold text-[#0a0a0a] tracking-[-0.03em]">
            Leading companies &amp; top universities
          </p>
        </div>

        {/* Companies row 1 - Tech */}
        <div className="mb-4">
          <Marquee items={companies.slice(0, 10)} speed={22} direction="left" />
        </div>

        {/* Companies row 2 - Startups */}
        <div className="mb-4">
          <Marquee items={companies.slice(10, 20)} speed={20} direction="right" />
        </div>

        {/* Companies row 3 - Design & VFX */}
        <div className="mb-4">
          <Marquee items={companies.slice(20)} speed={18} direction="left" />
        </div>

        {/* Universities row */}
        <div>
          <Marquee items={universities} speed={16} direction="right" />
        </div>
      </div>
    </section>
  );
}
