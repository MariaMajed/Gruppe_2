//---CANVAS----

// ----Sushi-Maker------
const canvas = document.getElementById("sushiCanvas");
const ctx = canvas.getContext("2d");

let sushiCount = 0;
let sushiPositions = [];

const sushiButton = document.getElementById("sushiButton");
const resetButton = document.getElementById("resetButton");
const colors = getComputedStyle(document.documentElement);
const black = colors.getPropertyValue("--black").trim();
const white = colors.getPropertyValue("--white").trim();
const accent = colors.getPropertyValue("--accent").trim();
const nori = colors.getPropertyValue("--nori").trim();


function drawPlate() {
    // Hintergrund
    ctx.fillStyle = black;
    ctx.fillRect(0, 0, 300, 300);

    // Teller
    ctx.beginPath();
    ctx.arc(150, 150, 80, 0, Math.PI * 2);
    ctx.fillStyle = white;
    ctx.fill();

    // Tellerrand
    ctx.beginPath();
    ctx.arc(150, 150, 72, 0, Math.PI * 2);
    ctx.strokeStyle = accent;
    ctx.lineWidth = 4;
    ctx.stroke();
}


function drawSushi(x, y) {
    // Nori
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fillStyle = nori;
    ctx.fill();

    // Reis
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fillStyle = white;
    ctx.fill();

    // Lachs
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.fillStyle = accent;
    ctx.fill();
}


function drawAll() {
    drawPlate();

    for (const sushi of sushiPositions) {
        drawSushi(sushi.x, sushi.y);
    }
}


sushiButton.addEventListener("click", function () {

    if (sushiCount < 6) {

        const positions = [
            { x: 125, y: 120 },
            { x: 175, y: 120 },
            { x: 115, y: 150 },
            { x: 185, y: 150 },
            { x: 125, y: 180 },
            { x: 175, y: 180 }
        ];

        sushiPositions.push(positions[sushiCount]);

        sushiCount++;

        drawAll();
    }
});


resetButton.addEventListener("click", function () {

    sushiCount = 0;
    sushiPositions = [];

    drawAll();
});


drawAll();