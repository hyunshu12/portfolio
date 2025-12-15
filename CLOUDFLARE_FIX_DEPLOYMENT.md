# Cloudflare Pages 배포 문제 해결

## 🔴 문제: 개발자 미리보기에서는 보이는데 Cloudflare 배포 후 안 보임

### 원인
Cloudflare Pages의 **Build output directory** 설정이 잘못되었을 가능성이 높습니다.

---

## ✅ 해결 방법

### 1단계: Cloudflare Dashboard 접속
1. [Cloudflare Dashboard](https://dash.cloudflare.com/) 접속
2. **Pages** 클릭
3. 프로젝트 선택

### 2단계: 빌드 설정 확인 및 수정
1. **Settings** → **Builds & deployments** 클릭
2. **Edit configuration** 버튼 클릭 (또는 **Configuration** 섹션에서)
3. 다음 설정 확인:

```
Root directory:        /
Build command:         npm run build
Build output directory: dist/portfolio  ← 이 부분이 중요!
```

**⚠️ 중요**: 
- Build output directory가 `dist`로 되어 있다면 → `dist/portfolio`로 변경
- Build output directory가 `dist/portfolio`로 되어 있다면 → 그대로 유지

### 3단계: 설정 저장
1. **Save** 버튼 클릭
2. 변경사항 저장 확인

### 4단계: 재배포
1. **Deployments** 탭으로 이동
2. 최신 배포 확인
3. 배포가 실패했다면:
   - **Retry deployment** 클릭
   - 또는 새로운 커밋이 있으면 자동으로 재배포됨

---

## 🔍 확인 사항

### 빌드 결과 구조 확인
로컬에서 빌드한 결과:
```
dist/
└── portfolio/
    ├── index.html
    ├── assets/
    │   ├── index-*.js
    │   ├── index-*.css
    │   └── ...
    └── logo.svg
```

### index.html 경로 확인
`dist/portfolio/index.html` 파일의 asset 경로가 `/portfolio/`로 시작해야 합니다:
```html
<script src="/portfolio/assets/index-*.js"></script>
<link href="/portfolio/assets/index-*.css">
```

---

## 📋 체크리스트

배포 전 확인:
- [ ] 로컬에서 `npm run build` 성공
- [ ] `dist/portfolio/index.html` 파일 존재
- [ ] `dist/portfolio/assets/` 폴더 존재
- [ ] Git에 푸시 완료

Cloudflare 설정 확인:
- [ ] Build output directory: `dist/portfolio` ✅
- [ ] Build command: `npm run build` ✅
- [ ] Root directory: `/` ✅

배포 후 확인:
- [ ] 배포가 **Success** 상태인지 확인
- [ ] 배포 로그에 에러가 없는지 확인
- [ ] 사이트 URL 접속 테스트

---

## 🚨 자주 발생하는 문제

### 문제 1: Build output directory가 `dist`로 설정됨
**증상**: 배포는 성공하지만 404 에러 발생
**해결**: `dist/portfolio`로 변경

### 문제 2: 배포 실패
**증상**: 배포가 실패 상태
**해결**: 
1. Deployments 탭에서 로그 확인
2. 빌드 오류 확인
3. 로컬에서 `npm run build` 테스트

### 문제 3: 사이트는 열리지만 리소스가 로드되지 않음
**증상**: HTML은 보이지만 CSS/JS가 로드 안 됨
**해결**: 
1. `dist/portfolio/index.html`의 asset 경로 확인
2. `/portfolio/`로 시작하는지 확인
3. `fix-asset-paths.js` 스크립트가 실행되었는지 확인

---

## 🔄 재배포 방법

### 방법 1: 자동 재배포 (권장)
1. Git에 새로운 커밋 푸시
2. Cloudflare Pages가 자동으로 감지하여 재배포

### 방법 2: 수동 재배포
1. Cloudflare Dashboard → Pages → 프로젝트
2. **Deployments** 탭
3. 최신 배포에서 **Retry deployment** 클릭

### 방법 3: 설정 변경 후 재배포
1. 빌드 설정 변경
2. **Save** 클릭
3. 자동으로 재배포 시작

---

## 📞 다음 단계

설정을 변경한 후:
1. 배포가 완료될 때까지 대기 (보통 1-3분)
2. 배포 상태가 **Success**인지 확인
3. 사이트 접속 테스트
4. 문제가 계속되면 배포 로그 확인

---

## 💡 참고

- 빌드 시간: 보통 1-3분 소요
- 배포 시간: 보통 1-2분 소요
- DNS 전파: Custom Domain 설정 시 최대 24시간 소요 (보통 몇 분)



