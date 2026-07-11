type SkillLevel = 'foundational' | 'intermediate' | 'advanced' | 'expert';

interface SkillPillProps {
  name: string;
  level: SkillLevel;
  label: string;
  tooltip?: string;
}

const LEVEL_PROGRESS: Record<SkillLevel, number> = {
  foundational: 25,
  intermediate: 50,
  advanced: 75,
  expert: 100,
};

/** 기술 숙련도 표의 한 행 — 이름 · 게이지 · 등급 */
const SkillPill = ({ name, level, label, tooltip }: SkillPillProps) => {
  const progress = LEVEL_PROGRESS[level];

  return (
    <div className="skill-row" title={tooltip ?? label}>
      <span className="skill-name">{name}</span>
      <div
        className="skill-track"
        role="meter"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} — ${label}`}
      >
        <div className="skill-fill" style={{ width: `${progress}%` }} />
      </div>
      <span className="skill-level">{label}</span>
    </div>
  );
};

export default SkillPill;
