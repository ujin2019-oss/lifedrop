/* ==========================================================
  main.js — LIFE DROP
  [1] 헤더 (스크롤 시 스타일 변경 / 아래로 스크롤 시 숨김)
  [2] 햄버거 전체 메뉴 모달 (열기/닫기 X/딤/ESC)
  [3] 히어로 Swiper (autoplay 프로그레스바 + fraction)
  [4] GSAP ScrollTrigger 인터랙션
      - data-reveal       : 개별 fade-up
      - data-reveal-group : 자식 stagger fade-up
      - .counter          : 숫자 카운트업
      - [data-gauge]      : 게이지 채우기
      - .story__bg        : 패럴랙스
========================================================== */
(function () {
  'use strict';

  document.body.classList.remove('is-loading');

  /* ---------- 혈액 보유 현황 (js/blood-data.js 수치로 렌더) ---------- */
  function renderBloodStock() {
    var list = document.getElementById('bloodStockList');
    var data = window.BLOOD_STOCK;
    if (!list || !data || !data.items) return;

    var MAX = data.maxDays || 7;
    var WARN = data.warnUnder || 5;
    var VB_H = 125;          // SVG viewBox 높이
    var DROP_TOP = 6;        // 물방울 윗 꼭짓점 y
    var DROP_BOTTOM = 122;   // 물방울 아래 y
    var PATH = 'M50 6 C50 6 12 58 12 84 a38 38 0 0 0 76 0 C88 58 50 6 50 6 Z';

    // 범례 자동 갱신
    var legend = document.getElementById('bloodStockLegend');
    if (legend) legend.textContent = '[' + WARN + '일 미만] 관심 단계';

    // 물결 모양 수면 path (x -100~150, 진폭 6 / CSS로 좌우 흐름 애니메이션)
    var WAVE =
      'M-100 6 Q-87.5 0 -75 6 T-50 6 T-25 6 T0 6 T25 6 T50 6 T75 6 T100 6 T125 6 T150 6 ' +
      'V160 H-100 Z';

    var html = '';
    data.items.forEach(function (it, i) {
      var ratio = Math.max(0, Math.min(1, it.days / MAX));
      var fillH = (DROP_BOTTOM - DROP_TOP) * ratio;
      var fillY = DROP_BOTTOM - fillH - 6; // 물결 진폭만큼 보정
      var warn = it.days < WARN;
      html +=
        '<li class="blood-stock__item' + (warn ? ' is-warn' : '') + '">' +
          '<div class="blood-stock__drop">' +
            '<svg viewBox="0 0 100 ' + VB_H + '" aria-label="' + it.type + '형 ' + it.days + '일분">' +
              '<defs><clipPath id="bsClip' + it.type + '"><path d="' + PATH + '"/></clipPath></defs>' +
              '<path class="drop-bg" d="' + PATH + '"/>' +
              '<g clip-path="url(#bsClip' + it.type + ')">' +
                '<g class="drop-fill-pos" transform="translate(0 ' + fillY.toFixed(1) + ')">' +
                  '<path class="drop-fill drop-wave" d="' + WAVE + '" style="animation-delay:-' + (i * 0.9).toFixed(1) + 's"/>' +
                '</g>' +
              '</g>' +
              '<text class="drop-label" x="50" y="95">' + it.type + '</text>' +
            '</svg>' +
          '</div>' +
          '<strong class="blood-stock__days">' + it.days.toFixed(1) + '일</strong>' +
        '</li>';
    });
    list.innerHTML = html;

    // 차오르는 모션 (gsap 있으면)
    if (typeof gsap !== 'undefined') {
      list.querySelectorAll('.drop-fill-pos').forEach(function (g, i) {
        gsap.from(g, {
          y: DROP_BOTTOM,
          duration: 1.6,
          delay: 0.6 + i * 0.15,
          ease: 'power2.out'
        });
      });
    }
  }

  /* ---------- [3] 히어로 Swiper ---------- */
  function initHeroSwiper() {
    var el = document.getElementById('heroSwiper');
    if (!el || typeof Swiper === 'undefined') return;

    var progressFill = document.getElementById('heroProgress');
    var currentEl = document.getElementById('heroCurrent');
    var totalEl = document.getElementById('heroTotal');
    var pad = function (n) { return String(n).padStart(2, '0'); };

    // 슬라이드별 배경 크로스페이드
    var bgs = document.querySelectorAll('.hero__bg');
    function setBg(i) {
      bgs.forEach(function (b, idx) { b.classList.toggle('is-active', idx === i); });
    }
    setBg(0);

    new Swiper(el, {
      loop: true,
      speed: 800,
      autoplay: { delay: 5000, disableOnInteraction: false },
      navigation: false,
      on: {
        init: function (sw) {
          var real = el.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)').length;
          if (totalEl) totalEl.textContent = pad(real);
        },
        slideChange: function (sw) {
          if (currentEl) currentEl.textContent = pad(sw.realIndex + 1);
          setBg(sw.realIndex);
        },
        autoplayTimeLeft: function (sw, time, progress) {
          // progress: 1 → 0 으로 감소
          if (progressFill) progressFill.style.transform = 'scaleX(' + (1 - progress) + ')';
        }
      }
    });

    var sw = el.swiper;
    var prev = document.getElementById('heroPrev');
    var next = document.getElementById('heroNext');
    if (prev) prev.addEventListener('click', function () { sw.slidePrev(); });
    if (next) next.addEventListener('click', function () { sw.slideNext(); });
  }

  /* ---------- [1][2] 헤더 / 햄버거 모달 (include 로드 후) ---------- */
  function initHeader() {
    var header = document.getElementById('siteHeader');
    if (!header) return;

    var lastY = 0;
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 10);
      // 아래로 스크롤 → 숨김 / 위로 → 표시
      if (y > 300 && y > lastY) header.classList.add('is-hidden');
      else header.classList.remove('is-hidden');
      lastY = y;
    }, { passive: true });

    /* 햄버거 전체 메뉴 모달 */
    var burger = document.getElementById('hamburger');
    var modal = document.getElementById('menuModal');
    var modalDim = document.getElementById('menuModalDim');
    var modalClose = document.getElementById('menuModalClose');

    function toggleMenu(force) {
      if (!modal) return;
      var open = typeof force === 'boolean' ? force : !modal.classList.contains('is-open');
      modal.classList.toggle('is-open', open);
      modal.setAttribute('aria-hidden', !open);
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }
    if (burger && modal) {
      burger.addEventListener('click', function () { toggleMenu(); });
      if (modalDim) modalDim.addEventListener('click', function () { toggleMenu(false); });
      if (modalClose) modalClose.addEventListener('click', function () { toggleMenu(false); });
      // 메뉴 클릭 시 닫기
      modal.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { toggleMenu(false); });
      });
      // ESC 키로 닫기
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') toggleMenu(false);
      });
    }
  }

  /* ---------- [4] GSAP 인터랙션 ---------- */
  function initGsap() {
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // 개별 reveal (fade-up)
    gsap.utils.toArray('[data-reveal]').forEach(function (el) {
      el.style.visibility = 'visible';
      gsap.from(el, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true }
      });
    });

    // 그룹 stagger reveal
    gsap.utils.toArray('[data-reveal-group]').forEach(function (group) {
      group.style.visibility = 'visible';
      gsap.from(group.children, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: group, start: 'top 85%', once: true }
      });
    });

    // 숫자 카운트업
    gsap.utils.toArray('.counter').forEach(function (el) {
      var target = parseFloat(el.dataset.count);
      var decimal = parseInt(el.dataset.decimal || '0', 10);
      var obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onUpdate: function () { el.textContent = obj.val.toFixed(decimal); }
      });
    });

    // 게이지 채우기
    gsap.utils.toArray('[data-gauge]').forEach(function (el) {
      gsap.to(el, {
        width: el.dataset.gauge + '%',
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true }
      });
    });

    // 스토리 배경 패럴랙스
    var storyBg = document.querySelector('.story__bg');
    if (storyBg) {
      gsap.fromTo(storyBg,
        { yPercent: -8, scale: 1.12 },
        {
          yPercent: 8,
          scale: 1.12,
          ease: 'none',
          scrollTrigger: {
            trigger: '.story__banner',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    }

    // step 이미지 살짝 회전 + 떠오름
    gsap.utils.toArray('.step__visual img').forEach(function (el, i) {
      gsap.from(el, {
        rotate: i % 2 === 0 ? -4 : 4,
        scale: 0.92,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true }
      });
    });
  }

  /* ---------- 실행 순서 ---------- */
  // include(헤더/푸터) 로드 후 헤더 관련 초기화
  document.addEventListener('includesLoaded', function () {
    initHeader();
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
  });

  document.addEventListener('DOMContentLoaded', function () {
    renderBloodStock();
    initHeroSwiper();
    initGsap();
  });
})();
