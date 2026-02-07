const Menu = {
    show() {
        const menuDiv = document.getElementById("menu");
        menuDiv.style.display = "flex";
        menuDiv.innerHTML = `
            <h1>Escolha seu personagem</h1>
            <button id="charRed">Vermelho</button>
            <button id="charBlue">Azul</button>
        `;

        document.getElementById("charRed").addEventListener("click", () => {
            Game.start("red");
        });
        document.getElementById("charBlue").addEventListener("click", () => {
            Game.start("blue");
        });

        document.getElementById("gameCanvas").style.display = "none";
    },

    hide() {
        document.getElementById("menu").style.display = "none";
        document.getElementById("gameCanvas").style.display = "block";
    }
};


