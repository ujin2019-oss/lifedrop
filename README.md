# LIFE DROP — 헌혈 나눔센터

## 실행 방법
`index.html` 더블클릭(file://)으로 바로 실행됩니다. (Live Server도 가능)

## 폴더 구조
```
├── index.html              메인
├── include/
│   ├── header.js           ★ 공통 헤더 — 메뉴 수정은 이 파일에서 (백틱 ` 안 HTML 편집)
│   ├── footer.js           ★ 공통 푸터
│   └── header.html / footer.html   (구버전 — 사용 안 함, 삭제해도 됨)
├── css/style.css           단일 CSS (변수는 최상단 :root)
├── js/
│   ├── include.js          헤더/푸터 삽입 + 경로 보정 + 메뉴 active
│   └── main.js             Swiper, GSAP 스크롤 인터랙션
├── pages/                  서브페이지 (스텁 — 디자인 확정 후 작업)
│   ├── _template.html      서브페이지 템플릿 (복사해서 사용)
│   ├── about.html          왜 헌혈인가
│   ├── guide.html          헌혈 가이드
│   ├── campaign.html       캠페인 참여
│   ├── story.html          Life Story
│   └── news.html           캠페인 소식
└── images/                 ★ 이미지는 아래 경로에 업로드
```

## 적용된 이미지 (images/main/)
| 위치 | 파일 |
|---|---|
| 로고 (헤더) | `logo.png` |
| 로고 (푸터/화이트) | `foot_logo.png` |
| 히어로 배경 (3슬라이드 공통, 좌우반전 적용) | `hero_bg.png` |
| 절차 01~03 | `sec2_1.png` ~ `sec2_3.png` |
| 수혜자 스토리 배경 | `sec3_1.png` |
| SNS 카드 1~3 | `sec4_1.jpg` ~ `sec4_3.jpg` |
| 캠페인 참여 (센터 찾기 / 예약) | `sec5_1.png` / `sec5_2.png` |
| 서브페이지용 | `images/sub/` (디자인 확정 후) |

- 히어로 배경을 슬라이드별로 다르게: index.html의 `.hero__bgs` 안 각 div에
  `style="background-image:url(images/main/다른이미지.png)"` 추가
- 배경 반전 해제: css의 `.hero__bg`에서 `transform: scaleX(-1)` 제거

## CSS 변수 수정 (css/style.css 최상단 :root)
- 색상: `--color-main`(메인), `--color-sub`(서브), `--color-point`(포인트), `--color-bg`(배경)
- 간격: `--section-gap`(섹션 간격), `--section-pad`(섹션 내부 상하), `--gutter`(좌우 여백)
- 글자: `--fs-display / h1 / h2 / h3 / body-lg / body / small / num` + 두께 `--fw-*`
- 라운드: `--radius-lg / md / sm / pill`
- 반응형(1024 / 768)에서 변수만 재정의되므로 동일하게 수정하면 됩니다.

## 서브페이지 추가 방법
1. `pages/_template.html` 복사 → 이름 변경
2. `{{PAGE_ID}}`(메뉴 active용 id), `{{PAGE_TITLE}}`, `{{PAGE_DESC}}` 교체
3. `.sub-content` 안에 콘텐츠 작성 — `data-reveal`, `data-reveal-group` 속성을 붙이면 GSAP 스크롤 모션 자동 적용

## 사용 라이브러리 (JS만, CSS는 전부 직접 작성)
- Swiper 11 (히어로 슬라이드 + autoplay 프로그레스바)
- GSAP 3.12 + ScrollTrigger (스크롤 reveal, 카운터, 게이지, 패럴랙스)
- Pretendard 웹폰트
