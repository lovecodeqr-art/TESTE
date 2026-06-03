// ==========================================================================
// 🛠️ ÁREA DE CONFIGURAÇÕES DO CASAL (ALTERE APENAS ESTA SEÇÃO PARA PERSONALIZAR)
// ==========================================================================
const CONFIG = {
    // 🎵 APENAS O ID DO VÍDEO DO YOUTUBE (Exemplo: se o link é youtube.com/watch?v=TynFsTZlGDU, o ID é TynFsTZlGDU)
    idYouTube: "TynFsTZlGDU",
    
    // Nome da música que vai aparecer no painel flutuante
    nomeMusica: "Nossa Música Favorita 💕",

    // Nomes do Casal
    nomeEle: "João",
    nomeEla: "Maria",
    
    // Data de início do relacionamento: Ano, Mês (Atenção: Janeiro é 0, Junho é 5, Dezembro é 11), Dia, Hora, Minuto
    dataInicio: new Date(2025, 5, 12, 0, 0, 0), 
    
    // Subtítulo romântico que aparece no slider do iPhone
    subtitulo: "Cada segundo ao seu lado vale a eternidade",
    
    // Texto da carta romântica (use <p>Parágrafo</p> para separar os blocos de texto)
    textoCarta: `
        <p>Maria, desde o momento em que você entrou na minha vida, tudo ganhou mais cor e mais sentido. Cada risada compartilhada, cada plano para o futuro e cada pequeno detalhe do dia a dia ao seu lado se transformaram nos meus momentos favoritos do mundo.</p>
        <p>Este espaço é apenas um pedacinho de tudo o que eu sinto por você. Obrigado por ser minha companheira, minha melhor amiga e o amor da minha vida. Eu te amo hoje, amanhã e para sempre! 💕</p>
    `,

    // Caminho das 10 Fotos do Slider Inicial (Formato iPhone)
    fotosSlider: [
        "imag/foto1.jpg", "imag/foto2.jpg", "imag/foto3.jpg", "imag/foto4.jpg", "imag/foto5.jpg"
    ],

    // Caminho das 10 Fotos da Galeria em Carrossel (Fotos menores abaixo)
    fotosGaleria: [
        "imag/foto6.jpg", "imag/foto7.jpg", "imag/foto8.jpg", "imag/foto9.jpg"
    ],

    // 📸 BANCO DE FOTOS PARA O JOGO DA MEMÓRIA
    // O sistema escolherá 4 fotos desta lista aleatoriamente a cada carregamento
    fotosJogo: [
        "imag/foto1.jpg", "imag/foto2.jpg", "imag/foto3.jpg", "imag/foto4.jpg", "imag/foto5.jpg",
        "imag/foto6.jpg", "imag/foto7.jpg", "imag/foto8.jpg", "imag/foto9.jpg", "imag/foto10.jpg"
    ]
};

// ==========================================================================
// 🚀 SISTEMA AUTOMÁTICO (NÃO É NECESSÁRIO ALTERAR NADA DAQUI PARA BAIXO)
// ==========================================================================

const giftBox = document.querySelector("#giftBox");
const giftScreen = document.querySelector("#gift-screen");
const mainContent = document.querySelector("#main-content");
let ytPlayer; 

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('audioBackgroundIframe', {
        height: '1',
        width: '1',
        videoId: CONFIG.idYouTube,
        playerVars: {
            'autoplay': 0,
            'loop': 1,
            'playlist': CONFIG.idYouTube,
            'controls': 0,
            'showinfo': 0,
            'rel': 0,
            'modestbranding': 1
        }
    });
}

function aplicarConfiguracoes() {
    if(document.getElementById("txtNomeEle")) document.getElementById("txtNomeEle").innerText = CONFIG.nomeEle;
    if(document.getElementById("txtNomeEla")) document.getElementById("txtNomeEla").innerText = CONFIG.nomeEla;
    if(document.getElementById("txtSubtitulo")) document.getElementById("txtSubtitulo").innerText = CONFIG.subtitulo;
    if(document.getElementById("boxTextoCarta")) document.getElementById("boxTextoCarta").innerHTML = CONFIG.textoCarta;
    if(document.getElementById("txtNomeMusica")) document.getElementById("txtNomeMusica").innerText = CONFIG.nomeMusica;

    const sliderContainer = document.getElementById("sliderDinamico");
    if(sliderContainer) {
        sliderContainer.innerHTML = "";
        CONFIG.fotosSlider.forEach((foto, index) => {
            sliderContainer.innerHTML += `<div class="slide fade"><img src="${foto}" alt="Foto ${index + 1}"></div>`;
        });
    }

    const carrosselTrack = document.getElementById("carouselTrack");
    if(carrosselTrack) {
        carrosselTrack.innerHTML = "";
        CONFIG.fotosGaleria.forEach((foto, index) => {
            carrosselTrack.innerHTML += `<div class="carousel-item"><img src="${foto}" alt="Galeria ${index + 1}"></div>`;
        });
    }
}

