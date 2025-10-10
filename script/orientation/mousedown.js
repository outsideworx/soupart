// script/orientation/mousedown.js

const img = document.getElementById('main-image');
const container = document.querySelector('.image-container');
const defaultSrc = 'img/background_0.webp';
const activeSrc = 'img/background_1.webp';
let sprayImg = null;

// Utility: show a random spray overlay, positioned relative to the image bounds
function showSpray() {
    const randomNum = Math.floor(Math.random() * 20) + 1; // 1–20
    sprayImg = document.createElement('img');
    sprayImg.src = `../img/spray/${randomNum}.webp`;
    sprayImg.alt = 'spray effect';
    sprayImg.style.position = 'absolute';
    sprayImg.style.pointerEvents = 'none';
    sprayImg.style.zIndex = '2';
    sprayImg.style.userSelect = 'none';

    // Append first to measure correctly
    container.appendChild(sprayImg);

    // Compute position relative to the actual image area
    const rect = img.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Calculate proportional offsets within the image bounds
    const topOffset = rect.top - containerRect.top + rect.height * 0.15; // 15% down from image top
    const leftOffset = rect.left - containerRect.left + rect.width * 0.05; // 5% right from image left

    // Apply proportional size and position in pixels
    sprayImg.style.top = `${topOffset}px`;
    sprayImg.style.left = `${leftOffset}px`;
    sprayImg.style.width = `${rect.width * 0.5}px`; // 50% of the image width
    sprayImg.style.height = 'auto';
}

// Utility: reset image and remove spray
function resetImage() {
    img.src = defaultSrc;
    if (sprayImg) {
        sprayImg.remove();
        sprayImg = null;
    }
}

// Mouse controls
document.addEventListener('mousedown', (e) => {
    // e.preventDefault();
    const clickX = e.clientX;
    const screenWidth = window.innerWidth;

    if (clickX < screenWidth / 4) {
        img.src = activeSrc;
        showSpray();
    }
});

document.addEventListener('mouseup', resetImage);
document.addEventListener('mouseleave', resetImage);

// Touch controls
document.addEventListener('touchstart', (e) => {
    // e.preventDefault();

    // Handle pinch gestures
    if (e.touches.length > 1) {
        resetImage();
        return;
    }

    const touchX = e.touches[0].clientX;
    const screenWidth = window.innerWidth;

    if (touchX < screenWidth / 4) {
        img.src = activeSrc;
        showSpray();
    }
}, { passive: false });

document.addEventListener('touchend', resetImage);
document.addEventListener('touchcancel', resetImage);
document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 1) resetImage();
}, { passive: true });

// Prevent context menu (right-click or long-press)
document.addEventListener('contextmenu', (e) => e.preventDefault());
