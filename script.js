document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Background Hearts Animation ---
    const heartsContainer = document.getElementById('hearts-container');
    const heartSymbols = ['❤', '💖', '💕', '💗', '🌹'];

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');

        // Randomize heart appearance
        heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

        // Randomize position and size
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';

        // Randomize animation duration
        const duration = Math.random() * 5 + 5; // 5-10s
        heart.style.animationDuration = duration + 's';

        heartsContainer.appendChild(heart);

        // Remove after animation finishes
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    // Create a heart every 300ms
    setInterval(createHeart, 300);


    // --- 2. Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you want it to happen only once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.right-reveal, .left-reveal, .reveal-up');
    animatedElements.forEach(el => observer.observe(el));

    // --- 3. Letter Modal Logic ---
    const modal = document.getElementById('letter-modal');
    const openBtn = document.getElementById('open-letter-btn');
    const closeBtn = document.querySelector('.close-btn');

    openBtn.addEventListener('click', () => {
        modal.classList.add('show');
        // Trigger envelope animation after a brief delay
        setTimeout(() => {
            modal.classList.add('open-letter');
        }, 100);
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('open-letter');
        setTimeout(() => {
            modal.classList.remove('show');
        }, 500); // Wait for transition
    });

    // Close on click outside (optional)
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.classList.remove('open-letter');
            setTimeout(() => {
                modal.classList.remove('show');
            }, 500);
        }
    });

});
