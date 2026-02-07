class Player {
    constructor(x, y, width, height, color = "blue") {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;

        this.vx = 0;
        this.vy = 0;
        this.speed = 5;
        this.jumpPower = 15;
        this.onGround = false;

        this.invulnerable = false; // evita múltiplas colisões seguidas
        this.invulnTime = 1000;    // 1 segundo de invulnerabilidade
    }

    update(platforms) {
        if (Keys.left) this.vx = -this.speed;
        else if (Keys.right) this.vx = this.speed;
        else this.vx = 0;

        this.vy += 0.8;
        this.x += this.vx;
        this.y += this.vy;

        // Limites horizontais
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > Level.width) this.x = Level.width - this.width;

        // Limite vertical (teto)
        if (this.y < 0) this.y = 0;
        // Nota: o chão é controlado pelas plataformas, então y > Level.height já reinicia a fase


        this.onGround = false;
        platforms.forEach(plat => {
            if (Collision.rectRect(this, plat)) {
                if (this.vy > 0) {
                    this.y = plat.y - this.height;
                    this.vy = 0;
                    this.onGround = true;
                } else if (this.vy < 0) {
                    this.y = plat.y + plat.height;
                    this.vy = 0;
                }
            }
        });

        if (Keys.up && this.onGround) {
            this.vy = -this.jumpPower;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(
            this.x - Camera.x,
            this.y - Camera.y,
            this.width,
            this.height
        );
    }
}


