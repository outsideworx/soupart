function checkOrientation() {
    if (window.innerWidth > window.innerHeight) {
        window.location.href = "home.html";
    } else {
        document.getElementById("flipImgId").src = "img/flip.webp"
    }
}

window.addEventListener("load", checkOrientation);
window.addEventListener("resize", checkOrientation);
