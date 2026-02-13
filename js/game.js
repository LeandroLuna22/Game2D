const Game = {
    state: "menu",
    player: null,
    canvas: null,
    ctx: null,
    lives: 5,

    start(color) {
        Menu.hide();

        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");

        this.lives = 5;
        this.state = "playing";

        const startPos = Level.init(0);
        this.player = new Player(startPos.x, startPos.y, 50, 50, color);

        document.getElementById("gameOverScreen").style.display = "none";

        Main.start();
    },

    loseLife() {
        if (this.state !== "playing") return;

        this.lives--;

        if (this.lives <= 0) {
            this.state = "gameover";
            this.showGameOver();
        } else {
            this.player.vx = -10;
            this.player.vy = -5;
        }
    },

    update() {
        if (this.state !== "playing") return;

        this.player.update(Level.platforms);
        Camera.follow(this.player);

        // caiu
        if (this.player.y > Level.height) {
            this.loseLife();
        }

        // portal
        if (Level.portal && Collision.rectRect(this.player, Level.portal)) {
            const nextStart = Level.nextPhase();

            if (nextStart) {
                this.player.x = nextStart.x;
                this.player.y = nextStart.y;
                this.player.vx = 0;
                this.player.vy = 0;
                Camera.follow(this.player);
            } else {
                this.state = "gameover";
                this.showGameOver();
            }
        }

        // NPCs
        if (Level.npcs) {
            Level.npcs.forEach(npc => {
                if (
                    Collision.rectRect(this.player, npc) &&
                    !this.player.invulnerable
                ) {
                    this.loseLife();

                    this.player.invulnerable = true;
                    setTimeout(() => {
                        this.player.invulnerable = false;
                    }, 1000);
                }
            });
        }
    },

    draw() {
        if (!this.ctx || !this.player) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        Level.draw(this.ctx);
        this.player.draw(this.ctx);

        this.ctx.fillStyle = "red";
        this.ctx.font = "20px Arial";
        this.ctx.fillText(`Vidas: ${this.lives}`, 10, 30);
    },

    showGameOver() {
        document.getElementById("gameOverScreen").style.display = "flex";
    },

    restart() {
        document.getElementById("gameOverScreen").style.display = "none";

        Menu.show();
        this.state = "menu";
    }
};
