/* ═══════════════════════════════════════
   story.js — JS for story reading pages
   Requires site.js loaded first
   ═══════════════════════════════════════ */

// ─── Theme Toggle ───
(function() {
  var toggle = document.getElementById('themeToggle');
  var html = document.documentElement;
  if (!toggle) return;

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    toggle.textContent = theme === 'dark' ? 'Light' : 'Dark';
  }

  var currentTheme = getSystemTheme();
  applyTheme(currentTheme);
  var manualOverride = false;

  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function(e) {
    if (!manualOverride) {
      currentTheme = e.matches ? 'light' : 'dark';
      applyTheme(currentTheme);
    }
  });

  toggle.addEventListener('click', function() {
    manualOverride = true;
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
  });
})();

// ─── Font Size Slider ───
(function() {
  var slider = document.getElementById('fontSlider');
  if (!slider) return;
  slider.addEventListener('input', function(e) {
    document.documentElement.style.fontSize = e.target.value + 'px';
  });
})();

// ─── Audio Player ───
(function() {
  var audioPlayer = document.getElementById('audioPlayer');
  var listenBtn = document.getElementById('listenBtn');
  var playPause = document.getElementById('playPause');
  var skipBack = document.getElementById('skipBack');
  var skipFwd = document.getElementById('skipFwd');
  var progressBar = document.getElementById('progressBar');
  var progressFill = document.getElementById('progressFill');
  var currentTimeEl = document.getElementById('currentTime');
  var totalTimeEl = document.getElementById('totalTime');
  var speedBtn = document.getElementById('speedBtn');
  var playerClose = document.getElementById('playerClose');

  if (!audioPlayer || !listenBtn) return;

  // Get audio source from data attribute on the listen button
  var audioSrc = listenBtn.getAttribute('data-audio') || '';
  if (!audioSrc) return;

  var audio = new Audio(audioSrc);
  var isPlaying = false;
  var speeds = [0.75, 1, 1.25, 1.5, 2];
  var speedIndex = 1;

  function formatTime(s) {
    if (isNaN(s)) return '0:00';
    var m = Math.floor(s / 60);
    var sec = Math.floor(s % 60);
    return m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  listenBtn.addEventListener('click', function() {
    audioPlayer.classList.add('visible');
    document.body.classList.add('body-audio-active');
    audio.play();
    isPlaying = true;
    playPause.innerHTML = '&#10074;&#10074;';
  });

  playPause.addEventListener('click', function() {
    if (isPlaying) {
      audio.pause();
      playPause.innerHTML = '&#9654;';
    } else {
      audio.play();
      playPause.innerHTML = '&#10074;&#10074;';
    }
    isPlaying = !isPlaying;
  });

  skipBack.addEventListener('click', function() {
    audio.currentTime = Math.max(0, audio.currentTime - 15);
  });

  skipFwd.addEventListener('click', function() {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 15);
  });

  speedBtn.addEventListener('click', function() {
    speedIndex = (speedIndex + 1) % speeds.length;
    audio.playbackRate = speeds[speedIndex];
    speedBtn.textContent = speeds[speedIndex] + '\u00d7';
  });

  audio.addEventListener('loadedmetadata', function() {
    totalTimeEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('timeupdate', function() {
    var pct = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = pct + '%';
    currentTimeEl.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener('ended', function() {
    isPlaying = false;
    playPause.innerHTML = '&#9654;';
    progressFill.style.width = '0%';
  });

  progressBar.addEventListener('click', function(e) {
    var rect = progressBar.getBoundingClientRect();
    var pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
  });

  playerClose.addEventListener('click', function() {
    audio.pause();
    isPlaying = false;
    playPause.innerHTML = '&#9654;';
    audioPlayer.classList.remove('visible');
    document.body.classList.remove('body-audio-active');
  });
})();
