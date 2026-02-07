class Platform {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(ctx) {
        ctx.fillStyle = "#555";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Fases como objetos
const Phases = [
    {
        playerStart: { x: 50, y: 500 },
        platforms: [
            new Platform(50, 550, 200, 20),
            new Platform(300, 450, 150, 20),
            new Platform(500, 350, 200, 20),
            new Platform(750, 250, 50, 20) // plataforma final da fase
        ]
    },
    {
        playerStart: { x: 50, y: 500 },
        platforms: [
            new Platform(100, 550, 150, 20),
            new Platform(300, 450, 150, 20),
            new Platform(500, 500, 150, 20),
            new Platform(700, 400, 100, 20),
            new Platform(850, 300, 50, 20) // plataforma final da fase
        ]
    }
];

const Level = {
    currentPhase: 0,
    platforms: [],

    init(phaseIndex = 0) {
        this.currentPhase = phaseIndex;
        const phase = Phases[this.currentPhase];
        this.platforms = phase.platforms;
        return phase.playerStart;
    },

    nextPhase() {
        if (this.currentPhase + 1 < Phases.length) {
            this.currentPhase++;
            const start = Phases[this.currentPhase].playerStart;
            this.platforms = Phases[this.currentPhase].platforms;
            return start;
        } else {
            return null; // não tem mais fases
        }
    },

    draw(ctx) {
        this.platforms.forEach(p => p.draw(ctx));
    }
};
