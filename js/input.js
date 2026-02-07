const Keys = {
    left: false,
    right: false,
    up: false,
};

window.addEventListener("keydown", (e) => {
    switch (e.code) {
        case "ArrowLeft": Keys.left = true; break;
        case "ArrowRight": Keys.right = true; break;
        case "ArrowUp": Keys.up = true; break;
    }
});

window.addEventListener("keyup", (e) => {
    switch (e.code) {
        case "ArrowLeft": Keys.left = false; break;
        case "ArrowRight": Keys.right = false; break;
        case "ArrowUp": Keys.up = false; break;
    }
});
