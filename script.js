// ============================================
// PARTICLES — fewer on mobile for performance
// ============================================
function createParticles() {
  const container = document.getElementById('particles');
  const isMobile = window.innerWidth < 600;
  const count = isMobile ? 12 : 30;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');

    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 15;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      bottom: -10px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    container.appendChild(p);
  }
}

createParticles();

// ============================================
// SCROLL REVEAL — TIMELINE
// ============================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.timeline-item').forEach(item => {
  observer.observe(item);
});

// ============================================
// MUSIC PLAYER
// ============================================
const audio = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const disc = document.getElementById('disc');

let isPlaying = false;

function togglePlay() {
  if (!audio.src || audio.src === window.location.href) {
    playBtn.textContent = '♪';
    setTimeout(() => playBtn.textContent = '▶', 1500);
    return;
  }

  if (isPlaying) {
    audio.pause();
    playBtn.textContent = '▶';
    disc.classList.remove('spinning');
    isPlaying = false;
  } else {
    audio.play().then(() => {
      playBtn.textContent = '⏸';
      disc.classList.add('spinning');
      isPlaying = true;
    }).catch(() => {
      playBtn.textContent = '▶';
    });
  }
}

// ============================================
// SCROLL HINT FADE
// ============================================
window.addEventListener('scroll', () => {
  const hint = document.querySelector('.scroll-hint');
  if (hint) {
    hint.style.opacity = window.scrollY > 50 ? '0' : '1';
  }
}, { passive: true });

// ============================================
// FLIPBOOK SCROLL
// ============================================
function scrollFlipbook(direction) {
  const track = document.getElementById('flipbookTrack');
  if (!track) return;
  const cardWidth = track.querySelector('.flip-card')?.offsetWidth + 16 || 296;
  track.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
}

// ============================================
// TOUCH SWIPE for flipbook
// ============================================
const flipbookTrack = document.getElementById('flipbookTrack');
if (flipbookTrack) {
  let startX = 0;
  let isDragging = false;

  flipbookTrack.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  flipbookTrack.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 30) {
      scrollFlipbook(diff > 0 ? 1 : -1);
    }
    isDragging = false;
  }, { passive: true });
}