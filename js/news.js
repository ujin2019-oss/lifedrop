/* ==========================================================
  news.js — 캠페인 소식 게시판 (프론트엔드)
  - 카테고리 필터 / 검색 / 페이지네이션 / 상세 모달
  - 게시글 데이터는 아래 POSTS 배열만 수정하면 됩니다.
========================================================== */
(function () {
  'use strict';

  var grid = document.getElementById('newsGrid');
  if (!grid) return; // 캠페인 소식 페이지가 아니면 종료

  /* ---------- 카테고리 정의 ---------- */
  var CATS = {
    notice:   { label: '공지사항', icon: '📢' },
    campaign: { label: '캠페인',   icon: '🩸' },
    event:    { label: '이벤트',   icon: '🎉' },
    press:    { label: '보도자료', icon: '📰' }
  };

  /* ---------- 게시글 데이터 ---------- */
  var POSTS = [
    {
      id: 13, cat: 'notice', date: '2026-06-12', views: 412,
      title: '여름철 혈액 수급 비상 — 헌혈 동참 호소',
      excerpt: '휴가철을 앞두고 헌혈 인구가 급감하며 혈액 보유량이 관심 단계에 진입했습니다. 생명을 살리는 헌혈에 함께해 주세요.',
      body: [
        '본격적인 휴가철을 앞두고 전국 혈액 보유량이 적정 수준(5일분)을 밑도는 관심 단계에 진입했습니다.',
        '특히 O형과 A형 혈액의 부족이 두드러지고 있어, 응급 수술과 항암 치료가 필요한 환자들에게 큰 어려움이 예상됩니다.',
        'LIFE DROP은 6월 한 달간 전국 헌혈의 집에서 특별 캠페인을 진행합니다. 단 10분의 헌혈이 누군가의 내일을 지킵니다. 가까운 센터를 찾아 동참해 주세요.'
      ]
    },
    {
      id: 12, cat: 'campaign', date: '2026-06-09', views: 358,
      title: '"오늘의 한 방울" 직장인 단체헌혈 캠페인 시작',
      excerpt: '점심시간을 활용한 직장인 단체헌혈 캠페인이 시작됩니다. 신청 기업에는 헌혈 버스가 직접 방문합니다.',
      body: [
        '바쁜 직장인도 부담 없이 참여할 수 있도록, 점심시간(11:30~13:30)을 활용한 단체헌혈 캠페인 "오늘의 한 방울"을 시작합니다.',
        '10인 이상 신청한 기업에는 헌혈 버스가 직접 방문하며, 참여자 전원에게 기념품과 헌혈 증서를 드립니다.',
        '신청은 캠페인 참여 페이지에서 가능하며, 방문 일정은 협의 후 확정됩니다.'
      ]
    },
    {
      id: 11, cat: 'event', date: '2026-06-05', views: 521,
      title: '헌혈하고 굿즈 받자! LIFE DROP 시즌 굿즈 이벤트',
      excerpt: '6월 한 달간 헌혈 참여자에게 한정판 LIFE DROP 에코백과 텀블러를 선착순 증정합니다.',
      body: [
        '6월 한 달간 전국 헌혈의 집에서 헌혈에 참여하신 모든 분께 한정판 굿즈를 선착순으로 드립니다.',
        '준비된 굿즈는 LIFE DROP 캐릭터 에코백, 보온 텀블러, 스티커 팩 3종이며, 센터별 수량이 소진되면 조기 마감될 수 있습니다.',
        '나눔의 마음에 작은 선물로 보답합니다. 많은 참여 부탁드립니다.'
      ]
    },
    {
      id: 10, cat: 'press', date: '2026-05-28', views: 277,
      title: 'LIFE DROP, 연간 헌혈 참여 10만 명 돌파',
      excerpt: '2025년 한 해 동안 LIFE DROP 캠페인을 통한 누적 헌혈 참여자가 10만 명을 넘어섰습니다.',
      body: [
        'LIFE DROP은 2025년 한 해 동안 캠페인을 통해 헌혈에 참여한 시민이 누적 10만 명을 돌파했다고 밝혔습니다.',
        '이는 전년 대비 27% 증가한 수치로, 청년층과 직장인 단체헌혈 참여 확대가 주효했던 것으로 분석됩니다.',
        'LIFE DROP 관계자는 "한 사람의 헌혈이 최대 세 명의 생명을 살린다는 메시지가 시민들의 자발적 참여로 이어졌다"고 전했습니다.'
      ]
    },
    {
      id: 9, cat: 'campaign', date: '2026-05-20', views: 189,
      title: '대학생 헌혈 동아리 "드롭메이트" 2기 모집',
      excerpt: '캠퍼스에서 헌혈 문화를 확산하는 대학생 서포터즈 "드롭메이트" 2기를 모집합니다.',
      body: [
        '대학 캠퍼스에서 헌혈 문화를 알리고 캠페인을 기획하는 대학생 서포터즈 "드롭메이트" 2기를 모집합니다.',
        '활동 기간은 6개월이며, 활동비와 수료증, 우수 활동자 표창이 제공됩니다.',
        '헌혈과 나눔에 관심 있는 전국 대학생이라면 누구나 지원 가능합니다.'
      ]
    },
    {
      id: 8, cat: 'notice', date: '2026-05-14', views: 233,
      title: '헌혈 예약 시스템 개편 안내',
      excerpt: '더 빠르고 편리한 예약을 위해 온라인 예약 시스템을 개편했습니다. 대기 없이 바로 입장하세요.',
      body: [
        '이용자 편의를 위해 온라인 헌혈 예약 시스템을 전면 개편했습니다.',
        '원하는 센터와 날짜, 시간을 선택해 예약하면 현장 대기 없이 바로 입장할 수 있습니다.',
        '예약 변경과 취소도 마이페이지에서 간편하게 할 수 있습니다.'
      ]
    },
    {
      id: 7, cat: 'event', date: '2026-05-06', views: 304,
      title: '가정의 달 가족 헌혈 인증 이벤트',
      excerpt: '가족과 함께 헌혈하고 SNS에 인증하면 추첨을 통해 문화상품권을 드립니다.',
      body: [
        '5월 가정의 달을 맞아 가족과 함께 헌혈에 참여하고 SNS에 인증샷을 남기는 이벤트를 진행합니다.',
        '지정 해시태그(#라이프드롭 #가족헌혈)와 함께 게시하면 추첨을 통해 100명에게 문화상품권을 드립니다.',
        '소중한 사람과 함께하는 나눔의 경험을 만들어 보세요.'
      ]
    },
    {
      id: 6, cat: 'press', date: '2026-04-22', views: 158,
      title: '지자체와 협약 — 찾아가는 헌혈 버스 확대',
      excerpt: '주요 지자체와 업무협약을 맺고 도서·산간 지역까지 찾아가는 헌혈 버스를 확대 운영합니다.',
      body: [
        'LIFE DROP은 주요 지자체와 업무협약을 체결하고, 헌혈 인프라가 부족한 도서·산간 지역까지 찾아가는 헌혈 버스를 확대 운영합니다.',
        '이를 통해 그동안 헌혈에 참여하기 어려웠던 지역 주민들의 접근성이 크게 개선될 전망입니다.',
        '운영 일정은 지역별로 순차 공개됩니다.'
      ]
    },
    {
      id: 5, cat: 'campaign', date: '2026-04-10', views: 212,
      title: '"생명을 잇는 릴레이" 헌혈 챌린지',
      excerpt: '내가 헌혈하고 다음 주자를 지목하는 릴레이 챌린지로 헌혈의 선한 영향력을 이어가요.',
      body: [
        '헌혈에 참여한 뒤 다음 주자를 지목하는 "생명을 잇는 릴레이" 챌린지를 시작합니다.',
        '지목받은 사람은 2주 안에 헌혈에 참여하고 다시 다음 주자를 지목하면 됩니다.',
        '작은 동참이 이어져 큰 나눔의 물결을 만듭니다. 지금 첫 주자가 되어 보세요.'
      ]
    },
    {
      id: 4, cat: 'notice', date: '2026-03-30', views: 176,
      title: '헌혈 가능 연령·체중 기준 안내',
      excerpt: '안전한 헌혈을 위한 연령, 체중, 건강 상태 기준을 안내합니다. 헌혈 전 꼭 확인하세요.',
      body: [
        '전혈 헌혈은 만 16세~69세, 남성 50kg·여성 45kg 이상이면 참여할 수 있습니다.',
        '헌혈 전에는 충분한 수면과 식사가 필요하며, 최근 복용한 약물이나 여행력에 따라 헌혈이 제한될 수 있습니다.',
        '자세한 기준은 헌혈 가이드 페이지에서 확인해 주세요.'
      ]
    },
    {
      id: 3, cat: 'event', date: '2026-03-18', views: 261,
      title: '봄맞이 헌혈 데이 — 헌혈자 카페 음료 증정',
      excerpt: '3월 헌혈 데이에 참여하시면 제휴 카페 음료 교환권을 드립니다.',
      body: [
        '따뜻한 봄을 맞아 3월 셋째 주 토요일을 "헌혈 데이"로 운영합니다.',
        '이날 헌혈에 참여하신 분께는 전국 제휴 카페에서 사용 가능한 음료 교환권을 드립니다.',
        '가까운 헌혈의 집에서 봄날의 따뜻한 나눔에 함께해 주세요.'
      ]
    },
    {
      id: 2, cat: 'press', date: '2026-02-27', views: 143,
      title: 'LIFE DROP 캠페인, 공익광고 대상 수상',
      excerpt: '"오늘도 누군가는 수혈을 기다립니다" 캠페인이 올해의 공익광고 대상을 수상했습니다.',
      body: [
        'LIFE DROP의 헌혈 인식 개선 캠페인 "오늘도 누군가는 수혈을 기다립니다"가 올해의 공익광고 대상을 수상했습니다.',
        '심사위원단은 따뜻한 메시지와 절제된 표현으로 헌혈의 가치를 효과적으로 전달했다고 평가했습니다.',
        '앞으로도 더 많은 시민이 나눔에 동참할 수 있도록 노력하겠습니다.'
      ]
    }
  ];

  /* ---------- 상태 ---------- */
  var PER_PAGE = 6;
  var state = { cat: 'all', q: '', page: 1 };

  var tabs = document.getElementById('boardTabs');
  var searchInput = document.getElementById('boardSearchInput');
  var emptyEl = document.getElementById('newsEmpty');
  var pager = document.getElementById('newsPagination');

  /* ---------- 유틸 ---------- */
  function isNew(dateStr) {
    var d = new Date(dateStr + 'T00:00:00');
    var diff = (Date.now() - d.getTime()) / 86400000;
    return diff <= 14;
  }
  function fmtViews(n) {
    return '조회 ' + n.toLocaleString('ko-KR');
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* ---------- 필터링 ---------- */
  function getFiltered() {
    var q = state.q.trim().toLowerCase();
    return POSTS.filter(function (p) {
      if (state.cat !== 'all' && p.cat !== state.cat) return false;
      if (q) {
        var hay = (p.title + ' ' + p.excerpt + ' ' + p.body.join(' ')).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
  }

  /* ---------- 렌더 ---------- */
  function render() {
    var list = getFiltered();
    var totalPages = Math.max(1, Math.ceil(list.length / PER_PAGE));
    if (state.page > totalPages) state.page = totalPages;

    var start = (state.page - 1) * PER_PAGE;
    var pageItems = list.slice(start, start + PER_PAGE);

    // 카드
    if (list.length === 0) {
      grid.innerHTML = '';
      emptyEl.hidden = false;
      pager.innerHTML = '';
      return;
    }
    emptyEl.hidden = true;

    grid.innerHTML = pageItems.map(function (p) {
      var c = CATS[p.cat];
      return '' +
        '<li class="news-card" role="button" tabindex="0" data-id="' + p.id + '">' +
          '<div class="news-card__thumb cat-' + p.cat + '"></div>' +
          '<div class="news-card__body">' +
            '<span class="news-card__cat cat-' + p.cat + '">' + c.label + '</span>' +
            '<h3 class="news-card__title">' + esc(p.title) + '</h3>' +
            '<p class="news-card__excerpt">' + esc(p.excerpt) + '</p>' +
            '<div class="news-card__meta">' +
              '<span>' + p.date + '</span>' +
              '<span>' + fmtViews(p.views) + '</span>' +
              (isNew(p.date) ? '<span class="is-new">NEW</span>' : '') +
            '</div>' +
          '</div>' +
        '</li>';
    }).join('');

    renderPager(totalPages);
  }

  function renderPager(totalPages) {
    var html = '';
    html += '<button type="button" data-page="prev"' + (state.page === 1 ? ' disabled' : '') + '>←</button>';
    for (var i = 1; i <= totalPages; i++) {
      html += '<button type="button" data-page="' + i + '"' + (i === state.page ? ' class="is-active"' : '') + '>' + i + '</button>';
    }
    html += '<button type="button" data-page="next"' + (state.page === totalPages ? ' disabled' : '') + '>→</button>';
    pager.innerHTML = html;
  }

  /* ---------- 모달 ---------- */
  var modal = document.getElementById('newsModal');
  var mCat = document.getElementById('newsModalCat');
  var mTitle = document.getElementById('newsModalTitle');
  var mDate = document.getElementById('newsModalDate');
  var mViews = document.getElementById('newsModalViews');
  var mThumb = document.getElementById('newsModalThumb');
  var mBody = document.getElementById('newsModalBody');

  function openModal(id) {
    var p = POSTS.find(function (x) { return x.id === id; });
    if (!p) return;
    var c = CATS[p.cat];
    mCat.textContent = c.label;
    mCat.className = 'news-card__cat cat-' + p.cat;
    mTitle.textContent = p.title;
    mDate.textContent = p.date;
    mViews.textContent = fmtViews(p.views);
    mThumb.textContent = '';
    mThumb.className = 'news-modal__thumb cat-' + p.cat;
    mBody.innerHTML = p.body.map(function (para) { return '<p>' + esc(para) + '</p>'; }).join('');
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  /* ---------- 이벤트 ---------- */
  tabs.addEventListener('click', function (e) {
    var btn = e.target.closest('.board__tab');
    if (!btn) return;
    tabs.querySelectorAll('.board__tab').forEach(function (b) { b.classList.remove('is-active'); });
    btn.classList.add('is-active');
    state.cat = btn.dataset.cat;
    state.page = 1;
    render();
  });

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      state.q = searchInput.value;
      state.page = 1;
      render();
    });
  }

  pager.addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-page]');
    if (!btn || btn.disabled) return;
    var v = btn.dataset.page;
    var totalPages = Math.max(1, Math.ceil(getFiltered().length / PER_PAGE));
    if (v === 'prev') state.page = Math.max(1, state.page - 1);
    else if (v === 'next') state.page = Math.min(totalPages, state.page + 1);
    else state.page = parseInt(v, 10);
    render();
    document.getElementById('newsBoard').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  grid.addEventListener('click', function (e) {
    var card = e.target.closest('.news-card');
    if (card) openModal(parseInt(card.dataset.id, 10));
  });
  grid.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var card = e.target.closest('.news-card');
    if (card) { e.preventDefault(); openModal(parseInt(card.dataset.id, 10)); }
  });

  document.getElementById('newsModalClose').addEventListener('click', closeModal);
  document.getElementById('newsModalDim').addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  /* ---------- 초기 렌더 ---------- */
  render();
})();
