const Phases = [
    {
        width: 3000,   
        height: 600,  
        playerStart: { x: 50, y: 500 },
        platforms: [
            new Platform(100, 580, 3000, 20),   // chão
            new Platform(50, 550, 200, 20),
            new Platform(300, 450, 150, 20),
            new Platform(500, 350, 200, 20),
            new Platform(700, 250, 50, 20)
        ],
        portal: new Portal(2950, 500, 40, 50), // único portal
        npcs: [
            new NPC(400, 540, 40, 40),
            new NPC(600, 320, 40, 40)
        ]
    },
    {
        width: 1000,
        height: 600,
        playerStart: { x: 50, y: 500 },
        platforms: [
            new Platform(0, 580, 1000, 20),
            new Platform(100, 550, 150, 20),
            new Platform(300, 450, 150, 20),
            new Platform(500, 500, 150, 20),
            new Platform(700, 400, 100, 20),
            new Platform(850, 300, 50, 20)
        ],
        portal: null,
        npcs: [
            new NPC(500, 500, 50, 50)
        ]
    }
];

const Level = {
    currentPhase: 0,
    platforms: [],
    npcs: [],
    width: 800,
    height: 600,
    portal: null,

    init(phaseIndex = 0) {
        this.currentPhase = phaseIndex;
        const phase = Phases[this.currentPhase];

        this.platforms = phase.platforms;
        this.width = phase.width;
        this.height = phase.height;
        this.portal = phase.portal;
        this.npcs = phase.npcs || [];

        return { ...phase.playerStart };
    },

    nextPhase() {
        if (this.currentPhase + 1 < Phases.length) {
            this.currentPhase++;
            const phase = Phases[this.currentPhase];

            this.platforms = phase.platforms;
            this.width = phase.width;
            this.height = phase.height;
            this.portal = phase.portal;
            this.npcs = phase.npcs || [];

            return { ...phase.playerStart };
        } else {
            return null;
        }
    },

    draw(ctx) {
        this.platforms.forEach(p => p.draw(ctx));
        this.npcs.forEach(npc => npc.draw(ctx));
        if (this.portal) this.portal.draw(ctx);

        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 4;
        ctx.strokeRect( - Camera.x, - Camera.y, this.width, this.height);
    }
};


