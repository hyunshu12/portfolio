import { useEffect, useMemo, useState } from 'react';

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

const App = () => {
  const [locale, setLocale] = useState<Locale>(() => resolveInitialLocale());
  const [isDark, setIsDark] = useState<boolean>(() => resolveInitialTheme());

  const messages = dict[locale];
  const ko = locale === 'ko';

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

  const stats = [
    { value: '1', label: ko ? 'KCI 등재 논문' : 'KCI PUBLICATION' },
    { value: '3+', label: ko ? '전국 단위 수상' : 'NATIONAL AWARDS' },
    { value: '6', label: ko ? '수행 프로젝트' : 'PROJECTS' },
  ];

  const facts = [
    { label: 'SCHOOL', value: ko ? '한국디지털미디어고' : 'Korea Digital Media HS' },
    { label: 'DEPT', value: 'E-Business' },
    { label: 'DOMAIN', value: ko ? 'AI · 데이터' : 'AI · Data' },
    { label: 'STATUS', value: ko ? '재학 중' : 'Enrolled' },
  ];

  return (
    <div className="min-h-screen">
      <Header
        navItems={navItems}
        currentLocale={locale}
        onToggleLocale={toggleLocale}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      <main>
        {/* ── 히어로: 논문 표지처럼, 사진에는 검출 프레임 ── */}
        <section id="hero" className="scroll-mt-24">
          <div className="rec-container">
            <div className="flex items-center justify-between gap-14 pb-16 pt-20 md:pt-28">
              <div className="min-w-0 flex-1">
                <p className="rec-eyebrow anim-rise">{messages.hero.greeting}</p>
                <h1 className="rec-display anim-rise anim-d1 mt-5">{messages.hero.title}</h1>
                <p className="hero-role anim-rise anim-d2 mt-6">{messages.hero.role}</p>
                <p className="hero-abstract anim-rise anim-d3 mt-7">{messages.hero.description}</p>
                <div className="anim-rise anim-d4 mt-10 flex flex-wrap items-center gap-4">
                  <a href="#contact" className="btn-ink">
                    {messages.hero.ctaContact}
                  </a>
                  <a href="#projects" className="ref-link" style={{ fontSize: '13.5px' }}>
                    {ko ? '연구 실적 보기' : 'View the record'} ↓
                  </a>
                </div>
              </div>

              {/* 시그니처: YOLO 검출 프레임 — 본인의 KCI 검출 연구를 인용 */}
              <div className="det-frame det-frame--hero hidden shrink-0 lg:block">
                <span className="det-tag">{ko ? '연구자 · 0.99' : 'researcher · 0.99'}</span>
                <span className="det-corner det-corner--tl" aria-hidden="true" />
                <span className="det-corner det-corner--tr" aria-hidden="true" />
                <span className="det-corner det-corner--bl" aria-hidden="true" />
                <span className="det-corner det-corner--br" aria-hidden="true" />
                <img src={profileImage} alt={ko ? '조현수 프로필 사진' : 'Portrait of Hyunsoo Cho'} className="hero-photo" />
              </div>
            </div>

            <div className="stat-grid mb-20">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-cell">
                  <p className="stat-num">{stat.value}</p>
                  <p className="stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 01 소개: 초록(抄錄) + 신상 표 ── */}
        <Section id="about" no="01" label="ABOUT" title={messages.about.title}>
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_240px] md:gap-14">
            <p className="about-abstract">{messages.about.summary}</p>
            <div>
              {facts.map((fact) => (
                <div key={fact.label} className="fact-row">
                  <span className="fact-label">{fact.label}</span>
                  <span className="fact-value">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 02 기술: 숙련도 표 ── */}
        <Section
          id="skills"
          no="02"
          label="SKILLS"
          title={messages.skills.title}
          description={messages.skills.description}
        >
          <div className="skill-table">
            {SKILLS.map((skill) => (
              <SkillPill
                key={skill.name}
                name={skill.name}
                level={skill.level}
                label={messages.skills.levels[skill.level]}
                tooltip={
                  ko ? `숙련도: ${messages.skills.levels[skill.level]}` : `Level: ${messages.skills.levels[skill.level]}`
                }
              />
            ))}
          </div>
        </Section>

        {/* ── 03 프로젝트: 서지 형식 실적 목록 ── */}
        <Section
          id="projects"
          no="03"
          label="PROJECTS"
          title={messages.projects.title}
          description={messages.projects.description}
        >
          <div className="record-list">
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
          </div>
        </Section>

        {/* ── 04 수상: 연보 ── */}
        <Section
          id="awards"
          no="04"
          label="AWARDS"
          title={messages.awards.title}
          description={messages.awards.description}
        >
          <ul className="award-list">
            {messages.awards.items.map((award, i) => (
              <AwardItem key={`${award.year}-${award.title}`} {...award} isLast={i === messages.awards.items.length - 1} />
            ))}
          </ul>
        </Section>

        {/* ── 05 연락처 ── */}
        <Section
          id="contact"
          no="05"
          label="CONTACT"
          title={messages.contact.title}
          description={messages.contact.description}
        >
          <div className="max-w-xl">
            {messages.contact.items.map((item) => (
              <a key={item.label} href={item.href} className="contact-row">
                <span className="fact-label">{item.label}</span>
                <span className="contact-value">{item.value}</span>
              </a>
            ))}
            <div className="mt-9">
              <a href="mailto:astre0198@dimigo.hs.kr" className="btn-ink">
                {messages.contact.ctaMail}
              </a>
            </div>
          </div>
        </Section>
      </main>

      <footer className="rec-footer">
        <div className="rec-container flex items-center justify-between gap-4">
          <p className="rec-footer-text">
            © {new Date().getFullYear()} {ko ? '조현수 — 연구 기록' : 'Hyunsoo Cho — Research Record'}
          </p>
          <span
            aria-hidden="true"
            style={{ width: '10px', height: '10px', background: 'var(--honey)', borderRadius: '2px' }}
          />
        </div>
      </footer>
    </div>
  );
};

export default App;
