# 빠른 시작 가이드

## ✅ 완료된 설정

1. **Vite 설정**: `base: '/portfolio/'` 설정 완료
2. **빌드 스크립트**: `dist/portfolio/` 구조로 빌드되도록 설정 완료
3. **빌드 테스트**: 정상 작동 확인

## 🚀 다음 단계

### 1. GitHub에 푸시
```bash
git add .
git commit -m "Configure for /portfolio path deployment"
git push origin main
```

### 2. Cloudflare Pages 설정

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Pages**
2. **Create a project** → **Connect to Git**
3. 저장소 `hyunsu12-lab/portfolio` 선택
4. 빌드 설정:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist/portfolio` ⚠️ 중요
   - **Root directory**: `/`

### 3. Cloudflare Redirect Rule 설정

1. Cloudflare Dashboard → `hyunshu.com` 도메인 선택
2. **Rules** → **Redirect Rules** → **Create rule**
3. 설정:
   - **Rule name**: `Root to Portfolio Redirect`
   - **Expression**: `(http.host eq "hyunshu.com" and http.request.uri.path eq "/")`
   - **Action**: Dynamic redirect
   - **Status code**: `301`
   - **Destination**: `https://hyunshu.com/portfolio`

## 📋 빌드 결과 구조

```
dist/
└── portfolio/          ← Cloudflare Pages가 이 폴더를 서빙
    ├── index.html
    ├── favicon.jpg
    ├── _redirects
    └── assets/
        ├── index-*.css
        ├── index-*.js
        └── [기타 파일들]
```

## 🔍 테스트 체크리스트

배포 후 확인:
- [ ] `https://hyunshu.com` → `https://hyunshu.com/portfolio`로 리다이렉트
- [ ] `https://hyunshu.com/portfolio` → 페이지 정상 로드
- [ ] `https://hyunshu.com/abc` → 리다이렉트 안 됨 (404 또는 해당 콘텐츠)

자세한 내용은 `DEPLOYMENT_GUIDE.md` 참고하세요.

