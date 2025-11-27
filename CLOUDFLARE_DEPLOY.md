# Cloudflare Pages 배포 가이드

## 1. Cloudflare Pages 설정

### GitHub 저장소 연결
1. [Cloudflare Dashboard](https://dash.cloudflare.com/)에 로그인
2. 왼쪽 사이드바에서 **Pages** 클릭
3. **Create a project** 버튼 클릭
4. **Connect to Git** 선택
5. GitHub 계정 인증 및 저장소 선택

### 빌드 설정
Cloudflare Pages에서 다음 설정을 입력하세요:

- **Framework preset**: `Vite`
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (기본값)

### 환경 변수 (필요한 경우)
환경 변수가 있다면 **Settings > Environment variables**에서 추가하세요.

## 2. 자동 배포
- `main` 브랜치에 푸시하면 자동으로 배포됩니다
- Pull Request를 생성하면 프리뷰 배포가 생성됩니다

## 3. 커스텀 도메인 설정 (선택사항)
1. Pages 프로젝트의 **Custom domains** 섹션으로 이동
2. 도메인 추가 및 DNS 설정

## 4. 배포 확인
배포가 완료되면 `https://your-project.pages.dev` 형식의 URL이 생성됩니다.

## 참고사항
- Node.js 버전: Cloudflare Pages는 자동으로 Node.js 버전을 감지합니다
- 빌드 시간: 무료 플랜은 20분 제한이 있습니다
- 빌드 캐시: `node_modules`는 자동으로 캐시됩니다


