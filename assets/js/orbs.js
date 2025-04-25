document.addEventListener('DOMContentLoaded', () => {
    // Interactive bubble logic
    const interBubble = document.querySelector('.interactive');
    let curX = 0, curY = 0, tgX = 0, tgY = 0;

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

    animate();

    // Music controls
    const music = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');
    
    // More reliable autoplay handling
    const handleAutoplay = () => {
        music.play().catch(() => {
            // Show UI indication that interaction is needed
            musicToggle.classList.add('requires-interaction');
        });
    };

    document.querySelector('.fade-text').addEventListener('animationend', handleAutoplay, { once: true });

    musicToggle.addEventListener('click', () => {
        music[music.paused ? 'play' : 'pause']();
        musicIcon.setAttribute('name', music.paused ? 'volume-mute-outline' : 'volume-high-outline');
    });

    // Initialize icon state
    // musicIcon.setAttribute('name', music.paused ? 'volume-mute-outline' : 'volume-high-outline');

    // Tab handling for navigation links (added feature)
    document.querySelectorAll('.navbar-link[data-nav-link]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const newWindow = window.open(link.href, '_blank');
            
            // Only attempt to close if we have permission
            try {
                if (window.opener) window.close();
            } catch (err) {
                console.log('Tab closing requires script-opened windows');
            }
        });
    });
});