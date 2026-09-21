const canvas = document.getElementById("routenCanvas");
const ctx = canvas.getContext("2d");

const farbPrimary = "#6b2737";
const farbLinie = "#d8c3a5";

const startX = 80, startY = 100;
const endX = 520, endY = 100;
const distanzKm = 33;

let fortschritt = 0; // 0 bis 1, steuert die Animation

function zeichneRoute() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Graue Basislinie (komplette Strecke, dezent)
  ctx.strokeStyle = farbLinie;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();

  // Animierte Linie, die sich "auffüllt"
  const aktuellX = startX + (endX - startX) * fortschritt;
  ctx.strokeStyle = farbPrimary;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(aktuellX, startY);
  ctx.stroke();

  // Start-Punkt: Stellenbosch
  ctx.fillStyle = farbPrimary;
  ctx.beginPath();
  ctx.arc(startX, startY, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#2a1a1a";
  ctx.font = "16px 'Times New Roman', serif";
  ctx.textAlign = "center";
  ctx.fillText("Stellenbosch", startX, startY + 35);

  // End-Punkt: Franschhoek
  ctx.fillStyle = farbPrimary;
  ctx.beginPath();
  ctx.arc(endX, startY, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillText("Franschhoek", endX, startY + 35);

  // Bewegter Punkt entlang der Strecke (wie ein kleines Auto/Glas unterwegs)
  if (fortschritt < 1) {
    ctx.fillStyle = farbPrimary;
    ctx.beginPath();
    ctx.arc(aktuellX, startY, 7, 0, Math.PI * 2);
    ctx.fill();
  }

  // Distanz-Beschriftung über der Linie
  ctx.fillStyle = farbPrimary;
  ctx.font = "bold 18px 'Times New Roman', serif";
  ctx.fillText(`${Math.round(distanzKm * fortschritt)} km`, (startX + endX) / 2, startY - 25);

  if (fortschritt < 1) {
    fortschritt += 0.01;
    requestAnimationFrame(zeichneRoute);
  }
}

zeichneRoute();
