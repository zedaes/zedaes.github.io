document.addEventListener('DOMContentLoaded', () => {
    // Interactive bubble logic
    const interBubble = document.querySelector('.interactive');
    let curX = 0, curY = 0, tgX = 0, tgY = 0;

    function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(move);
    }

    window.addEventListener('mousemove', (e) => {
        tgX = e.clientX;
        tgY = e.clientY;
    });

    move();

    // Music logic (starts on page load)
    const music = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');

    // Ensure autoplay works in browsers that block it without interaction
    const tryPlay = () => {
        const playPromise = music.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay failed - wait for user gesture
                musicToggle.addEventListener('click', () => music.play(), { once: true });
            });
        }
    };

    // Add event listener for the fade-text to start music after animation ends
    const fadeText = document.querySelector('.fade-text');
    fadeText.addEventListener('animationend', () => {
        tryPlay(); // Start playing music after fade-out
    });

    musicToggle.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            musicIcon.setAttribute('name', 'volume-high-outline');
        } else {
            music.pause();
            musicIcon.setAttribute('name', 'volume-mute-outline');
        }
    });

    musicIcon.setAttribute('name', music.paused ? 'volume-mute-outline' : 'volume-high-outline');
});
