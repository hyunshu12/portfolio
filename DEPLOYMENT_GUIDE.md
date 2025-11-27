# Cloudflare Pages 배포 가이드 - hyunshu.com/portfolio

## 📋 목표

1. 포트폴리오 페이지가 `https://hyunshu.com/portfolio`에서 정상 동작
2. `https://hyunshu.com` 접속 시 자동으로 `https://hyunshu.com/portfolio`로 리다이렉트
3. 다른 경로(`/abc`, `/blog` 등)는 리다이렉트되지 않고 그대로 유지

---

## [1] 프로젝트 폴더/라우팅 구조 설계

### 현재 프로젝트 구조 (Vite + React SPA)

현재 프로젝트는 **Vite + React** SPA입니다. React Router를 사용하지 않는 단일 페이지 애플리케이션입니다.

### 빌드 결과 구조

`npm run build` 실행 후 `dist/` 디렉토리 구조:

```
dist/
├── portfolio/              # 포트폴리오 앱 (실제 서빙 대상)
│   ├── index.html
│   ├── favicon.jpg
│   ├── _redirects
│   └── assets/
│       ├── index-*.css
│       ├── index-*.js
│       └── [기타 정적 파일들]
├── index.html              # (원본, 참고용)
├── favicon.jpg             # (원본, 참고용)
└── assets/                 # (원본, 참고용)
    └── ...
```

**중요**: Cloudflare Pages는 `dist/portfolio/` 폴더를 서빙합니다.

### 설정 파일

#### `vite.config.ts`
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',  // 모든 asset 경로가 /portfolio/로 시작
  build: { outDir: 'dist' },
});
```

#### `package.json` 빌드 스크립트
```json
{
  "scripts": {
    "build": "tsc && vite build && npm run build:move",
    "build:move": "node scripts/move-build.js"
  }
}
```

빌드 스크립트는 다음을 수행합니다:
1. TypeScript 컴파일
2. Vite 빌드 (`dist/`에 생성)
3. 빌드 결과를 `dist/portfolio/`로 복사

### 다른 스택 사용 시 참고

#### Next.js 사용 시
```javascript
// next.config.js
module.exports = {
  basePath: '/portfolio',
  assetPrefix: '/portfolio',
  output: 'export', // 정적 내보내기
};
```

빌드 결과: `out/portfolio/` 또는 `dist/portfolio/`

#### React Router 사용 시
```typescript
// vite.config.ts
export default defineConfig({
  base: '/portfolio/',
  // ...
});

// src/main.tsx
import { BrowserRouter } from 'react-router-dom';

<BrowserRouter basename="/portfolio">
  <App />
</BrowserRouter>
```

---

## [2] Cloudflare Redirect Rule 설정

### Redirect Rule 생성 방법

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) 로그인
2. `hyunshu.com` 도메인 선택
3. 왼쪽 메뉴에서 **Rules** → **Redirect Rules** 클릭
4. **Create rule** 버튼 클릭

### Rule 설정

#### Rule Name
```
Root to Portfolio Redirect
```

#### If (When incoming requests match...)

**Expression Editor**에 다음 입력:
```
(http.host eq "hyunshu.com" and http.request.uri.path eq "/")
```

또는 **Rule Builder** 사용 시:
- **Field**: `Hostname`
- **Operator**: `equals`
- **Value**: `hyunshu.com`
- **AND**
- **Field**: `URI Path`
- **Operator**: `equals`
- **Value**: `/`

#### Then (The settings are...)

- **Type**: `Dynamic`
- **Status code**: `301` (영구 이동) 또는 `302` (임시 이동)
- **Destination URL**: `https://hyunshu.com/portfolio`

**301 vs 302 선택 가이드:**
- **301 (Permanent)**: SEO에 유리, 브라우저가 캐시하여 다음 접속 시 직접 `/portfolio`로 이동
- **302 (Temporary)**: 나중에 루트 경로를 다른 용도로 사용할 가능성이 있을 때

**권장**: **301** 사용 (포트폴리오는 영구적인 구조)

### 최종 Rule 예시

```
Rule Name: Root to Portfolio Redirect
Expression: (http.host eq "hyunshu.com" and http.request.uri.path eq "/")
Action: Dynamic redirect
Status: 301
Destination: https://hyunshu.com/portfolio
```

### 주의사항

- **Path가 정확히 `/`인 경우에만** 리다이렉트됩니다
- `/portfolio`, `/abc`, `/blog` 등은 리다이렉트되지 않습니다
- `http.request.uri.path eq "/"` 조건이 이를 보장합니다

---

