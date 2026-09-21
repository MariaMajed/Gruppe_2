const audioButton = document.getElementById("openCanButton");
const canAudio = document.getElementById("canOpeningAudio");

audioButton.addEventListener("click", function () {
    canAudio.currentTime = 0;
    canAudio.play();
});