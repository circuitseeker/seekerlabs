import { useReveal } from '../hooks/useReveal';

const tools = [
  'Premiere Pro', 'DaVinci Resolve', 'After Effects', 'Cinema 4D', 'Blender', 'Nuke',
  'Houdini', 'Final Cut Pro', 'Audition', 'Pro Tools', 'Logic Pro', 'Unreal Engine',
  'Fusion', 'Mocha Pro', 'Red Giant', 'Sapphire', 'Boris FX', 'Topaz AI',
  'Frame.io', 'Blackmagic', 'ARRI', 'RED', 'Sony FX', 'Canon Cinema',
  'Atomos', 'DJI', 'Zhiyun', 'Rode', 'Sennheiser', 'Aputure',
  '4K', '8K', 'HDR', 'Dolby Atmos', 'ProRes', 'H.265', 'RAW',
];

function MarqueeSet({ items }) {
  return (
    <div className="flex items-center shrink-0">
      {items.map((name, i) => (
        <div key={`${name}-${i}`} className="flex-shrink-0 mx-5 md:mx-8">
          <span className="font-heading text-[14px] md:text-[16px] font-bold text-[#0a0a0a]/12 whitespace-nowrap tracking-[-0.01em] select-none">
            {name}
          </span>
        </div>
      ))}
    </div>
  );
}

function Marquee({ items, speed, direction }) {
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

export default function TechStack() {
  const headRef = useReveal();

  return (
    <section className="py-16 md:py-20 px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div ref={headRef} className="reveal text-center mb-10">
          <p className="text-[13px] font-bold text-neutral-400 uppercase tracking-[0.14em]">
            Our Stack
          </p>
          <p className="mt-2 text-[18px] md:text-[22px] font-heading font-bold text-[#0a0a0a] tracking-[-0.03em]">
            Tools we create with
          </p>
        </div>

        <div className="space-y-3">
          <Marquee items={tools.slice(0, 12)} speed={28} direction="left" />
          <Marquee items={tools.slice(12, 24)} speed={24} direction="right" />
          <Marquee items={tools.slice(24, 35)} speed={26} direction="left" />
          <Marquee items={tools.slice(35)} speed={22} direction="right" />
        </div>
      </div>
    </section>
  );
}
