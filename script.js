// ==========================================================================
// 🛠️ ÁREA DE CONFIGURAÇÕES DO CASAL (ALTERE APENAS ESTA SEÇÃO PARA PERSONALIZAR)
// ==========================================================================
const CONFIG = {
    // 🎵 APENAS O ID DO VÍDEO DO YOUTUBE (Exemplo: se o link é youtube.com/watch?v=TynFsTZlGDU, o ID é TynFsTZlGDU)
    idYouTube: "TynFsTZlGDU",
    
    // Nome da música que vai aparecer no painel flutuante após o clique
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

    // Caminho das Fotos do Slider Inicial (Formato iPhone)
    fotosSlider: [
        "imag/foto1.jpg", "imag/foto2.jpg", "imag/foto3.jpg", "imag/foto4.jpg", "imag/foto5.jpg",
        "imag/foto6.jpg", "imag/foto7.jpg", "imag/foto8.jpg"
    ],

    // Caminho das Fotos da Galeria em Carrossel (Fotos menores abaixo)
    fotosGaleria: [
        "imag/foto9.jpg", "imag/foto10.jpg", "imag/foto11.jpg", "imag/foto12.jpg", "imag/foto13.jpg"
    ],

    // 📸 BANCO DE FOTOS PARA O JOGO DA MEMÓRIA
    fotosJogo: [
        "imag/foto1.jpg", "imag/foto2.jpg", "imag/foto3.jpg", "imag/foto4.jpg", "imag/foto5.jpg",
        "imag/foto6.jpg", "imag/foto7.jpg", "imag/foto8.jpg", "imag/foto9.jpg", "imag/foto10.jpg"
    ],

    // 🔍 PALAVRAS PARA O CAÇA-PALAVRAS ROMÂNTICO
    // Use palavras de até 9 letras para encaixar perfeitamente na tabela do celular.
    palavrasCaca: ["AMOR", "SEMPRE", "BEIJO", "DESTINO", "JOAO", "MARIA"]
};

// ==========================================================================
// 🚀 SISTEMA AUTOMÁTICO (NÃO É NECESSÁRIO ALTERAR NADA DAQUI PARA BAIXO)
// ==========================================================================

const giftBox = document.querySelector("#giftBox");
const giftScreen = document.querySelector("#gift-screen");
const mainContent = document.querySelector("#main-content");
const musicControl = document.getElementById("musicPlayerControl");
const txtNomeMusica = document.getElementById("txtNomeMusica");
const playerIcon = document.getElementById("playerIcon");

let ytPlayer; 
let isPlaying = false;

// Inicializa o script do YouTube
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
        },
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        isPlaying = true;
        playerIcon.classList.add("playing");
        txtNomeMusica.innerText = CONFIG.nomeMusica;
    } else {
        isPlaying = false;
        playerIcon.classList.remove("playing");
    }
}

function aplicarConfiguracoes() {
    if(document.getElementById("txtNomeEle")) document.getElementById("txtNomeEle").innerText = CONFIG.nomeEle;
    if(document.getElementById("txtNomeEla")) document.getElementById("txtNomeEla").innerText = CONFIG.nomeEla;
    if(document.getElementById("txtSubtitulo")) document.getElementById("txtSubtitulo").innerText = CONFIG.subtitulo;
    if(document.getElementById("boxTextoCarta")) document.getElementById("boxTextoCarta").innerHTML = CONFIG.textoCarta;

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
    if(giftScreen) giftScreen.style.opacity = "0";
    if(mainContent) mainContent.style.display = "flex";

    if(musicControl) {
        musicControl.classList.add("show");
    }

    startSlideshow();
    updateTimer();
    setInterval(updateTimer, 1000);
    startAutoCarousel();
    initMemoryGame();
    initWordSearch(); // Inicializa o Caça-Palavras

    setTimeout(function(){
        if(giftScreen) giftScreen.style.display = "none";
    }, 1000);
}

