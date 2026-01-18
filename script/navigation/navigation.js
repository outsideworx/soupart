function positionLinks() {
    const img = document.getElementById("main-image");

    const imgNaturalWidth = 1920;
    const imgNaturalHeight = 1080;
    const navigation = [
        {element: document.getElementById("home"), x: 200, y: 360},
        {element: document.getElementById("back"), x: 900, y: 890},
        {element: document.getElementById("forward"), x: 1250, y: 890},
    ];

    const imgContainer = img.parentElement;
    const containerRect = imgContainer.getBoundingClientRect();

    const scale = Math.min(containerRect.width / imgNaturalWidth, containerRect.height / imgNaturalHeight);

    const displayedWidth = imgNaturalWidth * scale;
    const displayedHeight = imgNaturalHeight * scale;

    const offsetX = (containerRect.width - displayedWidth) / 2;
    const offsetY = (containerRect.height - displayedHeight) / 2;

    navigation.forEach(hs => {
        hs.element.style.left = `${offsetX + hs.x * scale}px`;
        hs.element.style.top = `${offsetY + hs.y * scale}px`;
        hs.element.style.width = `${200 * scale}px`;
        hs.element.style.height = `${200 * scale}px`;
    });
}

window.addEventListener("resize", positionLinks);
window.addEventListener("load", positionLinks);
