// ==========================================================================
// 🛠️ ÁREA DE CONFIGURAÇÕES DO CASAL (ALTE RE APENAS ESTA SEÇÃO PARA PERSONALIZAR)
// ==========================================================================
const CONFIG = {
    // Nomes do Casal
    nomeEle: "João",
    nomeEla: "Maria",
    
    // Data de início do relacionamento: Ano, Mês (Atenção: Janeiro é 0, Junho é 5, Dezembro é 11), Dia, Hora, Minuto
    dataInicio: new Date(2025, 5, 12, 0, 0, 0), 
    
    // Link completo do YouTube para a música de fundo
    // Dica: Certifique-se de manter o "?autoplay=1&loop=1..." para tocar sozinho!
    linkMusica: "https://www.youtube.com/embed/TynFsTZlGDU?autoplay=1&loop=1&playlist=TynFsTZlGDU",
    
    // Subtítulo romântico que aparece no slider do iPhone
    subtitulo: "Cada segundo ao seu lado vale a eternidade",
    
    // Texto da carta romântica (use <p>Parágrafo</p> para separar os blocos de texto)
    textoCarta: `
        <p>Vanessa, desde o momento em que você entrou na minha vida, tudo ganhou mais cor e mais sentido. Cada risada compartilhada, cada plano para o futuro e cada pequeno detalhe do dia a dia ao seu lado se transformaram nos meus momentos favoritos do mundo.</p>
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

    // Banco de Frases para o Jogo da Memória (O sistema escolhe 4 aleatórias a cada carregamento)
    poolFrasesJogo: [
        "Você é meu sol nos dias nublados ☀️",
        "Te amo mais a cada segundo ❤️",
        "Minha parte favorita do dia é você 🥰",
        "Nosso amor foi a melhor escolha 🌹",
        "Você é o meu lar preferido 🏡",
        "Com você o mundo é mais bonito 🌎",
        "Meu coração bate no seu ritmo 💓",
        "Juntos somos invencíveis 💑",
        "Seu abraço é o meu porto seguro ⚓",
        "Você é meu sonho que virou realidade ✨"
    ]
};

// ==========================================================================
// 🚀 SISTEMA AUTOMÁTICO (NÃO É NECESSÁRIO ALTERAR NADA DAQUI PARA BAIXO)
// ==========================================================================

const giftBox = document.querySelector("#giftBox");
const giftScreen = document.querySelector("#gift-screen");
const mainContent = document.querySelector("#main-content");

// Aplica as configurações iniciais de texto e mídia no HTML automaticamente
function aplicarConfiguracoes() {
    document.getElementById("txtNomeEle").innerText = CONFIG.nomeEle;
    document.getElementById("txtNomeEla").innerText = CONFIG.nomeEla;
    document.getElementById("txtSubtitulo").innerText = CONFIG.subtitulo;
    document.getElementById("videoPlayer").src = CONFIG.linkMusica;
    document.getElementById("boxTextoCarta").innerHTML = CONFIG.textoCarta;

    // Monta o Slider Inicial do iPhone dinamicamente
    const sliderContainer = document.getElementById("sliderDinamico");
    sliderContainer.innerHTML = "";
    CONFIG.fotosSlider.forEach((foto, index) => {
        sliderContainer.innerHTML += `<div class="slide fade"><img src="${foto}" alt="Foto ${index + 1}"></div>`;
    });

    // Monta o Carrossel de Fotos dinamicamente
    const carrosselTrack = document.getElementById("carouselTrack");
    carrosselTrack.innerHTML = "";
    CONFIG.fotosGaleria.forEach((foto, index) => {
        carrosselTrack.innerHTML += `<div class="carousel-item"><img src="${foto}" alt="Galeria ${index + 1}"></div>`;
    });
}

// Executa a injeção dos dados assim que a página abre
aplicarConfiguracoes();

giftBox.addEventListener("click", abrirPresente);

function abrirPresente(){
    giftScreen.style.opacity = "0";
    mainContent.style.display = "flex";

    startSlideshow();
    updateTimer();
    setInterval(updateTimer, 1000);
    startAutoCarousel();
    initMemoryGame();

    setTimeout(function(){
        giftScreen.style.display = "none";
    }, 1000);
}

// SLIDESHOW INTERNO DO IPHONE
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

// CONTADOR DE TEMPO JUNTOS
function updateTimer(){
    const now = new Date();
    const difference = now - CONFIG.dataInicio;

    if (difference < 0) return;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.querySelector("#days").innerText = String(days).padStart(2, '0');
    document.querySelector("#hours").innerText = String(hours).padStart(2, '0');
    document.querySelector("#minutes").innerText = String(minutes).padStart(2, '0');
    document.querySelector("#seconds").innerText = String(seconds).padStart(2, '0');
}

// CARROSSEL AUTOMÁTICO
let carouselIndex = 0;
let carouselTimeout;

function moveCarousel(direction) {
    const track = document.getElementById("carouselTrack");
    const items = document.querySelectorAll(".carousel-item");
    if(items.length === 0) return;
    
    let itemsPerView = window.innerWidth <= 768 ? 1 : 3;
    let maxIndex = items.length - itemsPerView;

    carouselIndex += direction;

    if (carouselIndex > maxIndex) { carouselIndex = 0; } 
    else if (carouselIndex < 0) { carouselIndex = maxIndex; }

    let amountToMove = items[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${carouselIndex * amountToMove}px)`;
    
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

// JOGO DA MEMÓRIA COM FRASES
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let totalMatchesFound = 0;

function initMemoryGame() {
    const grid = document.getElementById("memoryGameGrid");
    if(!grid) return;
    grid.innerHTML = "";
    document.getElementById("gameWinMessage").style.display = "none";
    totalMatchesFound = 0;

    const frasesSelecionadas = [...CONFIG.poolFrasesJogo]
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

    let cartasDoJogo = [...frasesSelecionadas, ...frasesSelecionadas];
    cartasDoJogo.sort(() => 0.5 - Math.random());

    cartasDoJogo.forEach(frase => {
        const card = document.createElement("div");
        card.classList.add("memory-card");
        card.dataset.phrase = frase;

        card.innerHTML = `
            <div class="front-face">${frase}</div>
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
    let isMatch = firstCard.dataset.phrase === secondCard.dataset.phrase;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    
    totalMatchesFound++;
    if(totalMatchesFound === 4) {
        setTimeout(() => { document.getElementById("gameWinMessage").style.display = "block"; }, 500);
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
