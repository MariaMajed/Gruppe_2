document.addEventListener("DOMContentLoaded", () => {
  const marker = document.querySelectorAll(".marker");
  const ortsInfo = document.getElementById("ortsInfo");

  function zeigeOrtsInfo(el) {
    marker.forEach(m => m.classList.remove("active"));
    el.classList.add("active");

    const ort = el.dataset.ort;
    const intro = el.dataset.intro;
    const bild = el.dataset.bild;

    ortsInfo.innerHTML = `
      <img src="${bild}" alt="Ansicht von ${ort}" class="orts-info-bild">
      <h3>${ort}</h3>
      <p>${intro}</p>
    `;
  }

  marker.forEach(el => {
    el.addEventListener("click", () => zeigeOrtsInfo(el));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        zeigeOrtsInfo(el);
      }
    });
  });
});