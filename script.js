document.addEventListener('DOMContentLoaded', function() {
    // Configurações
    const slideInterval = 5000; // 5 segundos
    let currentSlide = 0;
    let slideCount;
    let autoplayActive = true;
    let autoplayTimer;
    let countdownTimer;
    let countdownValue = slideInterval / 1000;
    
    // Elementos DOM
    const slidesContainer = document.querySelector('.carousel-slides');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    const autoplayToggle = document.querySelector('.autoplay-toggle');
    const countdownDisplay = document.getElementById('countdown');
    
    slideCount = slides.length;
    
    // Criar indicadores
    for (let i = 0; i < slideCount; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }
    
    const indicators = document.querySelectorAll('.indicator');
    
    // Função para ir para um slide específico
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarousel();
        resetAutoplay();
    }
    
    // Função para atualizar o carousel
    function updateCarousel() {
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Atualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Função para avançar para o próximo slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateCarousel();
    }
    
    // Função para voltar ao slide anterior
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateCarousel();
    }
    
    // Função para iniciar o autoplay
    function startAutoplay() {
        if (autoplayActive) {
            autoplayTimer = setInterval(nextSlide, slideInterval);
            startCountdown();
        }
    }
    
    // Função para parar o autoplay
    function stopAutoplay() {
        clearInterval(autoplayTimer);
        clearInterval(countdownTimer);
    }
    
    // Função para reiniciar o autoplay
    function resetAutoplay() {
        stopAutoplay();
        if (autoplayActive) {
            startAutoplay();
        }
    }
    
    // Função para iniciar a contagem regressiva
    function startCountdown() {
        countdownValue = slideInterval / 1000;
        countdownDisplay.textContent = countdownValue;
        
        countdownTimer = setInterval(() => {
            countdownValue--;
            countdownDisplay.textContent = countdownValue;
            
            if (countdownValue <= 0) {
                countdownValue = slideInterval / 1000;
            }
        }, 1000);
    }
    
    // Event listeners para os botões de navegação
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });
    
    // Event listener para o botão de autoplay
    autoplayToggle.addEventListener('click', () => {
        autoplayActive = !autoplayActive;
        
        if (autoplayActive) {
            autoplayToggle.textContent = 'Pausar Autoplay';
            startAutoplay();
        } else {
            autoplayToggle.textContent = 'Retomar Autoplay';
            stopAutoplay();
            countdownDisplay.textContent = 'Pausado';
        }
    });
    
    // Iniciar o carousel
    startAutoplay();
    
    // Pausar autoplay quando o mouse estiver sobre o carousel
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
        if (autoplayActive) {
            stopAutoplay();
            countdownDisplay.textContent = 'Pausado (mouse sobre)';
        }
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        if (autoplayActive) {
            startAutoplay();
        }
    });
});