# gtshin.com — 暮らしの中の般若心経、毎日出会う観音さま

깃허브 페이지(Jekyll) 일본어 불교 홈페이지. 이 파일은 사이트에 표시되지 않습니다(_config.yml에서 제외).

## 폴더 구조
- `_config.yml` — 사이트 설정(제목, 플러그인, 애널리틱스 ID 자리)
- `CNAME` — 도메인(gtshin.com)
- `_layouts/` — default(전체 틀), post(글), page(고정 페이지)
- `_includes/` — header, footer, ad.html(광고 자리, 지금은 비어 있음), post-list
- `_posts/` — 연재 글(md). 파일 이름 `YYYY-MM-DD-hannya-01.md`
- `assets/css/style.css` — 디자인
- `hannya/` `kannon/` `korea/` — 메뉴별 글 목록 페이지
- `about.md` `contact.md` `privacy.md` `404.html` `robots.txt`
- `images/profile.png` — 운영자 초상화, `images/posts/` — 글 그림

## 글 올리기
`_posts/` 폴더에 md 파일을 올리면 자동으로 목록·사이트맵(sitemap.xml)·RSS(feed.xml)에 반영됩니다.
글 주소: `https://gtshin.com/hannya/hannya-01/`

## 나중에 할 일
- 애드센스: 퍼블리셔 ID를 받으면 `_includes/ad.html`, `_layouts/default.html`, `ads.txt`에 코드 추가
- 애널리틱스: `_config.yml`의 `google_analytics: ""`에 측정 ID(G-XXXX) 입력
