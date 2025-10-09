// script/orientation/mousedown.js

const img = document.getElementById('main-image');
const defaultSrc = 'img/background_0.webp';
const activeSrc = 'img/background_1.webp';
let sprayImg = null;

// Utility: show a random spray overlay
function showSpray() {
    const randomNum = Math.floor(Math.random() * 20) + 1; // 1–20
    sprayImg = document.createElement('img');
    sprayImg.src = `../img/spray/${randomNum}.webp`;
    sprayImg.alt = 'spray effect';

    sprayImg.style.position = 'absolute';
    sprayImg.style.top = '15vh';   // 15% of viewport height
    sprayImg.style.left = '5vw';   // 5% of viewport width
    sprayImg.style.width = '50vw'; // 50% of viewport width
    sprayImg.style.height = 'auto'; // Maintain aspect ratio
    sprayImg.style.pointerEvents = 'none';
    sprayImg.style.zIndex = '10';
    sprayImg.style.userSelect = 'none';

    document.body.appendChild(sprayImg);
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

    if (clickX < screenWidth / 4) {
        img.src = activeSrc;
        showSpray();
    }
});

document.addEventListener('mouseup', resetImage);
document.addEventListener('mouseleave', resetImage);

// Touch controls
document.addEventListener('touchstart', (e) => {
    e.preventDefault();

    // If more than one finger is used (pinch), reset immediately
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

// When the finger lifts or gesture ends
document.addEventListener('touchend', (e) => {
    resetImage();
});
document.addEventListener('touchcancel', resetImage);

// Detect ongoing multi-touch (pinch move)
document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 1) {
        resetImage();
    }
}, { passive: true });

// Prevent context menu (right-click or long-press)
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});
