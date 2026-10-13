import { Suspense, lazy, useEffect, useState } from 'react';
import { ChevronDown, ArrowRight, Mail } from 'lucide-react';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { profile } from '@/config/portfolio';

// Lazy-load the 3D scene so Three.js is split into a separate chunk.
const Canvas = lazy(() =>
  import('@react-three/fiber').then((m) => ({ default: m.Canvas })),
);
const Hero3DScene = lazy(() => import('@/components/3d/Hero3DScene'));

/** Rotating job titles with a typewriter-style swap. */
function RotatingTitles({ titles }: { titles: string[] }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setDisplayed(titles[0]);
      return;
    }

    const current = titles[index];

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase('pausing'), 1600);
      return () => clearTimeout(t);
    }

    if (phase === 'pausing') {
      const t = setTimeout(() => setPhase('deleting'), 400);
      return () => clearTimeout(t);
    }

    // deleting
    if (displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
      return () => clearTimeout(t);
    }
    setIndex((i) => (i + 1) % titles.length);
    setPhase('typing');
  }, [displayed, phase, index, titles, reduced]);

  return (
    <span className="text-gradient-primary">
      {displayed}
      <span className="ml-0.5 inline-block w-0.5 animate-pulse bg-accent" aria-hidden="true" />
    </span>
  );
}

/** Static fallback shown when WebGL is unavailable. */
function HeroFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Decorative gradient orbs */}
      <div className="absolute left-1/4 top-1/4 h-48 w-48 rounded-full bg-primary/20 blur-3xl animate-float-slow" />
      <div className="absolute right-1/4 bottom-1/3 h-56 w-56 rounded-full bg-accent/15 blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30" />
      <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/20" />
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/40" />
    </div>
  );
}

export default function Hero() {
  const webglSupported = useWebGLSupport();
  const reduced = usePrefersReducedMotion();

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-12"
    >
      {/* 3D Canvas — absolute positioned behind the content */}
      <div className="absolute inset-0 z-0">
        {webglSupported === null ? (
          // Still checking — render nothing (brief flash is acceptable).
          <HeroFallback />
        ) : webglSupported && !reduced ? (
          <Canvas
            camera={{ position: [0, 0, 7], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            className="!absolute inset-0"
          >
            <Suspense fallback={null}>
              <Hero3DScene />
            </Suspense>
          </Canvas>
        ) : (
          <HeroFallback />
        )}
      </div>

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-bg-primary/40 via-transparent to-bg-primary/80" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-bg-primary/60 via-transparent to-bg-primary/30" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)] md:gap-12 lg:gap-20">
          <div className="flex flex-col items-start gap-6">
          {/* Entrance animations via CSS */}
          <div
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-text-secondary"
            style={{ animation: 'slideUp 0.6s ease 0.1s both' }}
          >
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Available for freelance work
          </div>

          <h1
            className="font-display text-4xl font-bold leading-tight text-text-main sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animation: 'slideUp 0.6s ease 0.2s both' }}
          >
            Choyon Nath
          </h1>

          <div
            className="relative md:hidden"
            style={{ animation: 'slideUp 0.6s ease 0.28s both' }}
          >
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-primary/25 to-accent/20 blur-xl" />
            <div className="relative overflow-hidden rounded-2xl border border-accent/35 bg-bg-card p-1 shadow-xl shadow-primary/15">
              <img
                src={profile.profileImage}
                alt="Choyon Nath — SEO Expert, Web Developer and Graphic Designer"
                className="h-32 w-32 rounded-xl object-cover object-center sm:h-36 sm:w-36"
                width={1088}
                height={1088}
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          <div
            className="font-display text-xl font-semibold sm:text-2xl md:text-3xl"
            style={{ animation: 'slideUp 0.6s ease 0.35s both' }}
          >
            <RotatingTitles titles={profile.roles} />
          </div>

          <p
            className="max-w-xl text-base text-text-secondary sm:text-lg"
            style={{ animation: 'slideUp 0.6s ease 0.5s both' }}
          >
            {profile.tagline}
          </p>

          <div
            className="flex flex-wrap items-center gap-3"
            style={{ animation: 'slideUp 0.6s ease 0.65s both' }}
          >
            <button
              onClick={() => handleScrollTo('projects')}
              className="btn-primary"
            >
              Explore My Work
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => handleScrollTo('contact')}
              className="btn-outline"
            >
              <Mail size={16} />
              Contact Me
            </button>
          </div>
          </div>

          <div
            className="relative hidden justify-center md:flex"
            style={{ animation: 'fadeIn 0.9s ease 0.35s both' }}
          >
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-2xl" />
            <div className="absolute -inset-3 rounded-[1.75rem] border border-primary/25" />
            <div className="relative overflow-hidden rounded-[1.5rem] border border-accent/35 bg-bg-card p-1.5 shadow-2xl shadow-primary/20">
              <img
                src={profile.profileImage}
                alt="Choyon Nath — SEO Expert, Web Developer and Graphic Designer"
                className="aspect-square w-64 rounded-[1.1rem] object-cover object-center lg:w-80"
                width={1088}
                height={1088}
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => handleScrollTo('about')}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-text-secondary transition-colors hover:text-accent"
        aria-label="Scroll to about section"
        style={{ animation: 'fadeIn 1s ease 1s both' }}
      >
        <ChevronDown size={28} className="animate-bounce" />
      </button>
    </section>
  );
}
