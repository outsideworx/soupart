// script/orientation/mousedown.js

const img = document.getElementById('main-image');
const container = document.querySelector('.image-container');
const defaultSrc = 'img/background_0.webp';
const activeSrc = 'img/background_1.webp';
let sprayImg = null;

// Make sure container allows relative positioning context
container.style.position = 'relative';

// Utility: show a random spray overlay (relative to the container)
function showSpray() {
    const randomNum = Math.floor(Math.random() * 20) + 1; // 1–20
    sprayImg = document.createElement('img');
    sprayImg.src = `../img/spray/${randomNum}.webp`;
    sprayImg.alt = 'spray effect';

    // Positioned relative to the background image
    sprayImg.style.position = 'absolute';
    sprayImg.style.top = '22%';   // 15% from container's top
    sprayImg.style.left = '5%';   // 5% from container's left
    sprayImg.style.width = '50%'; // 50% of container's width
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

// Handle mouse down (left quarter trigger)
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

// Handle touch events (for mobile)
document.addEventListener('touchstart', (e) => {
    e.preventDefault();

    // Reset if multiple touches (pinch gesture)
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

// Detect multi-touch gestures during move (pinch)
document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 1) {
        resetImage();
    }
}, { passive: true });

// Prevent right-click / long-press context menu
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});
