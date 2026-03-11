import { useStaggerReveal } from '../hooks/useReveal';

const services = [
  {
    num: '01',
    title: 'Video Editing',
    description:
      'Premiere Pro, DaVinci Resolve, Final Cut Pro. Narrative editing, pacing, transitions, and storytelling that keeps viewers hooked.',
  },
  {
    num: '02',
    title: 'Color Grading',
    description:
      'DaVinci Resolve color science. Film-grade looks, mood setting, and color consistency across your entire project.',
  },
  {
    num: '03',
    title: 'Motion Graphics',
    description:
      'After Effects, Cinema 4D. Titles, lower thirds, infographics, logo animations, and dynamic visual elements.',
  },
  {
    num: '04',
    title: 'Visual Effects',
    description:
      'Compositing, green screen, particle systems, 3D integration. Seamless VFX that serves the story.',
  },
  {
    num: '05',
    title: 'Sound Design',
    description:
      'Audio mixing, foley, sound effects, music integration. The half of storytelling most people forget.',
  },
  {
    num: '06',
    title: 'Cinematic Storytelling',
    description:
      'End-to-end creative direction. Script to screen. We help you tell stories that resonate and convert.',
  },
];

export default function Services() {
  const listRef = useStaggerReveal(0.06);

  return (
    <section id="services" className="py-24 md:py-32 px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <hr className="brutal-divider mb-16" />
        <div className="grid md:grid-cols-12 gap-10 md:gap-20">
          <div className="md:col-span-3">
            <div className="brutal-tag">Services</div>
          </div>
          <div className="md:col-span-9" ref={listRef}>
            <div className="grid sm:grid-cols-2 gap-6">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="brutal-card p-7 stagger-child"
                >
                  <span className="font-heading text-[12px] font-bold text-[#0a0a0a] inline-block mb-4 tracking-wider border-b-[3px] border-[#EF5350] pb-1">
                    {service.num}
                  </span>
                  <h2 className="text-[16px] font-heading font-bold text-[#0a0a0a] mb-3 tracking-[-0.02em]">
                    {service.title}
                  </h2>
                  <p className="text-[13px] text-neutral-500 leading-[1.75]">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
