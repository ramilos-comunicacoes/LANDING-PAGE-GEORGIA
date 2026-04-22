/* ============================================================
   CAROUSEL.JS – Carrossel de Depoimentos
   Auto-play + navegação manual (setas e dots)
   ============================================================ */

class TestimonialCarousel {
    constructor(container) {
        this.container = container;
        this.track = container.querySelector('.carousel__track');
        this.slides = container.querySelectorAll('.carousel__slide');
        this.prevBtn = container.querySelector('.carousel__btn--prev');
        this.nextBtn = container.querySelector('.carousel__btn--next');
        this.dotsContainer = container.querySelector('.carousel__dots');

        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000;
        this.isTransitioning = false;

        if (this.totalSlides <= 1) return;

        this.init();
    }

    init() {
        this.createDots();
        this.bindEvents();
        this.goTo(0);
        this.startAutoPlay();
    }

    createDots() {
        if (!this.dotsContainer) return;

        this.dotsContainer.innerHTML = '';
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel__dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Ir para depoimento ${i + 1}`);
            dot.addEventListener('click', () => this.goTo(i));
            this.dotsContainer.appendChild(dot);
        }
        this.dots = this.dotsContainer.querySelectorAll('.carousel__dot');
    }

    bindEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }

        // Pause on hover
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());

        // Touch/swipe support
        let startX = 0;
        let endX = 0;

        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            this.stopAutoPlay();
        }, { passive: true });

        this.track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) {
                diff > 0 ? this.next() : this.prev();
            }
            this.startAutoPlay();
        }, { passive: true });

        // Keyboard navigation
        this.container.setAttribute('tabindex', '0');
        this.container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
    }

    goTo(index) {
        if (this.isTransitioning) return;

        this.isTransitioning = true;
        this.currentIndex = ((index % this.totalSlides) + this.totalSlides) % this.totalSlides;

        this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;

        // Update dots
        if (this.dots) {
            this.dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === this.currentIndex);
            });
        }

        // Update slide aria
        this.slides.forEach((slide, i) => {
            slide.setAttribute('aria-hidden', i !== this.currentIndex ? 'true' : 'false');
        });

        setTimeout(() => {
            this.isTransitioning = false;
        }, 600);
    }

    next() {
        this.goTo(this.currentIndex + 1);
    }

    prev() {
        this.goTo(this.currentIndex - 1);
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => this.next(), this.autoPlayDelay);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const carouselEl = document.getElementById('testimonials-carousel');
    if (carouselEl) {
        new TestimonialCarousel(carouselEl);
    }
});
