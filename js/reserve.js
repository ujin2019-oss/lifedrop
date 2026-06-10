/* ==========================================================
  reserve.js — 헌혈 예약 (pages/campaign.html)
  ★ 수정 포인트
  - TIMES   : 예약 가능 시간 목록
  - CENTERS : 헌혈센터 목록 (name/addr/dist)
  ※ 프론트 데모 — 실제 예약 연동 시 submit 부분 교체
========================================================== */
(function () {
  'use strict';

  /* ---- 설정 (여기만 수정하면 됨) ---- */
  var TIMES = ['09:30', '10:00', '10:30', '11:00', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];
  var CENTERS = [
    { name: '헌혈의집 강남센터', addr: '서울 강남구 강남대로 398', dist: '2.1km' },
    { name: '헌혈의집 역삼센터', addr: '서울 강남구 테헤란로 123', dist: '2.8km' },
    { name: '헌혈의집 선릉센터', addr: '서울 강남구 선릉로 88',   dist: '3.4km' }
  ];
  var DOW = ['일', '월', '화', '수', '목', '금', '토'];

  /* ---- 상태 ---- */
  var state = { view: null, date: null, time: null, center: null };

  var calMonth = document.getElementById('calMonth');
  var calGrid = document.getElementById('calGrid');
  if (!calGrid) return; // 예약 페이지 아님

  var today = new Date();
  today.setHours(0, 0, 0, 0);
  state.view = new Date(today.getFullYear(), today.getMonth(), 1);

  /* ---- 달력 ---- */
  function renderCalendar() {
    var y = state.view.getFullYear();
    var m = state.view.getMonth();
    calMonth.textContent = y + '년 ' + (m + 1) + '월';

    var html = '';
    DOW.forEach(function (d, i) {
      html += '<span class="cal__dow' + (i === 0 ? ' is-sun' : '') + '">' + d + '</span>';
    });

    var first = new Date(y, m, 1).getDay();
    var last = new Date(y, m + 1, 0).getDate();
    for (var i = 0; i < first; i++) html += '<span></span>';
    for (var d = 1; d <= last; d++) {
      var cur = new Date(y, m, d);
      var past = cur < today;
      var sel = state.date && cur.getTime() === state.date.getTime();
      var isToday = cur.getTime() === today.getTime();
      html += '<button type="button" class="cal__day' +
        (sel ? ' is-selected' : '') + (isToday ? ' is-today' : '') +
        (cur.getDay() === 0 ? ' is-sun' : '') + '"' +
        (past ? ' disabled' : '') + ' data-day="' + d + '">' + d + '</button>';
    }
    calGrid.innerHTML = html;

    calGrid.querySelectorAll('.cal__day:not(:disabled)').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.date = new Date(y, m, parseInt(btn.dataset.day, 10));
        renderCalendar();
        updateSummary();
      });
    });
  }
  document.getElementById('calPrev').addEventListener('click', function () {
    state.view = new Date(state.view.getFullYear(), state.view.getMonth() - 1, 1);
    renderCalendar();
  });
  document.getElementById('calNext').addEventListener('click', function () {
    state.view = new Date(state.view.getFullYear(), state.view.getMonth() + 1, 1);
    renderCalendar();
  });

  /* ---- 시간 ---- */
  var timeList = document.getElementById('timeList');
  timeList.innerHTML = TIMES.map(function (t) {
    return '<button type="button" class="time-chip" data-time="' + t + '">' + t + '</button>';
  }).join('');
  timeList.querySelectorAll('.time-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      state.time = chip.dataset.time;
      timeList.querySelectorAll('.time-chip').forEach(function (c) { c.classList.remove('is-selected'); });
      chip.classList.add('is-selected');
      updateSummary();
    });
  });

  /* ---- 센터 ---- */
  var centerList = document.getElementById('centerList');
  centerList.innerHTML = CENTERS.map(function (c, i) {
    return '<button type="button" class="center-card" data-idx="' + i + '">' +
      '<span class="center-card__badge">오늘 가능</span>' +
      '<strong class="center-card__name">' + c.name + '</strong>' +
      '<span class="center-card__addr">' + c.addr + '</span>' +
      '<span class="center-card__dist">' + c.dist + '</span>' +
      '<span class="center-card__check">✓</span>' +
    '</button>';
  }).join('');
  centerList.querySelectorAll('.center-card').forEach(function (card) {
    card.addEventListener('click', function () {
      state.center = CENTERS[parseInt(card.dataset.idx, 10)];
      centerList.querySelectorAll('.center-card').forEach(function (c) { c.classList.remove('is-selected'); });
      card.classList.add('is-selected');
      updateSummary();
    });
  });

  /* ---- 예약 확인 ---- */
  var sumDate = document.getElementById('sumDate');
  var sumTime = document.getElementById('sumTime');
  var sumCenter = document.getElementById('sumCenter');
  var btn = document.getElementById('reserveBtn');

  function fmt(d) {
    return d.getFullYear() + '. ' + (d.getMonth() + 1) + '. ' + d.getDate() + ' (' + DOW[d.getDay()] + ')';
  }
  function updateSummary() {
    sumDate.textContent = state.date ? fmt(state.date) : '-';
    sumTime.textContent = state.time || '-';
    sumCenter.textContent = state.center ? state.center.name : '-';
    btn.disabled = !(state.date && state.time && state.center);
  }

  btn.addEventListener('click', function () {
    if (btn.disabled) return;
    btn.textContent = '예약 완료 ✓';
    btn.disabled = true;
    alert('예약이 완료되었습니다!\n\n' + fmt(state.date) + ' ' + state.time + '\n' + state.center.name);
  });

  renderCalendar();
})();
