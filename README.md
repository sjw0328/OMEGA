# 게임하자 — 배포용 폴더

GitHub Pages에 올릴 파일만 들어 있습니다. **이 폴더 안의 내용만** 그대로 올리세요.

## 파일 목록

| 파일 | 역할 |
|---|---|
| `index.html` | 앱 본체 (홈 · 클럽 · 채팅 · 프로필 전부 포함) |
| `support.js` | 앱 실행 런타임 — 없으면 흰 화면 |
| `manifest.json` | PWA 설치 정보 (앱 이름 · 아이콘 · 테마색) |
| `sw.js` | 서비스 워커 — 오프라인 캐시 + 홈화면 설치 |
| `icon-192.png` `icon-512.png` `icon-512-maskable.png` | 홈화면 아이콘 |
| `robots.txt` `sitemap.xml` | 검색엔진 수집용 (게임하자.kro.kr 기준) |

관리자 페이지(`admin.html`)와 모바일 미리보기(`mobile.html`)는 **일부러 뺐습니다.** 본인만 쓰는 도구라 프로젝트 루트에서 열어서 쓰세요.

## 올리는 방법

1. GitHub에서 새 저장소를 만듭니다 (public).
2. 이 폴더 안의 파일 전부를 저장소 **최상단**에 업로드합니다. (`deploy` 폴더째로 올리면 경로가 어긋납니다.)
3. 저장소 → Settings → Pages → Source를 `Deploy from a branch`, 브랜치 `main` / 폴더 `/ (root)`로 저장합니다.
4. 1~2분 뒤 `https://<아이디>.github.io/<저장소이름>/` 에서 열립니다.

## 확인 체크리스트

- [ ] 주소 열면 홈 화면이 뜬다 (흰 화면이면 `support.js`가 빠진 것)
- [ ] 글 쓰기 · 클럽 만들기 · 채팅이 실제로 저장된다 (Supabase 연결 확인)
- [ ] 휴대폰 브라우저에서 "홈 화면에 추가"가 뜬다
- [ ] 아이콘이 초록 로고로 나온다

## 앱을 수정한 뒤 다시 올릴 때

1. 프로젝트에서 `home.dc.html`을 수정합니다.
2. 그 내용을 `deploy/index.html`로 다시 복사합니다. (Claude에게 "배포본 갱신해줘"라고 하면 됩니다)
3. `sw.js` 첫 줄의 `gz-shell-v3` 숫자를 하나 올립니다 → 기존 방문자의 캐시가 갱신됩니다.
4. 바뀐 파일만 GitHub에 다시 업로드합니다.

## Supabase

- 프로젝트: `fiphfdlhgnprkwllriml.supabase.co`
- `index.html`에 들어 있는 키는 **publishable(공개용) 키**라 노출돼도 안전합니다. `service_role` 키는 절대 넣지 마세요.
- 스키마는 프로젝트 루트의 `supabase-setup-v8.sql`이 최신입니다. 새 Supabase 프로젝트로 옮길 땐 이 파일을 SQL Editor에 붙여 실행하세요.
