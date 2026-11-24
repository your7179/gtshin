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

## 애드센스 광고
- 퍼블리셔 ID는 `_config.yml`의 `google_adsense`에 있음 (비우면 광고 전부 숨김)
- 글(md) 안에 넣는 법
  - `{% include ad.html %}` — 본문 내 광고(in-article). 광고 1(도입부 뒤), 광고 3(글 끝)
  - `{% include ad.html type="display" %}` — 문장 중간 광고. 광고 2(본문 중간), 긴 글의 추가 광고
- 자동으로 들어가는 광고: 글 하단 관련 콘텐츠(multiplex), 홈 화면 중간(display)·하단(multiplex)
- `ads.txt`는 운영자가 저장소 루트에 직접 올림

## 나중에 할 일
- 애널리틱스: `_config.yml`의 `google_analytics: ""`에 측정 ID(G-XXXX) 입력
