interface AwardItemProps {
  year: string;
  title: string;
  description?: string;
  isLast?: boolean;
}

/** 수상 연보의 한 행 — 연도 · 상훈 · 내용 */
const AwardItem = ({ year, title, description }: AwardItemProps) => {
  return (
    <li className="award-row">
      <span className="award-year">{year}</span>
      <div>
        <p className="award-title">{title}</p>
        {description ? <p className="award-desc">{description}</p> : null}
      </div>
    </li>
  );
};

export default AwardItem;
