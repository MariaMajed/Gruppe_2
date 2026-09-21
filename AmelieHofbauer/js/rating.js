const ratings = document.querySelectorAll(".rating");

ratings.forEach(function (rating) {

    const value = Number(rating.dataset.rating);

    if (value < 1 || value > 5) {
        return;
    }

    /* Barrierefreiheit */
    rating.setAttribute("role", "img");
    rating.setAttribute(
        "aria-label",
        value + " von 5 Sternen"
    );


    /* Sterne erzeugen */
    for (let i = 1; i <= 5; i++) {

        const star = document.createElement("img");

        if (i <= value) {
            star.src = "assets/svg/star.svg";
        } else {
            star.src = "assets/svg/empty_star.svg";
        }

        star.alt = "";
        star.setAttribute("aria-hidden", "true");

        rating.appendChild(star);
    }


    /* Zahlenwert erzeugen */
    const ratingValue = document.createElement("span");

    ratingValue.className = "rating-value";
    ratingValue.textContent = value + " / 5";
    ratingValue.setAttribute("aria-hidden", "true");

    rating.appendChild(ratingValue);

});