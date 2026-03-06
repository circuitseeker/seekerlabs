import { useReveal, useStaggerReveal } from '../hooks/useReveal';

const contacts = [
  { label: 'Email', value: 'info@seekerlab.in', href: 'mailto:info@seekerlab.in' },
  { label: 'Phone', value: '+91 888 492 3815', href: 'tel:+918884923815' },
];

export default function Contact() {
  const headRef = useReveal();
  const listRef = useStaggerReveal(0.08);

  return (
    <section id="contact" className="py-24 md:py-32 px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <hr className="brutal-divider mb-16" />
        <div className="grid md:grid-cols-12 gap-10 md:gap-20">
          <div className="md:col-span-3">
            <div className="brutal-tag">Contact</div>
          </div>
          <div className="md:col-span-9">
            <div ref={headRef} className="reveal">
              <p className="text-[26px] md:text-[34px] lg:text-[40px] font-heading font-bold leading-[1.15] tracking-[-0.03em] text-[#1A4D3E]">
                Let&rsquo;s build something<br />together.
              </p>
              <p className="mt-6 text-[15px] text-[#1A4D3E]/70 leading-[1.8] max-w-[480px]">
                Have an idea worth building? Reach out and we&rsquo;ll get back to you
                within 24 hours.
              </p>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-6" ref={listRef}>
              {contacts.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="brutal-card p-6 stagger-child flex-1 group"
                >
                  <p className="text-[11px] font-bold text-[#1A4D3E]/50 uppercase tracking-[0.14em] mb-3">
                    {item.label}
                  </p>
                  <p className="text-[17px] font-heading font-bold text-[#1A4D3E] tracking-[-0.01em] group-hover:text-[#C8943E] transition-colors">
                    {item.value}
                  </p>
                </a>
              ))}
            </div>

            <div className="mt-10 reveal">
              <a href="mailto:info@seekerlab.in" className="brutal-btn">
                Send us a message
                <span className="text-lg">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
