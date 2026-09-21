const sushiSection = document.querySelector('#sushi');
const sushiImage = document.querySelector('.sushi-image');

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function updateSushiAnimation() {
    if (!sushiSection || !sushiImage) return;

    const rect = sushiSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const start = windowHeight * 0.85;
    const end = 0;
    const rawProgress = (start - rect.top) / (start - end);
    const progress = clamp(rawProgress, 0, 1);

    const x = -180 + progress * 160;
    const opacity = 0.2 + progress * 0.8;

    sushiImage.style.transform = `translateX(${x}px)`;
    sushiImage.style.opacity = opacity.toFixed(2);
}

window.addEventListener('scroll', updateSushiAnimation, { passive: true });
window.addEventListener('load', updateSushiAnimation);
window.addEventListener('resize', updateSushiAnimation);