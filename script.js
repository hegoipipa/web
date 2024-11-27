let gold = 0; // Current gold
let goldPerSecond = 0; // Passive income per second
let minerCost = 10; // Cost of the first upgrade
let superMinerCost = 50; // Cost of the second upgrade

const goldDisplay = document.getElementById("gold-display");
const mineGoldButton = document.getElementById("mine-gold");
const buyMinerButton = document.getElementById("buy-miner");
const buySuperMinerButton = document.getElementById("buy-super-miner");
const minersContainer = document.getElementById("miners-container");

// Function to update the display
function updateDisplay() {
  goldDisplay.textContent = `Gold: ${gold}`;
  buyMinerButton.disabled = gold < minerCost;
  buySuperMinerButton.disabled = gold < superMinerCost;
}

// Function to add a miner
function addMiner(type) {
  const miner = document.createElement("div");
  miner.classList.add("miner");
  if (type === "super") {
    miner.style.backgroundColor = "#ff4500"; // Super miners are red-orange
  }
  minersContainer.appendChild(miner);
}

// Manual gold mining
mineGoldButton.addEventListener("click", () => {
  gold += 1;
  updateDisplay();
});

// Buy Miner Upgrade
buyMinerButton.addEventListener("click", () => {
  if (gold >= minerCost) {
    gold -= minerCost;
    goldPerSecond += 1;
    minerCost = Math.floor(minerCost * 1.5); // Increase cost for next purchase
    buyMinerButton.textContent = `Buy Miner (+1 gold/sec) - Cost: ${minerCost} gold`;
    addMiner("normal"); // Add a miner
    updateDisplay();
  }
});

// Buy Super Miner Upgrade
buySuperMinerButton.addEventListener("click", () => {
  if (gold >= superMinerCost) {
    gold -= superMinerCost;
    goldPerSecond += 5;
    superMinerCost = Math.floor(superMinerCost * 1.5); // Increase cost for next purchase
    buySuperMinerButton.textContent = `Buy Super Miner (+5 gold/sec) - Cost: ${superMinerCost} gold`;
    addMiner("super"); // Add a super miner
    updateDisplay();
  }
});

// Passive income logic
setInterval(() => {
  gold += goldPerSecond;
  updateDisplay();
}, 1000);

// Initial update
updateDisplay();
