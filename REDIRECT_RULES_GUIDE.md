# Cloudflare Redirect Rules 설정 가이드

## 📍 목표
`https://hyunshu.com`으로 접속하면 자동으로 `https://hyunshu.com/portfolio`로 리다이렉트되도록 설정

---

## 🎯 단계별 설정 방법

### 1단계: Cloudflare Dashboard 접속

1. [Cloudflare Dashboard](https://dash.cloudflare.com/)에 로그인
2. 왼쪽 상단에서 도메인 **`hyunshu.com`** 선택
   - 여러 도메인이 있다면 목록에서 `hyunshu.com` 클릭

### 2단계: Redirect Rules 메뉴로 이동

1. 왼쪽 사이드바에서 **Rules** 클릭
2. **Redirect Rules** 클릭
   - 또는 직접 **Rules** → **Redirect Rules** 경로로 이동

### 3단계: 새 규칙 생성

1. **Create rule** 버튼 클릭
2. 또는 **Add a rule** 버튼 클릭

---

## 📝 규칙 설정 상세

### Step 1: Rule Name (규칙 이름)

**입력란에 입력:**
```
Root to Portfolio Redirect
```

**설명:**
- 규칙을 구분하기 위한 이름
- 나중에 관리할 때 어떤 규칙인지 알 수 있도록 명확하게 작성
- 한글도 사용 가능하지만, 영문 권장

---

### Step 2: If the incoming requests match... (조건 설정)

이 부분이 **가장 중요**합니다! 정확히 입력해야 합니다.

#### Expression Editor 선택

1. **Expression Editor** 탭 선택 (기본값)
2. 아래 코드를 **정확히** 복사해서 붙여넣기:

```javascript
(http.host eq "hyunshu.com" and http.request.uri.path eq "/")
```

#### 코드 설명

```javascript
(http.host eq "hyunshu.com" and http.request.uri.path eq "/")
│         │                │   │                          │
│         │                │   │                          └─ 경로가 정확히 "/" (루트)
│         │                │   └─ AND 연산자 (두 조건 모두 만족)
│         │                └─ 호스트가 정확히 "hyunshu.com"
│         └─ 같다 (equals)
└─ HTTP 요청의 호스트
```

**조건 해석:**
- `http.host eq "hyunshu.com"`: 도메인이 정확히 `hyunshu.com`인 경우
- `http.request.uri.path eq "/"`: 경로가 정확히 `/` (루트 경로)인 경우
- `and`: 두 조건을 **모두** 만족해야 함

**중요:**
- ✅ `https://hyunshu.com` → 조건 만족 → 리다이렉트 발생
- ✅ `https://hyunshu.com/` → 조건 만족 → 리다이렉트 발생
- ❌ `https://hyunshu.com/portfolio` → 조건 불만족 → 리다이렉트 안 됨
- ❌ `https://hyunshu.com/abc` → 조건 불만족 → 리다이렉트 안 됨
- ❌ `https://www.hyunshu.com` → 조건 불만족 → 리다이렉트 안 됨

---

### Step 3: Then the settings are... (동작 설정)

#### Status code (상태 코드)

**선택 옵션:**
- **301 Permanent Redirect** ✅ **권장**
- **302 Temporary Redirect**

**301 vs 302 비교:**

| 항목 | 301 (Permanent) | 302 (Temporary) |
|------|----------------|-----------------|
| 의미 | 영구 이동 | 임시 이동 |
| SEO | ✅ 검색 엔진이 영구 이동으로 인식 | ⚠️ 임시 이동으로 인식 |
| 브라우저 캐시 | ✅ 캐시에 저장됨 | ⚠️ 캐시에 저장되지 않을 수 있음 |
| 사용 시기 | 루트 경로가 영구적으로 `/portfolio`로 이동 | 나중에 루트 경로를 다른 용도로 사용할 예정 |

**권장: 301 (Permanent Redirect)** 선택

#### Destination URL (목적지 URL)

**입력란에 입력:**
```
https://hyunshu.com/portfolio
```

**주의사항:**
- ✅ `https://` 포함해서 입력
- ✅ 전체 URL 입력 (`/portfolio`만 입력하지 않음)
- ✅ 도메인 이름 정확히 입력 (`hyunshu.com`)

---

## ✅ 최종 설정 요약

설정이 완료되면 다음과 같이 표시됩니다:

```
Rule Name: Root to Portfolio Redirect

If the incoming requests match...
Expression: (http.host eq "hyunshu.com" and http.request.uri.path eq "/")

Then the settings are...
Status code: 301
Destination URL: https://hyunshu.com/portfolio
```

---

## 🧪 테스트 방법

### 1. 브라우저에서 테스트

1. 브라우저에서 `https://hyunshu.com` 접속
2. 자동으로 `https://hyunshu.com/portfolio`로 이동하는지 확인
3. 주소창에 `https://hyunshu.com/portfolio`가 표시되는지 확인

### 2. 터미널에서 테스트 (curl)

```bash
curl -I https://hyunshu.com
```

**예상 결과:**
```
HTTP/2 301
location: https://hyunshu.com/portfolio
```

### 3. 다른 경로 테스트

다음 URL들은 **리다이렉트되지 않아야** 합니다:

- `https://hyunshu.com/portfolio` → 포트폴리오 페이지 표시
- `https://hyunshu.com/abc` → 리다이렉트 안 됨
- `https://hyunshu.com/blog` → 리다이렉트 안 됨

---

## ⚠️ 주의사항

### Expression 작성 시 주의

1. **따옴표 사용**
   - ✅ `"hyunshu.com"` (큰따옴표)
   - ❌ `'hyunshu.com'` (작은따옴표)
   - ❌ `hyunshu.com` (따옴표 없음)

2. **공백 주의**
   - ✅ `(http.host eq "hyunshu.com" and http.request.uri.path eq "/")`
   - ❌ `(http.host eq "hyunshu.com"and http.request.uri.path eq "/")` (공백 없음)

3. **대소문자 구분**
   - `http.host`는 소문자로 작성
   - `eq`는 소문자로 작성

### Destination URL 작성 시 주의

1. **프로토콜 포함**
   - ✅ `https://hyunshu.com/portfolio`
   - ❌ `hyunshu.com/portfolio` (프로토콜 없음)
   - ❌ `/portfolio` (도메인 없음)

2. **슬래시 주의**
   - ✅ `https://hyunshu.com/portfolio` (마지막 슬래시 없음도 가능)
   - ✅ `https://hyunshu.com/portfolio/` (마지막 슬래시 있어도 가능)

---

## 🔧 문제 해결

### 문제 1: 리다이렉트가 작동하지 않음

**원인:**
- Expression이 잘못 입력됨
- 도메인 이름 오타
- 경로 조건 오타

**해결:**
1. Expression을 다시 확인: `(http.host eq "hyunshu.com" and http.request.uri.path eq "/")`
2. 따옴표, 공백, 대소문자 확인
3. 규칙이 활성화되어 있는지 확인 (Deploy 버튼 클릭)

### 문제 2: 모든 경로가 리다이렉트됨

**원인:**
- Expression에서 경로 조건이 빠짐
- `http.request.uri.path eq "/"` 부분이 없음

**해결:**
- Expression에 경로 조건 추가: `(http.host eq "hyunshu.com" and http.request.uri.path eq "/")`

### 문제 3: 무한 리다이렉트 루프

**원인:**
- Destination URL이 다시 같은 규칙에 매칭됨
- Expression이 너무 광범위함

**해결:**
- Expression을 정확히 `/` 경로만 매칭하도록 수정
- Destination URL이 `/portfolio`로 정확히 설정되어 있는지 확인

---

## 📋 체크리스트

설정 완료 후 확인:

- [ ] Rule Name이 명확하게 작성됨
- [ ] Expression이 정확히 입력됨: `(http.host eq "hyunshu.com" and http.request.uri.path eq "/")`
- [ ] Status code가 `301`로 설정됨
- [ ] Destination URL이 `https://hyunshu.com/portfolio`로 설정됨
- [ ] 규칙이 Deploy/활성화됨
- [ ] `https://hyunshu.com` 접속 시 리다이렉트 작동 확인
- [ ] `https://hyunshu.com/portfolio` 접속 시 정상 표시 확인
- [ ] `https://hyunshu.com/abc` 접속 시 리다이렉트 안 됨 확인

---

## 🎓 추가 학습

### Expression 작성 문법

Cloudflare의 Expression은 Cloudflare Rules Language를 사용합니다.

**기본 연산자:**
- `eq`: 같다 (equals)
- `ne`: 같지 않다 (not equals)
- `and`: 그리고 (AND)
- `or`: 또는 (OR)

**예시:**
```javascript
// 단일 조건
http.host eq "hyunshu.com"

// 여러 조건 (AND)
(http.host eq "hyunshu.com" and http.request.uri.path eq "/")

// 여러 조건 (OR)
(http.host eq "hyunshu.com" or http.host eq "www.hyunshu.com")
```

### 다른 Redirect Rule 예시

#### www 서브도메인 리다이렉트
```javascript
// www.hyunshu.com → hyunshu.com
(http.host eq "www.hyunshu.com")
→ https://hyunshu.com
```

#### 특정 경로 리다이렉트
```javascript
// /old → /new
(http.host eq "hyunshu.com" and http.request.uri.path eq "/old")
→ https://hyunshu.com/new
```

---

## 📞 참고 자료

- [Cloudflare Redirect Rules 문서](https://developers.cloudflare.com/rules/redirects/)
- [Cloudflare Rules Language](https://developers.cloudflare.com/ruleset-engine/rules-language/)