## [3] Cloudflare Pages 설정

### 프로젝트 생성

1. Cloudflare Dashboard → **Pages** 클릭
2. **Create a project** → **Connect to Git**
3. GitHub 저장소 `hyunsu12-lab/portfolio` 선택

### 빌드 설정

- **Framework preset**: `Vite` (자동 감지)
- **Build command**: `npm run build`
- **Build output directory**: `dist/portfolio` ⚠️ **중요**
- **Root directory**: `/` (기본값)

### 환경 변수

필요한 경우 **Settings > Environment variables**에서 추가

---

## [4] 최종 체크리스트

배포 후 다음을 확인하세요:

### ✅ 체크리스트

- [ ] **1. 루트 리다이렉트 확인**
  - `https://hyunshu.com` 접속
  - 자동으로 `https://hyunshu.com/portfolio`로 이동하는지 확인
  - HTTP 상태 코드가 301인지 확인 (브라우저 개발자 도구 Network 탭)

- [ ] **2. 포트폴리오 페이지 정상 동작**
  - `https://hyunshu.com/portfolio` 직접 접속
  - 페이지가 정상적으로 로드되는지 확인
  - CSS, JavaScript, 이미지 등 모든 리소스가 정상 로드되는지 확인
  - 브라우저 콘솔에 에러가 없는지 확인

- [ ] **3. 새로고침 테스트**
  - `https://hyunshu.com/portfolio`에서 새로고침(F5)
  - 404 에러 없이 정상 로드되는지 확인

- [ ] **4. 다른 경로 리다이렉트 안 됨**
  - `https://hyunshu.com/abc` 접속 (존재하지 않는 경로)
  - 리다이렉트되지 않고 404 또는 해당 경로의 콘텐츠가 표시되는지 확인
  - `https://hyunshu.com/blog` 접속 (나중에 추가할 경로)
  - 리다이렉트되지 않는지 확인

- [ ] **5. Asset 경로 확인**
  - 브라우저 개발자 도구 Network 탭에서
  - CSS, JS 파일이 `/portfolio/assets/...` 경로로 로드되는지 확인

### 테스트 명령어 (선택사항)

터미널에서 테스트:

```bash
# 루트 리다이렉트 확인 (301 응답 확인)
curl -I https://hyunshu.com

# 포트폴리오 페이지 정상 로드 확인
curl -I https://hyunshu.com/portfolio

# 다른 경로는 리다이렉트 안 됨 (404 또는 다른 응답)
curl -I https://hyunshu.com/abc
```

---

## [5] 문제 해결

### 문제: `/portfolio` 접속 시 404 에러

**원인**: Cloudflare Pages의 Build output directory가 잘못 설정됨

**해결**:
- Cloudflare Pages 설정에서 **Build output directory**를 `dist/portfolio`로 변경
- 재배포

### 문제: Asset 파일(CSS, JS)이 404 에러

**원인**: `vite.config.ts`의 `base` 설정이 잘못됨

**해결**:
- `vite.config.ts`에서 `base: '/portfolio/'` 확인
- 빌드 후 `dist/portfolio/index.html`에서 asset 경로가 `/portfolio/assets/...`로 시작하는지 확인

### 문제: 루트(`/`) 접속 시 리다이렉트가 안 됨

**원인**: Redirect Rule이 제대로 설정되지 않음

**해결**:
- Cloudflare Dashboard에서 Redirect Rule 확인
- Expression이 정확히 `(http.host eq "hyunshu.com" and http.request.uri.path eq "/")`인지 확인
- Rule이 활성화되어 있는지 확인

### 문제: 다른 경로도 리다이렉트됨

**원인**: Redirect Rule의 Expression이 잘못됨

**해결**:
- Expression에서 `http.request.uri.path eq "/"` 조건 확인
- `contains` 대신 `eq` (equals)를 사용해야 함

---

## 요약

1. ✅ **프로젝트 설정**: `vite.config.ts`에서 `base: '/portfolio/'` 설정
2. ✅ **빌드 스크립트**: `dist/portfolio/` 구조로 빌드 결과 생성
3. ✅ **Cloudflare Pages**: Build output directory를 `dist/portfolio`로 설정
4. ✅ **Redirect Rule**: 루트(`/`)만 `/portfolio`로 리다이렉트하는 Rule 생성
5. ✅ **테스트**: 체크리스트에 따라 모든 시나리오 테스트

이제 `https://hyunshu.com`에 접속하면 자동으로 `https://hyunshu.com/portfolio`로 이동하고, 포트폴리오가 정상적으로 표시됩니다! 🎉

