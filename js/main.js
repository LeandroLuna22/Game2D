const Main = {
    loop() {
        Game.update();
        Game.draw();
        requestAnimationFrame(Main.loop);
    }
};

window.onload = () => {
    Menu.show();
};
