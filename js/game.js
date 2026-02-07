const Game = {
    player: null,
    canvas: null,
    ctx: null,

    start(color) {
        Menu.hide();
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");

        const startPos = Level.init(0);
        this.player = new Player(startPos.x, startPos.y, 50, 50, color);

        Main.loop();
    },

    update() {
        this.player.update(Level.platforms);

        // Verifica se atingiu a última plataforma da fase
        const lastPlatform = Level.platforms[Level.platforms.length - 1];
        if (Collision.rectRect(this.player, lastPlatform) && this.player.onGround) {
            const nextStart = Level.nextPhase();
            if (nextStart) {
                // Move o jogador para o início da próxima fase
                this.player.x = nextStart.x;
                this.player.y = nextStart.y;
                this.player.vx = 0;
                this.player.vy = 0;
            } else {
                alert("Parabéns! Você completou todas as fases!");
                Menu.show();
            }
        }
    },

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        Level.draw(this.ctx);
        this.player.draw(this.ctx);
    }
};