if(musicControl) {
    musicControl.addEventListener("click", function() {
        if (!ytPlayer || typeof ytPlayer.playVideo !== 'function') return;
        if (!isPlaying) {
            ytPlayer.playVideo();
            isPlaying = true;
            playerIcon.classList.add("playing");
            txtNomeMusica.innerText = CONFIG.nomeMusica;
        } else {
            ytPlayer.pauseVideo();
            isPlaying = false;
            playerIcon.classList.remove("playing");
            txtNomeMusica.innerText = "Clique para ouvir 🎵";
        }
    });
}

// SLIDESHOW MOLDURA IPHONE
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
    if(document.querySelector("#days")) document.querySelector("#days").innerText = String(days).padStart(2, '0');
    if(document.querySelector("#hours")) document.querySelector("#hours").innerText = String(hours).padStart(2, '0');
    if(document.querySelector("#minutes")) document.querySelector("#minutes").innerText = String(minutes).padStart(2, '0');
    if(document.querySelector("#seconds")) document.querySelector("#seconds").innerText = String(seconds).padStart(2, '0');
}

// CARROSSEL AUTOMÁTICO
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
    if(track) track.style.transform = `translateX(-${carouselIndex * amountToMove}px)`;
    resetCarouselAutoPlay();
}
function startAutoCarousel() { carouselTimeout = setInterval(() => { moveCarousel(1); }, 3000); }
function resetCarouselAutoPlay() { clearInterval(carouselTimeout); startAutoCarousel(); }
window.addEventListener('resize', () => {
    const track = document.getElementById("carouselTrack");
    if(track) { track.style.transform = `translateX(0px)`; carouselIndex = 0; }
});

// ==========================================================================
// JOGO DA MEMÓRIA
// ==========================================================================
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

    const fotosSelecionadas = [...CONFIG.fotosJogo].sort(() => 0.5 - Math.random()).slice(0, 4);
    let cartasDoJogo = [...fotosSelecionadas, ...fotosSelecionadas].sort(() => 0.5 - Math.random());

    cartasDoJogo.forEach(foto => {
        const card = document.createElement("div");
        card.classList.add("memory-card");
        card.dataset.photo = foto;
        card.innerHTML = `<div class="front-face"><img src="${foto}" alt="Foto"></div><div class="back-face">❤</div>`;
        card.addEventListener("click", flipCard);
        grid.appendChild(card);
    });
}
function flipCard() {
    if (lockBoard || this === firstCard) return;
    this.classList.add("flip");
    if (!hasFlippedCard) { hasFlippedCard = true; firstCard = this; return; }
    secondCard = this;
    let isMatch = firstCard.dataset.photo === secondCard.dataset.photo;
    isMatch ? disableCards() : unflipCards();
}
function disableCards() {
    firstCard.removeEventListener("click", flipCard); secondCard.removeEventListener("click", flipCard);
    totalMatchesFound++;
    if(totalMatchesFound === 4) {
        setTimeout(() => { if(document.getElementById("gameWinMessage")) document.getElementById("gameWinMessage").style.display = "block"; }, 500);
    }
    resetBoard();
}
function unflipCards() {
    lockBoard = true;
    setTimeout(() => { firstCard.classList.remove("flip"); secondCard.classList.remove("flip"); resetBoard(); }, 1200);
}
function resetBoard() { [hasFlippedCard, lockBoard] = [false, false]; [firstCard, secondCard] = [null, null]; }

// ==========================================================================
// NUEVO JOGO: CAÇA-PALAVRAS ROMÂNTICO
// ==========================================================================
const gridSize = 10; // Matriz de 10x10 ideal para celular
let gridMatrix = [];
let foundWords = [];
let isSelectingWords = false;
let selectedCellsList = [];

