const image = document.getElementById('main-image');
const originalSrc = 'img/background.webp';

function showRandomImage() {
    const randomIndex = Math.floor(Math.random() * 10);
    image.src = `img/spray/${randomIndex}.webp`;
}

function resetImage() {
    image.src = originalSrc;
}

// Mouse support
image.addEventListener('mousedown', showRandomImage);
image.addEventListener('mouseup', resetImage);
image.addEventListener('mouseleave', resetImage);

// Touch support
image.addEventListener('touchstart', (e) => {
    e.preventDefault();
    showRandomImage();
}, { passive: false });

image.addEventListener('touchend', resetImage);
image.addEventListener('touchcancel', resetImage);
