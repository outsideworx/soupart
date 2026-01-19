function loadImages(category) {
    const urlParams = new URLSearchParams(window.location.search);
    const offset = Number(urlParams.get("offset") || 0);
    $.ajax({
        url: `/api/cached/soupart?category=${category}&offset=${offset}`,
        method: 'GET',
        success: function (response) {
            if (response) {
                if (response && Array.isArray(response)) {
                    if (response.length === 0 && offset !== 0) {
                        window.history.go(-1);
                    }
                    response.forEach((item, index) => {
                        if (item.image) {
                            let imageById = document.getElementById("image" + (index + 1));
                            imageById.src = item.image;
                            imageById.hidden = false;
                        }
                    });
                    for (let i = response.length + 1; i <= 4; i++) {
                        document.getElementById("image" + i).remove();
                    }
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