const Keys = { left: false, right: false, up: false };

window.addEventListener("keydown", e => {
    if (e.code === "ArrowLeft") Keys.left = true;
    if (e.code === "ArrowRight") Keys.right = true;
    if (e.code === "ArrowUp") Keys.up = true;
});

window.addEventListener("keyup", e => {
    if (e.code === "ArrowLeft") Keys.left = false;
    if (e.code === "ArrowRight") Keys.right = false;
    if (e.code === "ArrowUp") Keys.up = false;
});
