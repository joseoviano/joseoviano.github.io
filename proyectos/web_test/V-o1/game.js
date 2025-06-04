const gameState = {
    map: [],
    player: { x: 2, y: 1, torches: 6, hasSword: false, health: 100 },
    enemies: [],
    objects: {}
};

function generateMap(size) {
    let map = Array.from({ length: size }, () => Array(size).fill("[ ]"));
    
    map[gameState.player.x][gameState.player.y] = "[J]";
    gameState.objects["espada"] = placeObject(map, "[S]");
    gameState.objects["llave"] = placeObject(map, "[K]");
    gameState.objects["salida"] = placeObject(map, "[X]");
    gameState.objects["curandero"] = placeObject(map, "[C]");
    gameState.objects["pozo"] = placeObject(map, "[¡]");
    
    for (let i = 0; i < 5; i++) {
        gameState.enemies.push(placeObject(map, "[E]"));
    }
    
    return map;
}

function placeObject(map, symbol) {
    let x, y;
    do {
        x = Math.floor(Math.random() * map.length);
        y = Math.floor(Math.random() * map.length);
    } while (map[x][y] !== "[ ]");
    map[x][y] = symbol;
    return { x, y };
}

function movePlayer(direction) {
    let newX = gameState.player.x;
    let newY = gameState.player.y;
    
    if (direction === "N" && newX > 0) newX--;
    if (direction === "S" && newX < gameState.map.length - 1) newX++;
    if (direction === "E" && newY < gameState.map.length - 1) newY++;
    if (direction === "O" && newY > 0) newY--;
    
    let newPosition = gameState.map[newX][newY];
    
    if (newPosition === "[S]") {
        gameState.player.hasSword = true;
        gameState.map[newX][newY] = "[ ]";
        alert("Has encontrado una espada!");
    } else if (newPosition === "[K]") {
        gameState.player.hasKey = true;
        gameState.map[newX][newY] = "[ ]";
        alert("Has encontrado una llave!");
    } else if (newPosition === "[C]") {
        gameState.player.health = 100;
        alert("Un curandero ha restaurado tu salud!");
    } else if (newPosition === "[¡]") {
        gameState.player.health = 0;
        alert("Has caído en el Pozo de la Muerte! Juego terminado.");
    } else if (newPosition === "[E]") {
        engageCombat();
    }
    
    gameState.map[gameState.player.x][gameState.player.y] = "[ ]";
    gameState.player.x = newX;
    gameState.player.y = newY;
    gameState.map[newX][newY] = "[J]";
    
    renderGame();
}

function engageCombat() {
    if (gameState.player.hasSword) {
        alert("Has derrotado al enemigo con tu espada!");
        gameState.enemies.pop();
    } else {
        gameState.player.health -= 20;
        alert("El enemigo te ha atacado! Pierdes 20 de salud.");
    }
}

function renderGame() {
    let display = gameState.map.map(row => row.join(" ")).join("\n");
    document.getElementById("game-display").innerText = display;
    document.getElementById("player-health").innerText = `Salud: ${gameState.player.health}`;
}

document.addEventListener("DOMContentLoaded", () => {
    gameState.map = generateMap(10);
    renderGame();

    document.getElementById("move-n").addEventListener("click", () => movePlayer("N"));
    document.getElementById("move-s").addEventListener("click", () => movePlayer("S"));
    document.getElementById("move-e").addEventListener("click", () => movePlayer("E"));
    document.getElementById("move-o").addEventListener("click", () => movePlayer("O"));
});
