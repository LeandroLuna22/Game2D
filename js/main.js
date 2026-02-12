const Main = {
    loopId: null,

    start() {
        if (this.loopId !== null) return; // evita loop duplicado
        this.loop();
    },

    loop() {
        Game.update();
        Game.draw();

        this.loopId = requestAnimationFrame(() => this.loop());
    },

    stop() {
        if (this.loopId !== null) {
            cancelAnimationFrame(this.loopId);
            this.loopId = null;
        }
    }
};