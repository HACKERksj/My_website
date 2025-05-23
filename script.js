// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const navbar = document.querySelector('.navbar');

menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuBtn.classList.toggle('fa-times');
});

// Close menu when clicking on a link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuBtn.classList.remove('fa-times');
    });
});

// Typing Animation
const typed = new Typed('.multiple-text', {
    strings: ['Programmer', 'Designer', 'Brawl Stars Player', 'Football Lover'],
    typeSpeed: 100,
    backSpeed: 60,
    backDelay: 1000,
    loop: true
});

// Scroll Reveal Animation
ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .skills-container, .contact-form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// Sticky Header
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('sticky', window.scrollY > 100);
});

// Form Submission
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    form.reset();
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
});

// [Keep all your existing code until the carousel section]

// Auto-Scrolling Carousel Functionality
function setupCarousels() {
  const carousels = document.querySelectorAll('.carousel');
  let scrollIntervals = [];
  
  // Initialize each carousel
  carousels.forEach((carousel, index) => {
      // Clone items for infinite loop
      const items = carousel.querySelectorAll('.carousel-item');
      items.forEach(item => {
          const clone = item.cloneNode(true);
          carousel.appendChild(clone);
      });
      
      // Set up auto-scroll
      const scrollInterval = setInterval(() => {
          if (carousel.parentElement.offsetParent !== null) { // Only if visible
              const scrollAmount = carousel.firstElementChild.offsetWidth + 24; // width + gap
              const maxScroll = carousel.scrollWidth - carousel.clientWidth;
              
              if (carousel.scrollLeft + scrollAmount >= maxScroll - 100) {
                  // Smooth reset to start for infinite loop
                  carousel.scrollTo({
                      left: 0,
                      behavior: 'instant'
                  });
                  setTimeout(() => {
                      carousel.scrollBy({
                          left: scrollAmount,
                          behavior: 'smooth'
                      });
                  }, 50);
              } else {
                  carousel.scrollBy({
                      left: scrollAmount,
                      behavior: 'smooth'
                  });
              }
          }
      }, 5000); // Scroll every 3 seconds
      
      scrollIntervals.push(scrollInterval);
      
      // Pause on hover
      const container = carousel.closest('.carousel-container');
      container.addEventListener('mouseenter', () => {
          clearInterval(scrollInterval);
      });
      container.addEventListener('mouseleave', () => {
          scrollIntervals[index] = setInterval(() => {
              if (carousel.parentElement.offsetParent !== null) {
                  const scrollAmount = carousel.firstElementChild.offsetWidth + 24;
                  const maxScroll = carousel.scrollWidth - carousel.clientWidth;
                  
                  if (carousel.scrollLeft + scrollAmount >= maxScroll - 10) {
                      carousel.scrollTo({
                          left: 0,
                          behavior: 'instant'
                      });
                      setTimeout(() => {
                          carousel.scrollBy({
                              left: scrollAmount,
                              behavior: 'smooth'
                          });
                      }, 50);
                  } else {
                      carousel.scrollBy({
                          left: scrollAmount,
                          behavior: 'smooth'
                      });
                  }
              }
          }, 3000);
      });
  });
}

// Initialize carousels when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  setupCarousels();
  // [Keep all your other initialization code]
});

// [Keep all your remaining code]

// Neon Cursor Effect
function initNeonCursor() {
    const cursor = document.querySelector('.custom-cursor');
    
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            
            for(let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const trail = document.createElement('div');
                    trail.className = 'cursor-trail';
                    trail.style.left = `${e.clientX}px`;
                    trail.style.top = `${e.clientY}px`;
                    document.body.appendChild(trail);
                    
                    setTimeout(() => {
                        trail.style.opacity = '0';
                        trail.style.transform = `translate(-50%, -50%) scale(2)`;
                        setTimeout(() => trail.remove(), 200);
                    }, 100);
                }, i * 100);
            }
        });

        document.querySelectorAll('a, button, .clickable').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.boxShadow = '0 0 15px #6471ff, 0 0 30px #6471ff, 0 0 45px #6471ff';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.boxShadow = '0 0 10px #6471ff, 0 0 20px #6471ff, 0 0 30px #6471ff';
            });
        });
    } else {
        cursor.style.display = 'none';
    }
}

// Skill Bars Animation
const skills = document.querySelectorAll('.skill-level');

const animateOnScroll = () => {
    skills.forEach(skill => {
        const skillPosition = skill.getBoundingClientRect().top;
        if (skillPosition < window.innerHeight - 100) {
            skill.style.animationPlayState = 'running';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll();
// Active Section Highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector(`header nav a[href*=${id}]`).classList.add('active');
            });
        }
    });
});

// Music Player
const audio = new Audio();
let currentTrack = 0;
let isPlaying = false;
const playlistItems = document.querySelectorAll('.playlist-item');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volumeSlider');
const currentTrackEl = document.getElementById('currentTrack');
const currentArtistEl = document.getElementById('currentArtist');
const currentAlbumArt = document.getElementById('currentAlbumArt');
const playerContainer = document.querySelector('.music-player-container');

// Load track
function loadTrack(index) {
    const track = playlistItems[index];
    audio.src = track.dataset.src;
    currentTrackEl.textContent = track.querySelector('.track-title').textContent;
    currentArtistEl.textContent = track.dataset.artist;
    currentAlbumArt.src = track.dataset.cover;
    
    playlistItems.forEach(item => item.classList.remove('active'));
    track.classList.add('active');
    
    if (isPlaying) {
        playerContainer.classList.add('playing');
        audio.play();
    }
}

// Play/pause track
function togglePlay() {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        playerContainer.classList.add('playing');
        isPlaying = true;
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        playerContainer.classList.remove('playing');
        isPlaying = false;
    }
}

// Update progress bar
function updateProgress() {
    const { currentTime, duration } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    
    currentTimeEl.textContent = formatTime(currentTime);
    if (duration) {
        durationEl.textContent = formatTime(duration);
    }
}

// Format time (mm:ss)
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Set progress when clicked
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Change volume
function setVolume() {
    audio.volume = this.value;
}

// Next track
function nextTrack() {
    currentTrack = (currentTrack + 1) % playlistItems.length;
    loadTrack(currentTrack);
    if (isPlaying) audio.play();
}

// Previous track
function prevTrack() {
    currentTrack = (currentTrack - 1 + playlistItems.length) % playlistItems.length;
    loadTrack(currentTrack);
    if (isPlaying) audio.play();
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextTrack);
volumeSlider.addEventListener('input', setVolume);
document.getElementById('progressContainer').addEventListener('click', setProgress);

// Click on playlist item
playlistItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentTrack = index;
        loadTrack(currentTrack);
        if (!isPlaying) togglePlay();
    });
});

// Try autoplay on page load
document.addEventListener('DOMContentLoaded', () => {
    initNeonCursor();
    
    // Initialize first track
    loadTrack(0);
    
    // Attempt autoplay (will fail in most browsers)
    const tryAutoplay = () => {
        audio.volume = 0.5;
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                showAutoplayBanner();
            });
        }
    };
    
    // Show banner if autoplay blocked
    const showAutoplayBanner = () => {
        const banner = document.createElement('div');
        banner.className = 'autoplay-banner';
        banner.innerHTML = `
            <span>Click to enable background music</span>
            <button id="enableMusic">Enable</button>
        `;
        document.body.appendChild(banner);
        
        document.getElementById('enableMusic').addEventListener('click', () => {
            audio.play();
            banner.remove();
        });
    };
    
    // Try autoplay after a small delay
    setTimeout(tryAutoplay, 1000);
});
