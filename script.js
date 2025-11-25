// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Countdown Timer
    const countdownDate = new Date('January 1, 2026 10:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days;
        document.getElementById('hours').innerText = hours;
        document.getElementById('minutes').innerText = minutes;
        document.getElementById('seconds').innerText = seconds;

        if (distance < 0) {
            document.getElementById('countdown').innerHTML = '<h3>Hari Bahagia Telah Tiba!</h3>';
        }
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // RSVP Form Submission
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpMessage = document.getElementById('rsvp-message');

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Di sini bisa tambahkan logika untuk kirim data ke server, tapi untuk sekarang simulasi saja
        rsvpMessage.style.display = 'block';
        rsvpForm.reset();
    });

    // Background Music (Opsional, autoplay mungkin diblok browser)
    const music = document.getElementById('background-music');
    music.play().catch(() => {
        // Jika autoplay diblok, bisa tambah button untuk play
        console.log('Autoplay diblok, tambahkan button jika perlu.');
    });
});