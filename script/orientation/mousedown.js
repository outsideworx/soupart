// script/orientation/mousedown.js

const img = document.getElementById('main-image');
const defaultSrc = 'img/background_0.webp';
const activeSrc = 'img/background_1.webp';

let sprayImg = null; // Temporary spray image element

document.addEventListener('mousedown', function (event) {
    const clickX = event.clientX;
    const screenWidth = window.innerWidth;

    // Check if click is in the leftmost quarter
    if (clickX < screenWidth / 4) {
        img.src = activeSrc;

        // Create and show a random spray image
        const randomNum = Math.floor(Math.random() * 20) + 1; // 1–20
        sprayImg = document.createElement('img');
        sprayImg.src = `../img/spray/${randomNum}.webp`;
        sprayImg.alt = 'spray effect';
        sprayImg.style.position = 'absolute';
        sprayImg.style.top = '18%';
        sprayImg.style.left = '7%';
        sprayImg.style.transform = 'scale(0.5)'; // Reduce size by 50%
        sprayImg.style.transformOrigin = 'top left'; // Scale from the top-left corner
        sprayImg.style.pointerEvents = 'none';
        sprayImg.style.zIndex = '10';
        sprayImg.style.userSelect = 'none';
        document.body.appendChild(sprayImg);

        // Cleanup and revert when mouse is released
        const revertImage = () => {
            img.src = defaultSrc;
            if (sprayImg) {
                sprayImg.remove();
                sprayImg = null;
            }
            document.removeEventListener('mouseup', revertImage);
        };

        document.addEventListener('mouseup', revertImage);
    }
});
