// app.js – MSL helper enhancements (runs after Firebase module)

// Keyboard: Enter navigates between time inputs quickly
document.addEventListener('DOMContentLoaded', () => {
  const leftInput  = document.getElementById('r-left');
  const rightInput = document.getElementById('r-right');
  const saveBtn    = document.querySelector('[onclick="saveResult()"]');

  if (leftInput && rightInput) {
    leftInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); rightInput.focus(); rightInput.select(); }
    });
    rightInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); if (saveBtn) saveBtn.click(); }
    });
  }

  // Auto-insert comma for decimal in time fields
  function timeInputHandler(input) {
    input.addEventListener('input', () => {
      let v = input.value.replace(/[^0-9,]/g, '');
      input.value = v;
    });
  }
  if (leftInput)  timeInputHandler(leftInput);
  if (rightInput) timeInputHandler(rightInput);

  // Set today's date as default for event date
  const dateInput = document.getElementById('event-date-input');
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().slice(0, 10);
  }

  // Category tabs scrolling with mouse wheel on desktop
  document.querySelectorAll('.category-tabs').forEach(el => {
    el.addEventListener('wheel', e => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  });
});
