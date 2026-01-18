function loadImages(category) {
    const urlParams = new URLSearchParams(window.location.search);
    const offset = urlParams.get("offset");
    $.ajax({
        url: `/api/soupart?category=${category}&offset=${offset}`,
        method: 'GET',
        success: function (response) {
            if (response) {
                if (response.image1) {
                    document.getElementById("image1").src = response.image1;
                    document.getElementById("image1").hidden = false;
                } else {
                    document.getElementById("image1").remove();
                }
                if (response.image2) {
                    document.getElementById("image2").src = response.image2;
                    document.getElementById("image2").hidden = false;
                } else {
                    document.getElementById("image2").remove();
                }
                if (response.image3) {
                    document.getElementById("image3").src = response.image3;
                    document.getElementById("image3").hidden = false;
                } else {
                    document.getElementById("image3").remove();
                }
                if (response.image4) {
                    document.getElementById("image4").src = response.image4;
                    document.getElementById("image4").hidden = false;
                } else {
                    document.getElementById("image4").remove();
                }
            }
        },
        error: function (error) {
            console.error('Error fetching images:', error);
        }
    });
}

function setNavigation() {
    const urlParams = new URLSearchParams(window.location.search);
    let offset = urlParams.get("offset");
    if (offset) {
        offset = parseInt(offset);
        if (offset >= 4) {
            const back = document.getElementById("back");
            const url = new URL(back.href);
            url.searchParams.set("offset", offset - 4);
            back.href = url.toString();
        }
        const forward = document.getElementById("forward");
        const url = new URL(forward.href);
        url.searchParams.set("offset", offset + 4);
        forward.href = url.toString();
    }
}