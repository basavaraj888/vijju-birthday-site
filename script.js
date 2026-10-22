
const HER_NICKNAME = "My Favourite Person";
const albumPhotos = [
  {
    src: "assets/photo1.jpg",
    alt: "A playful selfie together",
    caption: "One of my favourite memories ♡"
  },
  {
    src: "assets/photo2.jpg",
    alt: "A happy photo together",
    caption: "Your smile, my favourite view ✨"
  }
];

const photoAlbum = document.getElementById("photoAlbum");

if (photoAlbum) {
  albumPhotos.forEach(photo => {
    const card = document.createElement("figure");
    const image = document.createElement("img");
    const caption = document.createElement("figcaption");

    card.className = "photo-card";
    image.src = photo.src;
    image.alt = photo.alt;
    image.loading = "lazy";
    caption.textContent = photo.caption;

    card.append(image, caption);
    photoAlbum.append(card);
  });
}

const memoryVideo = document.getElementById("memoryVideo");
const memorySoundButton = document.getElementById("memorySoundButton");
const memoryAudio = document.getElementById("memoryAudio");

if (memoryVideo && memorySoundButton && memoryAudio) {
  memorySoundButton.addEventListener("click", async () => {
    if (!memoryVideo.paused) {
      memoryVideo.pause();
      memoryAudio.pause();
      memorySoundButton.textContent = "Play video with soundtrack ♡";
      return;
    }

    memoryAudio.currentTime = memoryVideo.currentTime;

    try {
      await Promise.all([memoryVideo.play(), memoryAudio.play()]);
      memorySoundButton.textContent = "Pause video and soundtrack";
    } catch {
      memoryVideo.pause();
      memoryAudio.pause();
      memorySoundButton.textContent = "Use the soundtrack player below";
    }
  });

  memoryVideo.addEventListener("seeking", () => {
    memoryAudio.currentTime = memoryVideo.currentTime;
  });

  memoryVideo.addEventListener("timeupdate", () => {
    if (!memoryAudio.paused && Math.abs(memoryVideo.currentTime - memoryAudio.currentTime) > 0.3) {
      memoryAudio.currentTime = memoryVideo.currentTime;
    }
  });

  memoryVideo.addEventListener("pause", () => {
    if (!memoryAudio.paused) {
      memoryAudio.pause();
      memorySoundButton.textContent = "Play video with soundtrack ♡";
    }
  });

  memoryVideo.addEventListener("ended", () => {
    memoryAudio.pause();
    memorySoundButton.textContent = "Play video with soundtrack ♡";
  });
}

// Change this to her nickname.
const nameElement = document.getElementById("herName");

if (nameElement) {
  nameElement.textContent = HER_NICKNAME;
  document.title = `Happy Birthday, ${HER_NICKNAME} 💙`;
}

// Create a starry night sky.
const sky = document.getElementById("sky");

if (sky) {
  for (let i = 0; i < 100; i++) {
    const star = document.createElement("span");
    star.className = "star";
    star.textContent = Math.random() > 0.75 ? "✦" : "·";

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.fontSize = (8 + Math.random() * 12) + "px";
    star.style.animationDelay = Math.random() * 3 + "s";
    star.style.animationDuration = (1.5 + Math.random() * 3) + "s";

    sky.appendChild(star);
  }
}

// Secret romantic message.
const secretButton = document.getElementById("secretButton");
const secretMessage = document.getElementById("secretMessage");

if (secretButton && secretMessage) {
  secretButton.addEventListener("click", () => {
    secretMessage.hidden = false;
    secretButton.textContent = "Your little secret is open ♡";
    secretButton.disabled = true;
  });
}

// Optional music button.
// Music starts only when she presses the button.
const musicButton = document.getElementById("musicButton");
const music = document.getElementById("birthdayMusic");

if (musicButton && music) {
  musicButton.addEventListener("click", async () => {
    try {
      if (music.paused) {
        await music.play();
        musicButton.textContent = "♫ Pause our moment";
      } else {
        music.pause();
        musicButton.textContent = "♫ Play our moment";
      }
    } catch {
      musicButton.textContent =
        "Could not play assets/our-song.mp3.mp3";
    }
  });
}

// Birthday cake and candles.
const blowButton = document.getElementById("blowButton");
const cake = document.getElementById("cake");
const wishMessage = document.getElementById("wishMessage");

if (blowButton && cake && wishMessage) {
  blowButton.addEventListener("click", () => {
    cake.classList.add("blown");

    blowButton.disabled = true;
    blowButton.textContent = "Wish sent among the stars ✨";

    wishMessage.textContent =
      "Your wish is on its way. May this year bring you all the " +
      "happiness your heart can hold. 💛";

    launchConfetti();
  });
}

// Lightweight confetti animation using Canvas.
function launchConfetti() {
  const canvas = document.getElementById("confettiCanvas");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(rect.height * dpr));

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const width = rect.width;
  const height = rect.height;

  const colours = [
    "#D84B78",
    "#F2A7B8",
    "#FFE3A4",
    "#FFFFFF",
    "#A8DDF5"
  ];

  const particles = Array.from({ length: 130 }, () => ({
    x: Math.random() * width,
    y: -Math.random() * height * 0.5,
    size: 3 + Math.random() * 5,
    speed: 2 + Math.random() * 4,
    drift: (Math.random() - 0.5) * 2.5,
    rotation: Math.random() * Math.PI,
    spin: (Math.random() - 0.5) * 0.15,
    colour: colours[Math.floor(Math.random() * colours.length)]
  }));

  let frame = 0;
  const maxFrames = 180;

  function draw() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.drift;
      p.y += p.speed;
      p.rotation += p.spin;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.colour;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.6);
      ctx.restore();
    });

    frame++;

    if (frame < maxFrames) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, width, height);
    }
  }

  requestAnimationFrame(draw);
}
