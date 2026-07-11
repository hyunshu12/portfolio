import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  /** 장 번호 — 문서 순서를 그대로 표기 (예: '01') */
  no: string;
  /** 영문 러닝 헤드 (예: 'ABOUT') */
  label: string;
  title: string;
  description?: string;
  children: ReactNode;
}

const Section = ({ id, no, label, title, description, children }: SectionProps) => {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="rec-container">
        <div className="rec-sec">
          <header className="mb-11">
            <p className="rec-eyebrow">
              {no} · {label}
            </p>
            <h2 className="rec-section-title mt-3">{title}</h2>
            {description ? <p className="rec-sec-desc">{description}</p> : null}
          </header>
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
