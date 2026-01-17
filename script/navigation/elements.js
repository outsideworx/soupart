function positionLinks() {
    const img = document.getElementById("main-image");

    const imgNaturalWidth = 1920;
    const imgNaturalHeight = 1080;
    const navigation = [
        {element: document.getElementById("illustration"), x: 915, y: 195},
        {element: document.getElementById("design"), x: 915, y: 328},
        {element: document.getElementById("animation"), x: 915, y: 460},
        {element: document.getElementById("art"), x: 915, y: 595},
        {element: document.getElementById("mail"), x: 915, y: 870},
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
        hs.element.style.width = `${660 * scale}px`;
        hs.element.style.height = `${110 * scale}px`;
    });
}

window.addEventListener("resize", positionLinks);
window.addEventListener("load", positionLinks);
