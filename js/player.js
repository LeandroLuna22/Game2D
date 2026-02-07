class Player {
    constructor(x, y, width, height, color) {
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
    }

    update(platforms) {
        // Movimento horizontal
        if (Keys.left) this.vx = -this.speed;
        else if (Keys.right) this.vx = this.speed;
        else this.vx = 0;

        // Gravidade
        this.vy += 0.8;
        this.x += this.vx;
        this.y += this.vy;

        // Colisão com plataformas
        this.onGround = false;
        platforms.forEach(plat => {
            if (Collision.rectRect(this, plat)) {
                if (this.vy > 0) { // caiu sobre a plataforma
                    this.y = plat.y - this.height;
                    this.vy = 0;
                    this.onGround = true;
                } else if (this.vy < 0) { // bateu na parte de baixo
                    this.y = plat.y + plat.height;
                    this.vy = 0;
                }
            }
        });

        // Pulo
        if (Keys.up && this.onGround) {
            this.vy = -this.jumpPower;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
