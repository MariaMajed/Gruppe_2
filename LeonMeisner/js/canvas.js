function drawStrength(canvasId, strength, fillColor, strokeColor) {
    var canvas = document.getElementById(canvasId);
    var context = canvas.getContext("2d");
    
    var topY = 30;
    var bottomY = 190;
    var glassHeight = bottomY - topY;

    var fillHeight = glassHeight * (strength / 5);
    var fillTop = bottomY - fillHeight;

    context.beginPath();
    context.moveTo(35, 30);
    context.lineTo(125, 30);
    context.lineTo(110, 190);
    context.lineTo(50, 190);
    context.closePath();

    context.save();
    context.clip();

    context.fillStyle = fillColor;
    context.fillRect(
        0,
        fillTop,
        canvas.width,
        bottomY - fillTop
    );

    context.restore();

    context.beginPath();
    context.moveTo(35, 30);
    context.lineTo(125, 30);
    context.lineTo(110, 190);
    context.lineTo(50, 190);
    context.closePath();

    context.strokeStyle = strokeColor;
    context.lineWidth = 5;
    context.stroke();
}

drawStrength("whiteRussianCanvas", 4, "#a9d6e5", "#ffffff");
drawStrength("gluehweinCanvas", 3, "#a9d6e5", "#ffffff");
drawStrength("irishCoffeeCanvas", 2, "#a9d6e5", "#ffffff");

drawStrength("mojitoCanvas", 3, "#8e1452", "#9e9e9e");
drawStrength("pinaColadaCanvas", 3, "#8e1452", "#9e9e9e");
drawStrength("cubaLibreCanvas", 3, "#8e1452", "#9e9e9e");