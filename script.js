function createParticles() {
  const container = document.getElementById('particles');
  const count = 30;

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

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.timeline-item').forEach(item => {
  observer.observe(item);
});

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

window.addEventListener('scroll', () => {
  const hint = document.querySelector('.scroll-hint');
  if (hint) {
    hint.style.opacity = window.scrollY > 50 ? '0' : '1';
  }
});