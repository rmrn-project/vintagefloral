document.addEventListener('DOMContentLoaded', () => {
    const guest = new URLSearchParams(location.search).get('to');
    if (guest) document.getElementById('guestName').textContent = decodeURIComponent(guest);

    document.getElementById('openEnvelope').addEventListener('click', () => {
        document.getElementById('envelope').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        document.body.style.background = '#fdf6f0 url("https://i.ibb.co/4p7YQ7K/vintage-paper.jpg") repeat';
        startCountdown();
        playMusic();
    });

    // Countdown & musik sama persis seperti versi rustic sebelumnya
    // (tinggal copy dari script.js rustic, ganti tanggal kalau perlu)

    // Form submit alert
    document.getElementById('rsvpForm').onsubmit = e => { e.preventDefault(); alert('Terima kasih konfirmasinya! 💌'); e.target.reset(); };
    document.getElementById('wishForm').onsubmit = e => { e.preventDefault(); alert('Ucapanmu sudah kami terima dengan penuh cinta 🥰'); e.target.reset(); };
});
