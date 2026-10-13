import { Search, Code2, Palette } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { profile, social } from '@/config/portfolio';

export default function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Profile image */}
          <Reveal className="order-1 flex justify-center lg:order-none">
            <div className="relative">
              {/* Decorative rings */}
              <div className="absolute -inset-4 rounded-3xl border border-border/50" />
              <div className="absolute -inset-8 rounded-3xl border border-border/20" />

              {/* Glow */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/10 blur-2xl" />

              <img
                src={profile.profileImage}
                alt="Choyon Nath — SEO Expert, Web Developer, and Graphic Designer"
                className="relative aspect-square w-64 rounded-2xl border border-border object-cover object-center sm:w-80 lg:w-96"
                width={1088}
                height={1088}
                loading="lazy"
              />
            </div>
          </Reveal>

          {/* Text content */}
          <Reveal delay={100}>
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-text-secondary">
              <span className="h-2 w-2 rounded-full bg-primary" />
              About Me
            </div>

            <h2 className="section-title mt-4">Get to know Choyon Nath</h2>

            <p className="mt-5 text-base leading-relaxed text-text-secondary sm:text-lg">
              {profile.about}
            </p>

            {/* Role highlights */}
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {profile.roles.map((role) => {
                const icon =
                  role === 'SEO Expert'
                    ? Search
                    : role === 'Web Developer'
                      ? Code2
                      : Palette;
                const Icon = icon;
                return (
                  <div
                    key={role}
                    className="flex flex-col items-center gap-2 rounded-xl border border-border bg-bg-card/50 p-4 text-center"
                  >
                    <Icon size={24} className="text-accent" />
                    <span className="text-xs font-medium text-text-main">
                      {role}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Connect on Facebook
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
