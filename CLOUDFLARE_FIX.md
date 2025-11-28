# Cloudflare Pages 배포 오류 해결

## 문제
```
Failed: error occurred while validating assets in your output directory
```

## 원인
- Build output directory가 `dist`로 설정되어 있음
- 하지만 빌드 후 파일이 `dist/portfolio/`로 이동됨
- Cloudflare Pages가 `dist` 디렉토리에서 `index.html`을 찾지 못함

## 해결 방법

### 방법 1: Build output directory 변경 (권장)

Cloudflare Pages 설정에서:
- **Build output directory**: `dist` → `dist/portfolio`로 변경

이렇게 하면:
- Cloudflare Pages가 `dist/portfolio`를 루트로 인식
- `/portfolio` 경로로 접근 가능

### 방법 2: 빌드 스크립트 수정

파일을 이동하지 않고 `dist`에 직접 빌드하되, base path는 `/portfolio/`로 유지

---

## 즉시 적용 방법

Cloudflare Dashboard에서:
1. **Pages** → 프로젝트 선택
2. **Settings** → **Builds & deployments**
3. **Build output directory**를 `dist/portfolio`로 변경
4. **Save** 클릭
5. 배포 다시 실행 (또는 자동 재배포 대기)


