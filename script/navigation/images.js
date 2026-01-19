function positionLinks() {
    const img = document.getElementById("main-image");

    const imgNaturalWidth = 1920;
    const imgNaturalHeight = 1080;
    const details = [
        {element: document.getElementById("image1"), x: 860, y: 200},
        {element: document.getElementById("image2"), x: 1090, y: 200},
        {element: document.getElementById("image3"), x: 1320, y: 200},
        {element: document.getElementById("image4"), x: 860, y: 435},
        {element: document.getElementById("image5"), x: 1090, y: 435},
        {element: document.getElementById("image6"), x: 1320, y: 435},
        {element: document.getElementById("image7"), x: 860, y: 665},
        {element: document.getElementById("image8"), x: 1090, y: 665},
        {element: document.getElementById("image9"), x: 1320, y: 665}
    ];

    const imgContainer = img.parentElement;
    const containerRect = imgContainer.getBoundingClientRect();

    const scale = Math.min(containerRect.width / imgNaturalWidth, containerRect.height / imgNaturalHeight);

    const displayedWidth = imgNaturalWidth * scale;
    const displayedHeight = imgNaturalHeight * scale;

    const offsetX = (containerRect.width - displayedWidth) / 2;
    const offsetY = (containerRect.height - displayedHeight) / 2;

    details.forEach(hs => {
        if (hs.element) {
            hs.element.style.left = `${offsetX + hs.x * scale}px`;
            hs.element.style.top = `${offsetY + hs.y * scale}px`;
            hs.element.style.width = `${200 * scale}px`;
            hs.element.style.height = `${200 * scale}px`;
        }
    });
}

window.addEventListener("resize", positionLinks);
window.addEventListener("load", positionLinks);
