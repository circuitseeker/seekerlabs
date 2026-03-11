import { useReveal, useStaggerReveal } from '../hooks/useReveal';

const contacts = [
  { label: 'DreamonFX', value: 'dreamonstudios@seekerlab.in', href: 'mailto:dreamonstudios@seekerlab.in' },
  { label: 'General', value: 'info@seekerlab.in', href: 'mailto:info@seekerlab.in' },
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
              <p className="text-[26px] md:text-[34px] lg:text-[40px] font-heading font-bold leading-[1.15] tracking-[-0.03em] text-[#0a0a0a]">
                Got a story to tell?<br />Let&rsquo;s bring it to life.
              </p>
              <p className="mt-6 text-[15px] text-neutral-600 leading-[1.8] max-w-[480px]">
                Whether it&rsquo;s a brand film, a product launch, or a creative challenge you need solved &mdash;
                reach out and we&rsquo;ll get back within 24 hours.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5" ref={listRef}>
              {contacts.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="brutal-card p-5 sm:p-6 stagger-child group"
                >
                  <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.14em] mb-2">
                    {item.label}
                  </p>
                  <p className="text-[14px] sm:text-[16px] font-heading font-bold text-[#0a0a0a] tracking-[-0.01em] group-hover:text-neutral-600 transition-colors break-all sm:break-normal">
                    {item.value}
                  </p>
                </a>
              ))}
            </div>

            <div className="mt-10 reveal">
              <a href="mailto:dreamonstudios@seekerlab.in" className="brutal-btn">
                <span>Start a conversation</span>
                <span className="text-lg">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
