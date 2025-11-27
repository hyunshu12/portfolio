# 빠른 시작 가이드

## ✅ 완료된 설정

### 1. 프로젝트 설정
- ✅ `vite.config.ts`: `base: '/portfolio/'` 설정 완료
- ✅ `package.json`: 빌드 스크립트에 파일 이동 및 경로 수정 스크립트 추가
- ✅ 빌드 결과: `dist/portfolio/` 구조로 생성됨

### 2. 빌드 결과 구조
```
dist/
└── portfolio/
    ├── index.html          # ✅ asset 경로가 /portfolio/로 시작
    ├── assets/
    │   ├── index-*.js      # ✅ 정상 작동
    │   ├── index-*.css     # ✅ 정상 작동
    │   └── ...
    └── logo.svg
```

## 🚀 다음 단계

### 1. GitHub에 푸시
```bash
git add .
git commit -m "Configure for /portfolio path deployment"
git push origin main
```

### 2. Cloudflare Pages 설정
1. [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Pages**
2. 프로젝트 선택 → **Settings** → **Builds & deployments**
3. 빌드 설정:
   - **Root directory**: `/` (기본값, 변경하지 마세요)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`

### 2-1. Custom Domain 설정
1. 프로젝트 → **Custom domains** 탭
2. **Set up a custom domain** 클릭
3. **Custom domain** 입력란에 입력:
   ```
   hyunshu.com
   ```
   ⚠️ `https://`나 `http://`는 입력하지 마세요. 도메인 이름만 입력합니다.
4. **Continue** 클릭 → Cloudflare가 자동으로 DNS 설정

### 3. Cloudflare Redirect Rule 설정
1. **Rules** → **Redirect Rules** → **Create rule**
2. 설정:
   - **Rule name**: `Root to Portfolio Redirect`
   - **Expression**: `(http.host eq "hyunshu.com" and http.request.uri.path eq "/")`
   - **Status code**: `301`
   - **Destination URL**: `https://hyunshu.com/portfolio`

📖 **상세 가이드**: `REDIRECT_RULES_GUIDE.md` 파일 참고

## 📋 테스트 체크리스트

- [ ] `https://hyunshu.com` → `https://hyunshu.com/portfolio`로 리다이렉트
- [ ] `https://hyunshu.com/portfolio` → 포트폴리오 페이지 정상 표시
- [ ] CSS, JavaScript, 이미지 등 모든 리소스 정상 로드
- [ ] `https://hyunshu.com/abc` → 리다이렉트되지 않음

## 📖 상세 가이드

자세한 내용은 `DEPLOYMENT_GUIDE.md`를 참고하세요.

