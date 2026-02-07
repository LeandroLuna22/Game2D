// platform.js
class Platform {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(ctx) {
        ctx.fillStyle = "#555";
        ctx.fillRect(this.x - Camera.x, this.y - Camera.y, this.width, this.height);
    }
}

