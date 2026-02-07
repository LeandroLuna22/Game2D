const Game = {
    player: null,
    canvas: null,
    ctx: null,
    lives: 5, // começa com 5 vidas
    isGameOver: false,

    start(color) {
        Menu.hide();
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");

        this.lives = 5; // reseta vidas ao iniciar
        const startPos = Level.init(0);
        this.player = new Player(startPos.x, startPos.y, 50, 50, color);

        Main.loop();
    },

    loseLife() {
        this.lives--;
        if (this.lives <= 0 && !this.isGameOver) {
    this.isGameOver = true;

    alert("Game Over!");

    Menu.show();
    Main.stop(); // para o loop

            // reinicia o progresso
            Level.init(0);
        } else {
            // reinicia fase atual sem perder progresso
            this.player.vx = -35;   // empurra para trás
        this.player.vy = -10;   // sobe um pouco
        }
    },

    update() {
        this.player.update(Level.platforms);
        Camera.follow(this.player);

        // Queda na tela tira vida
        if (this.player.y > Level.height) {
            this.loseLife();
        }

        // Colisão com portal
        if (Level.portal && Collision.rectRect(this.player, Level.portal)) {
            const nextStart = Level.nextPhase();
            if (nextStart) {
                this.player.x = nextStart.x;
                this.player.y = nextStart.y;
                this.player.vx = 0;
                this.player.vy = 0;
                Camera.follow(this.player);
            } else {
                alert("Parabéns! Você completou todas as fases!");
                Menu.show();
            }
        }

        // Colisão com NPCs
if (Level.npcs) {
    Level.npcs.forEach(npc => {
        if (Collision.rectRect(this.player, npc) && !this.player.invulnerable) {
            this.loseLife();
            this.player.invulnerable = true;

            // Remove invulnerabilidade após 1 segundo
            setTimeout(() => {
                this.player.invulnerable = false;
            }, this.player.invulnTime);
        }
    });
}

    },

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        Level.draw(this.ctx);
        this.player.draw(this.ctx);

        // Desenha vidas no canto superior esquerdo
        this.ctx.fillStyle = "red";
        this.ctx.font = "20px Arial";
        this.ctx.fillText(`Vidas: ${this.lives}`, 10, 30);
    }
};
