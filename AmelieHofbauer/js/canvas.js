const canvas = document.getElementById("ratingCanvas");

if (canvas) {

    const ctx = canvas.getContext("2d");

    const bewertungen = [
        { sterne: "5 Sterne", anzahl: 6 },
        { sterne: "4 Sterne", anzahl: 6 },
        { sterne: "3 Sterne", anzahl: 5 },
        { sterne: "2 Sterne", anzahl: 2 },
        { sterne: "1 Stern", anzahl: 4 }
    ];

    function drawChart() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const startX = 170;
        const startY = 50;

        const barHeight = 45;
        const gap = 25;

        const maxWidth = 650;

        const maxValue = Math.max(
            ...bewertungen.map(function (item) {
                return item.anzahl;
            })
        );

        ctx.font = "18px Arial";
        ctx.textBaseline = "middle";

        bewertungen.forEach(function (item, index) {

            const y = startY + index * (barHeight + gap);

            const width =
                (item.anzahl / maxValue) * maxWidth;


            // Sterne-Bewertung links
            ctx.fillStyle = "#ffffff";

            ctx.fillText(
                item.sterne,
                20,
                y + barHeight / 2
            );


            // Hintergrund des Balkens
            ctx.fillStyle = "#291a3d";

            ctx.fillRect(
                startX,
                y,
                maxWidth,
                barHeight
            );


            // Lila Bewertungsbalken
            ctx.fillStyle = "#b98cff";

            ctx.fillRect(
                startX,
                y,
                width,
                barHeight
            );


            // Anzahl rechts neben dem Balken
            ctx.fillStyle = "#ffffff";

            ctx.fillText(
                item.anzahl,
                startX + width + 15,
                y + barHeight / 2
            );
        });


        // kleine Überschrift im Canvas
        ctx.fillStyle = "#cfc4db";
        ctx.font = "16px Arial";

        ctx.fillText(
            "Anzahl der Red Bull Sorten pro Sternebewertung",
            20,
            20
        );
    }

    drawChart();
}