aplicarConfiguracoes();

if(giftBox) {
    giftBox.addEventListener("click", abrirPresente);
}

function abrirPresente(){
    giftScreen.style.opacity = "0";
    mainContent.style.display = "flex";

    if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
        ytPlayer.playVideo();
    }

    const musicControl = document.getElementById("musicPlayerControl");
    if(musicControl) {
        musicControl.classList.add("show");
    }

    startSlideshow();
    updateTimer();
    setInterval(updateTimer, 1000);
    startAutoCarousel();
    initMemoryGame();

    setTimeout(function(){
        giftScreen.style.display = "none";
    }, 1000);
}

let slideIndex = 0;
let slideshowTimeout;

function startSlideshow(){
    const slides = document.querySelectorAll(".slide");
    if (slides.length === 0) return;

    slides.forEach(slide => { slide.style.display = "none"; });
    slideIndex++;
    if(slideIndex > slides.length){ slideIndex = 1; }
    slides[slideIndex - 1].style.display = "block";

    clearTimeout(slideshowTimeout);
    slideshowTimeout = setTimeout(startSlideshow, 3500);
}

function updateTimer(){
    const now = new Date();
    const difference = now - CONFIG.dataInicio;

    if (difference < 0) return;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if(document.querySelector("#days")) document.querySelector("#days").innerText = String(days).padStart(2, '0');
    if(document.querySelector("#hours")) document.querySelector("#hours").innerText = String(hours).padStart(2, '0');
    if(document.querySelector("#minutes")) document.querySelector("#minutes").innerText = String(minutes).padStart(2, '0');
    if(document.querySelector("#seconds")) document.querySelector("#seconds").innerText = String(seconds).padStart(2, '0');
}

let carouselIndex = 0;
let carouselTimeout;

function moveCarousel(direction) {
    const track = document.getElementById("carouselTrack");
    const items = document.querySelectorAll(".carousel-item");
    if(!items || items.length === 0) return;
    
    let itemsPerView = window.innerWidth <= 768 ? 1 : 3;
    let maxIndex = items.length - itemsPerView;

    carouselIndex += direction;

    if (carouselIndex > maxIndex) { carouselIndex = 0; } 
    else if (carouselIndex < 0) { carouselIndex = maxIndex; }

    let amountToMove = items[0].getBoundingClientRect().width;
    if(track) {
        track.style.transform = `translateX(-${carouselIndex * amountToMove}px)`;
    }
    
    resetCarouselAutoPlay();
}

function startAutoCarousel() {
    carouselTimeout = setInterval(() => { moveCarousel(1); }, 3000);
}

function resetCarouselAutoPlay() {
    clearInterval(carouselTimeout);
    startAutoCarousel();
}

window.addEventListener('resize', () => {
    const track = document.getElementById("carouselTrack");
    if(track) {
        track.style.transform = `translateX(0px)`;
        carouselIndex = 0;
    }
});

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let totalMatchesFound = 0;

function initMemoryGame() {
    const grid = document.getElementById("memoryGameGrid");
    if(!grid) return;
    grid.innerHTML = "";
    if(document.getElementById("gameWinMessage")) document.getElementById("gameWinMessage").style.display = "none";
    totalMatchesFound = 0;

    const fotosSelecionadas = [...CONFIG.fotosJogo]
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

    let cartasDoJogo = [...fotosSelecionadas, ...fotosSelecionadas];
    cartasDoJogo.sort(() => 0.5 - Math.random());

    cartasDoJogo.forEach(foto => {
        const card = document.createElement("div");
        card.classList.add("memory-card");
        card.dataset.photo = foto;

        card.innerHTML = `
            <div class="front-face">
                <img src="${foto}" alt="Foto Jogo">
            </div>
            <div class="back-face">❤</div>
        `;

        card.addEventListener("click", flipCard);
        grid.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.photo === secondCard.dataset.photo;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    
    totalMatchesFound++;
    if(totalMatchesFound === 4) {
        setTimeout(() => { 
            if(document.getElementById("gameWinMessage")) document.getElementById("gameWinMessage").style.display = "block"; 
        }, 500);
    }
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 1200);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
