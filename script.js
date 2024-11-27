let gold = 0;
let goldPerSecond = 1;
let miningInterval;
let toolLevel = 0;
let floorCost = 100;
let floorsBought = 0;
let miners = []; // Lista de mineros

// Elementos del DOM
const goldElement = document.getElementById('gold');
const goldPerSecondElement = document.getElementById('gold-per-second');
const upgradeButton = document.getElementById('upgrade-tool');
const buyFloorButton = document.getElementById('buy-floor');
const floorsContainer = document.getElementById('floors-container');
const floorsBoughtElement = document.getElementById('floors-bought');

// Inicia automáticamente la minería
miningInterval = setInterval(() => {
    gold += goldPerSecond;
    updateDisplay();
}, 1000); // Minar oro cada segundo

// Función para actualizar la pantalla
function updateDisplay() {
    goldElement.textContent = gold;
    goldPerSecondElement.textContent = goldPerSecond;
    floorsBoughtElement.textContent = floorsBought;

    // Habilitar/deshabilitar el botón de mejorar herramienta
    upgradeButton.disabled = gold < 50;

    // Habilitar/deshabilitar el botón de comprar pisos
    buyFloorButton.disabled = gold < floorCost;
}

// Función para mejorar la herramienta de minería
function upgradeTool() {
    if (gold >= 50) {
        gold -= 50;
        toolLevel++;
        goldPerSecond += 2; // Aumenta la cantidad de oro por segundo
        updateDisplay();
    }
}

// Función para comprar un piso
function buyFloor() {
    if (gold >= floorCost) {
        gold -= floorCost;
        floorsBought++;
        
        // Generar un minero con aumento progresivo de oro por segundo
        let newMinerGoldPerSecond = getMinerGoldPerSecond();
        miners.push(newMinerGoldPerSecond);
        goldPerSecond += newMinerGoldPerSecond;

        updateDisplay();
        
        // Añadir un nuevo piso con minero
        const floorDiv = document.createElement('div');
        floorDiv.classList.add('floor');
        
        const minerImage = document.createElement('img');
        minerImage.src = "https://via.placeholder.com/50x50?text=Miner";
        minerImage.alt = "Minero";
        
        const floorText = document.createElement('p');
        floorText.textContent = `Piso ${floorsBought}: Minero generando ${newMinerGoldPerSecond} oro por segundo`;

        floorDiv.appendChild(minerImage);
        floorDiv.appendChild(floorText);
        
        floorsContainer.appendChild(floorDiv);
    }
}

// Función para obtener la cantidad de oro por segundo de un nuevo minero
function getMinerGoldPerSecond() {
    if (miners.length === 0) return 1;  // El primer minero genera 1 oro por segundo
    let lastMinerGoldPerSecond = miners[miners.length - 1];
    return lastMinerGoldPerSecond + (miners.length * 3);  // Aumenta la cantidad por 3 con cada minero
}

// Inicializa la pantalla
updateDisplay();
