const Camera = {
    x: 0,
    y: 0,
    width: 800,
    height: 600,

    follow(player) {
    this.x = player.x + player.width / 2 - this.width / 2;
    this.y = player.y + player.height / 2 - this.height / 2;

    // Limites da fase
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
    if (this.x + this.width > Level.width) this.x = Level.width - this.width;
    if (this.y + this.height > Level.height) this.y = Level.height - this.height;

        // exemplo de limite máximo para fase (pode aumentar depois)
        const maxX = 3000;
        if (this.x > maxX) this.x = maxX;
    }
};
