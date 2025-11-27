# Cloudflare Pages 배포 가이드 - /portfolio 경로 설정

## 📋 목표
- 포트폴리오 페이지: `https://hyunshu.com/portfolio`
- 루트 리다이렉트: `https://hyunshu.com` → `https://hyunshu.com/portfolio`
- 다른 경로 유지: `/abc`, `/blog` 등은 그대로 사용 가능

---

## [1] 프로젝트 폴더/라우팅 구조 설계

### 현재 프로젝트 구조 (Vite + React)

현재 프로젝트는 **Vite + React** 스택을 사용하고 있으며, React Router를 사용하지 않는 단일 페이지 애플리케이션입니다.

### 빌드 결과 구조

`npm run build` 실행 후 `dist` 디렉토리 구조:

```
dist/
└── portfolio/
    ├── index.html          # 메인 HTML 파일
    ├── assets/
    │   ├── index-*.js      # JavaScript 번들
    │   ├── index-*.css     # CSS 번들
    │   └── ...             # 기타 정적 파일 (이미지, PDF 등)
    └── logo.svg            # 기타 정적 파일
```

### 설정 파일

#### `vite.config.ts`
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',  // ✅ /portfolio 경로로 설정
  build: { outDir: 'dist' },
});
```

#### `package.json` 빌드 스크립트
```json
{
  "scripts": {
    "build": "tsc && vite build && node scripts/move-to-portfolio.js"
  }
}
```

#### `scripts/move-to-portfolio.js`
빌드 후 파일을 `dist/portfolio/`로 이동하는 스크립트가 자동 실행됩니다.

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

#### Create React App 사용 시
```json
// package.json
{
  "homepage": "/portfolio",
  "scripts": {
    "build": "react-scripts build && mv build portfolio && mkdir build && mv portfolio build/"
  }
}
```

#### React Router 사용 시
```typescript
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter basename="/portfolio">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## [2] Cloudflare Redirect Rule 설정

### Cloudflare Dashboard에서 설정하기

1. **Cloudflare Dashboard** 접속: https://dash.cloudflare.com/
2. 도메인 `hyunshu.com` 선택
3. 왼쪽 메뉴에서 **Rules** → **Redirect Rules** 클릭
4. **Create rule** 버튼 클릭

### Redirect Rule 설정

#### Rule Name
```
Root to Portfolio Redirect
```

#### If the incoming requests match...
**Expression Editor**에 다음을 입력:

```javascript
(http.host eq "hyunshu.com" and http.request.uri.path eq "/")
```

**설명:**
- `http.host eq "hyunshu.com"`: 호스트가 정확히 `hyunshu.com`인 경우
- `http.request.uri.path eq "/"`: 경로가 정확히 `/`인 경우
- `and`: 두 조건을 모두 만족해야 함

#### Then the settings are...
- **Status code**: `301` (Permanent Redirect) 또는 `302` (Temporary Redirect)
- **Destination URL**: `https://hyunshu.com/portfolio`

### 301 vs 302 선택 가이드

**301 (Permanent Redirect) - 권장 ✅**
- **이유**: 루트 경로가 영구적으로 `/portfolio`로 이동하는 것이므로 SEO에 유리
- **장점**: 검색 엔진이 영구 이동을 인식하여 인덱싱 업데이트
- **단점**: 브라우저 캐시에 저장되어 변경 시 캐시 클리어 필요

**302 (Temporary Redirect)**
- **이유**: 임시 이동으로 표시
- **장점**: 나중에 루트 경로를 다른 용도로 사용할 수 있음
- **단점**: SEO에 덜 유리

**권장**: **301 (Permanent Redirect)** 사용

### 최종 설정 예시

```
Rule Name: Root to Portfolio Redirect
Expression: (http.host eq "hyunshu.com" and http.request.uri.path eq "/")
Status Code: 301
Destination URL: https://hyunshu.com/portfolio
```

### 테스트 방법

설정 후 다음 URL들을 테스트:

- ✅ `https://hyunshu.com` → `https://hyunshu.com/portfolio` (리다이렉트)
- ✅ `https://hyunshu.com/portfolio` → 포트폴리오 페이지 표시
- ✅ `https://hyunshu.com/abc` → 리다이렉트되지 않음 (404 또는 다른 페이지)
- ✅ `https://hyunshu.com/blog` → 리다이렉트되지 않음

---

## [3] Cloudflare Pages 빌드 설정

### Pages 프로젝트 설정

1. **Cloudflare Dashboard** → **Pages** 클릭
2. 프로젝트 선택 또는 생성
3. **Settings** → **Builds & deployments** 클릭

### 빌드 설정

- **Framework preset**: `Vite` (자동 감지될 수 있음)
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (기본값) ⚠️ **반드시 `/`로 설정** - 프로젝트가 저장소 루트에 있으므로 변경하지 마세요

### 환경 변수

필요한 경우 **Environment variables**에서 설정:
- `NODE_VERSION`: `18` 또는 `20` (선택사항)

---

## [3-1] Custom Domain 설정

### 도메인 추가하기

