const img = document.getElementById('main-image');
const container = document.querySelector('.image-container');
const defaultSrc = 'img/background_0.webp';
const activeSrc = 'img/background_1.webp';
let sprayImg = null;

function showSpray() {
    const randomNum = Math.floor(Math.random() * 20) + 1;
    sprayImg = document.createElement('img');
    sprayImg.src = `../img/spray/${randomNum}.webp`;
    sprayImg.alt = 'spray effect';
    sprayImg.style.position = 'absolute';
    sprayImg.style.pointerEvents = 'none';
    sprayImg.style.zIndex = '2';
    sprayImg.style.userSelect = 'none';

    container.appendChild(sprayImg);

    const rect = img.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const topOffset = rect.top - containerRect.top + rect.height * 0.16;
    const leftOffset = rect.left - containerRect.left + rect.width * 0.07;

    sprayImg.style.top = `${topOffset}px`;
    sprayImg.style.left = `${leftOffset}px`;
    sprayImg.style.width = `${rect.width * 0.5}px`;
    sprayImg.style.height = 'auto';
}

function resetImage() {
    img.src = defaultSrc;
    if (sprayImg) {
        sprayImg.remove();
        sprayImg = null;
    }
}

// Mouse controls
document.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    const clickX = e.clientX;
    const screenWidth = window.innerWidth;

    if (clickX < screenWidth / 3.56) {
        img.src = activeSrc;
        showSpray();
    }
});

document.addEventListener('pointerup', resetImage);
document.addEventListener('pointerleave', resetImage);
document.addEventListener('pointercancel', resetImage);
document.addEventListener('contextmenu', (e) => e.preventDefault());
