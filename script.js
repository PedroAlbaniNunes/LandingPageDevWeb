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


// Parte do menu
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carrossel-track');
    const slides = Array.from(document.querySelectorAll('.carrossel-menu-slide'));
    const nextButton = document.querySelector('.prox-btn');
    const prevButton = document.querySelector('.ante-btn');
    const indicatorsContainer = document.querySelector('.carrousel-indicators');
    const container = document.querySelector('.carrossel-menu-container     ');
    
    // Variáveis para controle de arrasto
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
    let currentIndex = 0;
    
    // Criar indicadores
    slides.forEach((_, index) => {
        const indicator = document.createElement('span');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
    
    const indicators = document.querySelectorAll('.indicator');
    
    // Atualizar indicadores
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Ir para um slide específico
    function goToSlide(index) {
        currentIndex = index;
        updateIndicators();
        
        // Calcular a posição de deslocamento
        const slideWidth = slides[0].getBoundingClientRect().width;
        const gap = 30; // 15px de cada lado
        const slideOffset = (slideWidth + gap) * currentIndex;
        
        track.style.transform = `translateX(-${slideOffset}px)`;
        currentTranslate = -slideOffset;
        prevTranslate = -slideOffset;
    }
    
    // Eventos de mouse
    container.addEventListener('mousedown', dragStart);
    container.addEventListener('touchstart', dragStart);
    
    container.addEventListener('mousemove', drag);
    container.addEventListener('touchmove', drag);
    
    container.addEventListener('mouseup', dragEnd);
    container.addEventListener('touchend', dragEnd);
    container.addEventListener('mouseleave', dragEnd);
    
    // Eventos de teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });
    
    // Botões de navegação
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
    
    // Navegação para o próximo slide
    function nextSlide() {
        if (currentIndex >= slides.length - 1) return;
        currentIndex++;
        goToSlide(currentIndex);
    }
    
    // Navegação para o slide anterior
    function prevSlide() {
        if (currentIndex <= 0) return;
        currentIndex--;
        goToSlide(currentIndex);
    }
    
    // Funções de arrasto
    function dragStart(event) {
        if (event.type === 'touchstart') {
            startPosition = event.touches[0].clientX;
        } else {
            startPosition = event.clientX;
            event.preventDefault();
        }
        
        isDragging = true;
        track.style.transition = 'none';
        animationID = requestAnimationFrame(animation);
        container.style.cursor = 'grabbing';
    }
    
    function drag(event) {
        if (!isDragging) return;
        
        const currentPosition = event.type === 'touchmove' ? 
            event.touches[0].clientX : event.clientX;
        const diff = currentPosition - startPosition;
        
        currentTranslate = prevTranslate + diff;
        track.style.transform = `translateX(${currentTranslate}px)`;
    }
    
    function dragEnd() {
        if (!isDragging) return;
        
        isDragging = false;
        cancelAnimationFrame(animationID);
        container.style.cursor = 'grab';
        
        const movedBy = currentTranslate - prevTranslate;
        
        // Se o movimento foi significativo, mudar de slide
        if (movedBy < -100 && currentIndex < slides.length - 1) {
            currentIndex++;
        }
        
        if (movedBy > 100 && currentIndex > 0) {
            currentIndex--;
        }
        
        goToSlide(currentIndex);
    }
    
    function animation() {
        if (isDragging) requestAnimationFrame(animation);
    }
    
    // Inicializar
    container.style.cursor = 'grab';
});