function createParticles() {
  const container = document.getElementById("particles");

  // Stop safely if the container doesn't exist
  if (!container) return;

  const count = 30;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 15;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.bottom = `-10px`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;

    container.appendChild(particle);
  }
}


// ============================================
// MUSIC PLAYER
// ============================================

const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const disc = document.getElementById("disc");

let isPlaying = false;

function hasAudioSource() {
  if (!audio) return false;

  // Check whether an actual <source> exists
  const source = audio.querySelector("source");

  return source && source.getAttribute("src")?.trim() !== "";
}

async function togglePlay() {
  if (!audio || !playBtn || !disc) return;

  // No audio file
  if (!hasAudioSource()) {
    playBtn.textContent = "♪";

    setTimeout(() => {
      if (!isPlaying) {
        playBtn.textContent = "▶";
      }
    }, 1500);

    return;
  }

  try {
    if (isPlaying) {
      audio.pause();

      playBtn.textContent = "▶";
      disc.classList.remove("spinning");

      isPlaying = false;
    } else {
      await audio.play();

      playBtn.textContent = "⏸";
      disc.classList.add("spinning");

      isPlaying = true;
    }
  } catch (error) {
    console.error("Unable to play audio:", error);

    playBtn.textContent = "▶";
    disc.classList.remove("spinning");

    isPlaying = false;
  }
}


// ============================================
// AUDIO EVENTS
// ============================================

if (audio) {
  audio.addEventListener("ended", () => {
    isPlaying = false;

    if (playBtn) {
      playBtn.textContent = "▶";
    }

    if (disc) {
      disc.classList.remove("spinning");
    }
  });

  audio.addEventListener("pause", () => {
    isPlaying = false;

    if (playBtn) {
      playBtn.textContent = "▶";
    }

    if (disc) {
      disc.classList.remove("spinning");
    }
  });

  audio.addEventListener("play", () => {
    isPlaying = true;

    if (playBtn) {
      playBtn.textContent = "⏸";
    }

    if (disc) {
      disc.classList.add("spinning");
    }
  });

  audio.addEventListener("error", () => {
    console.error("Audio file could not be loaded.");

    isPlaying = false;

    if (playBtn) {
      playBtn.textContent = "▶";
    }

    if (disc) {
      disc.classList.remove("spinning");
    }
  });
}


// ============================================
// SCROLL HINT
// ============================================

function updateScrollHint() {
  const hint = document.querySelector(".scroll-hint");

  if (!hint) return;

  hint.style.opacity = window.scrollY > 50 ? "0" : "1";
}

window.addEventListener("scroll", updateScrollHint);


// ============================================
// INITIALIZE
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  createParticles();
  updateScrollHint();
});