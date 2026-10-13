import { Search, Code2, Palette, Sparkles } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { services as servicesData } from '@/config/portfolio';
import type { ServiceCategory } from '@/config/portfolio';

const iconMap = {
  search: Search,
  code: Code2,
  palette: Palette,
};

function ServiceCard({
  service,
  index,
}: {
  service: ServiceCategory;
  index: number;
}) {
  const Icon = iconMap[service.icon];

  return (
    <Reveal
      delay={index * 100}
      className="group relative flex flex-col rounded-2xl border border-border bg-bg-card/60 p-6 transition-all duration-300 hover:border-primary/40 hover:bg-bg-card/80 sm:p-7"
    >
      {/* Glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-accent/0 opacity-0 transition-opacity duration-300 group-hover:from-primary/5 group-hover:to-accent/5 group-hover:opacity-100" />

      {/* Icon */}
      <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-bg-secondary transition-colors duration-300 group-hover:border-primary/40">
        <Icon size={26} className="text-primary transition-colors duration-300 group-hover:text-accent" />
      </div>

      <h3 className="relative font-display text-xl font-bold text-text-main">
        {service.title}
      </h3>
      <p className="relative mt-2 text-sm text-text-secondary">
        {service.tagline}
      </p>

      {/* Service items */}
      <ul className="relative mt-5 space-y-3">
        {service.items.map((item) => (
          <li
            key={item.title}
            className="rounded-lg border border-border/50 bg-bg-secondary/40 p-3 transition-colors duration-200 hover:border-primary/30"
          >
            <p className="text-sm font-semibold text-text-main">{item.title}</p>
            <p className="mt-1 text-xs text-text-secondary">{item.description}</p>
          </li>
        ))}
      </ul>

      {/* Decorative number */}
      <span className="pointer-events-none absolute right-5 top-5 font-display text-5xl font-bold text-border/30 transition-colors duration-300 group-hover:text-primary/10">
        {String(index + 1).padStart(2, '0')}
      </span>
    </Reveal>
  );
}

export default function Services() {
  return (
    <section id="services" className="section-padding relative">
      {/* Background accent */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal className="mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-text-secondary">
            <Sparkles size={14} className="text-accent" />
            What I Do
          </div>
          <h2 className="section-title mt-4">Services</h2>
          <p className="section-subtitle">
            Three core areas where I help brands grow their digital presence.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {servicesData.map((service, idx) => (
            <ServiceCard key={service.id} service={service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
