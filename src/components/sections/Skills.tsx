import { useEffect, useRef, useState } from 'react';
import { BarChart3 } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { skills } from '@/config/portfolio';
import type { Skill } from '@/config/portfolio';

const categoryLabels: Record<Skill['category'], string> = {
  SEO: 'SEO',
  'Web Development': 'Web Development',
  Design: 'Design',
};

function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimated(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref}>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-medium text-text-main">{skill.name}</span>
        <span className="text-xs font-medium text-text-secondary">
          {animated ? skill.level : 0}%
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-bg-secondary">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
          style={{
            width: animated ? `${skill.level}%` : '0%',
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const categories = Object.keys(categoryLabels) as Skill['category'][];

  return (
    <section id="skills" className="section-padding relative">
      {/* Background accent */}
      <div className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal className="mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-text-secondary">
            <BarChart3 size={14} className="text-primary" />
            Capabilities
          </div>
          <h2 className="section-title mt-4">Skills & Proficiency</h2>
          <p className="section-subtitle">
            A snapshot of my current skill levels — these are editable placeholders
            and will be updated as I continue to grow.
          </p>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3">
          {categories.map((category, catIdx) => (
            <Reveal key={category} delay={catIdx * 100}>
              <div className="rounded-2xl border border-border bg-bg-card/50 p-6">
                <h3 className="mb-5 font-display text-lg font-bold text-text-main">
                  {categoryLabels[category]}
                </h3>
                <div className="space-y-4">
                  {skills
                    .filter((s) => s.category === category)
                    .map((skill, idx) => (
                      <SkillBar
                        key={skill.name}
                        skill={skill}
                        delay={idx * 80}
                      />
                    ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
