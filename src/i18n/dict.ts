import roadkillPaper from '../../img/한국 도로상의 야생동물 로드킬 현황 분석 및 유도울타리 위치 최적화 복사본.pdf';
import smartMediaAward from '../../img/[2023스마트미디어심포지움]우수논문상장_이지민.이용선.남현준.조현수.김보영.무 복사본.pdf';

export type Locale = 'ko' | 'en';

interface ProjectContent {
  title: string;
  subtitle: string;
  description: string;
  contributions: string[];
  tags: string[];
  links: { label: string; href?: string }[];
}

interface AwardContent {
  year: string;
  title: string;
  description?: string;
}

interface ContactItem {
  label: string;
  value: string;
  href: string;
}

type SkillLevel = 'foundational' | 'intermediate' | 'advanced' | 'expert';

interface Dictionary {
  nav: {
    about: string;
    skills: string;
    projects: string;
    awards: string;
    contact: string;
  };
  hero: {
    greeting: string;
    title: string;
    role: string;
    description: string;
    ctaPrint: string;
    ctaContact: string;
  };
  about: {
    title: string;
    summary: string;
    school: string;
  };
  skills: {
    title: string;
    description: string;
    levels: Record<SkillLevel, string>;
  };
  projects: {
    title: string;
    description: string;
    contributionLabel: string;
    items: ProjectContent[];
  };
  awards: {
    title: string;
    description: string;
    items: AwardContent[];
  };
  contact: {
    title: string;
    description: string;
    ctaMail: string;
    items: ContactItem[];
  };
}

