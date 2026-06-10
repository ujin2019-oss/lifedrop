/* ==========================================================
  공통 푸터 (include/footer.js)
  - file:// 로 열어도 동작하는 JS 방식 include
  - js/include.js 가 #footer 영역에 삽입합니다.
  ※ HTML은 백틱(`) 안에 그대로 작성하면 됩니다.
========================================================== */
window.FOOTER_HTML = `
<div class="footer-cs">
  <div class="footer-cs__inner">
    <div class="footer-cs__item">
      <span class="footer-cs__label">고객센터</span>
      <strong class="footer-cs__value">1660-3705</strong>
    </div>
    <div class="footer-cs__item">
      <span class="footer-cs__label">운영시간</span>
      <strong class="footer-cs__value">연중무휴 09:00 ~ 18:00</strong>
    </div>
  </div>
</div>

<footer class="footer">
  <div class="footer__inner">
    <div class="footer__brand">
      <a href="/index.html" class="footer__logo">
        <img class="logo-img logo-img--footer" src="/images/main/foot_logo.png" alt="LIFE DROP 혈액나눔센터">
      </a>
      <p class="footer__slogan">대한민국 헌혈 인식 개선,<br>참여 유도를 위한 공공 캠페인</p>
    </div>

    <div class="footer__links">
      <div class="footer__col">
        <strong class="footer__col-title">바로가기</strong>
        <ul>
          <li><a href="/index.html#why">왜 헌혈인가?</a></li>
          <li><a href="/index.html#guide">헌혈 가이드</a></li>
          <li><a href="/index.html#story">나눔 Story</a></li>
          <li><a href="/pages/news.html">캠페인 소식</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <strong class="footer__col-title">캠페인 참여</strong>
        <ul>
          <li><a href="/pages/campaign.html">헌혈 예약하기</a></li>
          <li><a href="/pages/campaign.html#center">헌혈 센터 찾기</a></li>
          <li><a href="/index.html#sns">SNS 참여</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <strong class="footer__col-title">고객센터</strong>
        <ul>
          <li><a href="tel:16603705">1660-3705</a></li>
          <li>연중무휴 09:00 ~ 18:00</li>
          <li><a href="mailto:help@blooddcampaign.kr">help@blooddcampaign.kr</a></li>
        </ul>
      </div>
    </div>
  </div>

  <div class="footer__bottom">
    <div class="footer__bottom-inner">
      <p>서울특별시 중구 글로벌로 120 1동 (생명나눔타워)</p>
      <p class="footer__copy">&copy; LIFE DROP. All rights reserved.</p>
    </div>
  </div>
</footer>
`;
