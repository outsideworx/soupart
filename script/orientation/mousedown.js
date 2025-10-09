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
    sprayImg.style.top = '15%';
    sprayImg.style.left = '5%';
    sprayImg.style.width = '50vw'; // 50% of the screen width
    sprayImg.style.height = 'auto'; // maintain aspect ratio
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
    const touchX = e.touches[0].clientX;
    const screenWidth = window.innerWidth;

    if (touchX < screenWidth / 4) {
        img.src = activeSrc;
        showSpray();
    }
}, { passive: false });

document.addEventListener('touchend', resetImage);
document.addEventListener('touchcancel', resetImage);

// Prevent context menu (right-click or long-press)
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});
