const Game = {
    player: null,
    canvas: null,
    ctx: null,
    lives: 5,
    isGameOver: false,

    start(color) {
    Menu.hide();

    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");

    this.gameOverScreen = document.getElementById("gameOverScreen");

    // 🔥 CORRETO: começa escondido
    this.gameOverScreen.style.display = "none";

    this.lives = 5;
    this.isGameOver = false;

    const startPos = Level.init(0);
    this.player = new Player(startPos.x, startPos.y, 50, 50, color);

    Main.start();
},

    loseLife() {
        if (this.isGameOver) return;

        this.lives--;

        if (this.lives <= 0) {
            this.isGameOver = true;
            Main.stop();
            this.showGameOver();
        } else {
            // pequeno knockback simples
            this.player.vx = -10;
            this.player.vy = -5;
        }
    },

    update() {
        if (this.isGameOver) return;

        this.player.update(Level.platforms);
        Camera.follow(this.player);

        // caiu da fase
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
                this.isGameOver = true;
                Main.stop();
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
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        Level.draw(this.ctx);
        this.player.draw(this.ctx);

        // HUD vidas
        this.ctx.fillStyle = "red";
        this.ctx.font = "20px Arial";
        this.ctx.fillText(`Vidas: ${this.lives}`, 10, 30);
    },

    showGameOver() {
    const screen = document.getElementById("gameOverScreen");
    screen.style.display = "flex";
},

restart() {
    Main.stop();

    this.lives = 5;
    this.isGameOver = false;

    const screen = document.getElementById("gameOverScreen");
    screen.style.display = "none";

    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");

    Level.currentPhase = 0;
    const startPos = Level.init(0);

    this.player = new Player(
        startPos.x,
        startPos.y,
        50,
        50,
        "blue"
    );

    Camera.follow(this.player);

    Main.start();
    }
};