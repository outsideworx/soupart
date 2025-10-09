// script/orientation/mousedown.js

const img = document.getElementById('main-image');
const container = document.querySelector('.image-container');
const defaultSrc = 'img/background_0.webp';
const activeSrc = 'img/background_1.webp';
let sprayImg = null;

// Make sure the container establishes a positioning context
// (already true from your CSS, but this enforces consistency)
container.style.position = container.style.position || 'relative';

// Utility: show a random spray overlay, anchored to the container
function showSpray() {
    const randomNum = Math.floor(Math.random() * 20) + 1; // 1–20
    sprayImg = document.createElement('img');
    sprayImg.src = `../img/spray/${randomNum}.webp`;
    sprayImg.alt = 'spray effect';

    // Absolute positioning relative to .image-container
    sprayImg.style.position = 'absolute';
    sprayImg.style.top = '22%';    // 15% of container height
    sprayImg.style.left = '5%';    // 5% of container width
    sprayImg.style.width = '50%';  // 50% of container width
    sprayImg.style.height = 'auto';
    sprayImg.style.pointerEvents = 'none';
    sprayImg.style.zIndex = '2';
    sprayImg.style.userSelect = 'none';

    container.appendChild(sprayImg);
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
    e.preventDefault();
    const clickX = e.clientX;
    const screenWidth = window.innerWidth;

    // Only trigger when clicking leftmost 25% of the screen
    if (clickX < screenWidth / 4) {
        img.src = activeSrc;
        showSpray();
    }
});

document.addEventListener('mouseup', resetImage);
document.addEventListener('mouseleave', resetImage);

// Touch controls (for mobile)
document.addEventListener('touchstart', (e) => {
    e.preventDefault();

    // If multiple touches (pinch), reset immediately
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

// Detect multi-touch gestures in progress (pinch)
document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 1) {
        resetImage();
    }
}, { passive: true });

// Prevent context menus (right-click / long-press)
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});
