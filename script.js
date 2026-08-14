// ============================================
// FLOATING PETALS
// ============================================
function createPetals() {
  const container = document.getElementById('petals');
  const emojis = ['🌸', '✿', '꩜', '🌷', '✦'];
  const isMobile = window.innerWidth < 600;
  const count = isMobile ? 10 : 20;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('petal');
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const left     = Math.random() * 100;
    const duration = Math.random() * 12 + 8;
    const delay    = Math.random() * 10;
    const size     = Math.random() * 0.6 + 0.7;

    p.style.cssText = `
      left: ${left}%;
      top: -60px;
      font-size: ${size}rem;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    container.appendChild(p);
  }
}

createPetals();

// ============================================
// MUSIC PLAYER — autoplay with fallback
// ============================================
const audio   = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const btnIcon = document.getElementById('btnIcon');
const disc    = document.getElementById('disc');

let isPlaying = false;

function setPlaying(state) {
  isPlaying = state;
  btnIcon.textContent = state ? '⏸' : '▶';
  state ? disc.classList.add('spinning') : disc.classList.remove('spinning');
}

function togglePlay() {
  if (isPlaying) {
    audio.pause();
    setPlaying(false);
  } else {
    audio.play()
      .then(() => setPlaying(true))
      .catch(err => {
        console.error('Audio play error:', err);
        setPlaying(false);
      });
  }
}

// Try autoplay — browsers may block it until user interacts
audio.play()
  .then(() => setPlaying(true))
  .catch(() => {
    // Blocked by browser — wait for first interaction
    setPlaying(false);
    const startOnInteract = () => {
      audio.play().then(() => setPlaying(true)).catch(() => {});
      document.removeEventListener('click', startOnInteract);
      document.removeEventListener('touchstart', startOnInteract);
    };
    document.addEventListener('click', startOnInteract);
    document.addEventListener('touchstart', startOnInteract, { passive: true });
  });

// ============================================
// SCROLL HINT FADE
// ============================================
window.addEventListener('scroll', () => {
  const hint = document.querySelector('.scroll-hint');
  if (hint) hint.style.opacity = window.scrollY > 60 ? '0' : '1';
}, { passive: true });

// ============================================
// FLIPBOOK SCROLL
// ============================================
function scrollFlipbook(direction) {
  const track = document.getElementById('flipbookTrack');
  if (!track) return;
  const card = track.querySelector('.flip-card');
  const cardWidth = (card ? card.offsetWidth : 270) + 20;
  track.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
}

// Touch swipe support
const track = document.getElementById('flipbookTrack');
if (track) {
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 30) scrollFlipbook(diff > 0 ? 1 : -1);
  }, { passive: true });
}