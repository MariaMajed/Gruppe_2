class Plaetzchen {
    name = "Neues Plätzchen";
    bild = "default_plätzchen.jpg";
    zutaten = [];
    anweisungen = ["Nicht definiert"];
    status = PlaetzchenStatus[1];
    favorit = false;
    constructor(name, bild, zutaten, anweisungen) {
        this.name = name;
        this.bild = bild;
        this.zutaten = zutaten;
        this.anweisungen = anweisungen;
    }
}

class Zutat {
    name = "Neue Zutat";
    menge = 0;
    masseinheit = "";
    constructor(name, menge, masseinheit) {
        this.name = name;
        this.menge = menge;
        this.masseinheit = masseinheit;
    }
}

let PlaetzchenStatus = {
    1: "Noch nicht angefangen",
    2: "Teig wird zubereitet",
    3: "Teig Fertig",
    4: "Im Ofen",
    5: "Fertig"
};

let plaetzchenListe = [
    new Plaetzchen(
        "Zimtsterne",
        "zimtsterne.jpg",
        [new Zutat("Mandeln", 200, "g"),new Zutat("Eiweiß", 2, "Stücke"), new Zutat("Puderzucker", 100, "g"), new Zutat("Zimt", 5, "g")],
        ["Eiweiß steif schlagen.", "Puderzucker einrühren.", "Mandeln und Zimt dazugeben.", "Sterne ausstechen.", "Bei 150°C backen."]
    ),

    new Plaetzchen(
        "Vanillekipferl",
        "vanillekipferl.jpg",
        [new Zutat("Mehl", 250, "g"), new Zutat("Butter", 200, "g"), new Zutat("Zucker", 80, "g"), new Zutat("Mandeln", 100, "g")],
        ["Teig kneten.", "Kipferl formen.", "Bei 180°C backen.", "In Vanillezucker wälzen."]
    ),

    new Plaetzchen(
        "Butterplätzchen",
        "butterplaetzchen.jpg",
        [new Zutat("Mehl", 300, "g"), new Zutat("Butter", 200, "g"), new Zutat("Zucker", 100, "g"), new Zutat("Ei", 1, "Stücke")],
        ["Teig kneten.", "Plätzchen ausstechen.", "Bei 180°C backen."]
    ),

    new Plaetzchen(
        "Marilleinringe",
        "Marillenringe.jpg",
        [new Zutat("Mehl", 250, "g"), new Zutat("Butter", 150, "g"), new Zutat("Zucker", 100, "g"), new Zutat("Ei", 1, "Stücke"), new Zutat("Marillenmarmelade", 200, "g")],
        ["Teig kneten.", "Ringe ausstechen.", "Mit Marmelade füllen.", "Bei 180°C backen."]
    )
];

let zutatenBestand = [
    new Zutat("Mehl", 2000, "g"),
    new Zutat("Butter", 1000, "g"),
    new Zutat("Zucker", 1500, "g"),
    new Zutat("Mandeln", 800, "g"),
    new Zutat("Ei", 10, "Stücke"),
    new Zutat("Eiweiß", 5, "Stücke"),
    new Zutat("Puderzucker", 500, "g"),
    new Zutat("Zimt", 50, "g"),
    new Zutat("Marillenmarmelade", 300, "g")
];

let aktuellesPlaetzchen = plaetzchenListe[0];

let zutatenListe = [];

function openPlaetzchenPopup() {
    document.getElementById("plaetzchenPopup").style.display = "block";
}

function openZutatenPopup() {
    createZutatSelectOptions();
    document.getElementById("zutatenPopup").style.display = "block";
}

function openCreateZutatPopup() {
    document.getElementById("createZutatPopup").style.display = "block";
}

function openRezeptPopup() {
    document.getElementById("rezeptBearbeitenZuatetenSelectPopup").style.display = "block";

    const liste = document.getElementById("zutatCheckboxListe");
    liste.innerHTML = "";

    zutatenBestand.forEach(z => {
            const div = document.createElement("div");
            div.classList.add("checkbox-item");

            div.innerHTML = '<input type="checkbox" id="zutat_' + z.name + '" value="' + z.name + '">' +
            '<label for="' + z.name + '">' + z.name + '</label>';

            if(aktuellesPlaetzchen.zutaten.some(zu => zu.name === z.name)) {
                div.querySelector("input").checked = true;
            }

            liste.appendChild(div);
    });
}

