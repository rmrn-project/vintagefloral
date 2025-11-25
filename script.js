document.addEventListener("DOMContentLoaded", function() {
  const cover = document.getElementById("cover");
  const main = document.getElementById("main");
  const openBtn = document.getElementById("openBtn");
  const music = document.getElementById("bgMusic");
  const toggleBtn = document.getElementById("toggleMusic");

  // Buka undangan
  openBtn.addEventListener("click", () => {
    cover.classList.remove("active");
    cover.classList.add("hidden");
    main.classList.remove("hidden");
    setTimeout(() => { music.play(); toggleBtn.textContent = "Pause"; }, 1000);
  });

  // Music toggle
  toggleBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      toggleBtn.textContent = "Pause";
    } else {
      music.pause();
      toggleBtn.textContent = "Play";
    }
  });

  // Tampilkan nama tamu dari URL (opsional)
  const urlParams = new URLSearchParams(window.location.search);
  const nama = urlParams.get('to');
  if (nama) {
    document.querySelector('.guest-name').textContent = decodeURIComponent(nama);
  }
});