# Cloudflare Pages 배포 체크리스트

## ✅ 현재 상태
- [x] 로컬 빌드 성공
- [x] Git 저장소에 푸시 완료
- [ ] Cloudflare Pages 프로젝트 생성
- [ ] 빌드 설정 확인
- [ ] Custom Domain 설정
- [ ] Redirect Rule 설정

---

## 1단계: Cloudflare Pages 프로젝트 생성/확인

### 프로젝트가 이미 있는 경우
1. [Cloudflare Dashboard](https://dash.cloudflare.com/) 접속
2. 왼쪽 메뉴에서 **Pages** 클릭
3. 프로젝트 목록에서 `portfolio` 또는 해당 프로젝트 찾기

### 프로젝트가 없는 경우
1. **Create a project** 버튼 클릭
2. **Connect to Git** 선택
3. GitHub 계정 인증
4. 저장소 `hyunsu12-lab/portfolio` 선택
5. **Begin setup** 클릭

---

## 2단계: 빌드 설정 확인

### 필수 설정 확인
1. 프로젝트 선택 → **Settings** → **Builds & deployments** 클릭
2. 다음 설정 확인:

```
✅ Root directory:        /
✅ Build command:         npm run build
✅ Build output directory: dist/portfolio
```

**중요**: Build output directory가 `dist/portfolio`로 설정되어 있는지 확인하세요!

### 설정 변경 방법
1. **Builds & deployments** 페이지에서
2. **Edit configuration** 클릭
3. **Build output directory**를 `dist/portfolio`로 변경
4. **Save** 클릭

---

## 3단계: 배포 실행

### 자동 배포
- GitHub에 푸시하면 자동으로 배포가 시작됩니다
- 이미 푸시했다면 Cloudflare Dashboard에서 배포 상태 확인

### 수동 배포
1. 프로젝트 페이지에서
2. **Deployments** 탭 클릭
3. 최신 배포 확인
4. 배포가 실패했다면 **Retry deployment** 클릭

---

## 4단계: Custom Domain 설정

### 도메인 추가
1. 프로젝트 → **Custom domains** 탭
2. **Set up a custom domain** 클릭
3. 도메인 입력: `hyunshu.com`
4. **Continue** 클릭
5. Cloudflare가 자동으로 DNS 설정

### 확인
- 도메인이 **Active** 상태인지 확인
- DNS 설정이 완료될 때까지 몇 분 소요될 수 있음

---

## 5단계: Redirect Rule 설정

### Redirect Rule 생성
1. Cloudflare Dashboard → 도메인 `hyunshu.com` 선택
2. **Rules** → **Redirect Rules** 클릭
3. **Create rule** 클릭

### 설정 입력
```
Rule Name: Root to Portfolio Redirect

Expression: (http.host eq "hyunshu.com" and http.request.uri.path eq "/")

Status Code: 301
Destination URL: https://hyunshu.com/portfolio
```

4. **Deploy** 클릭

---

## 6단계: 배포 확인

### 배포 상태 확인
1. Pages 프로젝트 → **Deployments** 탭
2. 최신 배포가 **Success** 상태인지 확인
3. 배포 URL 클릭하여 사이트 확인

### 사이트 테스트
- [ ] `https://hyunshu.com` → 자동으로 `/portfolio`로 리다이렉트
- [ ] `https://hyunshu.com/portfolio` → 포트폴리오 페이지 정상 표시
- [ ] CSS, JavaScript, 이미지 등 모든 리소스 정상 로드

---

## 문제 해결

### 배포 실패 시
1. **Deployments** 탭에서 실패한 배포 클릭
2. 로그 확인
3. 일반적인 원인:
   - Build output directory 설정 오류 → `dist/portfolio`로 변경
   - 빌드 오류 → 로컬에서 `npm run build` 테스트
   - 의존성 문제 → `package.json` 확인

### 사이트가 표시되지 않을 때
1. Custom Domain이 **Active** 상태인지 확인
2. DNS 설정이 완료되었는지 확인 (최대 24시간 소요)
3. 브라우저 캐시 클리어 후 다시 시도

### 리다이렉트가 작동하지 않을 때
1. Redirect Rule이 **Deployed** 상태인지 확인
2. Expression이 정확한지 확인
3. 몇 분 기다린 후 다시 시도 (규칙 적용에 시간 소요)

---

## 빠른 참조

### Cloudflare Dashboard 링크
- [Pages](https://dash.cloudflare.com/?to=/:account/pages)
- [Redirect Rules](https://dash.cloudflare.com/?to=/:account/:zone/rules/redirects)

### 현재 프로젝트 정보
- GitHub 저장소: `hyunsu12-lab/portfolio`
- 도메인: `hyunshu.com`
- 배포 경로: `/portfolio`

---

## 다음 단계

배포가 완료되면:
1. 사이트 테스트
2. 모든 링크 확인
3. 모바일 반응형 확인
4. 성능 최적화 (필요시)