function closePopup() {
    zutatenListe = [];
    document.getElementById("plaetzchenPopup").style.display = "none";
    document.getElementById("zutatenPopup").style.display = "none";
    document.getElementById("createZutatPopup").style.display = "none";
    document.getElementById("rezeptBearbeitenZuatetenSelectPopup").style.display = "none";
    document.getElementById("rezeptBearbeitenZutatenMengenPopup").style.display = "none";
    document.getElementById("rezeptBearbeitenAnweisungenPopup").style.display = "none";
}

function refreshPlaetzchenListe() {
    let container = document.getElementById("plaetzchenContainer");
    container.innerHTML = "";

    plaetzchenListe.forEach(p => {

        let card = document.createElement("figure");
        card.className = "cookie-card";

        card.innerHTML =
            '<figcaption>' + p.name + '</figcaption>' +

            '<a href="#rezept-titel" class="cookie-link" onclick="selectPlaetzchen(\'' + p.name + '\')">' +
                '<img src="assets/Images/' + p.bild + '" alt="' + p.name + '">' +
            '</a>' +

            '<select class="cookie-status-select" onchange="updateStatus(\'' + p.name + '\', this.value)">' +
                '<option selected' + (p.status === PlaetzchenStatus[1] ? "selected" : "") + '>' + PlaetzchenStatus[1] + '</option>' +
                '<option ' + (p.status === PlaetzchenStatus[2] ? "selected" : "") + '>' + PlaetzchenStatus[2] + '</option>' +
                '<option ' + (p.status === PlaetzchenStatus[3] ? "selected" : "") + '>' + PlaetzchenStatus[3] + '</option>' +
                '<option ' + (p.status === PlaetzchenStatus[4] ? "selected" : "") + '>' + PlaetzchenStatus[4] + '</option>' +
                '<option ' + (p.status === PlaetzchenStatus[5] ? "selected" : "") + '>' + PlaetzchenStatus[5] + '</option>' +
            '</select>' +

            '<button class="remove-btn" onclick="removePlaetzchen(\'' + p.name + '\')">Entfernen</button>';

        container.appendChild(card);
    });

    addPlaetzchenCard = '<figure class="cookie-card" onclick="openPlaetzchenPopup()">' +
                            '<figcaption>Neues Plätzchen</figcaption>' +
                            '<a class="cookie-link">' +
                                '<img src="assets/Images/plus.png" alt="Neues Plätzchen hinzufügen">' +
                            '</a>' +
                            '<select class="cookie-status-select" disabled style="visibility:hidden;">' +
                                '<option></option>' +
                            '</select>' +
                            '<button class="remove-btn" disabled style="visibility:hidden;">Entfernen</button>' +
                        '</figure>';

    container.innerHTML += addPlaetzchenCard;
}

function addPlaetzchen(name, bild, zutaten, anweisungen) {
    if(name === "") {
        name = "Neues Plätzchen";
    }
    if(bild === "") {
        bild = "default_plätzchen.jpg";
    }
    if(plaetzchenListe.some(p => p.name === name)) {
        name += " " + plaetzchenListe.length;
    }

    const newPlaetzchen = new Plaetzchen(name, bild, zutaten, anweisungen);
    plaetzchenListe.push(newPlaetzchen);

    refreshPlaetzchenListe();
}

function addPlaetzchenFromPopup() {
    const name = document.getElementById("popupNameInput").value;
    const bild = document.getElementById("popupBildInput").value;
    const zutaten = [];
    const anweisungen = [];

    addPlaetzchen(name, bild, zutaten, anweisungen);
}

function removePlaetzchen(name) {
    plaetzchenListe = plaetzchenListe.filter(p => p.name !== name);
    refreshPlaetzchenListe();
}

function selectPlaetzchen(name) {
    aktuellesPlaetzchen = plaetzchenListe.find(p => p.name === name);
    refreshRezept();
}

function createPlaetzchenStatusOptions() {
    var select = document.getElementById("rezept-status");
    select.innerHTML = "";
    for (var key in PlaetzchenStatus) {
        var option = document.createElement("option");
        option.value = PlaetzchenStatus[key];
        option.textContent = PlaetzchenStatus[key];
        select.appendChild(option);
    }
}

