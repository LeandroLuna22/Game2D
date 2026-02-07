const Menu = {
    show() {
        const menuDiv = document.getElementById("menu");
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
    },

    hide() {
        document.getElementById("menu").innerHTML = "";
    }
};
