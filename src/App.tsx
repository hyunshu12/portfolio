import { useEffect, useMemo, useState } from 'react';
import { Instagram, Mail, Phone } from 'lucide-react';

import profileImage from '../img/1126조현수.jpg';

import AwardItem from './components/AwardItem';
import Header from './components/Header';
import ProjectCard from './components/ProjectCard';
import Section from './components/Section';
import SkillPill from './components/SkillPill';
import { dict, type Locale } from './i18n/dict';

const SKILLS = [
  { name: 'Python', level: 'expert' as const },
  { name: 'Pytorch', level: 'advanced' as const },
  { name: 'React', level: 'advanced' as const },
  { name: 'Next.js', level: 'intermediate' as const },
  { name: 'R', level: 'foundational' as const },
];

const resolveInitialLocale = (): Locale => {
  if (typeof window === 'undefined') return 'ko';
  const stored = window.localStorage.getItem('locale');
  return stored === 'en' || stored === 'ko' ? (stored as Locale) : 'ko';
};

const resolveInitialTheme = (): boolean => {
  if (typeof window === 'undefined') return false;
  const stored = window.localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') {
    return stored === 'dark';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const getContactIcon = (href: string) => {
  if (href.startsWith('tel:')) return <Phone style={{ width: '18px', height: '18px', color: '#0071e3' }} aria-hidden="true" />;
  if (href.startsWith('mailto:')) return <Mail style={{ width: '18px', height: '18px', color: '#0071e3' }} aria-hidden="true" />;
  return <Instagram style={{ width: '18px', height: '18px', color: '#0071e3' }} aria-hidden="true" />;
};

const App = () => {
  const [locale, setLocale] = useState<Locale>(() => resolveInitialLocale());
  const [isDark, setIsDark] = useState<boolean>(() => resolveInitialTheme());

  const messages = dict[locale];

  const navItems = useMemo(
    () => [
      { id: 'about', label: messages.nav.about },
      { id: 'skills', label: messages.nav.skills },
      { id: 'projects', label: messages.nav.projects },
      { id: 'awards', label: messages.nav.awards },
      { id: 'contact', label: messages.nav.contact },
    ],
    [messages.nav.about, messages.nav.skills, messages.nav.projects, messages.nav.awards, messages.nav.contact],
  );

  useEffect(() => {
    window.localStorage.setItem('locale', locale);
  }, [locale]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    window.localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleLocale = () => setLocale((prev) => (prev === 'ko' ? 'en' : 'ko'));
  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header
        navItems={navItems}
        currentLocale={locale}
        onToggleLocale={toggleLocale}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      <main>
        {/* ── Hero ── Always dark/black, cinematic */}
        <section
          id="hero"
          className="no-print"
          style={{
            background: '#000000',
            color: '#ffffff',
            paddingTop: '120px',
            paddingBottom: '100px',
          }}
        >
          <div
            style={{
              maxWidth: '980px',
              margin: '0 auto',
              padding: '0 24px',
            }}
          >
            {/* Desktop two-column: text left, photo right */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '48px', justifyContent: 'space-between' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Eyebrow */}
                <p
                  style={{
                    fontFamily: "'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#2997ff',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '20px',
                  }}
                >
                  {messages.hero.greeting}
                </p>

                {/* Main headline */}
                <h1
                  style={{
                    fontFamily: "'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                    fontSize: 'clamp(3rem, 7vw, 4.5rem)',
                    fontWeight: 600,
                    lineHeight: 1.04,
                    letterSpacing: '-0.032em',
                    color: '#ffffff',
                    margin: '0 0 16px 0',
                  }}
                >
                  {messages.hero.title}
                </h1>

                {/* Role */}
                <p
                  style={{
                    fontFamily: "'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                    fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                    fontWeight: 300,
                    lineHeight: 1.25,
                    letterSpacing: '-0.012em',
                    color: 'rgba(255,255,255,0.6)',
                    marginBottom: '24px',
                  }}
                >
                  {messages.hero.role}
                </p>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                    fontSize: '17px',
                    fontWeight: 400,
                    lineHeight: 1.58,
                    letterSpacing: '-0.022em',
                    color: 'rgba(255,255,255,0.56)',
                    maxWidth: '520px',
                    marginBottom: '40px',
                  }}
                >
                  {messages.hero.description}
                </p>

                {/* CTAs */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                  <a href="#contact" className="apple-btn-primary" style={{ gap: '8px' }}>
                    <Mail style={{ width: '15px', height: '15px' }} aria-hidden="true" />
                    {messages.hero.ctaContact}
                  </a>
                  <a href="#projects" className="apple-pill-link-dark">
                    {messages.nav.projects} →
                  </a>
                </div>
              </div>

              {/* Profile photo — hidden on small screens */}
              <div
                className="hidden lg:flex"
                style={{ flexShrink: 0, alignItems: 'center', justifyContent: 'center' }}
              >
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      inset: '-8px',
                      borderRadius: '50%',
                      background: 'conic-gradient(from 180deg, #0071e3 0%, rgba(41,151,255,0.3) 40%, transparent 60%)',
                      opacity: 0.5,
                    }}
                  />
                  <img
                    src={profileImage}
                    alt="Hyunsoo Cho"
                    style={{
                      position: 'relative',
                      width: '200px',
                      height: '200px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid rgba(255,255,255,0.1)',
                      display: 'block',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Stats strip */}
            <div
              style={{
                marginTop: '64px',
                paddingTop: '32px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                gap: '48px',
                flexWrap: 'wrap',
              }}
            >
              {[
                { number: '1', label: locale === 'ko' ? 'KCI 등재 논문' : 'KCI Publication' },
                { number: '3+', label: locale === 'ko' ? '수상 경력' : 'Awards' },
                { number: '6', label: locale === 'ko' ? '프로젝트' : 'Projects' },
              ].map((stat) => (
                <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span
                    style={{
                      fontFamily: "'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                      fontWeight: 600,
                      lineHeight: 1,
                      letterSpacing: '-0.03em',
                      color: '#ffffff',
                    }}
                  >
                    {stat.number}
                  </span>
                  <span
                    style={{
                      fontFamily: "'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                      fontSize: '13px',
                      fontWeight: 400,
                      color: 'rgba(255,255,255,0.4)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sections — alternating light/white/light ── */}
        <div className="print-surface">
          {/* About — white */}
          <Section id="about" title={messages.about.title} variant="white" contentClassName="block">
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: '24px', alignItems: 'start' }}>
              {/* Summary text */}
              <div
                className="apple-card portfolio-project-card"
                style={{ background: 'var(--color-card-bg)', padding: '32px', flex: 1 }}
              >
                <p
                  style={{
                    fontFamily: "'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                    fontSize: '17px',
                    fontWeight: 400,
                    lineHeight: 1.65,
                    letterSpacing: '-0.022em',
                    color: 'var(--color-card-body)',
                    margin: 0,
                  }}
                >
                  {messages.about.summary}
                </p>
              </div>

              {/* Quick facts sidebar */}
              <div
                className="apple-card hidden sm:flex"
                style={{
                  background: '#0071e3',
                  padding: '28px 24px',
                  flexDirection: 'column',
                  gap: '20px',
                  minWidth: '200px',
                }}
              >
                {[
                  { label: locale === 'ko' ? '학교' : 'School', value: locale === 'ko' ? '한국디지털미디어고' : 'Korea Digital Media HS' },
                  { label: locale === 'ko' ? '학과' : 'Dept.', value: 'E-Business' },
                  { label: locale === 'ko' ? '분야' : 'Domain', value: locale === 'ko' ? 'AI · 데이터' : 'AI · Data' },
                  { label: locale === 'ko' ? '상태' : 'Status', value: locale === 'ko' ? '재학 중' : 'Enrolled' },
                ].map((fact) => (
                  <div key={fact.label}>
                    <p
                      style={{
                        fontFamily: "'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                        fontSize: '11px',
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.6)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        margin: '0 0 3px 0',
                      }}
                    >
                      {fact.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#ffffff',
                        letterSpacing: '-0.012em',
                        margin: 0,
                      }}
                    >
                      {fact.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Skills — light */}
          <Section
            id="skills"
            title={messages.skills.title}
            description={messages.skills.description}
            variant="light"
            contentClassName="md:grid-cols-2"
          >
            {SKILLS.map((skill) => (
              <SkillPill
                key={skill.name}
                name={skill.name}
                level={skill.level}
                label={messages.skills.levels[skill.level]}
                tooltip={locale === 'ko' ? `숙련도: ${messages.skills.levels[skill.level]}` : `Level: ${messages.skills.levels[skill.level]}`}
              />
            ))}
          </Section>

          {/* Projects — white */}
          <Section
            id="projects"
            title={messages.projects.title}
            description={messages.projects.description}
            variant="white"
          >
            {messages.projects.items.map((project, i) => (
              <ProjectCard
                key={project.title}
                index={i + 1}
                title={project.title}
                subtitle={project.subtitle}
                description={project.description}
                contributions={project.contributions}
                tags={project.tags}
                links={project.links}
                contributionLabel={messages.projects.contributionLabel}
              />
            ))}
          </Section>

          {/* Awards — light */}
          <Section
            id="awards"
            title={messages.awards.title}
            description={messages.awards.description}
            variant="light"
            contentClassName="block"
          >
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {messages.awards.items.map((award, i) => (
                <AwardItem key={`${award.year}-${award.title}`} {...award} isLast={i === messages.awards.items.length - 1} />
              ))}
            </ul>
          </Section>

          {/* Contact — dark */}
          <Section
            id="contact"
            title={messages.contact.title}
            description={messages.contact.description}
            variant="dark"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {messages.contact.items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '18px 20px',
                    textDecoration: 'none',
                    transition: 'background 0.2s ease, border-color 0.2s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = 'rgba(255,255,255,0.1)';
                    el.style.borderColor = 'rgba(255,255,255,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = 'rgba(255,255,255,0.06)';
                    el.style.borderColor = 'rgba(255,255,255,0.1)';
                  }}
                >
                  {getContactIcon(item.href)}
                  <div>
                    <p
                      style={{
                        fontFamily: "'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                        fontSize: '11px',
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.4)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        marginBottom: '2px',
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                        fontSize: '15px',
                        fontWeight: 500,
                        color: '#ffffff',
                        letterSpacing: '-0.018em',
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div style={{ marginTop: '32px' }}>
              <a href="mailto:astre0198@dimigo.hs.kr" className="apple-btn-primary">
                <Mail style={{ width: '15px', height: '15px' }} aria-hidden="true" />
                {messages.contact.ctaMail}
              </a>
            </div>
          </Section>
        </div>

        {/* Footer */}
        <footer
          style={{
            background: '#000000',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: '20px 24px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: "'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: '12px',
              color: 'rgba(255,255,255,0.28)',
              letterSpacing: '-0.007em',
            }}
          >
            © {new Date().getFullYear()} Hyunsoo Cho. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