1. **Cloudflare Dashboard** → **Pages** → 프로젝트 선택
2. **Custom domains** 탭 클릭
3. **Set up a custom domain** 버튼 클릭
4. **Custom domain** 입력란에 도메인 입력:
   ```
   hyunshu.com
   ```
   ⚠️ **주의**: `https://`나 `http://`는 입력하지 마세요. 도메인 이름만 입력합니다.

5. **Continue** 클릭

### DNS 설정

Cloudflare가 자동으로 DNS 레코드를 설정해줍니다:

- **CNAME 레코드**: `hyunshu.com` → `your-project.pages.dev`
- 또는 **A 레코드**: Cloudflare Pages IP 주소로 설정

### 도메인 확인

- 도메인이 Cloudflare에서 관리되고 있다면 자동으로 설정됩니다
- 다른 DNS 제공업체를 사용 중이라면 수동으로 DNS 레코드를 추가해야 할 수 있습니다

### www 서브도메인 추가 (선택사항)

`www.hyunshu.com`도 사용하려면:

1. **Custom domains**에서 **Add custom domain** 클릭
2. `www.hyunshu.com` 입력
3. Cloudflare가 자동으로 설정해줍니다

### 최종 Custom Domain 설정 예시

```
✅ hyunshu.com          (메인 도메인)
✅ www.hyunshu.com      (선택사항, www 서브도메인)
```

**참고**: Custom domain을 설정하면 `https://your-project.pages.dev` 대신 `https://hyunshu.com`으로 접근할 수 있습니다.

---

## [4] 최종 체크리스트

### ✅ 배포 전 확인사항

- [ ] `vite.config.ts`에서 `base: '/portfolio/'` 설정 확인
- [ ] `package.json`의 빌드 스크립트에 `move-to-portfolio.js` 포함 확인
- [ ] 로컬에서 `npm run build` 실행 후 `dist/portfolio/` 구조 확인
- [ ] `dist/portfolio/index.html` 파일 존재 확인
- [ ] `dist/portfolio/assets/` 폴더 존재 확인

### ✅ Cloudflare Pages 설정 확인

- [ ] GitHub 저장소 연결 확인
- [ ] Build command: `npm run build` 설정
- [ ] Build output directory: `dist` 설정
- [ ] 배포 성공 확인

### ✅ Cloudflare Redirect Rule 확인

- [ ] Redirect Rule 생성 완료
- [ ] Expression: `(http.host eq "hyunshu.com" and http.request.uri.path eq "/")` 확인
- [ ] Status Code: `301` 설정
- [ ] Destination URL: `https://hyunshu.com/portfolio` 확인

### ✅ 최종 테스트

1. **루트 리다이렉트 테스트**
   ```bash
   curl -I https://hyunshu.com
   # 예상 결과: HTTP/1.1 301 Moved Permanently
   #           Location: https://hyunshu.com/portfolio
   ```

2. **포트폴리오 페이지 접근 테스트**
   - 브라우저에서 `https://hyunshu.com/portfolio` 접속
   - 포트폴리오 페이지가 정상적으로 표시되는지 확인
   - CSS, JavaScript, 이미지 등 모든 리소스가 정상 로드되는지 확인

3. **다른 경로 테스트**
   - `https://hyunshu.com/abc` 접속 → 리다이렉트되지 않아야 함
   - `https://hyunshu.com/blog` 접속 → 리다이렉트되지 않아야 함

4. **자동 리다이렉트 테스트**
   - `https://hyunshu.com` 접속 → 자동으로 `https://hyunshu.com/portfolio`로 이동하는지 확인

### ✅ 문제 해결

#### 문제: `/portfolio` 경로에서 404 에러
- **원인**: Cloudflare Pages의 Build output directory가 잘못 설정됨
- **해결**: Build output directory를 `dist`로 설정 (not `dist/portfolio`)

#### 문제: CSS/JS 파일이 로드되지 않음
- **원인**: Asset 경로가 잘못 설정됨
- **해결**: `vite.config.ts`의 `base: '/portfolio/'` 확인

#### 문제: 리다이렉트가 작동하지 않음
- **원인**: Redirect Rule의 Expression이 잘못됨
- **해결**: Expression을 정확히 `(http.host eq "hyunshu.com" and http.request.uri.path eq "/")`로 설정

---

## 📝 요약

### 빌드 결과 구조
```
dist/
└── portfolio/
    ├── index.html
    └── assets/
        ├── *.js
        ├── *.css
        └── ...
```

### Cloudflare Pages 설정
- Build command: `npm run build`
- Build output directory: `dist`

### Cloudflare Redirect Rule
- Expression: `(http.host eq "hyunshu.com" and http.request.uri.path eq "/")`
- Status: `301`
- Destination: `https://hyunshu.com/portfolio`

### 최종 동작
1. ✅ `https://hyunshu.com` → 자동 리다이렉트 → `https://hyunshu.com/portfolio`
2. ✅ `https://hyunshu.com/portfolio` → 포트폴리오 페이지 표시
3. ✅ `https://hyunshu.com/abc` → 리다이렉트되지 않음 (다른 경로 사용 가능)

---

## 🔗 참고 링크

- [Cloudflare Pages 문서](https://developers.cloudflare.com/pages/)
- [Cloudflare Redirect Rules](https://developers.cloudflare.com/rules/redirects/)
- [Vite Base Option](https://vitejs.dev/config/shared-options.html#base)

