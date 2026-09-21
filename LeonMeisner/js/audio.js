var navSound = document.getElementById("navSound");
var navLinks = document.querySelectorAll("nav a");
var muteButton = document.getElementById("muteButton");

muteButton.addEventListener("click", function() {
    navSound.muted = !navSound.muted;
    if (navSound.muted === true) {
        muteButton.textContent = "Ton aus";
    } else {
        muteButton.textContent = "Ton an";
    }
});

navLinks.forEach(function(link) {
    link.addEventListener("click", function() {

        navSound.currentTime = 0;

        navSound.play();

    });
}); 