export const dict: Record<Locale, Dictionary> = {
  ko: {
    nav: {
      about: '소개',
      skills: '기술',
      projects: '프로젝트',
      awards: '수상',
      contact: '연락처',
    },
    hero: {
      greeting: '안녕하세요! 저는',
      title: '조현수',
      role: 'AI 엔지니어 · 데이터 분석가',
      description:
        '중학교 때부터 인공지능과 데이터를 탐구하며 연구와 실무 프로젝트로 역량을 확장해 왔습니다. 의미 있는 문제를 데이터로 풀어내는 데 즐거움을 느낍니다.',
      ctaPrint: 'PDF 저장',
      ctaContact: '연락하기',
    },
    about: {
      title: '소개',
      summary:
        '중2부터 인공지능·데이터 분석에 꾸준한 흥미와 열정. 학술적 성과(KCI 논문 등재, 학회 우수논문상)와 프로젝트 경험을 통해 역량을 검증. 앞으로도 실질적 프로젝트를 통해 커리어로 확장.',
      school: 'Korea Digital Media High School, E-Business Dept. · 한국디지털미디어고등학교 E-Business과',
    },
    skills: {
      title: '기술 스택',
      description: '실제 연구/프로젝트에서 활용한 도구와 숙련도입니다.',
      levels: {
        foundational: '하',
        intermediate: '중',
        advanced: '중상',
        expert: '상',
      },
    },
    projects: {
      title: '프로젝트',
      description: '연구와 데이터 기반으로 수행한 대표 프로젝트입니다.',
      contributionLabel: '주요 기여',
      items: [
        {
          title: 'KCI 등재 인공지능 연구',
          subtitle: 'Varroa destructor 검출 · YOLOv8 · 2024 · 순천향대 AI·빅데이터학과',
          description:
            '양봉 산업 위협 요소인 Varroa destructor를 정확히 식별하는 모델을 구축하여 실증 연구로 이어진 프로젝트입니다.',
          contributions: ['데이터 수집 및 라벨 검수', 'YOLOv8 학습 파이프라인 구성', '성능 지표 분석 및 결과 보고서 작성'],
          tags: ['YOLOv8', 'Computer Vision', 'Research'],
          links: [
            { label: 'TJB 뉴스', href: 'https://www.youtube.com/watch?v=Gk7Ep9acB5Y&list=LL&index=2' },
            {
              label: 'KCI 논문',
              href: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003130969',
            },
          ],
        },
        {
          title: '로드킬 데이터 분석 연구',
          subtitle: '데이터 분석 학회 우수논문상 · 2023 · 한국스마트미디어학회',
          description: '지역별 로드킬 데이터를 분석해 예방 전략을 제안하고 학술대회에서 우수논문상을 수상했습니다.',
          contributions: ['연구 아이디어 제안 및 자료 조사', '논문 초록 및 본문 공동 작성', '분석 결과 시각화'],
          tags: ['Data Analysis', 'Research'],
          links: [
            { label: '연구 논문', href: roadkillPaper },
            { label: '우수논문상', href: smartMediaAward },
          ],
        },
        {
          title: '직업계고 청년 창업아이디어 공모전',
          subtitle: '부총리 겸 교육부장관상(대상) · 2025 · 교육부',
          description: '교육부 주관 전국 단위 경진대회에서 대상 수상',
          contributions: ['데이터 수집 및 분석', '창업 관련 지표 분석 및 설계', '인공지능 모델 설계 및 개발'],
          tags: ['Data Analysis', 'Deep Learning', 'Startup'],
          links: [{ label: '유튜브 영상', href: 'https://www.youtube.com/watch?v=B87brKvu-w8' }],
        },
        {
          title: '학생 창업 유망팀 U300+',
          subtitle: '성장트랙 A 최종 선정 · 2025 · 교육부',
          description: '학생 창업 유망팀 성장트랙 A 최종 선정',
          contributions: ['데이터 수집 및 분석', 'MVP 개발'],
          tags: ['Data Analysis', 'Deep Learning', 'Startup'],
          links: [{ label: 'PDF(예정)' }],
        },
        {
          title: '천안시 데이터 분석 아이디어 경진대회',
          subtitle: '본선 진출 · 2025 · 천안시',
          description: '본선 진출',
          contributions: ['데이터 수집 및 분석', '정책 제언', '모델 설계'],
          tags: ['Data Analysis', 'Statistics', 'Planning'],
          links: [{ label: 'PDF(예정)' }],
        },
        {
          title: '2025 데이터 크리에이터 캠프',
          subtitle: '최우수상 · 2025 · 과학기술정보통신부',
          description: '최우수상 수상',
          contributions: ['데이터 수집 및 분석', 'AI 모델 설계', 'AI 모델 성능 개선'],
          tags: ['Data Analysis', 'Statistics', 'Deep Learning'],
          links: [{ label: 'PDF(예정)' }],
        }
      ],
    },
    awards: {
      title: '수상',
      description: '창업과 데이터 분야에서의 성과입니다.',
      items: [
        {
          year: '2025',
          title: '직업계고 청년 창업아이디어 공모전 부총리 겸 교육부장관상(대상)',
          description: '교육부 주관 전국 단위 경진대회에서 대상 수상',
        },
        {
          year: '2025',
          title: '학생 창업 유망팀 U300+',
          description: '학생 창업 유망팀 성장트랙 A 최종 선정'
        },
        {
          year: '2025',
          title: '2025 데이터 크리에이터 캠프',
          description: '최우수상 수상'
        },
      ],
    },
    contact: {
      title: '연락처',
      description: '협업, 인터뷰, 프로젝트 제안은 언제든 환영합니다.',
      ctaMail: '이메일 보내기',
      items: [
        { label: '이메일', value: 'astre0198@dimigo.hs.kr', href: 'mailto:astre0198@dimigo.hs.kr' },
        { label: '인스타그램', value: '@nsunah.c', href: 'https://instagram.com/nsunah.c' },
      ],
    },
  },
  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      awards: 'Awards',
      contact: 'Contact',
    },
    hero: {
      greeting: 'Hello, I am',
      title: 'Hyunsoo Cho',
      role: 'AI Engineer · Data Analyst',
      description:
        'I explore AI and data with curiosity, grounding my learning in research outputs and hands-on projects that solve real problems.',
      ctaPrint: 'Save as PDF',
      ctaContact: 'Get in touch',
    },
    about: {
      title: 'About',
      summary:
        'A consistent passion for AI and data analytics since middle school led to recognisable results—KCI-indexed publications and award-winning papers. My goal is to keep scaling real-world impact through data-driven projects.',
      school: 'Korea Digital Media High School, E-Business Dept. · 한국디지털미디어고등학교 E-Business과',
    },
    skills: {
      title: 'Skills',
      description: 'Tools I actively apply in research and project settings.',
      levels: {
        foundational: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Upper-intermediate',
        expert: 'Expert',
      },
    },
    projects: {
      title: 'Projects',
      description: 'Selected research-driven projects.',
      contributionLabel: 'Key Contributions',
      items: [
        {
          title: 'KCI-Indexed AI Research',
          subtitle: 'Varroa destructor Detection · YOLOv8 · 2024 · Soonchunhyang Univ. AI & Big Data',
          description:
            'Built a detection pipeline addressing threats to the beekeeping industry, validating the model through an academic publication.',
          contributions: ['Performed data collection and label validation', 'Set up the YOLOv8 training workflow', 'Evaluated metrics and authored the findings'],
          tags: ['YOLOv8', 'Computer Vision', 'Research'],
          links: [
            { label: 'TJB News', href: 'https://www.youtube.com/watch?v=Gk7Ep9acB5Y&list=LL&index=2' },
            {
              label: 'KCI Paper',
              href: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003130969',
            },
          ],
        },
        {
          title: 'Roadkill Data Analysis Study',
          subtitle: 'Outstanding Paper Award · 2023 · Korea Society of Smart Media',
          description: 'Analyzed regional roadkill patterns to propose prevention strategies, receiving the outstanding paper award.',
          contributions: ['Ideated the research direction and led desk research', 'Co-authored the abstract and manuscript', 'Visualised insights for the presentation'],
          tags: ['Data Analysis', 'Research'],
          links: [
            { label: 'Research Paper', href: roadkillPaper },
            { label: 'Outstanding Paper Award', href: smartMediaAward },
          ],
        },
        {
          title: 'Youth Startup Idea Contest for Vocational High Schools',
          subtitle: 'Grand Prize · 2025 · Ministry of Education',
          description: 'Won the national grand prize (Deputy Prime Minister & Minister of Education Award) with a data-driven startup proposal.',
          contributions: ['Led data collection and analysis', 'Designed entrepreneurship KPIs and roadmap', 'Built and refined the AI model'],
          tags: ['Data Analysis', 'Deep Learning', 'Startup'],
          links: [{ label: 'YouTube Feature', href: 'https://www.youtube.com/watch?v=B87brKvu-w8' }],
        },
        {
          title: 'Promising Student Start-Up Team U300+',
          subtitle: 'Growth Track A Finalist · 2025 · Ministry of Education',
          description: 'Selected as a Growth Track A finalist in the national student startup acceleration program.',
          contributions: ['Gathered and analysed datasets', 'Developed the MVP prototype'],
          tags: ['Data Analysis', 'Deep Learning', 'Startup'],
          links: [{ label: 'PDF (coming soon)' }],
        },
        {
          title: 'Cheonan City Data Insight Challenge',
          subtitle: 'Under Review · 2025 · Cheonan City',
          description: 'Proposal submitted and currently under review.',
          contributions: ['Performed data gathering and analysis', 'Outlined policy recommendations', 'Designed predictive model'],
          tags: ['Data Analysis', 'Statistics', 'Planning'],
          links: [{ label: 'PDF (coming soon)' }],
        },
      ],
    },
    awards: {
      title: 'Awards',
      description: 'Recognitions from entrepreneurship and data projects.',
      items: [
        {
          year: '2025',
          title: 'Prime Minister & Minister of Education Award (Grand Prize)',
          description: 'Youth Startup Idea Contest for Vocational High Schools',
        },
        {
          year: '2025',
          title: 'Promising Student Start-Up Team U300+',
          description: 'Selected for Growth Track A in the national startup program',
        },
      ],
    },
    contact: {
      title: 'Contact',
      description: 'Open to collaboration, interviews, and project opportunities.',
      ctaMail: 'Send email',
      items: [
        { label: 'Email', value: 'astre0198@dimigo.hs.kr', href: 'mailto:astre0198@dimigo.hs.kr' },
        { label: 'Instagram', value: '@nsunah.c', href: 'https://instagram.com/nsunah.c' },
      ],
    },
  },
};