function initWordSearch() {
    const wordListUl = document.getElementById("wordListUl");
    const gridContainer = document.getElementById("wordSearchGrid");
    if(!wordListUl || !gridContainer) return;

    wordListUl.innerHTML = "";
    gridContainer.innerHTML = "";
    foundWords = [];
    document.getElementById("wordSearchWinMessage").style.display = "none";

    // Cria a lista lateral de palavras para achar
    CONFIG.palavrasCaca.forEach(word => {
        wordListUl.innerHTML += `<li id="word-list-${word.toUpperCase()}">${word.toUpperCase()}</li>`;
    });

    // Gera a matriz vazia preenchida com espaços
    gridMatrix = Array(gridSize).fill(null).map(() => Array(gridSize).fill(""));

    // Tenta embutir as palavras configuradas na matriz de forma inteligente
    CONFIG.palavrasCaca.forEach(word => {
        let placed = false;
        let attempts = 0;
        word = word.toUpperCase();

        while (!placed && attempts < 100) {
            let direction = Math.floor(Math.random() * 2); // 0 = Horizontal, 1 = Vertical
            let row = Math.floor(Math.random() * gridSize);
            let col = Math.floor(Math.random() * gridSize);

            if (canPlaceWord(word, row, col, direction)) {
                placeWord(word, row, col, direction);
                placed = true;
            }
            attempts++;
        }
    });

    // Preenche as lacunas restantes com letras aleatórias limpas
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            if (gridMatrix[r][c] === "") {
                gridMatrix[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
            }
        }
    }

    // Renderiza a tabela na tela injetando os eventos de clique por célula
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("ws-cell");
            cellDiv.innerText = gridMatrix[r][c];
            cellDiv.dataset.row = r;
            cellDiv.dataset.col = c;

            // Eventos unificados para computador e toque mobile
            cellDiv.addEventListener("mousedown", startWordSelection);
            cellDiv.addEventListener("mouseenter", elementSelectionHover);
            gridContainer.appendChild(cellDiv);
        }
    }

    window.addEventListener("mouseup", endWordSelection);
    // Suporte específico para arrastar o dedo no Mobile Touch
    gridContainer.addEventListener("touchmove", handleMobileTouchMove, {passive: false});
    gridContainer.addEventListener("touchend", endWordSelection);
}

function canPlaceWord(word, row, col, direction) {
    if (direction === 0 && col + word.length > gridSize) return false;
    if (direction === 1 && row + word.length > gridSize) return false;

    for (let i = 0; i < word.length; i++) {
        let r = direction === 1 ? row + i : row;
        let c = direction === 0 ? col + i : col;
        if (gridMatrix[r][c] !== "" && gridMatrix[r][c] !== word[i]) return false;
    }
    return true;
}

function placeWord(word, row, col, direction) {
    for (let i = 0; i < word.length; i++) {
        let r = direction === 1 ? row + i : row;
        let c = direction === 0 ? col + i : col;
        gridMatrix[r][c] = word[i];
    }
}

function startWordSelection(e) {
    isSelectingWords = true;
    selectedCellsList = [];
    selectCellElement(this);
}

function elementSelectionHover() {
    if (!isSelectingWords) return;
    selectCellElement(this);
}

function handleMobileTouchMove(e) {
    if (!isSelectingWords) isSelectingWords = true;
    e.preventDefault();
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element && element.classList.contains("ws-cell")) {
        selectCellElement(element);
    }
}

function selectCellElement(cell) {
    if (cell.classList.contains("found") || selectedCellsList.includes(cell)) return;
    cell.classList.add("selecting");
    selectedCellsList.push(cell);
}

function endWordSelection() {
    if (!isSelectingWords) return;
    isSelectingWords = false;

    // Constrói a palavra com base nas células selecionadas pelo usuário
    let builtWord = selectedCellsList.map(cell => cell.innerText).join("");
    let reverseWord = builtWord.split("").reverse().join("");

    let matchedWord = "";
    if (CONFIG.palavrasCaca.map(w => w.toUpperCase()).includes(builtWord)) matchedWord = builtWord;
    else if (CONFIG.palavrasCaca.map(w => w.toUpperCase()).includes(reverseWord)) matchedWord = reverseWord;

    if (matchedWord !== "" && !foundWords.includes(matchedWord)) {
        foundWords.push(matchedWord);
        selectedCellsList.forEach(cell => {
            cell.classList.remove("selecting");
            cell.classList.add("found");
        });
        const listElement = document.getElementById(`word-list-${matchedWord}`);
        if (listElement) listElement.classList.add("word-found-line");
        
        // Verifica vitória
        if (foundWords.length === CONFIG.palavrasCaca.length) {
            document.getElementById("wordSearchWinMessage").style.display = "block";
        }
    } else {
        selectedCellsList.forEach(cell => cell.classList.remove("selecting"));
    }
    selectedCellsList = [];
}
