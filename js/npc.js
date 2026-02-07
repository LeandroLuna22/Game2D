class NPC {
    constructor(x, y, width, height, color = "green") {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - Camera.x, this.y - Camera.y, this.width, this.height);
    }
}
