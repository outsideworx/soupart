// script/orientation/mousedown.js

const img = document.getElementById('main-image');
const defaultSrc = 'img/background_0.webp';
const activeSrc = 'img/background_1.webp';
let sprayImg = null;

// Ensure the parent container allows relative positioning context
img.style.position = 'relative';
img.style.display = 'block'; // ensure it respects its container

// Utility: show a random spray overlay
function showSpray() {
    const randomNum = Math.floor(Math.random() * 20) + 1; // 1–20
    sprayImg = document.createElement('img');
    sprayImg.src = `../img/spray/${randomNum}.webp`;
    sprayImg.alt = 'spray effect';

    sprayImg.style.position = 'absolute';
    sprayImg.style.top = '15%';   // relative to the image height
    sprayImg.style.left = '5%';   // relative to the image width
    sprayImg.style.width = '50%'; // 50% of the background image width
    sprayImg.style.height = 'auto';
    sprayImg.style.pointerEvents = 'none';
    sprayImg.style.zIndex = '2';
    sprayImg.style.userSelect = 'none';

    // Place the spray image as a child of the main image container
    // For this, wrap the main image in a container (done below if not already)
    if (!img.parentElement.classList.contains('image-wrapper')) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('image-wrapper');
        wrapper.style.position = 'relative';
        wrapper.style.display = 'inline-block';
        wrapper.style.width = '100%';
        wrapper.style.height = 'auto';

        img.parentElement.insertBefore(wrapper, img);
        wrapper.appendChild(img);
    }

    // Append spray inside the same wrapper as the image
    img.parentElement.appendChild(sprayImg);
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

document.addEventListener('touchend', resetImage);
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