function updateStatus(name, status) {
    const plaetzchen = plaetzchenListe.find(p => p.name === name);
    const oldStatus = plaetzchen.status;

    if (plaetzchen) {
        plaetzchen.status = status;

        if(oldStatus === "Noch nicht angefangen") {
            for (let i = 0; i < plaetzchen.zutaten.length; i++) {
                const zutat = plaetzchen.zutaten[i];
                zutatenBestand.find(z => z.name === zutat.name).menge -= zutat.menge;
            }
        }

        refreshRezept();
        refreshZutatenDiagramm();
    }
}

function rezeptBearbeitenZutatenSelect() {
    const checkboxes = document.querySelectorAll("#zutatCheckboxListe input[type='checkbox']");
    zutatenListe = [];

    checkboxes.forEach(cb => {
        if (cb.checked) {
            zutatenBestand.forEach(z => {
                if(cb.value === z.name) {
                    zutatenListe.push(new Zutat(z.name, 0, ""));
                }
            });
        }
    });

    document.getElementById("rezeptBearbeitenZuatetenSelectPopup").style.display = "none";
    document.getElementById("rezeptBearbeitenZutatenMengenPopup").style.display = "block";

    const liste = document.getElementById("zutatMengenListe");

    for(i = 0; i < zutatenListe.length; i++) {
        const div = document.createElement("div");
        div.classList.add("mengen-item");

        div.innerHTML = '<label>' + zutatenListe[i].name + '</label>' +
            '<input type="number" id="menge_' + zutatenListe[i].name + '" placeholder="Menge">';

        liste.appendChild(div);
    }
}

function rezeptBearbeitenZutatenMengen() {

    aktuellesPlaetzchen.zutaten = [];
    
    zutatenListe.forEach(z => {
        const mengeInput = document.getElementById("menge_" + z.name);
        const menge = parseInt(mengeInput.value);

        if (menge || menge > 0) {
            z.menge = menge;

            zutatenBestand.forEach(zb => {
            if(zb.name === z.name) {
                z.masseinheit = zb.masseinheit;
            }
        });
        aktuellesPlaetzchen.zutaten.push(z);
        }
    });   

    document.getElementById("rezeptBearbeitenZutatenMengenPopup").style.display = "none";
    document.getElementById("rezeptBearbeitenAnweisungenPopup").style.display = "block";
}

function rezeptBearbeitenAnweisungen() {

    const text = document.getElementById("anweisungenInput").value;
    const anweisungen = text
        .split("\n")        
        .map(a => a.trim())
        .filter(a => a !== "");       

    aktuellesPlaetzchen.anweisungen = anweisungen;    

    refreshRezept();
    closePopup();
}

function refreshRezept() {
    if (!aktuellesPlaetzchen) return;

    document.getElementById("rezept-titel").textContent = aktuellesPlaetzchen.name;

    var stern = document.querySelector("#fav-icon polygon");
    if(aktuellesPlaetzchen.favorit) {
        stern.setAttribute("fill", "#d1992e");
    } else {
        stern.setAttribute("fill", "#ddc9a3")
    }

    let zutatenListe = document.getElementById("rezept-zutaten");
    zutatenListe.innerHTML = "";
    if (aktuellesPlaetzchen.zutaten.length === 0) {
        let li = document.createElement("li");
        li.textContent = "Keine Zutaten definiert.";
        zutatenListe.appendChild(li);
    } else {
        aktuellesPlaetzchen.zutaten.forEach(z => {
            let li = document.createElement("li");
            li.textContent = z.name + ": " + z.menge + " " + z.masseinheit;
            zutatenListe.appendChild(li);
        });
    }

    let anweisungenDiv = document.getElementById("rezept-anweisungen");
    anweisungenDiv.innerHTML = "";
    let p = document.createElement("p");
    if (aktuellesPlaetzchen.anweisungen.length === 0) {
        p.textContent = "Keine Anweisungen definiert.";
        anweisungenDiv.appendChild(p);
    } else {
        for (let i = 0; i < aktuellesPlaetzchen.anweisungen.length; i++) {
            let p = document.createElement("p");
            p.textContent = (i + 1) + ". " + aktuellesPlaetzchen.anweisungen[i];
            anweisungenDiv.appendChild(p);
        }
    }

    document.getElementById("rezept-status").value = aktuellesPlaetzchen.status;
}

function setFavorit() {
    var stern = document.querySelector("#fav-icon polygon");

    if(aktuellesPlaetzchen) {
        aktuellesPlaetzchen.favorit = !aktuellesPlaetzchen.favorit;
        if(aktuellesPlaetzchen.favorit) {
            stern.setAttribute("fill", "#d1992e");
        } else {
            stern.setAttribute("fill", "#ddc9a3");
        }
    }
}

