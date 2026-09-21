const video = document.getElementById("heroVideo");
const button = document.getElementById("videoButton");

button.addEventListener("click", function () {

    if (video.paused) {
        video.play();
        button.textContent = "Video pausieren";
    } else {
        video.pause();
        button.textContent = "Video abspielen";
    }

});