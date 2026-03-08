import { useReveal } from '../hooks/useReveal';

export default function Tagline() {
  const ref1 = useReveal(0.2);
  const ref2 = useReveal(0.2);

  return (
    <section className="py-20 md:py-32 px-6 lg:px-8 overflow-hidden">
      <div className="max-w-[1000px] mx-auto text-center">
        <div ref={ref1} className="reveal">
          <p className="font-heading text-[28px] sm:text-[40px] md:text-[54px] lg:text-[64px] font-bold leading-[1.05] tracking-[-0.04em] text-[#0a0a0a]">
            You don&rsquo;t build a business.
            <br />
            You build{' '}
            <span className="relative inline-block">
              people
              <span className="absolute bottom-[0.06em] left-0 w-full h-[0.14em] bg-[#DDFC6B] -z-10" />
            </span>
            .
          </p>
        </div>
        <div ref={ref2} className="reveal mt-4 md:mt-6">
          <p className="font-heading text-[20px] sm:text-[28px] md:text-[36px] lg:text-[42px] font-bold leading-[1.1] tracking-[-0.03em] text-neutral-400">
            Then people build the business.
          </p>
        </div>
      </div>
    </section>
  );
}