function createZutatSelectOptions() {
    var select = document.getElementById("popupZutatSelect");
    select.innerHTML = "";
    zutatenBestand.forEach(z => {
        var option = document.createElement("option");
        option.value = z.name;
        option.textContent = z.name;
        select.appendChild(option);
    });
}

function addZutat(name, menge) {
    name = document.getElementById("popupZutatSelect").value;
    menge = document.getElementById("popupMengeInput").value;
    if (!name || !menge) return;
    refreshZutatenListe(name, menge);
}

function removeZutat(name, menge) {
    name = document.getElementById("popupZutatSelect").value;
    menge = document.getElementById("popupMengeInput").value;
    if(menge > zutatenBestand.find(z => z.name === name).menge) {
        menge = zutatenBestand.find(z => z.name === name).menge;
    }
    refreshZutatenListe(name, -menge);
}

function createZutat() {
    var name = document.getElementById("createZutatNameInput").value;
    var menge = parseInt(document.getElementById("createZutatMengeInput").value);
    var masseinheit = document.getElementById("createZutatMasseinheitSelect").value;

    zutatenBestand.push(new Zutat(name, menge, masseinheit));
    refreshZutatenDiagramm();
}

function refreshZutatenListe(name, menge) {
    zutatenBestand.find(z => z.name === name).menge += parseInt(menge);
    refreshZutatenDiagramm();
}

function refreshZutatenDiagramm() {
    var canvas = document.getElementById("zutatenCanvas");
    var ctx = canvas.getContext("2d");

    var anzahl = zutatenBestand.length;
    canvas.height = anzahl * 60;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var y = 40;

    ctx.font = "600 14px Inter, Arial, sans-serif";
    var labels = zutatenBestand.map(z => z.name + ": " + z.menge + " " + z.masseinheit);
    var widestLabel = 0;
    labels.forEach(l => {
        widestLabel = Math.max(widestLabel, ctx.measureText(l).width);
    });

    var barX = 20 + widestLabel + 16;
    var availableWidth = Math.max(canvas.width - barX - 20, 20);

    var maxMenge = Math.max(1, ...zutatenBestand.map(z => z.menge));
    var scale = availableWidth / maxMenge;

    for (var i = 0; i < zutatenBestand.length; i++) {
        var zutat = zutatenBestand[i];
        var menge = zutat.menge;
        var barWidth = Math.max(menge * scale, 2);
        var barHeight = 20;
        var barY = y - 15;

        ctx.fillStyle = "#3a2415";
        ctx.font = "600 14px Inter, Arial, sans-serif";
        ctx.fillText(labels[i], 20, y);

        var barColor = menge <= 0 ? "#ab3626" : (i % 2 === 0 ? "#ab3626" : "#d1992e");
        ctx.fillStyle = barColor;
        if (ctx.roundRect) {
            ctx.beginPath();
            ctx.roundRect(barX, barY, barWidth, barHeight, 5);
            ctx.fill();
        } else {
            ctx.fillRect(barX, barY, barWidth, barHeight);
        }

        y += 50;
    }
}

function playSound() {
    const audio = document.getElementById("sound");
    audio.currentTime = 0;
    audio.play();
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(14);

    doc.text("Plätzchen Übersicht", 10, 10);

    let y = 20;

    plaetzchenListe.forEach(p => {
        if(p.status === "Noch nicht angefangen")
        doc.setFontSize(12);
        doc.text(p.name, 10, y);
        y += 6;

        if (p.zutaten.length === 0) {
            doc.text("  Keine Zutaten definiert.", 10, y);
            y += 8;
        } else {
            p.zutaten.forEach(z => {
                const line = `  - ${z.name}: ${z.menge} ${z.masseinheit}`;
                doc.text(line, 10, y);
                y += 6;

                if (y > 280) {
                    doc.addPage();
                    y = 20;
                }
            });
            y += 4;
        }

        y += 6;
    });

    doc.save("plaetzchen.pdf");
}

window.onload = function() {
    refreshPlaetzchenListe();
    refreshZutatenDiagramm();
    createPlaetzchenStatusOptions();

    document.getElementById("introOverlay").addEventListener("click", function() {
        this.style.display = "none";
    });
};






