const canvas = document.getElementById("raceCanvas");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById("startRace");
const resetButton = document.getElementById("resetRace");
const status = document.getElementById("raceStatus");

const startX = 60;
const finishX = canvas.width - 60;

const raceWidth = finishX - startX;
const sectionWidth = raceWidth / 3;

const swimEnd = startX + sectionWidth;
const bikeEnd = startX + sectionWidth * 2;

let x = startX;
let animation;
let athleteColor = "gray";


function drawRace() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const trackY = 120;


    // SWIM Strecke
    ctx.beginPath();
    ctx.moveTo(startX, trackY);
    ctx.lineTo(swimEnd, trackY);
    ctx.strokeStyle = "#0077b6";
    ctx.lineWidth = 6;
    ctx.stroke();


    // BIKE Strecke
    ctx.beginPath();
    ctx.moveTo(swimEnd, trackY);
    ctx.lineTo(bikeEnd, trackY);
    ctx.strokeStyle = "#333333";
    ctx.stroke();


    // RUN Strecke
    ctx.beginPath();
    ctx.moveTo(bikeEnd, trackY);
    ctx.lineTo(finishX, trackY);
    ctx.strokeStyle = "#d62828";
    ctx.stroke();


    // Beschriftungen
    ctx.font = "bold 16px Arial";
    ctx.fillStyle = "#222222";
    ctx.textAlign = "center";

    ctx.fillText(
        "SWIM",
        startX + sectionWidth / 2,
        85
    );

    ctx.fillText(
        "BIKE",
        swimEnd + sectionWidth / 2,
        85
    );

    ctx.fillText(
        "RUN",
        bikeEnd + sectionWidth / 2,
        85
    );


    // Wechselzonen
    ctx.font = "13px Arial";
    ctx.fillStyle = "#666666";

    ctx.fillText("T1", swimEnd, 155);
    ctx.fillText("T2", bikeEnd, 155);


    // Finish
    ctx.font = "bold 14px Arial";
    ctx.fillStyle = "#222222";

    ctx.fillText(
        "FINISH",
        finishX,
        85
    );


    // Athlet
    ctx.beginPath();
    ctx.arc(x, trackY, 14, 0, Math.PI * 2);

    ctx.fillStyle = athleteColor;
    ctx.fill();
}


function startRace() {

    cancelAnimationFrame(animation);

    x = startX;

    function move() {

        x += 3;

        if (x < swimEnd) {

            status.textContent = "Schwimmen";
            athleteColor = "#0077b6";

        } else if (x < bikeEnd) {

            status.textContent = "Radfahren";
            athleteColor = "#333333";

        } else if (x < finishX) {

            status.textContent = "Laufen";
            athleteColor = "#d62828";

        } else {
            status.textContent = "Finish!";
            athleteColor = "green";
            x = finishX;
        }

        drawRace();

        if (x < finishX) {
            animation = requestAnimationFrame(move);
        }
    }

    move();
}


function resetRace() {

    cancelAnimationFrame(animation);

    x = startX;
    athleteColor = "gray";

    status.textContent = "Bereit für das Rennen!";

    drawRace();
}


startButton.addEventListener("click", startRace);
resetButton.addEventListener("click", resetRace);

drawRace();