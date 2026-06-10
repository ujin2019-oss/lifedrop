/* ==========================================================
  include.js — 공통 헤더/푸터 삽입
  - include/header.js → window.HEADER_HTML → #header
  - include/footer.js → window.FOOTER_HTML → #footer
  - file:// 더블클릭 실행도 동작 (fetch 미사용)
  - 페이지 깊이(/pages/ 여부)에 따라 링크 경로 자동 보정
  - 완료 후 'includesLoaded' 이벤트 발생 (main.js에서 사용)
========================================================== */
(function () {
  // 현재 문서가 pages/ 하위면 상위 경로 prefix
  var BASE = location.pathname.indexOf('/pages/') !== -1 ? '../' : './';

  function fixPaths(root) {
    // href="/..." → 상대 경로로 보정
    root.querySelectorAll('a[href^="/"]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href.indexOf('//') === 0) return; // 외부 프로토콜 제외
      a.setAttribute('href', BASE + href.slice(1));
    });
    // img src="/..." → 상대 경로로 보정
    root.querySelectorAll('img[src^="/"]').forEach(function (img) {
      var src = img.getAttribute('src');
      if (src.indexOf('//') === 0) return;
      img.setAttribute('src', BASE + src.slice(1));
    });
    // img-box placeholder의 data-img 경로 표시 보정
    root.querySelectorAll('[data-img]').forEach(function (el) {
      var p = el.getAttribute('data-img');
      if (p && p.indexOf('http') !== 0 && p.indexOf('../') !== 0 && BASE === '../') {
        el.setAttribute('data-img', '../' + p);
      }
    });
  }

  function inject(id, html) {
    var target = document.getElementById(id);
    if (!target || !html) return;
    target.innerHTML = html;
    fixPaths(target);
  }

  function run() {
    inject('header', window.HEADER_HTML);
    inject('footer', window.FOOTER_HTML);

    // 현재 페이지 메뉴 active 처리 (body data-page와 일치하는 링크)
    var page = document.body.getAttribute('data-page');
    if (page) {
      document.querySelectorAll('a[data-page="' + page + '"]').forEach(function (a) {
        a.classList.add('is-active');
      });
    }
    document.dispatchEvent(new CustomEvent('includesLoaded'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
