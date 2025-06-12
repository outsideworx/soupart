const image = document.getElementById('main-image');
const originalSrc = 'img/background.webp';

image.addEventListener('mousedown', () => {
    const randomIndex = Math.floor(Math.random() * 10);
    image.src = `img/spray/${randomIndex}.webp`;
});

image.addEventListener('mouseup', () => {
    image.src = originalSrc;
});

image.addEventListener('mouseleave', () => {
    if (image.src !== originalSrc) {
        image.src = originalSrc;
    }
});