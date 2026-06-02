// ==========================
// ELEMENTOS
// ==========================

const giftBox = document.querySelector("#giftBox");

const giftScreen = document.querySelector("#gift-screen");

const mainContent = document.querySelector("#main-content");

// ==========================
// DATA RELACIONAMENTO
// ==========================

const START_DATE = new Date(2025, 5, 12, 0, 0, 0);

// ==========================
// ABRIR PRESENTE
// ==========================

giftBox.addEventListener("click", abrirPresente);

function abrirPresente(){

    // SUMIR PRESENTE

    giftScreen.style.opacity = "0";

    // AGUARDA ANIMAÇÃO

    setTimeout(function(){

        // ESCONDE PRESENTE

        giftScreen.style.display = "none";

        // MOSTRA CONTEÚDO

        mainContent.style.display = "flex";

        // INICIA SLIDESHOW

        startSlideshow();

        // INICIA TIMER

        updateTimer();

        setInterval(updateTimer, 1000);

    },1000);

}

// ==========================
// SLIDESHOW
// ==========================

let slideIndex = 0;

function startSlideshow(){

    const slides = document.querySelectorAll(".slide");

    slides.forEach(slide => {

        slide.style.display = "none";

    });

    slideIndex++;

    if(slideIndex > slides.length){

        slideIndex = 1;

    }

    slides[slideIndex - 1].style.display = "block";

    setTimeout(startSlideshow, 3500);

}

// ==========================
// CONTADOR
// ==========================

function updateTimer(){

    const now = new Date();

    const difference = now - START_DATE;

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (difference % (1000 * 60)) / 1000
    );

    document.querySelector("#days").innerText = days;
    document.querySelector("#hours").innerText = hours;
    document.querySelector("#minutes").innerText = minutes;
    document.querySelector("#seconds").innerText = seconds;

}
```
