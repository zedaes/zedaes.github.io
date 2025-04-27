document.addEventListener('DOMContentLoaded', () => {
    const interBubble = document.querySelector('.interactive');
    let curX = 0, curY = 0, tgX = 0, tgY = 0;
    let isDragging = false;

    function animate() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', ({ clientX, clientY }) => {
        tgX = clientX;
        tgY = clientY;
    });

    window.addEventListener('touchstart', (e) => {
        isDragging = true;
        handleTouchMove(e);
    });

    window.addEventListener('touchmove', (e) => {
        if (isDragging) {
            handleTouchMove(e);
            e.preventDefault(); 
        }
    });

    window.addEventListener('touchend', () => {
        isDragging = false;
    });

    function handleTouchMove(e) {
        const touch = e.touches[0];
        tgX = touch.clientX;
        tgY = touch.clientY;
    }

    animate();

    const music = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');
    
    const handleAutoplay = () => {
        music.play().catch(() => {
            musicToggle.classList.add('requires-interaction');
        });
    };

    document.querySelector('.fade-text').addEventListener('animationend', handleAutoplay, { once: true });

    musicToggle.addEventListener('click', () => {
        music[music.paused ? 'play' : 'pause']();
        musicIcon.setAttribute('name', music.paused ? 'volume-mute-outline' : 'volume-high-outline');
    });

    document.querySelectorAll('.navbar-link[data-nav-link]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const newWindow = window.open(link.href, '_blank');
            
            try {
                if (window.opener) window.close();
            } catch (err) {
                console.log('Tab closing requires script-opened windows');
            }
        });
    });
});