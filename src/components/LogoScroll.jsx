import { useReveal } from '../hooks/useReveal';
import { useCountUp } from '../hooks/useCountUp';

const names = [
  'Nanbha Exports', 'LPU', 'Pearl Academy', 'VIT Vellore', 'SRM Chennai',
  'IIIT Hyderabad', 'Manipal University', 'Amity University',
  'Christ University', 'Symbiosis', 'Chandigarh University',
];

const stats = [
  { number: '120', suffix: '+', label: 'Websites & Apps Shipped' },
  { number: '50', suffix: '+', label: 'ML Models Deployed' },
  { number: '160', suffix: '+', label: 'Hardware Projects' },
  { number: '90', suffix: '+', label: 'VFX & Editing Projects' },
  { number: '45', suffix: '+', label: 'Startups Launched' },
  { number: '430', suffix: '+', label: 'Happy Clients' },
];

function StatCard({ number, suffix, label }) {
  const { ref, count } = useCountUp(number, 2200);

  return (
    <div ref={ref} className="brutal-card p-6 md:p-8 text-center">
      <p className="font-heading text-[36px] md:text-[48px] font-bold text-[#0a0a0a] tracking-[-0.04em] leading-none">
        {count}{suffix}
      </p>
      <p className="mt-2 text-[12px] md:text-[13px] font-bold text-neutral-400 uppercase tracking-[0.08em]">
        {label}
      </p>
    </div>
  );
}

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

  return (
    <section className="py-20 md:py-28 px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <hr className="brutal-divider mb-14" />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mb-20">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
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

        <div>
          <Marquee items={names} speed={18} direction="left" />
        </div>
      </div>
    </section>
  );
}
