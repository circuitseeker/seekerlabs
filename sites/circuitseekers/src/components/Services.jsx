import { useStaggerReveal } from '../hooks/useReveal';

const services = [
  {
    num: '01',
    title: 'Embedded Systems',
    description:
      'Microcontrollers, RTOS, bare-metal firmware, ARM Cortex, ESP32, STM32. Low-level engineering for high-performance devices.',
  },
  {
    num: '02',
    title: 'IoT & Connected Devices',
    description:
      'End-to-end IoT solutions. Sensors, gateways, cloud connectivity, MQTT, BLE, LoRa, WiFi. Smart devices that actually work.',
  },
  {
    num: '03',
    title: 'PCB Design & Prototyping',
    description:
      'Schematic design, multi-layer PCB layout, DFM optimization. From breadboard to production-ready boards.',
  },
  {
    num: '04',
    title: 'Sensor Integration',
    description:
      'Temperature, pressure, motion, environmental, biometric. We integrate and calibrate sensors for real-world accuracy.',
  },
  {
    num: '05',
    title: 'Firmware Development',
    description:
      'C/C++, MicroPython, Zephyr RTOS. Clean, efficient firmware that runs reliably for years.',
  },
  {
    num: '06',
    title: 'Hardware Consulting',
    description:
      'Architecture reviews, BOM optimization, manufacturing support. We help you make the right hardware decisions.',
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
                  <span className="font-heading text-[12px] font-bold text-[#0a0a0a] inline-block mb-4 tracking-wider border-b-[3px] border-[#4FC3F7] pb-1">
                    {service.num}
                  </span>
                  <h3 className="text-[16px] font-heading font-bold text-[#0a0a0a] mb-3 tracking-[-0.02em]">
                    {service.title}
                  </h3>
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
