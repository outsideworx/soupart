const image = document.getElementById('main-image');
const originalSrc = 'img/background.webp';
let resetTimer = null;

image.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * 10);
    image.src = `img/spray/${randomIndex}.webp`;

    if (resetTimer) {
        clearTimeout(resetTimer);
    }

    resetTimer = setTimeout(() => {
        image.src = originalSrc;
        resetTimer = null;
    }, 5000);
});